import time
import board
import busio
import Adafruit_DHT
from adafruit_adxl34x import ADXL345
from adafruit_bmp180 import BMP180
from gpiozero import MCP3008  # For LM35
from gpiozero import Button  # For Pulse Sensor

# Initialize sensors
i2c = busio.I2C(board.SCL, board.SDA)

# ADXL345 Accelerometer
accelerometer = ADXL345(i2c)
accelerometer.range = ADXL345.Range.RANGE_16_G

# BMP180 (Temperature & Pressure)
bmp180 = BMP180(i2c)
bmp180.sea_level_pressure = 1013.25  # Adjust for your location

# DHT11 (Temperature & Humidity)
DHT_SENSOR = Adafruit_DHT.DHT11
DHT_PIN = 4  # GPIO pin connected to DHT11

# LM35 Temperature Sensor
adc = MCP3008(channel=0)

# Pulse Sensor (Using GPIO button for simplicity)
pulse_sensor = Button(17)  # GPIO pin connected to Pulse Sensor
pulse_count = 0


def pulse_detected():
    global pulse_count
    pulse_count += 1


pulse_sensor.when_pressed = pulse_detected


# Function to read ADXL345
def read_adxl345():
    x, y, z = accelerometer.acceleration
    vibration_level = (x**2 + y**2 + z**2) ** 0.5
    return vibration_level


# Function to read DHT11
def read_dht11():
    humidity, temperature = Adafruit_DHT.read_retry(DHT_SENSOR, DHT_PIN)
    return humidity, temperature


# Function to read LM35
def read_lm35():
    voltage = adc.value * 3.3  # MCP3008 gives value as a fraction of 3.3V
    temperature_c = voltage * 100  # 10mV per degree Celsius
    return temperature_c


# Function to read BMP180
def read_bmp180():
    temp = bmp180.temperature
    pressure = bmp180.pressure
    return temp, pressure


# Function to read pulse sensor data
def read_pulse():
    global pulse_count
    count = pulse_count
    pulse_count = 0  # Reset count after reading
    return count


# Main loop
try:
    print("Starting sensor data recording...")
    while True:
        # Read sensors
        vibration = read_adxl345()
        humidity, room_temp = read_dht11()
        person_temp = read_lm35()
        pulse_rate = read_pulse()
        bmp_temp, pressure = read_bmp180()

        # Print and log data
        print(f"Vibration: {vibration:.2f} g")
        print(f"Room Temp: {room_temp:.1f} °C, Humidity: {humidity:.1f}%")
        print(f"Body Temp: {person_temp:.1f} °C")
        print(f"Pulse Rate: {pulse_rate} BPM")
        print(f"Air Temp: {bmp_temp:.1f} °C, Pressure: {pressure:.1f} hPa")
        print("-" * 50)

        # Optional: Save to file
        with open("sensor_data.csv", "a") as file:
            file.write(
                f"{time.time()},{vibration:.2f},{room_temp:.1f},{humidity:.1f},"
                f"{person_temp:.1f},{pulse_rate},{bmp_temp:.1f},{pressure:.1f}\n"
            )

        time.sleep(5)  # Adjust sampling rate
except KeyboardInterrupt:
    print("Stopping sensor recording...")

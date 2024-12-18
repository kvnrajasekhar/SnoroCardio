import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { FaHeartbeat, FaThermometerHalf, FaWind, FaEye } from "react-icons/fa";

const sampleData = [
    { time: "10:00", value: 80 },
    { time: "11:00", value: 85 },
    { time: "12:00", value: 90 },
    { time: "13:00", value: 95 },
    { time: "14:00", value: 80 },
];

const thresholds = {
    "Pulse Rate": { normal: [60, 100] },
    "Blood Pressure": { normal: [80, 120] },
    "Snoring Detection": { normal: [0, 1] },
    "Body Temperature": { normal: [97, 99] },
    "Room Temp & Humidity": { normal: [20, 25] },
};

function VitalsScreen() {
    const navigate = useNavigate();
    const [selectedVital, setSelectedVital] = useState("Pulse Rate");
    const [dateRange, setDateRange] = useState({ start: "", end: "" });

    const vitalsList = [
        { name: "Pulse Rate", icon: <FaHeartbeat className="text-red-500" /> },
        { name: "Blood Pressure", icon: <FaThermometerHalf className="text-blue-500" /> },
        { name: "Snoring Detection", icon: <FaEye className="text-yellow-500" /> },
        { name: "Body Temperature", icon: <FaThermometerHalf className="text-orange-500" /> },
        { name: "Room Temp & Humidity", icon: <FaWind className="text-green-500" /> },
    ];

    const isNormal = (value) => {
        const [min, max] = thresholds[selectedVital]?.normal || [];
        return value >= min && value <= max;
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2] text-gray-800">
            {/* Header */}
            <header className="bg-[#0077b6] text-white py-4 px-6 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-bold">Vitals Dashboard</h1>
                <button
                    onClick={() => navigate("/Home")}
                    className="text-sm bg-white text-[#0077b6] py-2 px-4 rounded-lg font-medium hover:shadow-md"
                >
                    ← Back
                </button>
            </header>

            {/* Vitals Summary */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6">
                {vitalsList.map((vital) => (
                    <div
                        key={vital.name}
                        className={`p-4 rounded-lg shadow-md flex flex-col items-center justify-center bg-white transition transform hover:scale-105 ${selectedVital === vital.name
                                ? "border-2 border-[#0077b6]"
                                : ""
                            }`}
                        onClick={() => setSelectedVital(vital.name)}
                    >
                        <div className="text-3xl">{vital.icon}</div>
                        <h3 className="text-lg font-medium mt-2">{vital.name}</h3>
                    </div>
                ))}
            </section>

            {/* Date Range Selector */}
            <section className="flex items-center justify-between bg-white p-4 mx-6 rounded-lg shadow-md mb-6">
                <div className="flex flex-col">
                    <label htmlFor="start" className="text-sm font-medium text-gray-600">
                        Start Date
                    </label>
                    <input
                        type="date"
                        id="start"
                        className="mt-1 p-2 border rounded-lg text-sm"
                        value={dateRange.start}
                        onChange={(e) =>
                            setDateRange((prev) => ({ ...prev, start: e.target.value }))
                        }
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="end" className="text-sm font-medium text-gray-600">
                        End Date
                    </label>
                    <input
                        type="date"
                        id="end"
                        className="mt-1 p-2 border rounded-lg text-sm"
                        value={dateRange.end}
                        onChange={(e) =>
                            setDateRange((prev) => ({ ...prev, end: e.target.value }))
                        }
                    />
                </div>
            </section>

            {/* Graph Section */}
            <section className="bg-white mx-6 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {selectedVital} Trends
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sampleData}>
                        <CartesianGrid stroke="#ddd" />
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={isNormal(sampleData[0]?.value) ? "#38b000" : "#e63946"}
                            strokeWidth={2}
                            dot={{ r: 5 }}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <p
                    className={`mt-4 text-sm font-medium ${isNormal(sampleData[0]?.value) ? "text-[#38b000]" : "text-[#e63946]"
                        }`}
                >
                    Status: {isNormal(sampleData[0]?.value) ? "Normal" : "Abnormal"}
                </p>
            </section>

            {/* Action Buttons */}
            <footer className="flex justify-between mx-6 mt-6 mb-4">
                <button className="w-1/2 bg-[#0077b6] text-white py-3 mx-2 rounded-lg font-medium hover:bg-[#005f99] transition-shadow shadow-md">
                    Download Report
                </button>
                <button className="w-1/2 bg-[#0077b6] text-white py-3 mx-2 rounded-lg font-medium hover:bg-[#005f99] transition-shadow shadow-md">
                    Share
                </button>
            </footer>
        </div>
    );
}

export default VitalsScreen;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTrash, FaPencilAlt, FaSave, FaPhone } from "react-icons/fa";
// import { db } from './firebase'; // Assuming firebase configuration is exported here
import { doc, getDoc } from 'firebase/firestore';
import axios from 'axios';

function HomeScreen() {
    const navigate = useNavigate();
    
    const [guardians, setGuardians] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [isGuardianEnabled, setIsGuardianEnabled] = useState(false);
    const [userPhone, setUserPhone] = useState('');
    const [loading, setLoading] = useState(false); // Loading state for the call

    const handleToggleGuardian = () => {
        setIsGuardianEnabled(!isGuardianEnabled);
    };

    const handleAddGuardian = () => {
        if (guardians.length < 3) {
            setGuardians([...guardians, { name: "", phone: "" }]);
            setEditingIndex(guardians.length); // Automatically start editing the new guardian
        }
    };

    const handleEditGuardian = (index) => {
        setEditingIndex(index);
    };

    const handleSaveGuardian = () => {
        setEditingIndex(-1); // Exit editing mode
    };

    const handleDeleteGuardian = (index) => {
        setGuardians(guardians.filter((_, i) => i !== index));
        setEditingIndex(-1); // Exit editing mode if the deleted item was being edited
    };

    const handleGuardianChange = (index, field, value) => {
        const updatedGuardians = [...guardians];
        updatedGuardians[index][field] = value;
        setGuardians(updatedGuardians);
    };

    // Fetch the user's phone number from Firebase
    const fetchUserPhoneNumber = async () => {
        const userDoc = doc(db, "users", "userId"); // Replace with actual user ID
        const docSnap = await getDoc(userDoc);
        if (docSnap.exists()) {
            setUserPhone(docSnap.data().phone); // Assuming the phone is stored in the "phone" field
        } else {
            console.log("No such document!");
        }
    };

    useEffect(() => {
        fetchUserPhoneNumber();
    }, []);

    // Function to trigger the ambulance call via Twilio API
    const makeEmergencyCall = async () => {
        if (!userPhone) {
            alert("User phone number not found");
            return;
        }

        setLoading(true);

        try {
            // Call your backend API that handles the Twilio request
            await axios.post("/api/make-call", {
                from: userPhone,
                to: "108", // Emergency number for ambulance
            });

            alert("Emergency call placed to ambulance!");

        } catch (error) {
            console.error("Error making call:", error);
            alert("Failed to place the call. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#48cae4] to-[#ade8f4] text-gray-900">
            {/* Top Section */}
            <header className="p-6">
                <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-3">
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-lg font-medium">Guardian (Accompanied)</p>
                    <div className="flex items-center justify-between">
                        <label
                            htmlFor="guardian-toggle"
                            className="text-md text-gray-600 font-semibold"
                        >
                            Guardian Status:
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                id="guardian-toggle"
                                className="sr-only peer"
                                checked={isGuardianEnabled}
                                onChange={handleToggleGuardian}
                            />
                            <div className="w-12 h-7 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-[#48cae4] peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-6 after:w-6 after:transition-all"></div>
                        </label>
                    </div>
                    {isGuardianEnabled && (
                        <div className="space-y-4 mt-4">
                            {guardians.map((guardian, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg shadow-sm"
                                >
                                    {editingIndex === index ? (
                                        <>
                                            <input
                                                type="text"
                                                placeholder="Name"
                                                value={guardian.name}
                                                onChange={(e) =>
                                                    handleGuardianChange(index, "name", e.target.value)
                                                }
                                                className="flex-1 px-2 py-1 border rounded-lg text-sm"
                                            />
                                            <input
                                                type="text"
                                                placeholder="Phone"
                                                value={guardian.phone}
                                                onChange={(e) =>
                                                    handleGuardianChange(index, "phone", e.target.value)
                                                }
                                                className="flex-1 px-2 py-1 border rounded-lg text-sm"
                                            />
                                            <button
                                                onClick={() => handleSaveGuardian(index)}
                                                className="text-green-600"
                                            >
                                                <FaSave />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <p className="flex-1 text-sm">
                                                <strong>Name:</strong> {guardian.name || "N/A"}
                                            </p>
                                            <p className="flex-1 text-sm">
                                                <strong>Phone:</strong> {guardian.phone || "N/A"}
                                            </p>
                                            <button
                                                onClick={() => handleEditGuardian(index)}
                                                className="text-blue-600"
                                            >
                                                <FaPencilAlt />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDeleteGuardian(index)}
                                        className="text-red-600"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            ))}
                            {guardians.length < 3 && (
                                <button
                                    onClick={handleAddGuardian}
                                    className="flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700"
                                >
                                    <FaPlus /> Add Guardian
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>

            {/* Vitals Overview */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Vitals Overview</h3>
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            { title: "Pulse Rate", value: "80 bpm", icon: "❤️" },
                            { title: "Blood Pressure", value: "120/80 mmHg", icon: "🩺" },
                            { title: "Snoring Detection", value: "Normal", icon: "😴" },
                            { title: "Body Temperature", value: "98.6°F", icon: "🌡️" },
                        ].map((vital, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-[#ade8f4] to-[#48cae4] p-4 rounded-xl shadow-md flex items-center gap-4 hover:scale-105 transition-transform"
                            >
                                <span className="text-4xl">{vital.icon}</span>
                                <div>
                                    <p className="text-lg font-medium">{vital.title}</p>
                                    <p className="text-xl font-bold">{vital.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        className="w-full mt-6 bg-[#0077b6] text-white py-3 rounded-xl font-semibold hover:bg-[#023e8a] transition shadow-lg"
                        onClick={() => navigate("/graph")}
                    >
                        View Detailed Graph
                    </button>
                </div>
            </section>

            {/* Alerts Section */}
            <section className="p-6">
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Alerts</h3>
                    <div className="space-y-4">
                        {[
                            { title: "Abnormal Pulse Detected", time: "5 mins ago" },
                            { title: "Abnormal Snoring Detected", time: "10 mins ago" },
                        ].map((alert, index) => (
                            <div
                                key={index}
                                className="bg-gradient-to-r from-[#ff7f7f] to-[#e63946] p-4 rounded-xl shadow-md"
                            >
                                <h4 className="text-lg font-bold text-white">
                                    {alert.title}
                                </h4>
                                <p className="text-sm text-white opacity-80">{alert.time}</p>
                                <button className="mt-2 bg-white text-[#e63946] py-1 px-4 rounded-lg font-medium hover:scale-105 transition">
                                    Take Action
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Emergency Action */}
            <footer className="p-6">
                <button
                    className="w-full bg-[#e63946] text-white py-4 rounded-2xl text-lg font-bold hover:bg-[#c1121f] transition shadow-lg"
                    onClick={makeEmergencyCall}
                    disabled={loading}
                >
                    {loading ? "Placing Call..." : "Emergency Action"} 
                    <FaPhone className="ml-2 inline" />
                </button>
            </footer>
        </div>
    );
}

export default HomeScreen;

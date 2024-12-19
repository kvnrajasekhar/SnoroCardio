import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Forgotpass from "./Components/Forgotpass";
import HomeScreen from "./Components/HomeScreen";
import VitalsGraphScreen from "./Components/VitalsGraphScreen";
import { useUserStore } from "./lib/userStore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { Navigate } from "react-router-dom";

function App() {
  const { currentUser, fetchUserInfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <Router>
      <div>
        <Routes>
          {currentUser ? (
            <>
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/graph" element={<VitalsGraphScreen />} />
              <Route path="/forgot-password" element={<Forgotpass />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<Forgotpass />} />
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

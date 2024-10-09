import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";
import Setting from "./components/sidebar/Setting";

function App() {
  const { authUser, isLoading } = useAuth();

  if(isLoading) return null

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUp /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
         {/* <Route
          path="/update"
          element={authUser ? <Setting /> : <Navigate to={"/login"} />}
        /> */}
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;

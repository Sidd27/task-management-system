import { useSelector } from "react-redux";
import Login from "../containers/Login";
import Signup from "../containers/Signup";
import { Navigate } from "react-router";

const AuthPage = () => {
  const { token } = useSelector((state) => state.auth);
  if (token) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return (
      <div className="flex flex-col md:flex-row min-h-screen">
        <Login />
        <Signup />
      </div>
    );
  }
};

export default AuthPage;

import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return isLoggedIn
    ? <Navigate to="/home" replace />
    : <Navigate to="/index" replace />;
};

export default RootRedirect;

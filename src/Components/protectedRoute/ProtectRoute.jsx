import { useContext } from "react";
import { UserrContext } from "../../Context/UserrContext";
import { Navigate } from "react-router-dom";

export default function ProtectRoute({ children }) {
  const { token } = useContext(UserrContext);
  if (token != null) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
}

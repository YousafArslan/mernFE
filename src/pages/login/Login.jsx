import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../config";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${baseUrl}/api/auth/login`, credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="userName"
          id="userName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleLogin} className="lButton" disabled={loading}>
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
}

export default Login;

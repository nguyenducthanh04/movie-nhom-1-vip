import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./register.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles);

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3005/auth/register", {
        name,
        email,
        password,
      });
      console.log("Account: ", response.data.user.email)
      const emailAccount = response.data.user.email;

      navigate(`/verify`, { state: { emailAccount } });

    } catch (error) {
      setError(error.response?.data?.message || "Lỗi hệ thống");
    }
  };

  return (
    <div className={cx("container")}>
      {isLoading && <p className={cx("loading")}>Đang xử lý, vui lòng chờ...</p>}
      <div id="login" className={cx("signin-card")}>
        <h1 className={cx("display1")}>BO HUC</h1>
        <p style={{marginBottom: "5px"}}>Đăng Ký</p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div id="form-login-username" className={cx("form-group")}>
            <input
              id="name"
              className={cx("form-control")}
              name="name"
              type="text"
              size="18"
              required
              placeholder="Name của bro..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className={cx("form-highlight")}></span>
            <span className={cx("form-bar")}></span>
          </div>
          <div id="form-login-username" className={cx("form-group")}>
            <input
              id="email"
              className={cx("form-control")}
              name="email"
              type="email"
              size="18"
              required
              placeholder="Email của bro..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className={cx("form-highlight")}></span>
            <span className={cx("form-bar")}></span>
          </div>
          <div id="form-login-password" className={cx("form-group")}>
            <input
              id="password"
              className={cx("form-control")}
              name="password"
              type="password"
              size="18"
              required
              placeholder="Password của bro..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={cx("form-highlight")}></span>
            <span className={cx("form-bar")}></span>
          </div>
          <div>
            <button
              className={cx("btn", "btn-block", "btn-dark", "ripple-effect")}
              type="submit"
            >
              Đăng ký
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

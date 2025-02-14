import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Verify.module.scss";
import axios from "axios";
import { useNavigate, useLocation, Link } from "react-router-dom";

const cx = classNames.bind(styles);

function Verify() {
    const [verificationCode, setVerificationCode] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const { emailAccount } = location.state || {};
    console.log("email fe: ", emailAccount)
    console.log("code:", verificationCode)
    const handleVerify = async (e) => {
      e.preventDefault();
      try {
        await axios.post("http://localhost:3005/auth/verify", {
          emailAccount,
          verificationCode,
        });
  
        navigate("/login");
      } catch (error) {
        setError(error.response?.data?.message || "Mã xác thực không hợp lệ");
      }
    };
  return (
        <div className={cx("container")}>
      <div id="login" className={cx("signin-card")}>
        <h1 className={cx("display1")}>BO HUC</h1>
        {/* <p className={cx("subhead")}>Anh trai vượt ngàn trông gai</p> */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form action="" method="" role="form" onSubmit={handleVerify}>
          <div id="form-login-username" className={cx("form-group")}>
          <p style={{color: "white"}}>Vui lòng nhập mã xác thực đã được gửi đến email: <em style={{color: "#17c964"}}>{emailAccount}</em></p>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <span className={cx("form-highlight")}></span>
            <span className={cx("form-bar")}></span>
          </div>
          <div id="form-login-password" className={cx("form-group")}>
            <input
              id="passwd"
              className={cx("form-control")}
              name="password"
              type="text"
              size="18"
              alt="password"
              required
              placeholder="Mã xác thực của bro..."
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
            <span className={cx("form-highlight")}></span>
            <span className={cx("form-bar")}></span>
          </div>
          <div id="form-login-remember" className={cx("form-group")}>
          </div>
          <div>
            <button
              className={cx("btn", "btn-block", "btn-dark")}
              type="submit"
              name="Submit"
              alt="sign in"
            >
              Xác thực
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;

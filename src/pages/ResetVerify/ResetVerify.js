import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ResetVerify.module.scss";
import { useNavigate, useLocation, Link } from "react-router-dom";

import axios from "axios";
const cx = classNames.bind(styles);

function ResetVerify() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("http://localhost:3005/auth/resend-code", { email });
      setMessage(response.data.message);
      navigate("/verify", { state: { emailAccount: email } });
    } catch (error) {
      setMessage(error.response?.data?.message || "Có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="container mt-4">
    //   <h2>Nhập Email để nhận mã xác thực</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-3">
    //       <label className="form-label">Email</label>
    //       <input
    //         type="email"
    //         className="form-control"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>
    //     <button type="submit" className="btn btn-primary" disabled={loading}>
    //       {loading ? "Đang gửi..." : "Gửi mã xác thực"}
    //     </button>
    //   </form>
    //   {message && <p className="mt-3 alert alert-info">{message}</p>}
    // </div>
    <div className={cx("container")}>
    <div id="login" className={cx("signin-card")}>
      <h1 className={cx("display1")}>BO HUC</h1>
      <form action="" method="" role="form" onSubmit={handleSubmit}>
        <div id="form-login-username" className={cx("form-group")}>
          <span className={cx("form-highlight")}></span>
          <span className={cx("form-bar")}></span>
        </div>
        <div id="form-login-password" className={cx("form-group")}>
            <h3 style={{textAlign: "center", color: "white"}}>Gửi lại mã xác thực</h3>
          <input
            id="email"
            className={cx("form-control")}
            name="email"
            type="text"
            size="18"
            alt="email"
            required
            placeholder="Email xác thực của bro..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            disabled={loading}
          >
            {loading ? "Đang gửi..." : "Gửi mã xác thực"}
          </button>
        </div>
      </form>
    </div>
  </div>
  );
}

export default ResetVerify;

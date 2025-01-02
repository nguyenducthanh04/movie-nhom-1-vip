import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);
function Login (){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3005/auth/login', {
          email,
          password,
        });
        const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.message || 'Lỗi hệ thống');
      }
    };
    return (
        <div className={cx("container")}>
  <div id="login" className={cx("signin-card")}>
    <div className={cx("logo-image")}>
      <img
        src="http://www.officialpsds.com/images/thumbs/Spiderman-Logo-psd59240.png"
        alt="Logo"
        title="Logo"
        width="138"
      />
    </div>
    <h1 className={cx("display1")}>BO HUC</h1>
    <p className={cx("subhead")}>Anh trai vượt ngàn trông gai</p>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    <form action="" method="" role="form" onSubmit={handleSubmit}>
      <div id="form-login-username" className={cx("form-group")}>
        <input
          id="username"
          className={cx("form-control")}
          name="email"
          type="text"
          size="18"
          alt="login"
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
          id="passwd"
          className={cx("form-control")}
          name="password"
          type="password"
          size="18"
          alt="password"
          required
          placeholder="Password của bro..."
          value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <span className={cx("form-highlight")}></span>
        <span className={cx("form-bar")}></span>
      </div>
      <div id="form-login-remember" className={cx("form-group")}>
      </div>
      <div>
        <button
          className={cx("btn", "btn-block", "btn-info", "ripple-effect")}
          type="submit"
          name="Submit"
          alt="sign in"
        >
          Đăng nhập
        </button>
        <Link to={"/register"}>Đăng ký</Link>
      </div>
    </form>
  </div>
</div>
    )
}
export default Login;
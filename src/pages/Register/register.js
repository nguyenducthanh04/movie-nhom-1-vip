// import React, { useState } from "react";
// import classNames from "classnames/bind";
// import styles from "./register.module.scss";
// import axios from "axios";
// import { Link, useNavigate } from 'react-router-dom';

// const cx = classNames.bind(styles);
// function Register (){
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();
//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       try {
//         const response = await axios.post('http://localhost:3005/auth/login', {
//           email,
//           password,
//         });
//         const { user, token } = response.data;
//       localStorage.setItem('user', JSON.stringify(user));
//       localStorage.setItem('token', token);
//         navigate('/');
//       } catch (error) {
//         setError(error.response?.data?.message || 'Lỗi hệ thống');
//       }
//     };
//     return (
//         <div className={cx("container")}>
//   <div id="login" className={cx("signin-card")}>
//     <div className={cx("logo-image")}>
//       <img
//         src="http://www.officialpsds.com/images/thumbs/Spiderman-Logo-psd59240.png"
//         alt="Logo"
//         title="Logo"
//         width="138"
//       />
//     </div>
//     <h1 className={cx("display1")}>BO HUC</h1>
//     <p className={cx("subhead")}>Anh trai vượt ngàn trông gai</p>
//     {error && <p style={{ color: 'red' }}>{error}</p>}
//     <form action="" method="" role="form" >
//     <div id="form-login-username" className={cx("form-group")}>
//         <input
//           id="username"
//           className={cx("form-control")}
//           name="namename"
//           type="text"
//           size="18"
//           alt="login"
//           required
//           placeholder="Name của bro..."
//         />
//         <span className={cx("form-highlight")}></span>
//         <span className={cx("form-bar")}></span>
//       </div>
//       <div id="form-login-username" className={cx("form-group")}>
//         <input
//           id="username"
//           className={cx("form-control")}
//           name="email"
//           type="text"
//           size="18"
//           alt="login"
//           required
//           placeholder="Email của bro..."
//         />
//         <span className={cx("form-highlight")}></span>
//         <span className={cx("form-bar")}></span>
//       </div>
//       <div id="form-login-password" className={cx("form-group")}>
//         <input
//           id="passwd"
//           className={cx("form-control")}
//           name="password"
//           type="password"
//           size="18"
//           alt="password"
//           required
//           placeholder="Password của bro..."
//         />
//         <span className={cx("form-highlight")}></span>
//         <span className={cx("form-bar")}></span>
//       </div>
//       <div id="form-login-remember" className={cx("form-group")}>
//       </div>
//       <div>
//         <button
//           className={cx("btn", "btn-block", "btn-info", "ripple-effect")}
//           type="submit"
//           name="Submit"
//           alt="sign in"
//         >
//           Đăng ký
//         </button>
//       </div>
//     </form>
//   </div>
// </div>

//     )
// }
// export default Register;

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
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3005/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Đăng ký thành công! Hãy đăng nhập.");
      setError(null);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Lỗi hệ thống");
      setSuccess(null);
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

        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <form onSubmit={handleSubmit}>
          <div id="form-login-username" className={cx("form-group")}>
            <input
              id="name"
              className={cx("form-control")}
              name="name"
              type="text"
              size="18"
              alt="login"
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
              id="password"
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
          <div>
            <button
              className={cx("btn", "btn-block", "btn-info", "ripple-effect")}
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

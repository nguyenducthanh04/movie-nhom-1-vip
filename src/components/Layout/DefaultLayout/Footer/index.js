import classNames from "classnames/bind";
import styles from "./Footer.module.scss";

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx("wrapper")}>
      <p className={cx("copy-right")}>
        © Copyright 2024 Anh Trai Vượt Ngàn Chông Gai. All rights reserved.
      </p>
      <p className={cx("copy-right-mobile")}>
        © Copyright 2024 Anh Trai Vượt Ngàn Chông Gai.
      </p>
    </div>
  );
}

export default Footer;

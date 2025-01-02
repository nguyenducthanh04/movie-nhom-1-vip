import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.scss";
import Tippy from '@tippyjs/react/headless'; 
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import LogoBoHuc from "../../../../assets/images/logo-bohu.jpg"

const cx = classNames.bind(styles);

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisibleAccount, setIsVisibleAccount] = useState(false)
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSearch();
            setIsMenuOpen(false);
        }
    };
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const logout = () => {
        navigate('/');
        localStorage.removeItem("user");
    }
    const showAccount = () => setIsVisibleAccount(true);
    const hideAccount = () => setIsVisibleAccount(false);
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    return (
        <div className={cx("wrapper")}>
            <div className={cx("navbar")}>
                <div className={cx("nav-left")}>
                    <Link to={"/"} className={cx("logo-name")}>
                        <img className={cx("logo-img")} src={LogoBoHuc}></img>
                    </Link>
                    <ul>
                        <Link to={"/"} className={cx("link")}>
                            <li>Trang Chủ</li>
                        </Link>
                        <Link to={"/phim-le"} className={cx("link")}>
                            <li>Phim Lẻ</li>
                        </Link>
                        <Link to={"/phim-bo"} className={cx("link")}>
                            <li>Phim Bộ</li>
                        </Link>
                        <Link to={"/anime"} className={cx("link")}>
                            <li>Anime</li>
                        </Link>
                        <Link to={"/tv-shows"} className={cx("link")}>
                            <li>TV-Shows</li>
                        </Link>
                        <Link to={"/saved-movie"} className={cx("link")}>
                            <li>Phim Yêu Thích</li>
                        </Link>
                        <Link to={"/about"} className={cx("link")}>
                            <li>Giới Thiệu</li>
                        </Link>
                    </ul>
                </div>
                <div className={cx("nav-right")}>
                
                   {parsedUser ?  <div className={cx("account")}>
                        <Tippy render={(attrs) => (
                   <button className={cx("btn-logout-account")} onClick={logout}>Logout</button>
                )} placement="bottom" interactive visible={isVisibleAccount} onClickOutside={hideAccount }>  
                 <div className={cx("name-user")}>
                            <p onClick={isVisibleAccount ? hideAccount : showAccount}>Xin chào, {parsedUser.name} !</p>
                        </div>
                </Tippy>
                    </div> :     <div className={cx("login")}>
                        <Link to={"/login"} className={cx("redirect-login")}>
                        <button>Login</button>
                        </Link>
                    </div>}
                    <div className={cx("search-container")}>
                        <input
                            placeholder="Tìm kiếm phim..."
                            className={cx("search-input")}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <FaSearch className={cx("icon-search")} />
                    </div>
                    <div className={cx("menu-icon")} onClick={toggleMenu}>
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className={cx("mobile-menu")}>
                    <div className={cx("search-container-mobile")}>
                        <input
                            placeholder="Tìm kiếm phim..."
                            className={cx("search-input-mobile")}
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <FaSearch className={cx("icon-search-mobile")} />
                    </div>
                    <ul>
                        <Link
                            to={"/"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>Trang Chủ</li>
                        </Link>
                        <Link
                            to={"/phim-le"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>Phim Lẻ</li>
                        </Link>
                        <Link
                            to={"/phim-bo"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>Phim Bộ</li>
                        </Link>
                        <Link
                            to={"/anime"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>Anime</li>
                        </Link>
                        <Link
                            to={"/tv-shows"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>TV-Shows</li>
                        </Link>
                        <Link
                            to={"/saved-movie"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>Phim Yêu Thích</li>
                        </Link>
                        <Link
                            to={"/about"}
                            className={cx("link-mobile")}
                            onClick={toggleMenu}
                        >
                            <li>Giới Thiệu</li>
                        </Link>
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Header;

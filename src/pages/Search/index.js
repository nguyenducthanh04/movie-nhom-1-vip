import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./Search.module.scss";
import { useLocation, Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import ImageNoData from "../../assets/images/image_no_data.webp"
import Loading from "../../assets/images/loading.gif"
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);
function Search() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const keyword = searchParams.get("keyword");
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            // Reset state trước khi fetch dữ liệu mới
            setLoading(true);
            setMovies([]); // Đảm bảo kết quả cũ không hiển thị

            try {
                const response = await axios.get(
                    `https://phimapi.com/v1/api/tim-kiem?keyword=${keyword}`
                );
                setMovies(response.data.data.items || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (keyword) {
            fetchMovies();
        }
    }, [keyword]);

    return (
        <div className={cx("wrapper")}>
            <h1>
                KẾT QUẢ TÌM KIẾM CHO TỪ KHÓA: <em>{keyword}</em>
            </h1>

            {loading ? (
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                    <img src={Loading} style={{width: "300px", height: "250px", borderRadius: "10px"}}></img>
                </div>
            ) : movies.length === 0 ? (
                <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                <img src={ImageNoData} style={{width: "300px", height: "250px"}}></img>
                </div>
            ) : (
                <div className={cx("movie-list")}>
                    {movies.map((movie) => (
                        <Link to={`/detail/${movie.slug}`} key={movie._id}>
                            <div className={cx("product-item")}>
                                <img
                                    className={cx("img-product")}
                                    src={`https://img.phimapi.com/${movie.poster_url}`}
                                    alt={movie.name}
                                />
                                <h3 className={cx("name-product")}>{movie.name}</h3>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            <ToastContainer icon={<FaCheckCircle style={{ color: "green" }} />} />
        </div>
    );
}

export default Search;

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./Anime.module.scss";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const cx = classNames.bind(styles);
function Anime() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchMovies = async (page) => {
            try {
                const response = await axios.get(
                    // `https://phimapi.com/v1/api/danh-sach/hoat-hinh?page=${page}`
                    `http://localhost:3005/movies/get-anime-movie?page=${page}`
                );
                setMovies(response.data.data.items);
                setTotalPages(response.data.data.params.pagination.totalPages);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchMovies(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        toast.success(`Bạn đã chuyển sang trang ${page}`, {
            icon: <FaCheckCircle style={{ color: "green" }} />,
        });
    };

    const renderPagination = () => {
        const pages = [];

        // Prev button
        if (currentPage > 1) {
            pages.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={cx("page-button")}
                >
                    <FaChevronLeft />
                </button>
            );
        }

        // Page numbers
        if (currentPage > 1) {
            pages.push(
                <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className={cx("page-button", {
                        active: currentPage === 1,
                    })}
                >
                    1
                </button>
            );
        }

        if (currentPage > 2) {
            pages.push(
                <button key="ellipsis1" className={cx("ellipsis")}>
                    ...
                </button>
            );
        }

        pages.push(
            <button
                key={currentPage}
                onClick={() => handlePageChange(currentPage)}
                className={cx("page-button", {
                    active: true,
                })}
            >
                {currentPage}
            </button>
        );

        if (currentPage < totalPages - 1) {
            pages.push(
                <button key="ellipsis2" className={cx("ellipsis")}>
                    ...
                </button>
            );
        }

        if (currentPage < totalPages) {
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={cx("page-button", {
                        active: currentPage === totalPages,
                    })}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        if (currentPage < totalPages) {
            pages.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={cx("page-button")}
                >
                    <FaChevronRight />
                </button>
            );
        }

        return pages;
    };
    return (
        <div className={cx("content-anime")}>
            <h1>Danh sách phim anime/hoạt hình</h1>
            <div className={cx("movie-list")}>
                {movies?.map((movie) => (
                    <Link to={`/detail/${movie.ten_dia_chi_phim}`}>
                        <div className={cx("product-item")} key={movie.id}>
                            <img
                                className={cx("img-product")}
                                src={movie.anh_nen_phim}
                                alt={movie.ten_phim}
                            />
                            <h3 className={cx("name-product")}>{movie.ten_phim}</h3>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={cx("pagination")}>{renderPagination()}</div>
            <ToastContainer
                icon={<FaCheckCircle style={{ color: "green" }} />}
            />
        </div>
    );
}

export default Anime;

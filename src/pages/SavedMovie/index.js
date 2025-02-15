// import classNames from "classnames/bind";
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTheRedYeti } from "react-icons/fa";
// import styles from "./SavedMovie.module.scss";

// const cx = classNames.bind(styles);

// function SavedMovie() {
//     const [savedMovies, setSavedMovies] = useState([]);

//     useEffect(() => {
//         const movies = JSON.parse(localStorage.getItem("savedMovies")) || [];
//         setSavedMovies(movies);
//     }, []);

//     const handleRemoveMovie = (slug) => {
//         const updatedMovies = savedMovies.filter(
//             (movie) => movie.slug !== slug
//         );
//         localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
//         setSavedMovies(updatedMovies);
//         toast.success(`Phim đã được xóa khỏi danh sách yêu thích!`, {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: true,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//         });
//     };

//     return (
//         <div className={cx("wrapper")}>
//             <h1>Danh sách phim yêu thích</h1>
//             <div className={cx("movie-list")}>
//                 {savedMovies?.map((movie) => (
//                     <div className={cx("product-item")} key={movie._id}>
//                         <Link
//                             to={`/detail/${movie.slug}`}
//                             style={{ textDecoration: "none" }}
//                         >
//                             <img
//                                 className={cx("img-product")}
//                                 src={movie.thumb_url}
//                                 alt={movie.name}
//                             />
//                             <h3 className={cx("name-product")}>{movie.name}</h3>
//                         </Link>
//                         <button
//                             className={cx("undo-film")}
//                             onClick={() => handleRemoveMovie(movie.slug)}
//                         >
//                             💔 Bỏ thích
//                         </button>
//                     </div>
//                 ))}
//             </div>
//             <ToastContainer
//                 icon={<FaTheRedYeti style={{ color: "green" }} />}
//             />
//         </div>
//     );
// }

// export default SavedMovie;
import classNames from "classnames/bind";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTheRedYeti } from "react-icons/fa";
import styles from "./SavedMovie.module.scss";

const cx = classNames.bind(styles);

function SavedMovie() {
    const [savedMovies, setSavedMovies] = useState([]);
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    useEffect(() => {
        const fetchFavoriteMovies = async () => {
            try {
                if (!parsedUser) {
                    toast.warning("Vui lòng đăng nhập để xem danh sách yêu thích!");
                    return;
                }

                const response = await axios.get("http://localhost:3005/movies//all-favorites", {
                    params: { nguoi_dung_id: parsedUser.id },
                });

                setSavedMovies(response.data.data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách phim yêu thích:", error);
                toast.error("Lỗi khi lấy danh sách phim yêu thích!");
            }
        };

        fetchFavoriteMovies();
    }, []);

    const handleRemoveMovie = async (phim_id) => {
        try {
            // const userId = localStorage.getItem("userId");
            // if (!userId) {
            //     toast.warning("Bạn cần đăng nhập để xóa phim yêu thích!");
            //     return;
            // }

            await axios.post("http://localhost:3005/movies/favorites", {
                nguoi_dung_id: parsedUser.id,
                phim_id: phim_id,
            });

            setSavedMovies(savedMovies.filter((movie) => movie.id !== phim_id));
            toast.success("Phim đã được xóa khỏi danh sách yêu thích!");
        } catch (error) {
            console.error("Lỗi khi xóa phim yêu thích:", error);
            toast.error("Lỗi khi xóa phim yêu thích!");
        }
    };

    return (
        <div className={cx("wrapper")}>
            <h1>Danh sách phim yêu thích</h1>
            <div className={cx("movie-list")}>
                {savedMovies.length > 0 ? (
                    savedMovies.map((movie) => (
                        <div className={cx("product-item")} key={movie.id}>
                            <Link
                                to={`/detail/${movie.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                <img
                                    className={cx("img-product")}
                                    src={movie.anh_nen_phim}
                                    alt={movie.ten_phim}
                                />
                                <h3 className={cx("name-product")}>{movie.ten_phim}</h3>
                            </Link>
                            <button
                                className={cx("undo-film")}
                                onClick={() => handleRemoveMovie(movie.id)}
                            >
                                💔 Bỏ thích
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{color: "red"}}>Đăng nhập để sử dụng chức năng này!</p>
                )}
            </div>
            <ToastContainer icon={<FaTheRedYeti style={{ color: "green" }} />} />
        </div>
    );
}

export default SavedMovie;

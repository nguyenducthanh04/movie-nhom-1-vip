// import React, { useState, useEffect } from "react";
// import classNames from "classnames/bind";
// import { Link } from "react-router-dom";
// import axios from "axios";
// import styles from "./Detail.module.scss";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaTheRedYeti, FaPaperPlane } from "react-icons/fa";
// import { useParams } from "react-router-dom";
// const cx = classNames.bind(styles);

// function Detail() {
//     const { ten_dia_chi_phim } = useParams();
//     const [movie, setMovie] = useState([]);
//     const [isSaved, setIsSaved] = useState(false);
//     useEffect(() => {
//         const apiUrl = `http://localhost:3005/movies/get-anime-detail/${ten_dia_chi_phim}`;
//         axios
//             .get(apiUrl)
//             .then((response) => {
//                 setMovie(response.data.movie);
//                 checkIfSaved(response.data.movie);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, [ten_dia_chi_phim]);
//     const checkIfSaved = (movie) => {
//         const savedMovies =
//             JSON.parse(localStorage.getItem("savedMovies")) || [];
//         const movieExists = savedMovies.some(
//             (savedMovie) => savedMovie.ten_dia_chi_phim === movie.ten_dia_chi_phim
//         );
//         setIsSaved(movieExists);
//     };
//     const handleSaveMovie = () => {
//         let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
//         const movieExists = savedMovies.some(
//             (savedMovie) => savedMovie.ten_dia_chi_phim === movie.ten_dia_chi_phim
//         );

//         if (movieExists) {
//             savedMovies = savedMovies.filter(
//                 (savedMovie) => savedMovie.ten_dia_chi_phim !== movie.ten_dia_chi_phim
//             );
//             localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
//             toast.info(`Phim đã bị xóa khỏi danh sách yêu thích!`, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//             setIsSaved(false);
//         } else {
//             savedMovies.push(movie);
//             localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
//             toast.success(`Phim đã được thêm vào danh sách yêu thích!`, {
//                 position: "top-right",
//                 autoClose: 3000,
//                 hideProgressBar: true,
//                 closeOnClick: true,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//             });
//             setIsSaved(true);
//         }
//     };
//     const trailerUrl = movie.duong_dan_gioi_thieu;
//     const embedUrl = trailerUrl ? trailerUrl.replace("watch?v=", "embed/") : "";
//     const shareOnFacebook = () => {
//         const movieUrl = `https://ndthah.vercel.app/detail/${ten_dia_chi_phim}`;
//         const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl)}`;
      
//         window.open(shareUrl, "_blank", "width=600,height=400");
//       };
//     return (
//         <div className={cx("container")}>
//             <div className={cx("row")}>
//         <div className={cx("col-md-6")}>
//                     <img
//                         src={movie.anh_poster_phim}
//                         alt={movie.ten_phim}
//                         className={cx("poster-img")}
//                     />
//                     <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>{movie.ten_phim}</h4>
//                     <Link
//                         className={cx("play")}
//                         to={`/watch-movie/${movie.ten_dia_chi_phim}`}
//                     >
//                         <button className={cx("btn-play")}>Xem ngay</button>
//                     </Link>
//                     <button
//                         className={cx("btn-save")}
//                         onClick={handleSaveMovie}
//                     >
//                         {isSaved ? "💔 Bỏ yêu thích" : "❤️ Yêu thích"}
//                     </button>
//                     <button className={cx("btn-share")} onClick={shareOnFacebook}>
//                         <FaPaperPlane style={{color: "white"}}/>
//                     </button>
//                     <br></br>
//                     {embedUrl !== "" ? (
//                         <div style={{marginTop: "30px"}}>
//                         <h3 style={{color: "#ffbe0b", marginBottom: "20px"}}>Trailer</h3>
//                         <iframe 
//                          width="248" 
//                          height="150" 
//                          src={embedUrl}
//                          title="YouTube video player" 
//                          frameBorder="0"
//                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                          allowFullScreen
//                         ></iframe>
//                     </div>
//                     ) : ""}
//                 </div>
//                 <div className={cx("col-md-6")}>
//                     <h2>Nội dung</h2>
//                     <p>{movie.noi_dung}</p>
//                     <h2>Năm phát hành</h2>
//                     <p>{movie.nam_san_xuat}</p>
//                     <h2>Quốc gia</h2>
//                     {movie.quoc_gia}
//                     <h2>Thời lượng</h2>
//                     <p>{movie.thoi_gian}</p>
//                     <h2>Số tập phim</h2>
//                     <p>{movie.tong_so_tap} tập</p>
//                     <h2>Đã phát</h2>
//                     <p>{movie.tap_da_phat}</p>
//                     <h2>Diễn viên</h2>
//                         <p>{movie.dien_vien}</p>
//                     <h2>Chất lượng</h2>
//                         <p>{movie.do_phan_giai}</p>
//                     {/* <h2>Phụ đề</h2>
//                         <p>{movie.lang}</p> */}
//                     <h2>Thể loại</h2>
//                     <p>{movie.the_loai}</p>
//                     {/* <ul>
//                         {movie.category?.map((cate) => (
//                             <li>{cate.name}</li>
//                         ))}
//                     </ul> */}
//                 </div>
//             </div>
//             <ToastContainer
//                 icon={<FaTheRedYeti style={{ color: "green" }} />}
//             />
//         </div>
//     );
// }

// export default Detail;


import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./Detail.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTheRedYeti, FaPaperPlane } from "react-icons/fa";
import { useParams } from "react-router-dom";

const cx = classNames.bind(styles);

function Detail() {
    const { ten_dia_chi_phim } = useParams();
    const [movie, setMovie] = useState({});
    const [isSaved, setIsSaved] = useState(false);
    const storedUser = localStorage.getItem("user");
    const parsedUser = JSON.parse(storedUser);
    const userId = parsedUser?.id ?? null;
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3005/movies/get-anime-detail/${ten_dia_chi_phim}`
                );
                setMovie(response.data.movie);
                checkIfSaved(response.data.movie.id);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };
        fetchMovie();
    }, [ten_dia_chi_phim]);

    // Kiểm tra xem phim có trong danh sách yêu thích không
    const checkIfSaved = async (phim_id) => {
        try {
            const response = await axios.get(
                `http://localhost:3005/movies/favorites/check/${phim_id}`,
                { params: { nguoi_dung_id: userId } } // Truyền ID người dùng vào query params
            );
            setIsSaved(response.data.isSaved); // Nhận kết quả từ API
        } catch (error) {
            console.error("Lỗi khi kiểm tra danh sách yêu thích:", error);
        }
    };
    

    // Xử lý thêm/xóa phim khỏi danh sách yêu thích
    const handleSaveMovie = async () => {
        try {
            if (!userId) {
                toast.warning("Vui lòng đăng nhập để sử dụng tính năng này!", { autoClose: 3000 });
                return;
            }
    
            if (isSaved) {
                // Xóa phim khỏi danh sách yêu thích
                await axios.post("http://localhost:3005/movies/favorites", {
                    nguoi_dung_id: userId,
                    phim_id: movie.id,
                });
                toast.info("Phim đã bị xóa khỏi danh sách yêu thích!", { autoClose: 3000 });
            } else {
                // Thêm phim vào danh sách yêu thích
                await axios.post("http://localhost:3005/movies/add-to-favorites", {
                    nguoi_dung_id: userId,
                    phim_id: movie.id,
                });
                toast.success("Phim đã được thêm vào danh sách yêu thích!", { autoClose: 3000 });
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error("Lỗi khi cập nhật danh sách yêu thích:", error);
            toast.error("Lỗi khi cập nhật danh sách yêu thích!");
        }
    };
    

    // Xử lý chia sẻ phim lên Facebook
    const shareOnFacebook = () => {
        const movieUrl = `https://ndthah.vercel.app/detail/${ten_dia_chi_phim}`;
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl)}`;
        window.open(shareUrl, "_blank", "width=600,height=400");
    };

    const embedUrl = movie.duong_dan_gioi_thieu?.replace("watch?v=", "embed/");

    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
                <div className={cx("col-md-6")}>
                    <img src={movie.anh_poster_phim} alt={movie.ten_phim} className={cx("poster-img")} />
                    <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>{movie.ten_phim}</h4>
                    <Link className={cx("play")} to={`/watch-movie/${movie.ten_dia_chi_phim}`}>
                        <button className={cx("btn-play")}>Xem ngay</button>
                    </Link>
                    <button className={cx("btn-save")} onClick={handleSaveMovie}>
                        {isSaved ? "💔 Bỏ yêu thích" : "❤️ Yêu thích"}
                    </button>
                    <button className={cx("btn-share")} onClick={shareOnFacebook}>
                        <FaPaperPlane style={{ color: "white" }} />
                    </button>
                    {embedUrl && (
                        <div style={{ marginTop: "30px" }}>
                            <h3 style={{ color: "#ffbe0b", marginBottom: "20px" }}>Trailer</h3>
                            <iframe 
                                width="248" 
                                height="150" 
                                src={embedUrl}
                                title="YouTube video player" 
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
                <div className={cx("col-md-6")}>
                    <h2>Nội dung</h2>
                    <p>{movie.noi_dung}</p>
                    <h2>Năm phát hành</h2>
                    <p>{movie.nam_san_xuat}</p>
                    <h2>Quốc gia</h2>
                    <p>{movie.quoc_gia}</p>
                    <h2>Thời lượng</h2>
                    <p>{movie.thoi_gian}</p>
                    <h2>Số tập phim</h2>
                    <p>{movie.tong_so_tap} tập</p>
                    <h2>Đã phát</h2>
                    <p>{movie.tap_da_phat}</p>
                    <h2>Diễn viên</h2>
                    <p>{movie.dien_vien}</p>
                    <h2>Chất lượng</h2>
                    <p>{movie.do_phan_giai}</p>
                    <h2>Thể loại</h2>
                    <p>{movie.the_loai}</p>
                </div>
            </div>
            <ToastContainer icon={<FaTheRedYeti style={{ color: "green" }} />} />
        </div>
    );
}

export default Detail;

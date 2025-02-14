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

// function Detail() {
//     const { slug } = useParams();
//     const [movie, setMovie] = useState([]);
//     const [isSaved, setIsSaved] = useState(false);
//     useEffect(() => {
//         const apiUrl = `https://phimapi.com/phim/${slug}`;
//         axios
//             .get(apiUrl)
//             .then((response) => {
//                 setMovie(response.data.movie);
//                 checkIfSaved(response.data.movie);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, [slug]);
//     const checkIfSaved = (movie) => {
//         const savedMovies =
//             JSON.parse(localStorage.getItem("savedMovies")) || [];
//         const movieExists = savedMovies.some(
//             (savedMovie) => savedMovie.slug === movie.slug
//         );
//         setIsSaved(movieExists);
//     };
//     const handleSaveMovie = () => {
//         let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
//         const movieExists = savedMovies.some(
//             (savedMovie) => savedMovie.slug === movie.slug
//         );

//         if (movieExists) {
//             savedMovies = savedMovies.filter(
//                 (savedMovie) => savedMovie.slug !== movie.slug
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
//     return (
//         <div className={cx("container")}>
//             <div className={cx("row")}>
//                 <div className={cx("col-md-6")}>
//                     <img
//                         src={movie.thumb_url}
//                         alt={movie.name}
//                         className={cx("poster-img")}
//                     />
//                     <h4 style={{ marginTop: "10px" }}>{movie.name}</h4>
//                     <Link
//                         className={cx("play")}
//                         to={`/watch-movie/${movie.slug}`}
//                     >
//                         Xem ngay
//                     </Link>
//                     <button
//                         style={{
//                             background: "#3a86ff",
//                             color: "#fff",
//                             borderRadius: "3px",
//                             marginTop: "5px",
//                             marginLeft: "6px",
//                             height: "30px",
//                             width: "50px",
//                         }}
//                     >
//                         {movie.quality}
//                     </button>
//                     <button
//                         style={{
//                             background: "#3a86ff",
//                             color: "#fff",
//                             borderRadius: "3px",
//                             marginTop: "5px",
//                             marginLeft: "6px",
//                             height: "30px",
//                             width: "50px",
//                         }}
//                     >
//                         {movie.year}
//                     </button>
//                     <button
//                         style={{
//                             background: "#3a86ff",
//                             color: "#fff",
//                             borderRadius: "3px",
//                             marginTop: "5px",
//                             marginLeft: "6px",
//                             height: "30px",
//                             width: "auto",
//                         }}
//                     >
//                         {movie.episode_current}
//                     </button>
//                     <button
//                         className={cx("btn-save")}
//                         onClick={handleSaveMovie}
//                     >
//                         {isSaved ? "💔 Bỏ thích" : "❤️ Thích"}
//                     </button>
//                 </div>
//                 <div className={cx("col-md-6")}>
//                     <h2>Nội dung</h2>
//                     <p>{movie.content}</p>

//                     <h2>Quốc gia</h2>
//                     {movie.country?.map((c) => (
//                         <p>{c.name}</p>
//                     ))}
//                     <h2>Thời lượng</h2>
//                     <p>{movie.time}</p>

//                     <h2>Diễn viên</h2>
//                     <p>{movie.actor}</p>

//                     <h2>Thể loại</h2>
//                     <ul>
//                         {movie.category?.map((cate) => (
//                             <li>{cate.name}</li>
//                         ))}
//                     </ul>
//                 </div>
//             </div>
//             <ToastContainer
//                 icon={<FaTheRedYeti style={{ color: "green" }} />}
//             />
//         </div>
//     );
// }
function Detail() {
    const { slug } = useParams();
    const [movie, setMovie] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    useEffect(() => {
        const apiUrl = `https://phimapi.com/phim/${slug}`;
        axios
            .get(apiUrl)
            .then((response) => {
                setMovie(response.data.movie);
                checkIfSaved(response.data.movie);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [slug]);
    const checkIfSaved = (movie) => {
        const savedMovies =
            JSON.parse(localStorage.getItem("savedMovies")) || [];
        const movieExists = savedMovies.some(
            (savedMovie) => savedMovie.slug === movie.slug
        );
        setIsSaved(movieExists);
    };
    const handleSaveMovie = () => {
        let savedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
        const movieExists = savedMovies.some(
            (savedMovie) => savedMovie.slug === movie.slug
        );

        if (movieExists) {
            savedMovies = savedMovies.filter(
                (savedMovie) => savedMovie.slug !== movie.slug
            );
            localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
            toast.info(`Phim đã bị xóa khỏi danh sách yêu thích!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsSaved(false);
        } else {
            savedMovies.push(movie);
            localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
            toast.success(`Phim đã được thêm vào danh sách yêu thích!`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setIsSaved(true);
        }
    };
    const trailerUrl = movie.trailer_url;
    const embedUrl = trailerUrl ? trailerUrl.replace("watch?v=", "embed/") : "";
    const listActor = movie.actor;
    const convertListActor = listActor ? listActor.join(", ") : "";
    const shareOnFacebook = () => {
        const movieUrl = `https://ndthah.vercel.app/detail/${slug}`;
        const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(movieUrl)}`;
      
        window.open(shareUrl, "_blank", "width=600,height=400");
      };
    return (
        <div className={cx("container")}>
            <div className={cx("row")}>
        <div className={cx("col-md-6")}>
                    <img
                        src={movie.thumb_url}
                        alt={movie.name}
                        className={cx("poster-img")}
                    />
                    <h4 style={{ marginTop: "20px", marginBottom: "10px" }}>{movie.name}</h4>
                    <Link
                        className={cx("play")}
                        to={`/watch-movie/${movie.slug}`}
                    >
                        <button className={cx("btn-play")}>Xem phim</button>
                    </Link>
                    <button
                        className={cx("btn-save")}
                        onClick={handleSaveMovie}
                    >
                        {isSaved ? "💔 Bỏ yêu thích" : "❤️ Yêu thích"}
                    </button>
                    <button className={cx("btn-share")} onClick={shareOnFacebook}>
                        <FaPaperPlane style={{color: "white"}}/>
                    </button>
                    <br></br>
                    {embedUrl !== "" ? (
                        <div style={{marginTop: "30px"}}>
                        <h3 style={{color: "#ffbe0b", marginBottom: "20px"}}>Trailer</h3>
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
                    ) : ""}
                </div>
                <div className={cx("col-md-6")}>
                    <h2>Nội dung</h2>
                    <p>{movie.content}</p>
                    <h2>Năm phát hành</h2>
                    <p>{movie.year}</p>
                    <h2>Quốc gia</h2>
                    {movie.country?.map((c) => (
                        <p>{c.name}</p>
                    ))}
                    <h2>Thời lượng</h2>
                    <p>{movie.time}</p>
                    <h2>Số tập phim</h2>
                    <p>{movie.episode_total} tập</p>
                    <h2>Đã phát</h2>
                    <p>{movie.episode_current}</p>
                    <h2>Diễn viên</h2>
                        <p>{convertListActor}</p>
                    <h2>Chất lượng</h2>
                        <p>{movie.quality}</p>
                    <h2>Phụ đề</h2>
                        <p>{movie.lang}</p>
                    <h2>Thể loại</h2>
                    <ul>
                        {movie.category?.map((cate) => (
                            <li>{cate.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <ToastContainer
                icon={<FaTheRedYeti style={{ color: "green" }} />}
            />
        </div>
    );
}

export default Detail;

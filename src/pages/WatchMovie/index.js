// import React, { useState, useEffect } from "react";
// import classNames from "classnames/bind";
// import axios from "axios";
// import styles from "./WatchMovie.module.scss";
// import { useParams } from "react-router-dom";
// import ReactPlayer from "react-player";
// const cx = classNames.bind(styles);
// function WatchMovie() {
//     const { ten_dia_chi_phim } = useParams();
//     const [movieCurrent, setMovieCurrent] = useState([]);
//     const [currentUrl, setCurrentUrl] = useState("");
//     const [selectedEpisode, setSelectedEpisode] = useState(null);
//     useEffect(() => {
//         const apiUrl = `http://localhost:3005/movies/get-anime-detail/${ten_dia_chi_phim}`;
//         axios
//             .get(apiUrl)
//             .then((response) => {
//                 setMovieCurrent(response.data);
//                 console.log("movi url avt: ", response.data);
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//             });
//     }, [ten_dia_chi_phim]);

//     useEffect(() => {
//         if (movieCurrent.tapphims && movieCurrent.tapphims[0]) {
//             setCurrentUrl(
//                 movieCurrent.tapphims[0].duong_dan_truc_tuyen ||
//                     movieCurrent.duong_dan_truc_tuyen
//             );
//             setSelectedEpisode(movieCurrent.tapphims[0].ten_dia_chi_tap);
//         }
//     }, [movieCurrent]);
//     const handleEpisodeClick = (url, ten_dia_chi_tap) => {
//         setCurrentUrl(url);
//         setSelectedEpisode(ten_dia_chi_tap);
//     };
//     return (
//         <div className={cx("wrapper")}>
//             <div className={cx("content")}>
//                 <div className={cx("name-movie")}>
//                     <h3>{movieCurrent.movie?.ten_phim}</h3>
//                 </div>
//                 <div className={cx("movie-video")}>
//                     <div className={cx("player-wrapper")}>
//                         <ReactPlayer
//                             className={cx("react-player")}
//                             url={currentUrl || movieCurrent.duong_dan_truc_tuyen}
//                             controls
//                             width="100vw"
//                             height="50vh"
//                             playing
//                             loop
//                             muted
//                             config={{
//                                 file: {
//                                     attributes: {
//                                         crossOrigin: "anonymous",
//                                     },
//                                 },
//                             }}
//                         />
//                     </div>
//                 </div>
//                 <div className={cx("list-episodes")}>
//                     {movieCurrent.tapphims?.map((episode) =>
//                         episode?.map((svdt) => (
//                             <button
//                                 key={svdt.ten_dia_chi_tap}
//                                 onClick={() =>
//                                     handleEpisodeClick(
//                                         svdt.duong_dan_truc_tuyen,
//                                         svdt.ten_dia_chi_tap
//                                     )
//                                 }
//                                 className={cx("episodeButton", {
//                                     selectedButton:
//                                         selectedEpisode === svdt.ten_dia_chi_tap,
//                                 })}
//                             >
//                                 {svdt.ten_tap_phim}
//                             </button>
//                         ))
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default WatchMovie;
import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./WatchMovie.module.scss";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const cx = classNames.bind(styles);

function WatchMovie() {
    const { ten_dia_chi_phim } = useParams();
    const [movieCurrent, setMovieCurrent] = useState({});
    const [currentUrl, setCurrentUrl] = useState("");
    const [selectedEpisode, setSelectedEpisode] = useState(null);

    useEffect(() => {
        const apiUrl = `http://localhost:3005/movies/get-anime-detail/${ten_dia_chi_phim}`;
        axios
            .get(apiUrl)
            .then((response) => {
                setMovieCurrent(response.data.movie);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [ten_dia_chi_phim]);

    useEffect(() => {
        if (movieCurrent.tapphims && movieCurrent.tapphims.length > 0) {
            setCurrentUrl(movieCurrent.tapphims[0].duong_dan_truc_tuyen);
            setSelectedEpisode(movieCurrent.tapphims[0].ten_dia_chi_tap);
        }
    }, [movieCurrent]);

    const handleEpisodeClick = (url, ten_dia_chi_tap) => {
        setCurrentUrl(url);
        setSelectedEpisode(ten_dia_chi_tap);
    };

    return (
        <div className={cx("wrapper")}>
            <div className={cx("content")}>
                <div className={cx("name-movie")}>
                    <h3>{movieCurrent.ten_phim}</h3>
                </div>
                <div className={cx("movie-video")}>
                    <div className={cx("player-wrapper")}>
                        <ReactPlayer
                            className={cx("react-player")}
                            url={currentUrl}
                            controls
                            width="100vw"
                            height="50vh"
                            playing
                            loop
                            muted
                            config={{
                                file: {
                                    attributes: {
                                        crossOrigin: "anonymous",
                                    },
                                },
                            }}
                        />
                    </div>
                </div>
                <div className={cx("list-episodes")} style={{marginBottom: "10px"}}>
                    {movieCurrent.tapphims?.map((episode) => (
                        <button
                            key={episode.ten_dia_chi_tap}
                            onClick={() => handleEpisodeClick(episode.duong_dan_truc_tuyen, episode.ten_dia_chi_tap)}
                            className={cx("episodeButton", {
                                selectedButton: selectedEpisode === episode.ten_dia_chi_tap,
                            })}
                        >
                            {episode.ten_tap_phim}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WatchMovie;

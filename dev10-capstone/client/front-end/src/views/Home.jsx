import "../css/home.css";
import Video from "../assets/golf-club.mp4";

function Home() {
    return (
        <div className="landing container is-fluid is-max-widescreen hero" id="landing">
            <section className="hero is-fullheight video">
                <video playsInline autoPlay muted loop>
                    <source src={Video} type="video/mp4"/>
                    <p>
                        Your browser doesn't support the video element. Try
                        <a href="https://www.pexels.com/video/female-mini-golf-player-legs-close-up-6533026/" download
                            >downloading the video file</a>
                        </p>
                </video>
                <span className="is-family-monospace title test">JOIN THE CLUB</span>
                <span className="is-family-monospace subtitle is-3 test2">EMBRACE THE MAGIC</span>
            </section>
        </div>
    );
}

export default Home;
import { useEffect, useState, useLayoutEffect, useCallback } from "react";
import PlayIcon from "./play.svg";
import PauseIcon from "./pause.svg";
import { startAnimation } from "./animation";

const audio = new Audio();

function App() {
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canplay, setCanplay] = useState(false);

  const getNextTrack = () => {
    return fetch("https://api.joinrave.com/current")
      .then((response) => response.json())
      .then((response) => {
        setTrack(response);
        audio.src = response.metadata.file;
        audio.load();
      });
  };

  const play = useCallback(() => {
    setLoading(true);
    getNextTrack().catch(() => {
      setLoading(false);
    });
  }, []);

  const stop = () => {
    audio.pause();
    setPlaying(false);
    setCanplay(false);
  };

  const onCanplay = useCallback(() => {
    if (!canplay) {
      setCanplay(true);
    }
  }, [canplay]);

  useEffect(() => {
    if (canplay && track) {
      audio.currentTime = track.time;
      audio.play();
      setPlaying(true);
      setLoading(false);
    }
  }, [canplay, track]);

  useEffect(() => {
    audio.addEventListener("ended", play);
    audio.addEventListener("canplay", onCanplay);
    return () => {
      audio.removeEventListener("ended", play);
      audio.removeEventListener("canplay", onCanplay);
    };
  }, [play, onCanplay]);

  useLayoutEffect(() => {
    try {
      startAnimation();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <canvas id="canv" width="2265" height="1465"></canvas>
      <div className="app">
        {playing ? (
          <img alt="Pause" src={PauseIcon} onClick={stop} />
        ) : (
          <img alt="Play" src={PlayIcon} onClick={play} />
        )}
        <div className="info">
          {loading && "Loading..."}
          {!loading && track && (
            <>
              {track?.metadata?.title} by <b>{track?.metadata?.artist}</b>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

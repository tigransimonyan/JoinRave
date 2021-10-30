import { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
// import FullScreenIcon from './assets/fullscreen.svg';
// import NormalScreenIcon from './assets/normalscreen.svg';
// import FavoriteIcon from './assets/favorite.svg';
import { startAnimation } from './animation';

const audio = new Audio();

function App() {
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canplay, setCanplay] = useState(false);

  const getNextTrack = () => {
    return fetch(process.env.REACT_APP_API)
      .then((response) => response.json())
      .then((response) => {
        setTrack(response);
        const src = response.file;
        if (src !== audio.src) {
          audio.src = src;
          audio.load();
          setCanplay(false);
        }
      });
  };

  const play = useCallback(() => {
    setLoading(true);
    getNextTrack().catch(() => {
      setLoading(false);
    });
  }, []);

  const pause = useCallback(() => {
    audio.pause();
    setPlaying(false);
  }, []);

  const onCanplay = useCallback(() => {
    if (!canplay) {
      setCanplay(true);
    }
  }, [canplay]);

  const onPlay = useCallback(() => {
    if (!playing) {
      play();
    }
  }, [playing, play]);

  const onEnded = useCallback(() => play(), [play]);
  const onPause = useCallback(() => pause(), [pause]);

  useEffect(() => {
    if (canplay && track) {
      audio.currentTime = track.time;
      audio.play();
      setPlaying(true);
      setLoading(false);
    }
  }, [canplay, track]);

  useEffect(() => {
    audio.addEventListener('play', onPlay);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('canplay', onCanplay);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('canplay', onCanplay);
    };
  }, [onPlay, onCanplay, onEnded, onPause]);

  useLayoutEffect(() => {
    try {
      startAnimation();
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div id="main">
      <canvas id="canv" width="100%" height="100%"></canvas>
      <div className="app">
        {playing ? (
          <img class="pause" alt="Pause" src={PauseIcon} onClick={pause} />
        ) : (
          <img class="play" alt="Play" src={PlayIcon} onClick={play} />
        )}
        <div className="info">
          {loading && 'Playing...'}
          {!loading && track && (
            <>
              {track?.title} by <b>{track?.artist}</b>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

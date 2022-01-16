import { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
import { initAnimation } from './animation-4';
// import FullScreenIcon from './assets/fullscreen.svg';
// import NormalScreenIcon from './assets/normalscreen.svg';
// import FavoriteIcon from './assets/favorite.svg';

const audio = new Audio();

function App() {
  const [playing, setPlaying] = useState(false);
  const [canplay, setCanplay] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    audio.crossOrigin = 'anonymous';
    audio.src = process.env.REACT_APP_API;
    audio.load();
  }, []);

  const play = useCallback(() => {
    if (canplay && !playing) {
      audio.play();
      setPlaying(true);
    }
  }, [canplay, playing]);

  const pause = useCallback(() => {
    if (playing) {
      audio.pause();
      setPlaying(false);
    }
  }, [playing]);

  const onCanplay = useCallback(() => {
    if (!canplay) {
      setCanplay(true);
    }
  }, [canplay]);

  const onPlay = useCallback(() => play(), [play]);
  // const onEnded = useCallback(() => play(), [play]);
  const onPause = useCallback(() => pause(), [pause]);

  const onError = useCallback(() => {
    setError(true);
  }, []);

  useEffect(() => {
    audio.addEventListener('play', onPlay);
    // audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('canplay', onCanplay);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('play', onPlay);
      // audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('canplay', onCanplay);
      audio.removeEventListener('error', onError);
    };
  }, [onPlay, onCanplay, onError, onPause]);

  useLayoutEffect(() => {
    try {
      initAnimation(audio);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div id="main">
      <canvas id="canv" width="100%" height="100%"></canvas>
      <div id="out"></div>
      <div className="app">
        {playing ? (
          <img className="pause" alt="Pause" src={PauseIcon} onClick={pause} />
        ) : (
          <img className="play" alt="Play" src={PlayIcon} onClick={play} />
        )}
        <div className="info">
          {error ? (
            <>
              No Live Stream <b>Today</b>
            </>
          ) : (
            <>
              Live Stream from <b>Earth</b>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

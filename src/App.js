import { useEffect, useState, useLayoutEffect, useCallback } from 'react';
import PlayIcon from './assets/play.svg';
import PauseIcon from './assets/pause.svg';
import { startAnimation } from './animation';
// import FullScreenIcon from './assets/fullscreen.svg';
// import NormalScreenIcon from './assets/normalscreen.svg';
// import FavoriteIcon from './assets/favorite.svg';

const audio = new Audio();

function App() {
  const [playing, setPlaying] = useState(false);
  const [canplay, setCanplay] = useState(false);

  useEffect(() => {
    audio.crossOrigin = 'anonymous';
    audio.src = process.env.REACT_APP_API;
    audio.load();
  }, []);

  const play = useCallback(() => {
    if (canplay && !playing) {
      console.log('audio.play');
      audio.play();
      setPlaying(true);
    }
  }, [canplay, playing]);

  const pause = useCallback(() => {
    if (playing) {
      console.log('audio.pause');
      audio.pause();
      setPlaying(false);
    }
  }, [playing]);

  const onCanplay = useCallback(() => {
    if (!canplay) {
      console.log('onCanplay');
      setCanplay(true);
    }
  }, [canplay]);

  const onPlay = useCallback(() => play(), [play]);
  // const onEnded = useCallback(() => play(), [play]);
  const onPause = useCallback(() => pause(), [pause]);

  useEffect(() => {
    audio.addEventListener('play', onPlay);
    // audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('canplay', onCanplay);
    return () => {
      audio.removeEventListener('play', onPlay);
      // audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('canplay', onCanplay);
    };
  }, [onPlay, onCanplay, onPause]);

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
          <img className="pause" alt="Pause" src={PauseIcon} onClick={pause} />
        ) : (
          <img className="play" alt="Play" src={PlayIcon} onClick={play} />
        )}
        <div className="info">
          Live Stream from <b>Earth</b>
        </div>
      </div>
    </div>
  );
}

export default App;

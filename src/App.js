import { useEffect, useState, useCallback } from 'react';
import PlayIcon from './assets/play.svg';
import StopIcon from './assets/stop.svg';
import LogoImg from './assets/logo.png';
import { initAnimation } from './animation-4';

const audio = new Audio();
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const src = audioContext.createMediaElementSource(audio);
const analyser = audioContext.createAnalyser();
src.connect(analyser);
analyser.connect(audioContext.destination);

function App() {
  const [playing, setPlaying] = useState(false);
  const [canplay, setCanplay] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState({
    title: '',
    message: '...',
  });

  useEffect(() => {
    audio.crossOrigin = 'anonymous';
    audio.src = process.env.REACT_APP_API;
    audio.autoplay = false;
    audio.load();
    try {
      initAnimation(analyser);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetch('/info.json?r='.concat(Math.random()))
      .then((response) => response.json())
      .then((response) => setInfo(response));
  }, []);

  const play = useCallback(() => {
    if (canplay && !playing) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
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

  return (
    <div id="main">
      <div id="out"></div>
      <div className="app">
        {!canplay && !error ? (
          <div className="loading" />
        ) : playing ? (
          <img className="pause" alt="Pause" src={StopIcon} onClick={pause} />
        ) : (
          <img className="play" alt="Play" src={PlayIcon} onClick={play} />
        )}
        <div className="info" dangerouslySetInnerHTML={{ __html: info.message }} />
      </div>
      <img class="logo" alt="Joinrave.com" width="20" src={LogoImg} />
    </div>
  );
}

export default App;

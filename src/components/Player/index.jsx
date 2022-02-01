import { useEffect, useState, useCallback } from 'react';
import PlayIcon from '../../assets/play.svg';
import StopIcon from '../../assets/stop.svg';
import { initAnimation } from './animation-4';
import './style.css';

const audio = new Audio();
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioContext.createAnalyser();
audio.crossOrigin = 'anonymous';
audio.autoplay = false;
audio.volume = 1;

function Player() {
  // const [canplay, setCanplay] = useState(false);
  // const [error, setError] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({
    title: '',
    message: '...',
  });

  useEffect(() => {
    try {
      const src = audioContext.createMediaElementSource(audio);
      src.connect(analyser);
      analyser.connect(audioContext.destination);
      initAnimation(analyser);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetch(`/info.json?r=${Math.random()}`)
      .then((response) => response.json())
      .then((response) => setInfo(response));
  }, []);

  const play = useCallback(() => {
    if (!playing && !loading) {
      setLoading(true);
      audio.src = process.env.REACT_APP_API;
      audio.load();
    }
  }, [playing, loading]);

  const pause = useCallback(() => {
    if (playing) {
      setPlaying(false);
      audio.pause();
    }
  }, [playing]);

  const onCanplay = useCallback(() => {
    if (!playing) {
      setPlaying(true);
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      audio.play();
    }
  }, [playing]);

  const onPlay = useCallback(() => {
    play();
    setLoading(false);
  }, [play]);

  const onEnded = useCallback(() => {
    pause();
  }, [pause]);

  const onPause = useCallback(() => {
    pause();
  }, [pause]);

  const onError = useCallback(() => {
    pause();
    setLoading(false);
  }, [pause]);

  useEffect(() => {
    audio.addEventListener('play', onPlay);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('stalled', onPause);
    audio.addEventListener('canplay', onCanplay);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('stalled', onPause);
      audio.removeEventListener('canplay', onCanplay);
      audio.removeEventListener('error', onError);
    };
  }, [onPlay, onCanplay, onError, onPause, onEnded]);

  return (
    <div className="player">
      <div class="player-canvas-wrapper" id="cnv-out"></div>
      <div className="player-wrapper">
        {loading ? (
          <div className="loading" />
        ) : playing ? (
          <img className="player-pause-button" alt="Pause" src={StopIcon} onClick={pause} />
        ) : (
          <img className="player-play-button" alt="Play" src={PlayIcon} onClick={play} />
        )}
        <div className="player-info" dangerouslySetInnerHTML={{ __html: info.message }} />
      </div>
    </div>
  );
}

export default Player;

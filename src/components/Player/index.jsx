import { useEffect, useState, useCallback, useMemo } from 'react';
import PlayIcon from '../../icons/Play';
import StopIcon from '../../icons/Stop';
import './style.scss';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

const audio = new Audio();

function Player() {
  const location = useLocation();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [error, setError] = useState(false);

  const getInfo = useCallback(() => {
    fetch(process.env.REACT_APP_STATUS_API)
      .then((res) => res.json())
      .then((json) => {
        setInfo(json);
        setError(false);
      })
      .catch(() => setError(true));
  }, []);

  useEffect(() => {
    getInfo();
    const interval = setInterval(() => getInfo(), 120000);
    return () => clearInterval(interval);
  }, [getInfo]);

  const title = useMemo(() => {
    const _title = info?.icestats?.source?.title;

    if (_title) {
      return _title.replace(/_/g, ' ');
    }

    return '---';
  }, [info?.icestats?.source?.title]);

  const play = useCallback(() => {
    if (!playing && !loading) {
      setError(false);
      setLoading(true);
      audio.src = process.env.REACT_APP_STREAM + '?rnd=' + Math.random();
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
      // if (audioContext.state === 'suspended') {
      //   audioContext.resume();
      // }
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
    setError(true);
    setLoading(false);
    pause();
  }, [pause]);

  useEffect(() => {
    audio.addEventListener('play', onPlay);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('pause', onPause);
    // audio.addEventListener('stalled', onPause);
    audio.addEventListener('canplay', onCanplay);
    audio.addEventListener('error', onError);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('pause', onPause);
      // audio.removeEventListener('stalled', onPause);
      audio.removeEventListener('canplay', onCanplay);
      audio.removeEventListener('error', onError);
    };
  }, [onPlay, onCanplay, onError, onPause, onEnded]);

  return (
    <div
      className={classnames([
        'player',
        { 'player-small': location.pathname !== '/' },
      ])}
    >
      <div className="player-wrapper">
        {loading ? (
          <div className="player-loading" />
        ) : playing ? (
          <div className="player-pause-button" alt="Pause" onClick={pause}>
            <StopIcon />
          </div>
        ) : (
          <div className="player-pause-button" alt="Play" onClick={play}>
            <PlayIcon />
          </div>
        )}
      </div>
      <div className="track-info">
        {!error ? `Playing: ${title}` : 'Offline'}
      </div>
    </div>
  );
}

export default Player;

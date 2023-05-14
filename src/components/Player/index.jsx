import { useEffect, useState, useCallback, useMemo } from 'react';
import PlayIcon from '../../assets/play.svg';
import StopIcon from '../../assets/stop.svg';
import './style.scss';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

const audio = new Audio();

function Player() {
  const location = useLocation();
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(null);
  const [, setError] = useState(false);

  useEffect(() => {
    fetch('https://radio.joinrave.com/status-json.xsl')
      .then((res) => res.json())
      .then((json) => setInfo(json))
      .catch(() => setInfo(null));
  }, []);

  const title = useMemo(() => {
    const _title = info?.icestats?.source?.title;

    if (_title) {
      return _title.replace(/_/g, ' ');
    }

    return null;
  }, [info?.icestats?.source?.title]);

  const play = useCallback(() => {
    if (!playing && !loading) {
      setLoading(true);
      audio.src = process.env.REACT_APP_API;
      audio.load();
    }
  }, [playing, loading]);

  const pause = useCallback(() => {
    setError(false);
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

  // const recheck = useCallback(() => {
  //   setTimeout(() => {
  //     fetch(process.env.REACT_APP_API).then((response) => {
  //       if (response.ok) {
  //         setError(false);
  //         audio.src = process.env.REACT_APP_API;
  //         audio.load();
  //         audio.play();
  //       } else {
  //         recheck();
  //       }
  //     });
  //   }, 300000);
  // }, []);

  const onError = useCallback(() => {
    // if (!error) {
    setError(true);
    // audio.src = "https://cast.magicstreams.gr:9111/stream/1/";
    // audio.load();
    // recheck();
    // } else {
    pause();
    setLoading(false);
    // }
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
          <img
            className="player-pause-button"
            alt="Pause"
            src={StopIcon}
            onClick={pause}
          />
        ) : (
          <img
            className="player-play-button"
            alt="Play"
            src={PlayIcon}
            onClick={play}
          />
        )}
      </div>
      <div className="track-info">
        {title ? `Playing: ${title}` : 'Offline :('}
      </div>
    </div>
  );
}

export default Player;

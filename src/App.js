import { useState, useEffect } from 'react';
import PlayIcon from './play.svg';
import PauseIcon from './pause.svg';

const audio = new Audio();

function App() {
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canPlay, setCanPlay] = useState(false);

  const getNextTrack = () => {
    return fetch('http://localhost:9003/current')
      .then((response) => response.json())
      .then((response) => {
        setTrack(response);
        audio.src = response.metadata.file;
      });
  };

  const play = () => {
    setLoading(true);
    setPlaying(true);
    getNextTrack().catch(() => {
      setLoading(false);
      setPlaying(false);
    });
  };

  const stop = () => {
    audio.pause();
    setPlaying(false);
  };

  const onPlaying = () => {
    setLoading(false);
    setPlaying(true);
  };

  const onCanplay = () => {
    setCanPlay(true);
  };

  useEffect(() => {
    if (canPlay && track) {
      audio.currentTime = track.time;
      audio.volume = 1;
      audio.play();
    }
  }, [canPlay, track]);

  useEffect(() => {
    audio.addEventListener('ended', play);
    audio.addEventListener('canplay', onCanplay);
    audio.addEventListener('playing', onPlaying);
    return () => {
      audio.removeEventListener('ended', play);
      audio.removeEventListener('canplay', onCanplay);
      audio.removeEventListener('playing', onPlaying);
    };
  }, []);

  return (
    <div className="app">
      {playing ? <img src={PauseIcon} onClick={stop} /> : <img src={PlayIcon} onClick={play} />}
      <div className="info">
        {loading && 'Loading...'}
        {!loading && track && (
          <>
            {track?.metadata?.title} by <b>{track?.metadata?.artist}</b>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

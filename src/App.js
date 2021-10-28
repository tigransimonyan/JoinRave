import { useEffect, useState } from 'react';
import PlayIcon from './play.svg';
import PauseIcon from './pause.svg';

const audio = new Audio();

function App() {
  const [track, setTrack] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [canplay, setCanplay] = useState(false);

  const getNextTrack = () => {
    return fetch('https://api.joinrave.com/current')
      .then((response) => response.json())
      .then((response) => {
        setTrack(response);
        audio.src = response.metadata.file;
        audio.load();
      });
  };

  const play = () => {
    setLoading(true);
    getNextTrack().catch(() => {
      setLoading(false);
    });
  };

  const stop = () => {
    audio.pause();
    setPlaying(false);
    setCanplay(false);
  };

  const onCanplay = () => {
    if (!canplay) {
      setCanplay(true);
    }
  };

  useEffect(() => {
    if (canplay && track) {
      audio.currentTime = track.time;
      audio.play();
      setPlaying(true);
      setLoading(false);
    }
  }, [canplay, track]);

  useEffect(() => {
    audio.addEventListener('ended', play);
    audio.addEventListener('canplay', onCanplay);
    return () => {
      audio.removeEventListener('ended', play);
      audio.removeEventListener('canplay', onCanplay);
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

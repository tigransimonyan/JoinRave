import { useEffect, useState } from 'react';
import './style.scss';
import FractalImg from '../../assets/modes/fractal.png';
import WormHoleImg from '../../assets/modes/worm-hole.png';
import ClassicImg from '../../assets/modes/classic.jpg';

const Home = () => {
  useEffect(() => {}, []);
  const [mode, setMode] = useState(null);
  return (
    <div className="mode-selector">
      <h4 className="mode-selector-title">Select Rave Mode</h4>
      <div className="mode-selector-modes">
        {/* <div className="mode-selector-mode" onClick={() => setMode('classic')}>
          <img className="mode-selector-mode-image" alt="Classic Mode" src={ClassicImg} />
          <div className="mode-selector-mode-name">Classic</div>
        </div> */}
        <div className="mode-selector-mode" onClick={() => setMode('orbits')}>
          <img
            className="mode-selector-mode-image"
            alt="Barry Martin's Hopalong Orbits"
            src={FractalImg}
          />
          <div className="mode-selector-mode-name">Barry Martin's Hopalong Orbits</div>
        </div>
        <div className="mode-selector-mode" onClick={() => setMode('wormhole')}>
          <img
            className="mode-selector-mode-image"
            alt="devildrey33's WormHole"
            src={WormHoleImg}
          />
          <div className="mode-selector-mode-name">devildrey33's WormHole</div>
        </div>
      </div>
      {mode === 'orbits' && (
        <iframe
          className="mode-selector-iframe"
          src="https://tigransimonyan.github.io/hopalong-vr/"
        ></iframe>
      )}
      {mode === 'wormhole' && (
        <iframe
          className="mode-selector-iframe"
          src="https://tigransimonyan.github.io/wormhole?r=2"
        ></iframe>
      )}
    </div>
  );
};

export default Home;

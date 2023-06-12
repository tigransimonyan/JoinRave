import { useState } from 'react';
import './style.scss';
import FractalImg from '../../assets/modes/fractal.png';
import WormHoleImg from '../../assets/modes/worm-hole.png';
import Modal from '../../components/Modal';
import Footer from '../../components/Footer';

const Home = () => {
  const [mode, setMode] = useState('classic');
  const [showModal, setShowModal] = useState(false);

  const changeMode = (name) => {
    setMode(name);
    setShowModal(false);
  };

  const image = `/artworks/randomgevisual-1.jpg`;

  return (
    <>
      <Modal
        title="Select Rave Mode"
        visible={showModal}
        onClose={setShowModal}
      >
        <div className="mode-selector-modes">
          <div
            className="mode-selector-mode"
            onClick={() => changeMode('classic')}
          >
            <img
              className="mode-selector-mode-image"
              alt="Classic Mode"
              src={image}
            />
            <div className="mode-selector-mode-name">
              Gif by{' '}
              <a
                onClick={(e) => e.stopPropagation()}
                href="https://giphy.com/gifs/trippy-psychedelic-universe-OFmcFc8voTzpRkCKKF"
                rel="noreferrer"
                target="_blank"
              >
                @dualvoidanima
              </a>
            </div>
          </div>
          <div
            className="mode-selector-mode"
            onClick={() => changeMode('orbits')}
          >
            <img
              className="mode-selector-mode-image"
              alt="Barry Martin's Hopalong Orbits"
              src={FractalImg}
            />
            <div className="mode-selector-mode-name">
              Barry Martin's Hopalong Orbits by{' '}
              <a
                onClick={(e) => e.stopPropagation()}
                href="https://github.com/dghost"
                target="_blank"
                rel="noreferrer"
              >
                @dghost
              </a>
            </div>
          </div>
          <div
            className="mode-selector-mode"
            onClick={() => changeMode('wormhole')}
          >
            <img
              className="mode-selector-mode-image"
              alt="devildrey33's WormHole"
              src={WormHoleImg}
            />
            <div className="mode-selector-mode-name">
              WormHole by{' '}
              <a
                onClick={(e) => e.stopPropagation()}
                href="https://github.com/devildrey33"
                target="_blank"
                rel="noreferrer"
              >
                @devildrey33
              </a>
            </div>
          </div>
        </div>
      </Modal>
      {mode === 'orbits' && (
        <iframe
          title="Hopalong VR"
          className="mode-background mode-background-iframe"
          src="https://tigransimonyan.github.io/hopalong-vr?r=3"
        />
      )}
      {mode === 'wormhole' && (
        <iframe
          title="WormHole"
          className="mode-background mode-background-iframe"
          src="https://tigransimonyan.github.io/wormhole?r=3"
        />
      )}
      {mode === 'classic' && (
        <div
          className="mode-background mode-background-image"
          style={{ backgroundImage: `url(${image})` }}
        />
      )}
      <Footer />
    </>
  );
};

export default Home;

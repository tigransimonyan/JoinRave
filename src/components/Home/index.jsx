import { useEffect, useState } from "react";
import "./style.scss";
import FractalImg from "../../assets/modes/fractal.png";
import WormHoleImg from "../../assets/modes/worm-hole.png";
import GiphyGif from "../../assets/ss.gif";
import TvSvg from "../../assets/tv.svg";

const Home = () => {
  useEffect(() => {}, []);
  const [mode, setMode] = useState("classic");
  const [showSelect, setShowSelect] = useState(null);

  const chnageMode = (name) => {
    setMode(name);
    setShowSelect(false);
  };

  return (
    <>
      <img
        className="mode-modal-button"
        onClick={() => setShowSelect(!showSelect)}
        src={TvSvg}
      />
      {showSelect && (
        <div className="mode-selector">
          <h4 className="mode-selector-title">Select Rave Mode</h4>
          <div className="mode-selector-modes">
            <div
              className="mode-selector-mode"
              onClick={() => chnageMode("classic")}
            >
              <img
                className="mode-selector-mode-image"
                alt="Classic Mode"
                src={GiphyGif}
              />
              <div className="mode-selector-mode-name">
                Gif by{" "}
                <a
                  href="https://giphy.com/gifs/trippy-psychedelic-universe-OFmcFc8voTzpRkCKKF"
                  target="_blank"
                >
                  @dualvoidanima
                </a>
              </div>
            </div>
            <div
              className="mode-selector-mode"
              onClick={() => chnageMode("orbits")}
            >
              <img
                className="mode-selector-mode-image"
                alt="Barry Martin's Hopalong Orbits"
                src={FractalImg}
              />
              <div className="mode-selector-mode-name">
                Barry Martin's Hopalong Orbits by{" "}
                <a href="https://github.com/dghost" target="_blank">
                  @dghost
                </a>
              </div>
            </div>
            <div
              className="mode-selector-mode"
              onClick={() => chnageMode("wormhole")}
            >
              <img
                className="mode-selector-mode-image"
                alt="devildrey33's WormHole"
                src={WormHoleImg}
              />
              <div className="mode-selector-mode-name">
                WormHole by{" "}
                <a href="https://github.com/devildrey33" target="_blank">
                  @devildrey33
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      {mode === "orbits" && (
        <iframe
          className="mode-selector-iframe"
          src="https://tigransimonyan.github.io/hopalong-vr/"
        ></iframe>
      )}
      {mode === "wormhole" && (
        <iframe
          className="mode-selector-iframe"
          src="https://tigransimonyan.github.io/wormhole?r=2"
        ></iframe>
      )}
      {mode === "classic" && (
        <div
          className="mode-selector-bg-image"
          style={{
            backgroundImage: `url(${GiphyGif})`,
          }}
        />
      )}
    </>
  );
};

export default Home;

import LogoImg from './assets/logo-white.png';
import Player from './components/Player';
import Home from './components/Home';

function App() {
  return (
    <main className="main">
      <Player />
      <Home />
      <img className="logo" alt="Joinrave.com" width="120" src={LogoImg} />
    </main>
  );
}

export default App;

import LogoImg from './assets/logo-white.png';
import Player from './components/Player';

function App() {
  return (
    <main class="main">
      <Player />
      <img className="logo" alt="Joinrave.com" width="120" src={LogoImg} />
    </main>
  );
}

export default App;

import LogoImg from './assets/logo.png';
import Player from './components/Player';

function App() {
  return (
    <main class="main">
      <Player />
      <img className="logo" alt="Joinrave.com" width="20" src={LogoImg} />
    </main>
  );
}

export default App;

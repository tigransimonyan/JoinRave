import Player from './components/Player';
import Home from './components/Home';
import Logo from './components/Logo';
import Chat from './components/Chat';
import Events from './components/Events';

function App() {
  return (
    <main className="main">
      <Logo />
      <Player />
      <Home />
      <Chat />
      <Events />
    </main>
  );
}

export default App;

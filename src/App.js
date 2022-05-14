import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import Player from './components/Player';
import Header from './components/Header';

import Contacts from './pages/Contacts';
import SubmitMusic from './pages/SubmitMusic';
import Events from './pages/Events';
import Home from './pages/Home';
import Chat from './pages/Chat';

const theme = extendTheme({
  fonts: {
    body: "'Montserrat', sans-serif",
    heading: "'Montserrat', sans-serif",
    mono: 'Menlo, monospace',
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <main className="main">
        <Router>
          <Header />
          <div className="pages">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/events" element={<Events />} />
              <Route exact path="/chat" element={<Chat />} />
              <Route exact path="/contacts" element={<Contacts />} />
              <Route exact path="/submit-music" element={<SubmitMusic />} />
            </Routes>
          </div>
          <Player />
        </Router>
      </main>
    </ChakraProvider>
  );
}

export default App;

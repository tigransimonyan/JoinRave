import './style.scss';
import Page from '../../components/Page';

function Chat() {
  return (
    <Page>
      <div className="chat">
        <iframe
          title="IRC Chat"
          className="chat-iframe"
          src="https://irc.def.am/?channel=#joinrave"
          frameborder="0"
        ></iframe>
      </div>
    </Page>
  );
}

export default Chat;

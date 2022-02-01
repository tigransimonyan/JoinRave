import './style.css';

function Chat() {
  return (
    <div className="chat">
      <h4 className="chat-title">Chat with the live DJ and listeners!</h4>
      <iframe
        className="chat-iframe"
        src="https://irc.def.am/?channel=#joinrave"
        frameborder="0"
      ></iframe>
    </div>
  );
}

export default Chat;

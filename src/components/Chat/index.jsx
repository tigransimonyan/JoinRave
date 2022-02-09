import { useState } from 'react';
import './style.scss';
import ChatSvg from '../../assets/chat.svg';
import Modal from '../Modal';

function Chat() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <img className="chat-open-button" onClick={() => setShowModal(true)} src={ChatSvg} />
      <Modal visible={showModal} onClose={setShowModal}>
        <div className="chat">
          <iframe
            className="chat-iframe"
            src="https://irc.def.am/?channel=#joinrave"
            frameborder="0"
          ></iframe>
        </div>
      </Modal>
    </>
  );
}

export default Chat;

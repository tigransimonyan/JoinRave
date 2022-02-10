import { useState } from 'react';
import './style.scss';
import ChatSvg from '../../assets/chat.svg';
import Modal from '../Modal';
import IconText from '../IconText';

function Chat() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <IconText icon={ChatSvg} onClick={() => setShowModal(true)} name="Chat" top={96} />
      <Modal visible={showModal} onClose={setShowModal}>
        <div className="chat">
          <iframe
            title="IRC Chat"
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

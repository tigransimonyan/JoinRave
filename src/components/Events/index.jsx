import { useState } from 'react';
import './style.scss';
import EventsIcon from '../../assets/events.1.svg';
import Modal from '../Modal';
import IconText from '../IconText';

const Events = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <IconText icon={EventsIcon} onClick={() => setShowModal(true)} name="Events" top={168} />
      <Modal title="Upcoming Events" visible={showModal} onClose={setShowModal}>
        <div className="events events-empty">
          <p>
            Join our official Telegram channel to get <br />
            notified about live streams:{' '}
            <a href="https://t.me/joinrave" target="_blank" rel="noreferrer">
              @joinrave
            </a>
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Events;

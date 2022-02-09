import './style.scss';
import CloseSvg from '../../assets/close.svg';

const Modal = (props) => {
  return (
    <div className={'modal '.concat(props.visible ? 'visible' : 'hidden')}>
      <img
        alt="close"
        className="modal-close-button"
        onClick={() => props.onClose(false)}
        src={CloseSvg}
      />
      {props.children}
    </div>
  );
};

export default Modal;

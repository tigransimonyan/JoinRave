import './style.scss';

const IconText = ({ icon, name, onClick, top }) => {
  return (
    <div className="action" onClick={onClick} style={{ top }}>
      <img className="action-icon" src={icon} alt={name} />
      <div className="action-name">{name}</div>
    </div>
  );
};

export default IconText;

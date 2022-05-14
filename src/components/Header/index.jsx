import './style.scss';
import Logo from '../Logo';
import Menu from '../Menu';
import { useLocation } from 'react-router-dom';
import classnames from 'classnames';

const Header = () => {
  const location = useLocation();

  return (
    <header className={classnames({ transparent: location.pathname === '/' })}>
      <Logo />
      <Menu />
    </header>
  );
};

export default Header;

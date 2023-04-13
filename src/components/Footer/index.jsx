import { Text, Link } from '@chakra-ui/react';
import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <Text color="#fff" fontSize="13px" maxW="310px" pl="12px">
        {'Join our '}
        <Link
          href="https://t.me/joinrave"
          textDecoration="underline"
          color="#ede716"
          rel="noreferrer"
          target="_blank"
        >
          Telegram
        </Link>
        {' and '}
        <Link
          href="https://soundcloud.com/joinrave"
          textDecoration="underline"
          color="#ede716"
          rel="noreferrer"
          target="_blank"
        >
          SoundCloud
        </Link>
        {' channels to get notified about live streams.'}
      </Text>
    </div>
  );
}

export default Footer;

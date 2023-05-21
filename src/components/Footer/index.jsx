import { Text, Link, SimpleGrid } from '@chakra-ui/react';
import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <SimpleGrid
        opacity={0.6}
        columns={[1, 1, 2]}
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text color="#fff" fontSize="13px" maxW="330px" px="20px">
          {'Join our '}
          <Link
            href="https://t.me/joinrave"
            textDecoration="underline"
            color="#ffffff"
            fontWeight={600}
            rel="noreferrer"
            target="_blank"
          >
            Telegram
          </Link>
          {' and '}
          <Link
            href="https://soundcloud.com/joinrave"
            textDecoration="underline"
            color="#ffffff"
            fontWeight={600}
            rel="noreferrer"
            target="_blank"
          >
            SoundCloud
          </Link>
          {' channels to get notified about live streams.'}
        </Text>
        <Text
          color="#fff"
          fontSize="13px"
          px="20px"
          pt="5px"
          textAlign={['left', 'left', 'right']}
        >
          Artwork by{' '}
          <Link
            href="https://giphy.com/dualvoidanima"
            textDecoration="underline"
            color="#ffffff"
            rel="noreferrer"
            target="_blank"
            fontWeight={600}
          >
            @dualvoidanima
          </Link>
        </Text>
      </SimpleGrid>
    </div>
  );
}

export default Footer;

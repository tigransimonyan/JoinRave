import { Text, Link, SimpleGrid } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSoundcloud, faTelegram } from '@fortawesome/free-brands-svg-icons';
import './style.scss';

function Footer() {
  return (
    <div className="footer">
      <SimpleGrid
        opacity={0.6}
        columns={[2, 2, 2]}
        px="20px"
        justifyContent="space-between"
        alignItems="flex-end"
      >
        <Text flex={1} color="#fff" fontSize="13px" gap="15px" display="flex">
          <Link
            href="https://t.me/joinrave"
            color="#ffffff"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon size="xl" icon={faTelegram} />
          </Link>
          <Link
            href="https://soundcloud.com/joinrave"
            color="#ffffff"
            rel="noreferrer"
            target="_blank"
          >
            <FontAwesomeIcon size="xl" icon={faSoundcloud} />
          </Link>
        </Text>
        <Text
          flex={2}
          color="#fff"
          fontSize="13px"
          pt="5px"
          textAlign={['right']}
        >
          Artwork by{' '}
          <Link
            href="https://helveticablanc.com/"
            textDecoration="underline"
            color="#ffffff"
            rel="noreferrer"
            target="_blank"
            fontWeight={600}
          >
            @helveticablanc
          </Link>
        </Text>
      </SimpleGrid>
    </div>
  );
}

export default Footer;

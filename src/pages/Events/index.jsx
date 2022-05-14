import { SimpleGrid, Heading, Text, Box, Link } from '@chakra-ui/react';
import Page from '../../components/Page';

const Events = () => {
  return (
    <Page>
      <Heading as="h1" fontSize="24px" mt="40px" color="#333333">
        Upcoming Events
      </Heading>
      <Text as="p" mt="4px" color="#999999" fontSize="16px">
        {'Join our official '}
        <Link href="https://t.me/joinrave" target="_blank" rel="noreferrer" color="#b0aa00">
          Telegram
        </Link>
        {' channel to get notified about live streams.'}
      </Text>
      <SimpleGrid mt="24px" columns={[1, 2, 3, 4]} spacing={[3, 3, 5, 8]}>
        <Box>
          <img src="/images/events/vahgog-may-15.png" alt="Vahgog" />
        </Box>
      </SimpleGrid>
      <Heading as="h2" fontSize="24px" mt="40px" color="#333333">
        Past Events
      </Heading>
      <Text as="p" mt="4px" color="#999999" fontSize="16px">
        {'Follow us on '}
        <Link
          href="https://soundcloud.com/joinrave"
          target="_blank"
          rel="noreferrer"
          color="#b0aa00"
        >
          SoundCloud
        </Link>
      </Text>
      <SimpleGrid mt="24px" columns={[1]} spacing={[3, 3, 5]}>
        <Box>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1245481225&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
          ></iframe>
        </Box>
        <Box>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameborder="no"
            allow="autoplay"
            src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1240355620&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false"
          ></iframe>
        </Box>
      </SimpleGrid>
    </Page>
  );
};

export default Events;

import { SimpleGrid, Heading, Text, Link } from "@chakra-ui/react";
import Page from "../../components/Page";

const Events = () => {
  return (
    <Page>
      <Heading as="h1" fontSize="24px" mt="40px" color="#333333">
        Upcoming Events
      </Heading>
      <Text as="p" mt="4px" color="#999999" fontSize="16px">
        {"Join our official "}
        <Link
          href="https://t.me/joinrave"
          target="_blank"
          rel="noreferrer"
          color="#b0aa00"
        >
          Telegram
        </Link>
        {" channel to get notified about live streams."}
      </Text>
      <SimpleGrid
        mt="24px"
        columns={[1, 2, 3, 4]}
        spacing={[3, 3, 5, 8]}
      ></SimpleGrid>
      <Text py="60px" textAlign="center">
        Nothing yet.
      </Text>
      <Heading as="h2" fontSize="24px" mt="40px" color="#333333">
        Past Events
      </Heading>
      <Text as="p" mt="4px" color="#999999" fontSize="16px">
        {"Follow us on "}
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
        <iframe
          title="SoundCloud"
          width="100%"
          height="450"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1440103501%3Fsecret_token%3Ds-HwYjtMVwQqg&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false"
        />
      </SimpleGrid>
    </Page>
  );
};

export default Events;

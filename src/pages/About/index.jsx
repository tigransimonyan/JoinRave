import './style.scss';
import Page from '../../components/Page';
import { Text, Heading } from '@chakra-ui/react';

function About() {
  return (
    <Page>
      <div className="about-us">
        <Heading as="h1" fontSize="24px" mt="40px" mb="10" color="#333333">
          About Us
        </Heading>
        <Text>
          Welcome to Joinrave.com, your go-to destination for 24/7 electronic
          music! Our radio station is dedicated to providing the best in
          electronic music, featuring a mix of ambient tracks and live sets by
          talented DJs.
          <br />
          <br />
          At Joinrave.com, we understand the importance of creating a sense of
          community within the electronic music scene. That's why our radio
          station is not only a place to listen to great music, but also a
          platform for connecting with like-minded individuals. While we
          primarily cater to the Armenian ravers community, we welcome music
          lovers from all over the world to tune in and join the party.
          <br />
          <br />
          We are proud to use open source, self-hosted software for streaming,
          and we do not rely on corporate tools. This allows us to provide a
          unique listening experience that is free from commercial interests and
          corporate influence.
          <br />
          <br />
          Joinrave.com is committed to providing the ultimate listening
          experience for our audience. Our station is available 24/7, so you can
          tune in at any time and enjoy the best in electronic music. We also
          have a user-friendly website that makes it easy to access our radio
          station from anywhere in the world.
          <br />
          <br />
          So, whether you're a seasoned raver or a newcomer to the electronic
          music scene, Joinrave.com has something for you. Tune in and join the
          party today!
        </Text>
      </div>
    </Page>
  );
}

export default About;

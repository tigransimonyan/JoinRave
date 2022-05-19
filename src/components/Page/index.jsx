import { Container, Box } from '@chakra-ui/react';

const Page = (props) => {
  return (
    <Container maxW="5xl">
      <Box pt="55px" pb="100px" px="30px" backgroundColor="#fff" minH="100vh">
        {props.children}
      </Box>
    </Container>
  );
};

export default Page;

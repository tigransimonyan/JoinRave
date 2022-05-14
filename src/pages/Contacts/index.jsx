import { VStack, FormControl, Heading, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';
import { useFormik } from 'formik';

import Page from '../../components/Page';

function ContactUs() {
  const formik = useFormik({
    initialValues: {
      name: '',
      message: '',
      email: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Page>
      <div className="about">
        <Heading as="h1" fontSize="24px" mt="40px" color="#333333">
          Contact Us
        </Heading>
        <form onSubmit={formik.handleSubmit}>
          <VStack spacing="24px" mt="24px" alignItems="flex-start">
            <FormControl isRequired>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                id="name"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                id="email"
                type="email"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                type="text"
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
              />
            </FormControl>
            <Button type="submit" variant="solid" colorScheme="messenger">
              Submit
            </Button>
          </VStack>
        </form>
      </div>
    </Page>
  );
}

export default ContactUs;

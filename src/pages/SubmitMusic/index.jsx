import {
  VStack,
  FormControl,
  Heading,
  FormLabel,
  Input,
  Checkbox,
  Textarea,
  Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';

import Page from '../../components/Page';

function SubmitMusic() {
  const formik = useFormik({
    initialValues: {
      name: '',
      url: '',
      message: '',
      email: '',
      terms: false,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <Page>
      <div className="about">
        <Heading as="h1" fontSize="24px" mt="40px" color="#333333">
          Submit your Music or Mix Here
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
              <FormLabel htmlFor="url">Mix Download Link (Soundcloud or WeTransfer)</FormLabel>
              <Input
                id="url"
                type="url"
                name="url"
                onChange={formik.handleChange}
                value={formik.values.url}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="message">Message</FormLabel>
              <Textarea
                id="message"
                type="text"
                name="message"
                onChange={formik.handleChange}
                value={formik.values.message}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel htmlFor="terms">Terms and conditions</FormLabel>
              <Checkbox
                id="terms"
                name="terms"
                defaultChecked
                onChange={formik.handleChange}
                isChecked={formik.values.terms}
              >
                I allow Joinrave.com to publish this exclusive mix I prepared for them. I understand
                that once my mix gets approved, I can not upload it, unschedule it or delete it from
                their podcast and online radio.
              </Checkbox>
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

export default SubmitMusic;

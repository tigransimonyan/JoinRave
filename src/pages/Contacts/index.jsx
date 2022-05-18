import {
  VStack,
  FormControl,
  Heading,
  FormLabel,
  Input,
  Textarea,
  Text,
  Button,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";

import Page from "../../components/Page";

function ContactUs() {
  const toast = useToast();
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      message: "",
      email: "",
    },
    onSubmit: (values) => {
      setLoading(true);
      axios
        .post("https://mailer.def.am", values)
        .then(() => {
          formik.resetForm();
          setSubmited(true);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          toast({
            title: "Something went wrong!",
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    },
  });

  return (
    <Page>
      <div className="about">
        <Heading as="h1" fontSize="24px" mt="40px" color="#333333">
          Contact Us
        </Heading>
        <Text as="p" mt="4px" color="#999999" fontSize="16px">
          Feel free to contact us
        </Text>
        {submited ? (
          <Alert
            status="success"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            mt="24px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Application submitted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              Thanks for submitting your application. Our team will get back to
              you soon.
            </AlertDescription>
          </Alert>
        ) : (
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
              <Button
                loading={loading}
                type="submit"
                variant="solid"
                colorScheme="yellow"
              >
                Submit
              </Button>
            </VStack>
          </form>
        )}
      </div>
    </Page>
  );
}

export default ContactUs;

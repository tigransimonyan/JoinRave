import {
  VStack,
  FormControl,
  Heading,
  FormLabel,
  Input,
  Checkbox,
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

function SubmitMusic() {
  const toast = useToast();
  const [submited, setSubmited] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      url: "",
      message: "",
      email: "",
      terms: false,
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
          Submit Your Music or Mix Here
        </Heading>
        <Text as="p" mt="4px" color="#999999" fontSize="16px">
          We are always looking for creative and reliable DJs!
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
                <FormLabel htmlFor="name">Your Name</FormLabel>
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
                <FormLabel htmlFor="url">
                  Mix Download Link (Soundcloud or WeTransfer)
                </FormLabel>
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
                  <Text fontSize="14px" pl="8px">
                    I allow Joinrave.com to publish this exclusive mix I
                    prepared for them. I understand that once my mix gets
                    approved, I can not upload it, unschedule it or delete it
                    from their podcast and online radio.
                  </Text>
                </Checkbox>
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

export default SubmitMusic;

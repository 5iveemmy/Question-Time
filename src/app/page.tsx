"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import * as Yup from "yup";
import axios from "axios";
import { emailRegex } from "@qt/utils/regex";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getToken } from "@qt/utils/endpoints";

interface FormValue {
  email: string;
}

const FormSchema = Yup.object({
  email: Yup.string().matches(emailRegex, "Invalid email").required("Required"),
});

export default function Home(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitForm = async (values: FormValue) => {
    const { email } = values;

    try {
      setLoading(true);
      const response = await axios.post<{ token: string }>(getToken, {
        email,
      });
      const { token } = response.data;
      router.push("/dashboard");

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error occurred:", error);
    } finally {
      setLoading(false);
    }
  };

  const { values, handleSubmit, handleChange, errors, isValid, dirty } =
    useFormik<FormValue>({
      initialValues: {
        email: "",
      },
      validationSchema: FormSchema,
      onSubmit: (values) => {
        submitForm(values);
      },
    });

  return (
    <Flex justifyContent="center" alignItems="center" width="100%" h="100vh">
      <form onSubmit={handleSubmit}>
        <VStack gap="5">
          <FormControl isInvalid={!!errors.email} w="80">
            <FormLabel pb="2">Email address</FormLabel>
            <Input
              type="email"
              placeholder="Enter Your Email"
              onChange={handleChange}
              name="email"
              value={values.email}
            />
          </FormControl>

          <Button
            w="100%"
            isLoading={loading}
            type="submit"
            isDisabled={!isValid || !dirty}
            _hover={{
              opacity: (!isValid || !dirty) ?? "0.8",
            }}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Flex>
  );
}

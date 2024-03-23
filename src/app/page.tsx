"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";

export default function Home(): JSX.Element {
  const [email, setEmail] = useState<string>("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post<{ token: string }>(
        "https://qt.organogram.app/token",
        {
          email,
        }
      );
      const { token } = response.data;

      // Store the token for subsequent use
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" width="100%" h="100vh">
      <VStack>
        <FormControl id="email" w="18rem">
          <FormLabel pb="5">Email address</FormLabel>
          <Input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={handleEmailChange}
          />
        </FormControl>

        <Button w="100%" onClick={handleSubmit}>
          Login
        </Button>
      </VStack>
    </Flex>
  );
}

"use client";

import { useEffect, useState } from "react";
import { Container, Heading, Box } from "@chakra-ui/react";
import QuestionList from "@qt/components/questionList";
import { getQuestions } from "@qt/utils/endpoints";

const dummyQuestions = [
  {
    question: "What's your favorite color?",
    options: ["Red", "Blue", "Green"],
  },
  {
    question: "Which animal do you prefer?",
    options: ["Dog", "Cat", "Bird"],
  },
  {
    question: "What's your favorite food?",
    options: ["Pizza", "Sushi", "Burger"],
  },
];

const Questions = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  console.log(questions);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(getQuestions, {
          headers: {
            Token: token as string,
          },
        });
        const data = await response.json();
        setQuestions(Object.values(data));
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [token]);

  return (
    <Container maxW="container.lg">
      <Heading mt={4} mb={8} textAlign="center">
        Existing Questions
      </Heading>
      <Box>
        <QuestionList questions={dummyQuestions} />
      </Box>
    </Container>
  );
};

export default Questions;

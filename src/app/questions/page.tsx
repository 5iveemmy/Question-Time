"use client";

import { useEffect, useState } from "react";
import { Container, Heading, Box } from "@chakra-ui/react";
import QuestionList from "@qt/components/questionList";
import { questionsUrl } from "@qt/utils/endpoints";
import QuestionForm from "@qt/components/questionForm";
import { token } from "@qt/utils/helper";

const Questions = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(questionsUrl, {
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
  }, []);

  return (
    <Container maxW="container.lg" mx="5" py="5">
      <Heading my={4}>Questions</Heading>
      <Box>
        {questions.length === 0 ? (
          <QuestionForm />
        ) : (
          <QuestionList questions={questions} />
        )}
      </Box>
    </Container>
  );
};

export default Questions;

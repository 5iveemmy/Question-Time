"use client";

import { useEffect, useState } from "react";
import { Container, Heading, Box } from "@chakra-ui/react";
import QuestionList from "@qt/components/questionList";
import { questionsUrl } from "@qt/utils/endpoints";
import QuestionForm from "@qt/components/questionForm";
import { token } from "@qt/utils/helper";
import { Question } from "@qt/types";
import toast from "react-hot-toast";

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
        toast.error("Error fetching questions:", error as any);
      }
    };

    fetchQuestions();
  }, []);

  const handleAddQuestion = (question: Question) => {
    setQuestions((prevQuestions) => [...prevQuestions, question]);
  };

  return (
    <Container maxW="container.lg" mx="5" py="5">
      <Heading my={4}>Questions</Heading>
      <Box>
        <QuestionForm onSubmit={handleAddQuestion} />

        <QuestionList
          questions={questions}
          handleAddQuestion={handleAddQuestion}
        />
      </Box>
    </Container>
  );
};

export default Questions;

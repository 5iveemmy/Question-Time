"use client";

import {
  Box,
  Flex,
  HStack,
  ListItem,
  OrderedList,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Question } from "@qt/types";
import QuestionForm from "./questionForm";
import DeleteModal from "./deteleModal";

interface QuestionListProps {
  questions: Question[];
  handleAddQuestion: (question: Question) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({
  questions,
  handleAddQuestion,
}) => {
  const handleDelete = () => {
    handleAddQuestion;
  };

  return (
    <VStack spacing={4} alignItems="start">
      <OrderedList listStylePosition="outside">
        <Flex flexDir="column" gap="4">
          {questions?.map((question) => {
            return (
              <Box key={question.question}>
                <Flex>
                  <ListItem>{question?.question ?? ""} </ListItem>
                  <HStack pl="4">
                    <QuestionForm
                      editMode
                      initialQuestion={question}
                      onSubmit={handleAddQuestion}
                    />
                    <DeleteModal />
                  </HStack>
                </Flex>

                <RadioGroup fontWeight={"300"} size={"sm"} pt="2">
                  <Stack spacing={3} width="fit-content">
                    {question?.options?.map((i) => (
                      <Radio pl="2" value={i} key={i}>
                        <Text
                          fontSize={{ base: "xs", md: "sm" }}
                          fontWeight="light"
                        >
                          {i}
                        </Text>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              </Box>
            );
          })}
        </Flex>
      </OrderedList>
    </VStack>
  );
};

export default QuestionList;

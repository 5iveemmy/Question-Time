import { Box, Text, VStack } from "@chakra-ui/react";

interface Question {
  question: string;
  options: string[];
}

interface QuestionListProps {
  questions: Question[];
}

const QuestionList: React.FC<QuestionListProps> = ({ questions }) => {
  return (
    <VStack spacing={4}>
      {questions.map((question, index) => (
        <Box key={index} borderWidth="1px" p={4} borderRadius="md" w="80">
          <Text fontWeight="bold">{question.question}</Text>
          <Text>{question.options.join(", ")}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default QuestionList;

"use client";

import { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Question } from "@qt/types";
import { questionsUrl } from "@qt/utils/endpoints";
import { questionId, token } from "@qt/utils/helper";
import { EditIcon } from "lucide-react";

interface QuestionFormProps {
  editMode?: boolean;
  initialQuestion?: Question;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  editMode,
  initialQuestion,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(Array.from({ length: 5 }, () => ""));
  const [optionsLengthCheck, setOptionsLengthCheck] = useState(false);

  useEffect(() => {
    if (initialQuestion) {
      setQuestion(initialQuestion.question);
      setOptions(initialQuestion.options);
    }
  }, [initialQuestion]);

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async () => {
    const questionData: Question = {
      question: question.trim(),
      options: options
        .map((option) => option.trim())
        .filter((option) => option !== ""),
    };

    try {
      setLoading(true);
      let response;
      if (editMode && initialQuestion) {
        response = await fetch(`${questionsUrl}/${questionId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Token: token as string,
          },
          body: JSON.stringify(questionData),
        });
      } else {
        response = await fetch(questionsUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Token: token as string,
          },
          body: JSON.stringify(questionData),
        });
      }

      if (response.ok) {
        const id = await response.text();
        typeof window !== "undefined" &&
          window.localStorage.setItem("questionId", id);
        onClose();
      } else {
        console.error("Failed to add/update question:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding/updating question:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(questionId, "questionId");

  useEffect(() => {
    setOptionsLengthCheck(
      options.filter((option) => option.trim() !== "").length < 3
    );
  }, [options]);

  return (
    <>
      {editMode ? (
        <EditIcon size={18} onClick={onOpen} cursor="pointer" />
      ) : (
        <Button colorScheme="blue" onClick={onOpen}>
          Add Question
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {initialQuestion ? "Edit Question" : "Add Question"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl id="question">
                <FormLabel>Question</FormLabel>
                <Input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </FormControl>
              {[0, 1, 2, 3, 4].map((index) => (
                <FormControl key={index} id={`option-${index}`}>
                  <FormLabel>Option {index + 1}</FormLabel>
                  <Input
                    type="text"
                    value={options[index]}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />
                </FormControl>
              ))}
              <Button
                isDisabled={optionsLengthCheck}
                _hover={{
                  opacity: optionsLengthCheck ? "0.8" : undefined,
                }}
                isLoading={loading}
                onClick={handleSubmit}
              >
                {initialQuestion ? "Save Changes" : "Add Question"}
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default QuestionForm;

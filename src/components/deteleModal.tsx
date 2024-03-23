"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { questionsUrl } from "@qt/utils/endpoints";
import { questionId, token } from "@qt/utils/helper";
import { Trash } from "lucide-react";
import { useState } from "react";

const DeleteModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${questionsUrl}/${questionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Token: token as string,
        },
      });

      if (response.ok) {
        onClose();
      } else {
        console.error("Failed to delete question:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Trash color="#EF4444" onClick={onOpen} size={18} cursor="pointer" />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={{ base: "xs", md: "sm" }}
      >
        <ModalOverlay />

        <ModalContent py={2}>
          <ModalHeader pb="0">Delete Question</ModalHeader>

          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this question?</Text>
          </ModalBody>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button isLoading={loading} variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteModal;

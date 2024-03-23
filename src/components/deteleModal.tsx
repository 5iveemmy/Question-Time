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
import { token } from "@qt/utils/helper";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const DeleteModal = () => {
  const questionId =
    typeof window !== "undefined" && window.localStorage.getItem("questionId");

  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const id = (questionId as string).replace(/"/g, "");

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://qt.organogram.app/questions/${encodeURIComponent(id)}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Token: token as string,
          },
        }
      );

      if (response.ok) {
        onClose();
        typeof window !== "undefined" && window.location.reload();
        toast.success("Question deleted successfully");
      } else {
        toast.error("Failed to delete question:", response.statusText as any);
      }
    } catch (error) {
      toast.error("Error deleting question:", error as any);
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

import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const DeleteBooking = ({ isOpen, onClose, roomData, refreshData }) => {
  const cancelRef = React.useRef();
  const toast = useToast();

  const deleteBooking = async () => {
    try {
      const { id, date } = roomData;
      const roomNumber = roomData.id;

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/admin/rooms/${roomNumber}/status-by-date`,
        { date, status: "Available" }
      );

      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/cancelRoom`,
        { params: { id } }
      );

      toast({
        title: "Booking Cancelled Successfully",
        status: "success",
        isClosable: true,
        position: "top-right",
      });

      refreshData(); // Trigger re-fetching of booked rooms in the parent component
      onClose(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error canceling booking:", error);
      toast({
        title: "Error canceling booking",
        description: error.response
          ? error.response.data.message
          : error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Cancel Booking
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={deleteBooking} ml={3}>
              Cancel Booking
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteBooking;

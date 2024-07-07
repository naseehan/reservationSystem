import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

function OpenModal({ isOpen, onOpen, onClose, selectedRoomId, date }) {
  const toast = useToast();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const { price, link, id, rating } = selectedRoomId;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errors, setErrors] = useState({});

  const regex = /^[a-zA-Z]{2,}$/;

  const errorHandler = (value, field) => {
    let error = "";
    if (value.length < 2 || value.length > 15) {
      error = `${field} must be between 2 and 15 characters`;
    } else if (!regex.test(value)) {
      error = `${field} shouldn't contain numbers or special characters`;
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field.toLowerCase().replace(' ', '')]: error,
    }));
  };

  const handleFirstName = (e) => {
    const value = e.target.value;
    errorHandler(value, "First name");
    setFirstName(value);
  };

  const handleLastName = (e) => {
    const value = e.target.value;
    errorHandler(value, "Last name");
    setLastName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // errors object converted to array
    // and check if there are any items(error) in array if exists return true and exit function
    if (Object.values(errors).some((error) => error)) return;

    try {
      const roomNumber = id;
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/admin/rooms/${roomNumber}/status-by-date`,
        { date, status: "Booked" }
      );

      await axios.post(`${import.meta.env.VITE_BASE_URL}/bookedRooms`, {
        price,
        link,
        id,
        rating,
        roomStatus: "Booked",
        date,
        firstName,
        lastName,
      });

      toast({
        title: "Room booked successfully",
        status: "success",
        isClosable: true,
        position: "top-right",
      });
      onClose();
      setLastName("")
      setFirstName("")
    } catch (error) {
      console.error("Error booking room:", error);
      toast({
        title: "Error booking room",
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
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.firstname}>
                <FormLabel>First name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="First name"
                  value={firstName}
                  onChange={handleFirstName}
                  required
                  maxLength={15}
                />
                {errors.firstname && (
                  <FormErrorMessage>{errors.firstname}</FormErrorMessage>
                )}
              </FormControl>

              <FormControl mt={4} isInvalid={errors.lastname}>
                <FormLabel>Last name</FormLabel>
                <Input
                  placeholder="Last name"
                  value={lastName}
                  onChange={handleLastName}
                  required
                  maxLength={15}
                />
                {errors.lastname && (
                  <FormErrorMessage>{errors.lastname}</FormErrorMessage>
                )}
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={2} type="submit">
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default OpenModal;

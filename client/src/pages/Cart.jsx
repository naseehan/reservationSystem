import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import DeleteBooking from "../components/cart/DeleteBooking";
import { useDisclosure } from "@chakra-ui/react";
import Loader from "../components/Loader";

const Tags = styled.div`
  position: absolute;
  top: 5px;
  ${(props) => (props.rating ? "right: 10px" : "left: 26px")};
  color: #000;
`;


const Cart = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [loading, setLoading] = useState(false)

  const fetchRooms = async () => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getBookedRooms`
      );
      setRooms(response.data);
      setLoading(false)
    } catch (error) {
      console.error("Error fetching booked rooms:", error);
      toast({
        title: "Error fetching booked rooms",
        description: error.response
          ? error.response.data.message
          : error.message,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDeleteClick = (room) => {
    setSelectedRoom(room);
    onOpen();
  };

  const refreshData = () => {
    fetchRooms();
  };

  return (
    <>
      <main className="my-5">
        <div className="container">
          <section className="text-center">
            <h4 className="mb-5">
              <strong>Booked Rooms</strong>
            </h4>
            <div className="row">
              {rooms.map((data) => (
                <div
                  className="col-lg-4 col-md-12 mb-4"
                  key={data._id}
                  style={{ position: "relative" }}
                >
                  <div className="card">
                    <div
                      className="bg-image hover-overlay"
                      data-mdb-ripple-init
                      data-mdb-ripple-color="light"
                    >
                      <img src={data.link} className="img-fluid" alt="Room" />
                    </div>
                    <div className="card-body" style={{ position: "relative" }}>
                      <h5 className="card-title">
                        Booked By: {data.firstName} {data.lastName}
                      </h5>
                      <p className="card-text">Booked On: {data.date}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClick(data)}
                      >
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {loading && <Loader />}
      {selectedRoom && (
        <DeleteBooking
          isOpen={isOpen}
          onClose={onClose}
          roomData={selectedRoom}
          refreshData={refreshData}
        />
      )}
    </>
  );
};

export default Cart;

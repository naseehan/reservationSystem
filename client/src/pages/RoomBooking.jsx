import React, { useEffect, useState } from "react";
import roomDetails from "./roomDetails";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import OpenModal from "../components/OpenModal";
import { useDisclosure } from "@chakra-ui/react";
import Loader from "../components/Loader";

const Tags = styled.div`
  position: absolute;
  top: 5px;
  ${(props) => (props.rating ? "right: 10px" : "left: 26px")};
  color: #000;
`;

const DatePicker = styled.div`
  display: grid;
  justify-content: center;
  padding: 3%;
  gap: 10px;
`;

const Booked = styled.div`
  z-index: 100;
  position: absolute;
  top: 8px;
  right: 25px;
  background-color: ${(props) => {
    if (props.red === "Booked") {
      return "red";
    } else if (props.red === "Available") {
      return "green";
    } else {
      return "#b5b509";
    }
  }};

  color: #fff;
  padding: 10px;
  border-radius: 5px;
  tect-align: center;

  p {
    margin-bottom: 0;
  }
`;

const RoomBooking = () => {
  const today = new Date().toISOString().split("T")[0];

  const [date, setDate] = useState(today);
  const [rooms, setRooms] = useState([]);
  // for opening and closing booking window
  const [bookWindow, setBookWindow] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState();
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchRooms = async (date) => {
    try {
      setLoading(true)
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/getRooms`,
        {
          params: { date },
        }
      );
      setRooms(response.data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRooms(date);
  }, [date]);

  // for getting and formatting date
  const handleDate = (e) => {
    const selectedDate = new Date(e.target.value);
    const formattedDate = selectedDate.toISOString().split("T")[0];
    setDate(formattedDate);
  };

  // booking selected room
  const handleClick = async (data) => {
    setBookWindow(true);
    setSelectedRoomId(data);
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    fetchRooms(date);
  };

  return (
    <>
      <header>
        {/* Intro settings */}
        <style>
          {`
            #intro {
              /* Margin to fix overlapping fixed navbar */ 
              margin-top: 58px; 
            }

            @media (max-width: 991px) {
              #intro {
                /* Margin to fix overlapping fixed navbar */
                margin-top: 45px;
              }
            }
          `}
        </style>
      </header>

      <main className="my-5">
        <div className="container">
          <section className="text-center">
            <h4 className="mb-5">
              <strong>Available Rooms</strong>
            </h4>
            {/* for choosing a date */}
            <form action="">
              <DatePicker className="date-picker">
                <label htmlFor="date">Please choose a date</label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  min={today}
                  onChange={handleDate}
                  value={date}
                  required
                />
                {/* <button type="submit">Search Rooms</button> */}
              </DatePicker>
            </form>
            <div className="row">
              {/* {bookWindow ? <OpenModal /> : null} */}
              {loading && <Loader />}
              {rooms.map((data) => (
                <div
                  className="col-lg-4 col-md-12 mb-4"
                  key={data.id}
                  style={{ position: "relative" }}
                >
                  {/* to know if a room is booked or not */}
                  <Booked red={data.status}>
                    <p>{data.status}</p>
                  </Booked>

                  <div className="card">
                    <div
                      className="bg-image hover-overlay"
                      data-mdb-ripple-init
                      data-mdb-ripple-color="light"
                    >
                      <img src={data.link} className="img-fluid" alt="Nature" />
                      <Link href="#!">
                        <div
                          className="mask"
                          style={{
                            backgroundColor: "rgba(251, 251, 251, 0.15)",
                          }}
                        ></div>
                      </Link>
                    </div>

                    <div className="card-body" style={{ position: "relative" }}>
                      <Tags>
                        <p>{data.price}₹</p>
                      </Tags>
                      <Tags rating>
                        <p>{data.rating}</p>
                      </Tags>

                      <h5 className="card-title">Room Number : {data.id}</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                      </p>
                      <a
                        // href=""
                        style={{
                          cursor:
                            data.status == "Available"
                              ? "pointer"
                              : "not-allowed",
                        }}
                        className={`btn btn-primary ${
                          data.status !== "Available" ? "disabled" : ""
                        }`}
                        data-mdb-ripple-init
                        onClick={() => handleClick(data)}
                      >
                        Book Room
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      {bookWindow && (
        <OpenModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={handleModalClose}
          selectedRoomId={selectedRoomId}
          date={date}
        />
      )}
    </>
  );
};

export default RoomBooking;

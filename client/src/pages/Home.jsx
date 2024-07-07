import React from "react";
import img from "../assets/hotel.jpg";
import "../stylePages/home/App.css";
import { Link } from "react-router-dom";
// button from chakra ui
import { Button, ButtonGroup, Stack } from "@chakra-ui/react";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-image">
        <img src={img} alt="" width="100%" />
        <div className="home-image-overlay"></div>
        <div className="hero-heading">
          <h1>Welcome to Paradise Hotel</h1>
          <Stack direction="row" spacing={4} align="center">
            <Button colorScheme="teal" variant="solid" size="lg">
              <Link to="/rooms">Book Rooms</Link>
            </Button>
          </Stack>
        </div>
      </div>
      <Testimonials />
    </div>
  );
};

export default Home;

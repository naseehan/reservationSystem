const express = require("express");

const bodyParser = require("body-parser");
const app = express();
// dotenv file
const dotenv = require("dotenv"); //npm i dotenv
dotenv.config();

// requiring and connecting to mongodb
const connectDB = require("./db");
// importing models
const Room = require("./models/Room");
const Date = require("./models/date");
const EachDay = require("./models/eachDay");
const BookedRoom = require("./models/bookedRooms")
connectDB();

// used to parse JSON-formatted request bodies.
// app.use(bodyParser.json());

// restricts web pages from making requests to a different domain
const cors = require("cors");

// allows to specify who can make requests to server
app.use(cors());

// cors with options
// const corsOptions = {
//     origin: 'http://your-frontend-domain.com',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true, // allow session cookies from browser to pass through
//     optionsSuccessStatus: 204
//   };
//   app.use(cors(corsOptions));

// Middleware for parsing application/json
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/getRooms", async (req, res) => {
  try {
    const { date } = req.query;
    const rooms = await Room.find();

    const roomsWithStatus = rooms.map((room) => {
      const availability = room.availability.find((a) => a.date === date) || { status: "Available", };
      // console.log(availability);
      return {
        id: room.id,
        name: room.name,
        price: room.price,
        rating: room.rating,
        link: room.link,
        status: availability.status,
      };
    });
    res.json(roomsWithStatus);
  } catch (error) {
    res.status(500).json({ error: "Couldnt get rooms" });
  }
});



// update room status by admin
app.put("/admin/rooms/:roomId/status-by-date", async (req, res) => {
  try {
    const { date, status } = req.body;
    const roomId = parseInt(req.params.roomId); // Convert the roomId from string to number


    // Find the room using the custom id
    const room = await Room.findOne({ id: roomId });
    if (!room) {
      console.error(`Room with ID ${roomId} not found`);
      return res.status(404).json({ message: "Room not found" });
    }

    const availability = room.availability.find((a) => a.date === date);

    if (availability) {
      availability.status = status;
    } else {
      room.availability.push({ date, status });
    }

    await room.save();
    res.json(room);
  } catch (error) {
    console.error(`Error updating room status: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
});

// individual room booking
app.post("/bookedRooms", async (req,res) => {
  try {
    const {price, link, id, rating, roomStatus, date, firstName, lastName} = req.body
    
    const bookedRooms = new BookedRoom({
      price,
      link,
      id,
      rating,
      roomStatus,
      date,
      firstName,
      lastName
    })
    await bookedRooms.save()
    res.status(201).json({ message: "Room Booked successfully"});

  } catch (error) {
    console.error(`Error updating room status: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
})

// for getting booked rooms data
app.get("/getBookedRooms", async (req, res) => {
  try {
    const rooms = await BookedRoom.find()
    res.json(rooms)
  } catch (error) {
    console.error(`Error updating room status: ${error.message}`);
    res.status(500).json({ message: "Internal server error" });
  }
})

// for cancelling bookings
app.delete("/cancelRoom", async (req, res) => {
  try {
    const {id} = req.query
    const findRoom = await BookedRoom.findOne({ id })
    await BookedRoom.deleteOne(findRoom)
    res.status(200).json({ message: "Booking cancelled successfully" });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
})


app.listen(process.env.PORT, () => {
  const port = process.env.PORT || 3001;
  console.log("server started in port " + port);
});

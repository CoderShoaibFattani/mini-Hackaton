import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

const RoomBooking = () => {
  const [roomType, setRoomType] = useState("");
  const [roomNo, setRoomNo] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchRoomData = async () => {
      // Fetching available rooms based on the selected room type
      const roomCollection = collection(db, "rooms");
      const roomSnapshot = await getDocs(roomCollection);
      const rooms = roomSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Filter rooms based on type and availability
      const filteredRooms = rooms.filter(
        (room) => room.roomType === roomType && room.roomStatus === "available"
      );
      setAvailableRooms(filteredRooms);
    };
    if (roomType) {
      fetchRoomData();
    } else {
      setAvailableRooms([]);
    }
  }, [roomType]);

  const handleRoomSelect = (selectedRoomNo) => {
    const selectedRoom = availableRooms.find(
      (room) => room.roomNo === selectedRoomNo
    );
    if (selectedRoom) {
      setPrice(selectedRoom.price);
      setRoomNo(selectedRoom.roomNo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addRoom = await addDoc(collection(db, "bookings"), {
        roomType,
        roomNo,
        roomStatus: "booked", // Updating status on booking
        price,
      });
      const roomId = addRoom.id;
      localStorage.setItem("roomId", roomId);
      console.log("Booking successful");
      // Optionally reset the form here
      setRoomType("");
      setRoomNo("");
      setPrice("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Box width="50%" margin="20px auto">
      <Typography
        variant="h3"
        component="p"
        sx={{
          fontSize: "2rem",
          fontWeight: "700",
          textAlign: "center",
          mb: "30px",
        }}
      >
        Room Booking
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Room Type</InputLabel>
          <FormControl fullWidth>
            <Select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <MenuItem value="Economy">Economy</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
              <MenuItem value="Delux">Delux</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box mb="25px">
          <InputLabel sx={{ mb: "10px" }}>Room No</InputLabel>
          <FormControl fullWidth>
            <Select
              value={roomNo}
              onChange={(e) => handleRoomSelect(e.target.value)}
              disabled={!availableRooms.length} // Disable if no available rooms
            >
              {availableRooms.map((room) => (
                <MenuItem key={room.roomNo} value={room.roomNo}>
                  {room.roomNo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {price && (
          <Box mb="25px">
            <Typography variant="h6">Price: {price} PKR</Typography>
          </Box>
        )}

        <Box mb="25px">
          <Button
            variant="contained"
            color="secondary"
            sx={{ fontSize: "20px", left: "40%" }}
            type="submit"
          >
            Book Room
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default RoomBooking;

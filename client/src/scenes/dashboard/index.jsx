import React from 'react';


import NavbarAdmin from "scenes/navbarAdmin";
import {
  Box,
  TextField,
  Typography,
  EditOutlinedIcon,
  Button,
} from '@mui/material';
import { useState,useEffect } from "react";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3001/admin/userlisting');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  async function onBlockUnblock(userId) {
    console.log(userId,"ghghghghghg");
    try {
      const blockUnblock = await fetch(
        "http://localhost:3001/admin/blockUnblock",
        {
          method: "PATCH",
          body: JSON.stringify({ userId }), // You can still include the userId in the body if needed
          headers: {
          "Content-Type": "application/json", // Specify the content type of the request body
        },
        }
      );
      const savedData = await blockUnblock.json()
      setData(savedData);

      // Handle the response if needed
    } catch (error) {
      console.error("Error blocking/unblocking user:", error);
    }
  }

  async function onDelete(userId) {
    console.log("inside onDelete")
    console.log(userId);

    try{
      const deleteUser = await fetch(
        "http://localhost:3001/admin/deleteuser",
        {
          method: "POST",
          body: JSON.stringify({ userId }),
          headers: {
            "Content-Type": "application/json",
          }
        }
      )
      const savedData = await deleteUser.json()
      // console.log(savedData,"lololololo");
      setData(savedData);

    }catch(error){
      console.error("Error Deleting user:", error);
    }
  }


  return (
    <Box>
  <NavbarAdmin /> {/* Assuming you have a Navbar component for the admin page */}

  <Box

    display="grid"
    gap="10px" // Reduced gap from 30px to 10px
    gridTemplateColumns="1fr 1fr 1fr auto auto" // Adjust the number of columns as needed
    sx={{
        padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      padding: '20px', // Added padding of 20px on all sides
    }}
  >
    {/* Table Headers */}
    <Box sx={{ fontWeight: 'bold' }}>First Name</Box>
    <Box sx={{ fontWeight: 'bold' }}>Location</Box>
    <Box sx={{ fontWeight: 'bold' }}>Email</Box>
    <Box sx={{ fontWeight: 'bold' }}>Block/Unblock</Box> {/* Optional */}
    <Box sx={{ fontWeight: 'bold' }}>Delete</Box> {/* Optional */}

    {/* Table Rows */}
    {data.map((user) => (
      <React.Fragment key={user._id}>
        <Box>{user.firstName}</Box>
        <Box>{user.location}</Box>
        <Box>{user.email}</Box>

        {/* Uncomment the following code if you want to include the Block/Unblock and Delete buttons */}
        <Box>
          <Button variant="outlined" 
          onClick={() => onBlockUnblock(user._id)}
          >
            {user.block ? 'Unblock' : 'Block'}
          </Button>
        </Box>
        <Box>
          <Button variant="outlined"
           onClick={() => onDelete(user._id)}
           >
            Delete
          </Button>
        </Box>
      </React.Fragment>
    ))}
  </Box>
</Box>


  );
};

export default Dashboard;


import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
const BlogDetails = () => {
  const [blog, setBlog] = useState({});
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  // get blog details
  const getBlogDetail = async () => {
    try {
      const res = await fetch(` http://localhost:8000/api/v1/blog/get-blog/${id}`);
      const data=await res.json();
      if(!data)
      {
        toast.error("Invalid Details");
      }
      else
      {
        setBlog(data.userBlog);
        setInputs({
          title: data.userBlog.title,
          description: data.userBlog.description,
          image: data.userBlog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBlogDetail();
  }, [id]);

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {title,description,image}=inputs;
      const res = await fetch(`http://localhost:8000/api/v1/blog/update-blog/${id}`, {
        method: "PUT",
        headers:{
          "Accept":"application/json",
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title,
          description,
          image,
          user:id
        })  
      });
      const data = await res.json();
      if(!data){
        toast.error("Invalid Details");
      }
      else
      {
        toast.success("Blog Updated");
        navigate("/my-blog");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blog);
  return (
    <v>
        <ToastContainer />
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Update A Pots
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button type="submit" color="warning" variant="contained">
            UPDATE
          </Button>
        </Box>
      </form>
    </v>
  );
};

export default BlogDetails;
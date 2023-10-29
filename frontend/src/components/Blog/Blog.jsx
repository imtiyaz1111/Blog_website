import React, { useState, useEffect } from "react";
import Blogcard from './Blogcard'


const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const getAllBlogs = async () => {
    try {
     const res= await fetch("http://localhost:8000/api/v1/blog/all-blog")
     const data=await res.json();
    //  if(data)
    //  {
    //   setBlogs(data.blogs)
    //  }
     if(data?.success)
     {
      setBlogs(data?.blogs)
     }
    //  if(data.length > 0)
    //  {
    //   setBlogs(data.blogs)
    //  }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {
        blogs.map((blog) => (
          <Blogcard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog?.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))}
    </div>
    
  )
}

export default Blog

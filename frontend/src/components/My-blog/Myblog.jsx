import React, { useState, useEffect } from "react";
import Blogcard from "../Blog/Blogcard";

const Myblog = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const res= await fetch(`http://localhost:8000/api/v1/blog/user-blog/${id}`)
      const data=await res.json();
      if(data?.success)
      {
       setBlogs(data?.userBlog.blogs)
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <Blogcard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  )
}

export default Myblog

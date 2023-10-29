import React from 'react'
import {Link,useNavigate} from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate();
  const isUserSingIn = !!localStorage.getItem("token");
  const handLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };
  return (
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
  <div class="container">
    <Link class="navbar-brand" to="/">Blog_Web</Link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav m-auto mb-2 mb-lg-0">
        { isUserSingIn ? (
          <>
          <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/my-blog" >My Blog</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/create-blog" >Create Blog</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/about" >About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/contact" >Contact</Link>
        </li>
        <li class="nav-item">
                <Link class="nav-link" onClick={handLogout} to="/">
                  Logout
                </Link>
         </li>
          </>
        ) : (
          <>
          <li class="nav-item">
          <Link class="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/my-blog" >My Blog</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/create-blog" >Create Blog</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/about" >About</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link " to="/contact" >Contact</Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/register">Register</Link>
        </li>
        <li class="nav-item">
          <Link to="/login" class="nav-link ">Login</Link>
        </li>
          </>
        )
        }
        
      </ul>
    </div>
  </div>
</nav>
  )
}

export default Navbar

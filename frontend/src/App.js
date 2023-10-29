
import './App.css';
import About from './components/About/About';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Register from './components/Regsiter/Register';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';
import Myblog from './components/My-blog/Myblog';
import Createblog from './components/CreateBlog/Createblog';
import Blogdetails from './components/Blogdetails/Blogdetails';

function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route exact path="/" element={<Blog/>}></Route>
     <Route exact path="/my-blog" element={<Myblog/>}></Route>
     <Route exact path="/create-blog" element={<Createblog/>}></Route>
     <Route exact path="/blog-details/:id" element={<Blogdetails/>}></Route>
     <Route exact path="/about" element={<About/>}></Route>
     <Route exact path="/register" element={<Register/>}></Route>
     <Route exact path="/login" element={<Login/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  
  );
}

export default App;

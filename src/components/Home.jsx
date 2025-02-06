import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/Constant';
import { addUser } from '../utils/userSlice';


function Home() {

  return (
    <div className="w-full h-[100%]">
      <div className="w-full h-[8vw]">
        <Nav />
      </div>
      <div className="w-full h-fit">
        <Outlet  />
      </div>
      <Footer />
    </div>
  );
}

export default Home;

import { Outlet, useNavigate } from 'react-router-dom';
import Nav from './Nav';
import Footer from './Footer';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/Constant';
import { addUser } from '../utils/userSlice';


function Home() {
  const user = useSelector((store) => store?.user);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const fetchUser = async ()=>{
    if(user) return;
    try{
      const res = await axios.get(`${BASE_URL}profile/view`,{withCredentials:true});
      console.log("profile/view : "+ res);
      dispatch(addUser(res.data));
    }catch(err){
      if(err.status===401){
        Navigate("/login");
      }
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[]);

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

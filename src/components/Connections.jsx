import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/Constant";
import { useEffect } from "react";
import { addConnections } from "../utils/connectionSlice";
import { div } from "framer-motion/client";

function Connections(){
    const connection = useSelector((store)=>store.connections)
    const dispatch = useDispatch();
    
    const getConnections=async()=>{
       try{
        const res = await axios.get(BASE_URL+"user/connection",{withCredentials:true});
        console.log(res.data);
        dispatch(addConnections(res.data.data));
       }catch(err){
        console.log(err);
       }
    }

    useEffect(()=>{
        getConnections();
    },[])

    if(!connection) return ;
    if(connection<=0) return(
        <div className="w-full h-screen ">
            <h1 className="text-3xl text-center mt-16">No Connections</h1>
        </div>
    )
    return(
        <div className="w-full h-screen ">
            <h1>CONNECTION JSX</h1>
        </div>
    )
}

export default Connections
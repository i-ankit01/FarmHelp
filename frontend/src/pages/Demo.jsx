import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchFarmers } from "../store/userSlice";

const Demo = () => {
    const dispatch = useDispatch();
    const { farmers, farmersStatus, farmersError } = useSelector((state) => state.user);
      
    console.log(farmers)
  useEffect(() => {
    dispatch(fetchFarmers());
  }, [dispatch]);

  
  

  if (farmersStatus === "loading") return <p>Loading...</p>;
  if (farmersStatus === "failed") return <p>Error: {farmersError}</p>;

  return (
        <div>
            ehllo
        </div>
  )
}

export default Demo

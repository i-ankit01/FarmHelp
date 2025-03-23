import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCompanyData } from "../store/companySlice";

const Demo = () => {
    const dispatch = useDispatch();

    // ✅ Ensure you're selecting the correct state path
    const { company, loading, error } = useSelector((state) => {
        console.log("Full Redux State:", state.company); // Debug Redux state
        return state.company.company;
    });

    useEffect(() => {
        dispatch(fetchCompanyData());
    }, [dispatch]);


    if (!company) {
        return <p>No company data available.</p>;
    }

    return (
        <div>
            <h1>Welcome, {company.firstName} {company.lastName}</h1>
            <p>Company Name: {company.companyName}</p>
            <p>Email: {company.email}</p>
            <p>GST: {company.gst}</p>
        </div>
    );
};

export default Demo;

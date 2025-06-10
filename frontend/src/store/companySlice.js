import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode"; // ✅ Fix import

// 🔹 Async thunk to fetch logged-in company data
export const fetchCompanyData = createAsyncThunk("company/fetchCompanyData", async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const company_token = localStorage.getItem("company_token");
    if (!company_token) throw new Error("No company_token found");

    const decodedToken = jwtDecode(company_token); // ✅ Fix variable name
    const companyId = decodedToken.id; // Get the company ID from company_token

    const response = await fetch(`${backendUrl}/api/v1/company/${companyId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${company_token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch company data");

    const data = await response.json();
    // console.log("Fetched company data:", data);
    return data;
});

// 🔹 Company Slice
const companySlice = createSlice({
    name: "company",
    initialState: {
        company: null,
        loading: false,
        error: null,
    },
    reducers: {
        logoutCompany: (state) => {
            state.company = null;
            localStorage.removeItem("company_token"); // ✅ Clear token on logout
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCompanyData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCompanyData.fulfilled, (state, action) => {
                console.log("Fetched company data:", action.payload);
                state.loading = false;
                state.company = action.payload;
            })
            .addCase(fetchCompanyData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const { logoutCompany } = companySlice.actions;
export default companySlice.reducer;

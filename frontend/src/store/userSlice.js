import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode"; 

// Fetch user data
export const fetchUserData = createAsyncThunk("user/fetchUserData", async () => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const response = await fetch(`${backendUrl}/api/v1/farmer/${userId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        credentials: "include",
    });

    if (!response.ok) throw new Error("Failed to fetch user data");

    const data = await response.json();
    console.log("Fetched user data:", data);
    return data;
});

// Fetch all farmers
export const fetchFarmers = createAsyncThunk("user/fetchFarmers", async () => {
    const response = await fetch(`${backendUrl}/api/v1/farmers`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) throw new Error("Failed to fetch farmers");

    const data = await response.json();
    // console.log("Fetched farmers data:", data);
    return data.farmers; // Assuming API returns `{ farmers: [...] }`
});

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status: "idle",
        error: null,
        farmers: [], // ✅ Add farmers state
        farmersStatus: "idle",
        farmersError: null
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.user = action.payload;
            })
            .addCase(fetchUserData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // ✅ Handle fetchFarmers
            .addCase(fetchFarmers.pending, (state) => {
                state.farmersStatus = "loading";
            })
            .addCase(fetchFarmers.fulfilled, (state, action) => {
              // console.log("Redux Store Updating Farmers:", action.payload);
                state.farmersStatus = "succeeded";
                state.farmers = action.payload;
            })
            .addCase(fetchFarmers.rejected, (state, action) => {
                state.farmersStatus = "failed";
                state.farmersError = action.error.message;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

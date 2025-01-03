import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../config/axiosConfig";
import Cookies from "js-cookie";

// register thunk
export const registers = createAsyncThunk(
  "auth/register",
  async (registerData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/register", registerData);
      // console.log(data, "data from register thunk");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Registration failed"
      );
    }
  }
);

// login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (loginData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post("/login", loginData);
      const token = data.accessToken;
      const email = loginData.email;
      Cookies.set("accessToken", token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      Cookies.set("email", email, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || "Login failed"
      );
    }
  }
);

// user thunk
export const getUser = createAsyncThunk(
  "auth/getUser",
  async (email, thunkAPI) => {
    try {
      const { data } = await axiosInstance.get(`/user?email=${email}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.message);
    }
  }
);

// Forget password thunk
export const forgetPassword = createAsyncThunk(
  "auth/forgetPassword",
  async (emailData, thunkAPI) => {
    try {
      const { data } = await axiosInstance.post(
        "/user/reset/password",
        emailData
      );
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Password reset failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// initial state
const initialState = {
  user: null,
  role: null,
  token: Cookies.get("accessToken") || null,
  email: Cookies.get("email") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.role = null;
      state.token = null;
      state.email = null;
      Cookies.remove("accessToken");
      Cookies.remove("email");
    },
  },

  extraReducers: (builder) => {
    builder
      // register case
      .addCase(registers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(registers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // login case
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload;
        state.token = Cookies.get("accessToken");
        state.email = Cookies.get("email");
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        // console.log(action, 'from login case rejected')
        state.error = action.error.message;
      })

      // User Details Case
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = action.payload.data;
        state.role = action.payload.data.accountType;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Forget password cases
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // handle password reset success (optional)
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

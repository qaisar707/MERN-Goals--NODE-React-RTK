import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authServis";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
  user: user ? user : null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const register = createAsyncThunk(
  "login/register",
  async (registerUser, thunkAPI) => {
    try {
      return await authService.register(registerUser);
    } catch (error) {
      const message = {
        error:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk(
  "login/login",
  async (loginUser, thunkAPI) => {
    try {
      return await authService.login(loginUser);
    } catch (error) {
      const message = {
        error:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (email, thunkAPI) => {

    try {
      const res = await authService.forgotPassword({ email: email });
      return res
    } catch (error) {
      const message = {
        error:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (password, thunkAPI) => {
    try {
      return await authService.resetPassword({ password });
    } catch (error) {
      const message = {
        error:
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString(),
      };
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      .addCase(register.rejected, (state, message) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.message = message;
        state.user = null;
      })

      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.misc = action.payload;
      })

      .addCase(forgotPassword.rejected, (state, message) => {
        state.message = message;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })

      .addCase(resetPassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
      })

      .addCase(resetPassword.rejected, (state, message) => {
        state.message = message;
        state.isLoading = false;
        state.isSuccess = false;
        state.user = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService.js";
const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  user: null,
  goals: [],
  goal: {},
};
//CREATE GOALS
export const createGoal = createAsyncThunk(
  "goal/create",
  async (text, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(text, token);
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
//GET GOALS
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
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

//DELETE GOALS
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (data, thunkAPI) => {
    try {
      const { id } = data;
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.deleteGoal(id, token);
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
//EDIT GOALS
export const editGoal = createAsyncThunk("goal/edit", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.editGoal(id, token);
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
});
//UPDATE GOALS
export const updateGoal = createAsyncThunk(
  "goal/update",
  async (data, thunkAPI) => {
    const { id, updatedInput } = data;
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.updateGoal(id, { text: updatedInput }, token);
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

const goalSlice = createSlice({
  name: "goals",
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
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, message) => {
        state.isLoading = false;
        state.isError = true;
        state.message = message;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(deleteGoal.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editGoal.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(editGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goal = state.goals.find(
          (goal) => goal._id === action.payload._id
        );
      })

      .addCase(editGoal.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        const oldGoals = [...state.goals];
        const itemIndex = oldGoals.findIndex(
          (item) => item._id === action.payload._id
        );
        if (itemIndex === -1) {
          oldGoals.push(action.payload);
        } else {
          oldGoals[itemIndex] = action.payload;
        }
        state.goals = oldGoals;
        state.goal = [];
      })
      .addCase(updateGoal.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { reset } = goalSlice.actions;
export default goalSlice.reducer;

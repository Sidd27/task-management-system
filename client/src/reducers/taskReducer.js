import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import protectedCall from "../api/protectedCall";

// Define the initial state
const initialState = {
  tasks: [],
  status: "idle",
  error: null,
  searchTerm: "",
  filter: "all",
};

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await protectedCall("/tasks");
  return response;
});

// Async thunk for adding a new task
export const addTask = createAsyncThunk("tasks/addTask", async (taskData) => {
  const response = await protectedCall("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
  return response;
});

// Async thunk for updating a task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (taskData) => {
    const response = await protectedCall(`/tasks/${taskData.id}`, {
      method: "PUT",
      body: JSON.stringify(taskData),
    });
    return response;
  }
);

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId) => {
    await protectedCall(`/tasks/${taskId}`, {
      method: "DELETE",
    });
    return taskId;
  }
);

// Create the slice
const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    resetTasks() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Sort tasks by updated_at in descending order
        state.tasks = action.payload.sort(
          (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
        );
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        console.log(action.payload);
        state.tasks.unshift(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        console.log(action);
        const index = state.tasks.findIndex(
          (task) => task.id === action.payload.id
        );
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setFilter, resetTasks } = taskSlice.actions;

export default taskSlice.reducer;

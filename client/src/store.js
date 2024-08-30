import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import taskReducer from "./reducers/taskReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});

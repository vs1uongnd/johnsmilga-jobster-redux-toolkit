import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import jobReducer from "./features/job/jobSlice";
import allJobsReducer from "./features/allJobs/allJobsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
    allJobs: allJobsReducer,
  },
});

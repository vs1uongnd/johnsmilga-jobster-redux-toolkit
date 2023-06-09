import { showLoading, hideLoading, getAllJobs } from "../allJobs/allJobsSlice";
import customFetch from "../../utils/axios";
import { clearValues } from "./jobSlice";
import { logoutUser } from "../user/userSlice";

export const createJobThunk = async (job, thunkAPI) => {
  try {
    // const response = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    const response = await customFetch.post("/jobs", job);

    thunkAPI.dispatch(clearValues());
    return response.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutUser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading());
  try {
    // const response = await customFetch.delete(`/jobs/${jobId}`, {
    //   headers: {
    //     authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //   },
    // });
    const response = await customFetch.delete(`/jobs/${jobId}`);
    thunkAPI.dispatch(getAllJobs());
    thunkAPI.dispatch(hideLoading());
    return response.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideLoading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    // const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
    //   headers: {
    //     authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
    //   },
    // });
    const resp = await customFetch.patch(`/jobs/${jobId}`, job);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

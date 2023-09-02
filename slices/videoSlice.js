import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const initialState = {
  videos: [],
  selected: {},
  loading: false,
  error: "",
  updateVideoLoading: false,
  updateVideoError: "",
  updateVideoSuccess: false,
  deleteVideoLoading: false,
  deleteVideoError: "",
  deleteVideoSuccess: false,
  addVideoLoading: false,
  addVideoError: "",
  addVideoSuccess: false,
};
export const getVideoes = createAsyncThunk("videos/getVideos", () => {
  return axios
    .get("http://localhost:3000/videos")
    .then((response) => {
      return response.data;
    });
});
export const addVideo = createAsyncThunk("videos/addVideo", (body) => {
  return axios
    .post("http://localhost:3000/videos",body)
    .then((response) => {
      console.log(response);
      return [];
    });
});
export const deleteVideo = createAsyncThunk("videos/deleteVideo", (Id) => {
  return axios
    .delete(`http://localhost:3000/videos/${Id}`)
    .then((response) => {
      return [];
    });
});
export const updateVideo = createAsyncThunk("videos/updateVideo", (body) => {
  console.log(body)
  return axios
    .put(`http://localhost:3000/videos/${body.id}`,body)
    .then((response) => {
      console.log(response)
      return [];
    });
});
export const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addSelectedVideo: (state, action) => {
      state.selected = action.payload;
    },
    resetAddVideoState : (state)=>{
      state.addVideoLoading = false;
      state.addVideoError = "";
      state.addVideoSuccess = false;
    },
    resetDeleteVideoState : (state)=>{
      state.deleteVideoLoading = false;
      state.deleteVideoError = "";
      state.deleteVideoSuccess = false;
    },
    resetUpdateVideoState : (state)=>{
      state.updateVideoLoading = false;
      state.updateVideoError = "";
      state.updateVideoSuccess = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getVideoes.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getVideoes.fulfilled, (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      state.error = "";
    });
    builder.addCase(getVideoes.rejected, (state, action) => {
      state.loading = false;
      state.videos = [];
      state.error = action.error.message;
    });
    builder.addCase(addVideo.pending, (state) => {
      state.addVideoLoading = true;
      state.addVideoError = "";
      state.addVideoSuccess = false;
    });
    builder.addCase(addVideo.fulfilled, (state, action) => {
      state.addVideoLoading = false;
      state.addVideoError = "";
      state.addVideoSuccess = true;
    });
    builder.addCase(addVideo.rejected, (state, action) => {
      state.addVideoLoading = false;
      state.addVideoError = action.error.message;
      state.addVideoSuccess = false;
    });
    builder.addCase(deleteVideo.pending, (state) => {
      state.deleteVideoLoading = true;
      state.deleteVideoError = "";
      state.deleteVideoSuccess = false;
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      state.deleteVideoLoading = false;
      state.deleteVideoError = "";
      state.deleteVideoSuccess = true;
    });
    builder.addCase(deleteVideo.rejected, (state, action) => {
      state.deleteVideoLoading = false;
      state.deleteVideoError = action.error.message;
      state.deleteVideoSuccess = false;
    });
    builder.addCase(updateVideo.pending, (state) => {
      state.updateVideoLoading = true;
      state.updateVideoError = "";
      state.updateVideoSuccess = false;
    });
    builder.addCase(updateVideo.fulfilled, (state, action) => {
      state.updateVideoLoading = false;
      state.updateVideoError = "";
      state.updateVideoSuccess = true;
    });
    builder.addCase(updateVideo.rejected, (state, action) => {
      state.updateVideoLoading = false;
      state.updateVideoError = action.error.message;
      state.updateVideoSuccess = false;
    });
  },
});
export const { addSelectedVideo,resetAddVideoState,resetDeleteVideoState,resetUpdateVideoState } = videoSlice.actions;
export default videoSlice.reducer;

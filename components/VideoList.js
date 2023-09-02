import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import { getVideoes } from "@/slices/videoSlice";
import { Button,Grid} from "@mui/material";
import { useRouter } from "next/router";

export default function VideoList() {
  const router = useRouter();
  const videoData = useSelector((state) => state.videos);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getVideoes());
  }, []);
  const handleAddClick= ()=>{
     router.push({
        pathname: "/videos/add"
     })
  }
  return (
    <div className="p-5 h-screen bg-slate-300">
      <Grid container>
        <Grid item xs={6}><p className="text-left ml-10 text-4xl">List of videos</p></Grid>
        <Grid item xs={6} className="flex justify-end">
        <Button variant="contained" className="add-button" onClick={handleAddClick}>Add Video</Button>
        </Grid>
        
      </Grid>
      {videoData.loading && <div>Loading...</div>}
      {!videoData.loading && !videoData.error && videoData.videos && videoData.videos.length>0 &&(
        <div className="video-list-container">
          {videoData.videos.map((video) => {
            return (
              <VideoCard
                video={video}
                key={video.title}
              />
            );
          })}
        </div>
      )}
      {!videoData.loading && !videoData.error && videoData.videos && videoData.videos.length===0 &&(
        <div className="flex justify-center items-center h-screen">
          <p className="text-2xl text-red-600">No Video Found!! Please add video</p>
        </div>
      )}
      {!videoData.loading && videoData.error &&(
        <div className="flex justify-center items-center h-screen">
        <p className="text-2xl text-red-600">Error in loading video!! Please try again</p>
      </div>
      )}
    </div>
  );
}

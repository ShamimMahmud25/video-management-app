import React, { useState, useEffect } from "react";
import EditVideo from "./EditVideo";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { deleteVideo, resetDeleteVideoState } from "@/slices/videoSlice";
import SucessComponent from "./SucessComponent";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";

export default function VideoDetails() {
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.videos);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(true);
  const router = useRouter();
  const handleEditClick = () => {
    setShowEdit(true);
  };
  const handleDeleteClick =()=>{
    setShowDelete(false)
     dispatch(deleteVideo(videoData.selected.videoId))
  }
  const handleCancel = () => {
    router.push({
      pathname: "/videos/list",
    });
  };
 useEffect(()=>{
    return ()=>{
        dispatch(resetDeleteVideoState())
    }
 },[])
  return (
    <>
      {!showEdit && showDelete &&(
        <div className="details-container">
          <div className="details-card">
            <video controls className="mydetailsvideo">
              <source src={videoData.selected.url} type="video/mp4" />
            </video>
            <div className="mycontainer">
              <h4>{videoData.selected.title}</h4>
              <p>{videoData.selected.description}</p>
              <div className="flex justify-center items-center">
                <div className="flex justify-start items-start w-full space-x-20">
                  <Button
                    onClick={handleEditClick}
                    className="text-xl w-1/2  text-white bg-blue-500"
                    variant="contained"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={handleDeleteClick}
                    className="text-xl w-1/2  text-white bg-blue-500"
                    variant="contained"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!showEdit && !showDelete && (
        <>
        {videoData.deleteVideoLoading && (
          <LoadingComponent message="Deleting....." />
        )}
        {!videoData.deleteVideoLoading && videoData.deleteVideoError && (
          <ErrorComponent
            message={videoData.deleteVideoError}
            onBtnClicked={handleCancel}
            buttonText="Okay"
          />
        )}
        {!videoData.deleteVideoLoading && videoData.deleteVideoSuccess && (
          <SucessComponent
            message="Update sucessfully"
            onBtnClicked={handleCancel}
            buttonText="Okay"
          />
        )}
      </>
      )}
      {showEdit && (
        <EditVideo
          title={videoData.selected.title}
          description={videoData.selected.description}
          url={videoData.selected.url}
          handleCancel={handleCancel}
          video={videoData.selected}
        />
      )}
    </>
  );
}

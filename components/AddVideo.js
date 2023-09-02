import { addVideo, resetAddVideoState } from "@/slices/videoSlice";
import { Grid, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import SucessComponent from "./SucessComponent";
import ErrorComponent from "./ErrorComponent";
import LoadingComponent from "./LoadingComponent";

export default function AddVideo() {
  const dispatch = useDispatch();
  const videoData = useSelector((state) => state.videos);
  const router = useRouter();
  const [newUrl, setNewUrl] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [urlError, setUrlError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [showAddVideo, setShowAddVideo] = useState(true);
  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
    if (e.target.value == "") {
      setUrlError("this field is mendatory");
    } else {
      setUrlError("");
    }
  };
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
    if (e.target.value == "") {
      setTitleError("this field is mendatory");
    } else {
      setTitleError("");
    }
  };
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
    if (e.target.value == "") {
      setDescriptionError("this field is mendatory");
    } else {
      setDescriptionError("");
    }
  };
  const handleUpdate = () => {
    setShowAddVideo(false);
    const data = {
      url: newUrl,
      title: newTitle,
      description: newDescription,
    };
    dispatch(addVideo(data));
  };
  const handleCancel = () => {
    router.push({
      pathname: "/videos/list",
    });
  };
  useEffect(() => {
    return () => {
      dispatch(resetAddVideoState());
    };
  }, []);
  return (
    <>
      {showAddVideo && (
        <Grid container className="edit-container">
          <Grid item className="edit-item-container">
            <TextField
              id="outlined-basic"
              label="URL"
              required
              multiline
              maxRows={4}
              value={newUrl}
              onChange={handleUrlChange}
              className="edit-item"
              placeholder="Enter URL"
              error={urlError !==""}
              helperText={urlError}
            />
            <TextField
              id="outlined-basic"
              label="Title"
              multiline
              required
              maxRows={4}
              value={newTitle}
              onChange={handleTitleChange}
              className="edit-item"
              placeholder="Enter Title"
              error={titleError !==""}
              helperText={titleError}
            />
            <TextField
              id="outlined-basic"
              label="Description"
              multiline
              required
              maxRows={4}
              value={newDescription}
              onChange={handleDescriptionChange}
              className="edit-item"
              placeholder="Enter Description"
              error={descriptionError !==""}
              helperText={descriptionError}
            />
            <Grid className="flex justify-start space-x-20 items-end mt-20">
              <Button
                onClick={handleUpdate}
                className="update-button"
                variant="contained"
                disabled={
                  urlError != "" ||
                  titleError != "" ||
                  descriptionError != "" ||
                  (newUrl === "" || newTitle === "" || newDescription === "")
                }
              >
                Save
              </Button>
              <Button
                onClick={handleCancel}
                className="cancel-button"
                variant="contained"
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
      {!showAddVideo && (
        <>
          {videoData.addVideoLoading && (
            <LoadingComponent message="Adding....." />
          )}
          {!videoData.addVideoLoading && videoData.addVideoError && (
            <ErrorComponent
              message={videoData.addVideoError}
              onBtnClicked={handleCancel}
              buttonText="Okay"
            />
          )}
          {!videoData.addVideoLoading && videoData.addVideoSuccess && (
            <SucessComponent
              message="Video Added sucessfully"
              onBtnClicked={handleCancel}
              buttonText="Okay"
            />
          )}
        </>
      )}
    </>
  );
}

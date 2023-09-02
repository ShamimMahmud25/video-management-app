import React from "react";
import { addSelectedVideo } from "@/slices/videoSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export default function VideoCard({video}) {
    const dispatch = useDispatch();
    const router =useRouter();
    const {url,title,description,id} = video;
    const handleClick=()=>{
       dispatch(addSelectedVideo(video));
        router.push({
            pathname: '/videos/details',
          });
    }
  return (
    <div className="card" onClick={handleClick}>
      <video controls className="myvideo">
        <source
          src={url}
          type="video/mp4"
        />
      </video>
      <div className="mycontainer">
        <h4 className="font-semibold text-xl text-blue-400">{title}</h4>
        <p className="italic">{description}</p>
      </div>
    </div>
  );
}

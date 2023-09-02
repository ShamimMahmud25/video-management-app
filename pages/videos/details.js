import VideoDetails from "@/components/VideoDetails"
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function details() {
    const router = useRouter();
  return (
    <VideoDetails/>
  )
}
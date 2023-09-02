import { useRouter } from 'next/router'
import { Button } from '@mui/material';

export default function HomeComponent() {
  const router = useRouter();
  const handleGoBtn =()=>{
    router.push({
        pathname: "/videos/list",
      });
  }
  return (
    <div className="home-container">
     <h1 className='text-3xl'>Welcome to Video Management App</h1>
     <Button variant="contained" className='text-white bg-blue-500 mt-10' onClick={handleGoBtn}>Go to List page</Button>
    </div>
  )
}

import { configureStore } from '@reduxjs/toolkit'
import videoReducer from "../slices/videoSlice"

// create a slice 

// config the store 
const store= configureStore({
   reducer: {
      videos: videoReducer
   }
})

// export default the store 
export default store
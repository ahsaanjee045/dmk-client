import {configureStore} from "@reduxjs/toolkit"
import authSlice from "../slices/authSlice"


const store = configureStore({
    // manager 
    reducer : {
        userState : authSlice
    }
})

export default store
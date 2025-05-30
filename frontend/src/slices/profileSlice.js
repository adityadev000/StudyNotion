import { createSlice } from "@reduxjs/toolkit" ;
//it gives data of current user
let storedUser = null;
try {
    const rawUser = localStorage.getItem("user");
    if (rawUser && rawUser !== "undefined") {
        storedUser = JSON.parse(rawUser);
    }
    } catch (err) {
    console.error("Failed to parse user from localStorage:", err);
}
const initialState = {
    user: storedUser,
    loading : false , 
} ; 

const ProfileSlice = createSlice({
    name : "profile" , 
    initialState : initialState ,
    reducers : {
        setUser(state , action ) {
            state.user = action.payload ; 
            // console.log('user at profile' , state.user );
            if (action.payload === null  ) {
                localStorage.removeItem("user");  // Clear user on logout
            } else {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        setLoading(state , action ){
            state.loading = action.payload
        }
    }
})

export const {setUser , setLoading} = ProfileSlice.actions ;
export default ProfileSlice.reducer ; 
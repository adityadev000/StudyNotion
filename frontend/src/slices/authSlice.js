import { createSlice } from "@reduxjs/toolkit" ;
const initialState = {
    token :  localStorage.getItem("token") || null ,
    loading : false , 
    sidebar : false , 
    sidebar2 : true , 
} ; 

const AuthSlice = createSlice({
    name : "auth" , 
    initialState : initialState ,
    reducers : {
        setToken(state , action ) {
            state.token = action.payload ; 
            if (action.payload === null) {
                localStorage.removeItem("token");  // Clear token on logout
            } else {
                localStorage.setItem("token", action.payload);
            }
// console.log('token at auth' , state.token );
        },
        setLoading(state , action ){
            state.loading = action.payload
        },
        setSidebar(state , action ){
            state.sidebar = action.payload
        },
        setSidebar2(state , action ){
            state.sidebar2 = action.payload
        },
    }
})

export const {setToken , setLoading , setSidebar , setSidebar2} = AuthSlice.actions ;
export default AuthSlice.reducer ; 
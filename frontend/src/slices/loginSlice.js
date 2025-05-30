import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    email : "" , 
    password : "" , 
    confirmPassword : "" , 
    firstName : "" ,
    lastName : "" ,
    currentUser : "Student" , 
    ShowPassword : false , 
    ShowPassword2 : false , 
    token : "" , 
} ; 

const LoginSlice = createSlice({
    name : "login" , 
    initialState : initialState , 
    reducers : {
        setFormData(state , action ){
            const {email , password , ShowPassword ,ShowPassword2 ,  firstName , lastName , confirmPassword  , currentUser , token }  = action.payload ;
            state.email = email !== undefined ? email : state.email ; 
            state.password = password !== undefined ? password : state.password ; 
            state.firstName = firstName !== undefined ? firstName : state.firstName ; 
            state.lastName = lastName !== undefined ? lastName : state.lastName ; 
            state.confirmPassword = confirmPassword !== undefined ? confirmPassword : state.confirmPassword ; 
            state.currentUser = currentUser !== undefined ? currentUser : state.currentUser ; 
            state.ShowPassword = ShowPassword !== undefined ? ShowPassword : state.ShowPassword ; 
            state.ShowPassword2 = ShowPassword2 !== undefined ? ShowPassword2 : state.ShowPassword2 ; 
            state.token = token !== undefined ? token : state.token ; 
        } , 
        resetFormData(state) {
            state.email = "" 
            state.password ="" 
            state.confirmPassword=""
            state.firstName ="" 
            state.lastName= "" 
            state.currentUser = "Student"
            state.ShowPassword = false 
            state.ShowPassword2 = false 
        }
    }
})

export const {setFormData , resetFormData } = LoginSlice.actions ; 
export default LoginSlice.reducer
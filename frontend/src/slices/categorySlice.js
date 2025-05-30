import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category : [] , 
    fullCatalog : false , 
}

const categorySlice = createSlice({
    name : "catalog" , 
    initialState : initialState ,
    reducers : {
        setCategory(state , action){
            state.category = action.payload
        },
        setCatalog(state , action){
            state.fullCatalog = action.payload
        },
    }
})

export const {setCategory , setCatalog} = categorySlice.actions ; 
export default categorySlice.reducer ;


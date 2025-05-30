// store.js
import { configureStore } from "@reduxjs/toolkit"
import rootReducer from "./rootReducer"

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true, // enables redux-thunk
      serializableCheck: false, // optional: disables warnings for non-serializable data
    }),
})

export default store
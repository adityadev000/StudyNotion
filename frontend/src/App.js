import "./App.css";
import {Route , Routes, useNavigate} from "react-router-dom" ; 
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import OpenRoute from "./components/auth/OpenRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./components/common/Error";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/cart";
import Settings from "./components/core/Dashboard/Settings/Settings";
import AddCourse from "./components/core/Dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import InstructorDashboard from "./components/core/Dashboard/InstructorDashboard/InstructorDashboard";
import ContactUs from "./pages/ContactUs";
import { setToken } from "./slices/authSlice";
import { resetCart } from "./slices/cartSlice";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { setUser } from "./slices/profileSlice";

function App() {

  const {user} = useSelector((state) => state.profile) ;
  const dispatch = useDispatch() ;
  const navigate = useNavigate() 

      const logout = ()=> {
              dispatch(setToken(null) ) 
              dispatch(setUser(null))
              dispatch(resetCart())
      
              localStorage.removeItem("token")
              localStorage.removeItem("user")
              toast.success("Logged out ")
              navigate("/") ; 
      }
  
      useEffect(() => {
        const now = new Date() ; 
          if( user?.DeletedAt  ){
            const deleteDate = new Date(user.DeletedAt) 
              if(deleteDate <= now) {
                logout() ; 
              }
          }
      },[user] )

  return (
    <div className=" max-w-screen min-h-screen overflow-x-hidden bg-richblack-900 flex flex-col  font-inter scrollable pt-14" >
      <Navbar/>
      <Routes>


        <Route path="/"  element={<Home/>} />
        <Route path="/login"  element={<OpenRoute><Login/></OpenRoute>} />
        <Route path="/signup"  element={<OpenRoute><Signup/></OpenRoute>} />
        <Route path="/verify-email"  element={<OpenRoute><VerifyEmail/></OpenRoute>} />
        <Route path="/forgot-password"  element={<OpenRoute><ResetPassword/></OpenRoute>} />
        <Route path="/update-password/:token"  element={<OpenRoute><UpdatePassword/></OpenRoute>} />
          <Route path="/About"  element={<About/>} />
          <Route path="/contact"  element={<ContactUs/>} />
          <Route path="/catalog/:catalogName"  element={<Catalog/>} />
          <Route path="/courses/:courseId"  element={<CourseDetails/>} />

        <Route path=""  element={<PrivateRoute><Dashboard/></PrivateRoute>}>
          <Route path="/dashboard/my-profile"  element={<MyProfile/>} />
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="/dashboard/enrolled-courses"  element={<EnrolledCourses/>} />
                <Route path="/dashboard/cart"  element={<Cart/>} />
              </>
            )
          }
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
              <>
                <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>} />
                <Route path="/dashboard/add-course" element={<AddCourse/>} />
                <Route path="/dashboard/my-courses" element={<MyCourses/>} />
              <Route path="/dashboard/instructor" element={<InstructorDashboard/>} />
              </>
            )
          }
          <Route path="/dashboard/settings"  element={<Settings/>} />
        </Route>

        <Route path="" element={<PrivateRoute><ViewCourse/></PrivateRoute>}>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT && (
              <>
                <Route path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId" element={<VideoDetails/>}/>
              </>
            )
          }
        </Route>

          <Route path="*"  element={<Error/>} />
      </Routes>
    </div>
  )
}
export default App;

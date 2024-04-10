import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { Login } from "./pages/Login";
import { Navbar } from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import { ForgotPassword } from "./pages/ForgotPassword";
import { UpdatePassword } from "./pages/UpdatePassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import ConfirmationModal from "./components/common/ConfirmationModal";
import { useNavigate } from 'react-router-dom';
import { logout } from './services/operations/authAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Settings from "./components/core/Dashboard/Settings";
import Cart from "./components/core/Dashboard/Cart";
import AddCourse from "./components/core/Dashboard/Add Course";
import { ACCOUNT_TYPE } from "./utils/constants";
import { MyCourses } from "./components/core/Dashboard/MyCourse";
import { EditCourse } from "./components/core/Dashboard/Add Course/EditCourse";
import { Catalog } from "./pages/Catalog";
import { CourseDetail } from "./pages/CourseDetail";
import { ViewCourse } from "./pages/ViewCourse";
import { VideoDetails } from "./components/core/ViewCourse/VideoDetails";
import { Instructor } from "./components/core/Dashboard/Instructor";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmationModal,setConfirmationModal] = useState(null);
  const { user } = useSelector(state => state.profile);

  const showConfirmationModal = ()=>{
    setConfirmationModal({
      text1:"Are you sure?",
      text2:"You will be logged out of your account.",
      btnText1:"Logout",
      btnText2:"Cancel",
      btnHandler1:()=>{
        setConfirmationModal(null);
        dispatch(logout(navigate));
      },
      btnHandler2:()=>{setConfirmationModal(null)}
    });
  }


  return (
    <div className="w-screen min-h-screen bg-richblack-900 text-white font-inter">
      <Navbar />
      
      {
        confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
      }
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="courses/:courseId" element={<CourseDetail/>} />
        <Route path="about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="/catalog/:catalogName" element={<Catalog/>}/>

        <Route
          path="signup"
          element={
            <OpenRoute>
              <SignUp />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />

        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
        
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />

        {/* Dashboard Paths */}
        <Route
          element={
            <PrivateRoute>
              <Dashboard showConfirmationModal={showConfirmationModal}/>
            </PrivateRoute>
          }>
          
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile/>}
          />
          
          <Route
            path="/dashboard/settings"
            element={<Settings/>}
          />

          {/* Student Routes */}
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourses/>}
              />
              <Route
                path="/dashboard/purchase-history"
                element={<MyProfile/>}
              />   
              <Route
                path="/dashboard/cart"
                element={<Cart/>}
              />
            </>
          }

          {/* Instructor Routes */}
          {
            user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
            <>
              <Route
                path="/dashboard/add-course"
                element={<AddCourse/>}
              />

              <Route
                path="/dashboard/edit-course/:id"
                element={<EditCourse/>}
              />

              <Route
                path="/dashboard/my-courses"
                element={<MyCourses/>}
              />

              <Route
                path="/dashboard/instructor"
                element={<Instructor/>}
              />
            </>
          }

        </Route>
      

        {/* Route for watching Lectures */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse/>
            </PrivateRoute>
          }
        >

          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&
            <>
              <Route
                path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails/>}
              />
            </>
          }

        </Route>

        {/* Error Paths */}
        <Route
          path="*"
          element={<div className="h-screen w-screen flex items-center justify-center">
            <p>Error 404 - Page Not Found </p>
          </div>}
        />
      
      </Routes>
    </div>
  );
}

export default App;

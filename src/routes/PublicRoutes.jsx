import { Routes, Route, useNavigate } from "react-router-dom";
import '../App.css';
import Admin from "../pages/Admin/Admin";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AboutUs from "../pages/AboutUs";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PrivateRoutes from "./PrivateRoutes";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminMenu from "../pages/Admin/AdminMenu";
import UserEdit from "../pages/Admin/UserEdit";
import MenuEdit from "../pages/Admin/MenuEdit";
// import { useEffect } from 'react';

const PublicRoutes = () => {
  // const { setContextState, contextState } = useContextState();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const userData = getLocalStorage('user');
  //   if (userData) {
  //     setContextState({ type: ActionTypes.SET_USER_DATA, value: userData });
  //   }

  // }, []);
  return (
    <>
    <div className="page-container"> 
    <div className="content-wrap">
      <Navbar title="Rolling Code <>" />
      <Routes>
        { <Route path="/" element={<Home />} />
          /* <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/contact" element={<Contact />} /> */}
        <Route path="/about-us" element={<AboutUs />} />
        {/* <PrivateRoutes> */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/clients" element={<AdminUsers />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route
          path="/admin/edit/user/:id"
          exact
          element={
            <UserEdit />
          }
        />
          <Route
          path="/admin/edit/product/:id"
          exact
          element={
            <MenuEdit />
          }
        />
        {/* </PrivateRoutes> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default PublicRoutes;

import { Routes, Route } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import "../App.css"; 
import Home from "../pages/Home";
import Navbar from "../components/Navbar/Navbar";

import PrivateRoutes from "./PrivateRoutes";
import AdminUsers from "../pages/Admin/AdminUsers";
import AdminMenu from "../pages/Admin/AdminMenu";
import UserEdit from "../pages/Admin/UserEdit";
import MenuEdit from "../pages/Admin/MenuEdit";
import Products from "../pages/Products";
import AboutUs from "../pages/About-Us/AboutUs";
import NotFound from "../pages/NotFound";
import Pedidos from "../pages/Admin/pedidos";
import Footer from "../components/Footer/Footer";

const PublicRoutes = () => {

  return (
    <>
    <div className="page-container">
      <div className="content-wrap">

      
    
    
      <Navbar title="Rolling Code <>" />
      <Routes>
        {
          <Route path="/" element={<Home />} />

        }
        <Route path="/about-us" element={<AboutUs />} />
        <Route
          path="/admin"
          element={
            <PrivateRoutes>
              <Admin />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/clients"
          element={
            <PrivateRoutes>
              <AdminUsers />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <PrivateRoutes>
              <Pedidos />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <PrivateRoutes>
              <AdminMenu />
            </PrivateRoutes>
          }
        />
        <Route path="/Products" element={<Products />} />
        <Route
          path="/admin/edit/user/:id"
          exact
          element={
            <PrivateRoutes>
              <UserEdit />
            </PrivateRoutes>
          }
        />
        <Route
          path="/admin/edit/product/:id"
          exact
          element={
            <PrivateRoutes>
              <MenuEdit />
            </PrivateRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default PublicRoutes;

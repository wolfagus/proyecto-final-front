import { Routes, Route, useNavigate } from 'react-router-dom';
import Admin from '../pages/Admin';
import Home from '../pages/Home';
import Login from '../pages/Login';
import AboutUs from '../pages/AboutUs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
        {/* <Navbar title="Rolling Code <>" /> */}
        <Routes>
          {/* <Route path="/" element={<Home />} />
          <Route path="/verify-account" element={<VerifyAccount />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route
            path="/admin"
            element={
            //   <PrivateRoutes>
                <Admin />
            //   </PrivateRoutes>
            }
          />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        {/* <Footer /> */}
      </>
    );
  };
  
  export default PublicRoutes;
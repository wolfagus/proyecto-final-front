import { Routes, Route, useNavigate } from 'react-router-dom';
import Admin from '../pages/Admin';
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
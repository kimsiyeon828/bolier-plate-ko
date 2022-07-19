
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage'

// auth option  -> function (SpecificComponent, option, adminRoute)
// option
// null 아무나 출입 가능한 페이지
// true 로그인한 유저만 출입 가능한 페이지
// false 로그인한 유저는 출입 불가능한 페이지


function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route exact path="/" element={Auth(<LandingPage/>, null)} />
          <Route exact path="/login" element={Auth(<LoginPage/>, false)} />
          <Route exact path="/register" element={Auth(<RegisterPage/>, false)} /> */}
          <Route exact path="/" element={<LandingPage/>} />
          <Route exact path="/login" element={<LoginPage/>} />
          <Route exact path="/register" element={<RegisterPage/>} />
          <Route exact path="/video/upload" element={<VideoUploadPage/>} />
        </Routes>
    </BrowserRouter>
  )
}

export default App;

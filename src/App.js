import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useEffect } from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";

import "./App.css"
function App() {
  useEffect(()=>{
    let vh=window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    console.log(process.env.REACT_APP_apiKey);
    console.log("test")
  })
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home/>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

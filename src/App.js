import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import { useContext, useEffect } from "react";
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom";
import {AuthContext} from "./context/AuthContext";

import "./App.css"

function App() {
  const {currentUser}= useContext(AuthContext);
  const ProtectedRoute=({children})=>{
   if(!currentUser)
   return <Navigate to="/login"/>;
   else return children
  }
  useEffect(()=>{
    let vh=window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>} />
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
        </Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

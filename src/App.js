import Home from "./pages/Home"
import Register from "./pages/Register"
import { useEffect } from "react";
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
      <Register/>
    </div>
  );
}

export default App;

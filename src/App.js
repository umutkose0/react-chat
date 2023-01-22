import Home from "./pages/Home"
import { useEffect } from "react";
import "./App.css"
function App() {
  useEffect(()=>{
    let vh=window.innerHeight*0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;

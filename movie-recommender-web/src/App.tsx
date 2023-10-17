import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./screens/home/Home";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </>
  );
}

export default App;

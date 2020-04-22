import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Favorites from "./components/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Route exact path="/" component={Home} />
        {/* <Route exact path="/favorites" component={Favorites} /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

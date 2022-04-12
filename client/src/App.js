import React from "react";
import { Route, Switch } from "react-router-dom"
import "./App.css";
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Contact from './Components/Contact';
import Cart from "./Components/Cart";
import Error from "./Components/Error";
import Footer from "./Components/Footer";
import axios from "axios";
import { ToastContainer } from "react-toastify";



axios.defaults.withCredentials=true;

function App() {
  return (
    <>
      <div className="page-container">

        <div className="content-wrap">

          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/signin">
              <Login />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>

            {/* <Route path="*" component={Home}/> */}
            {/* gave to remove it , can be used instead of 404 page*/}

            <Route>
              <Error />
            </Route>
          </Switch>
          <ToastContainer />
        </div>

        <Footer />

      </div>
    </>
  );
}

export default App;

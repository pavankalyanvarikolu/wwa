import React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import ViewBookingsPage from "./pages/ViewBookingsPage";
import AdminBookingsPage from "./pages/AdminBookingsPage";
import Errorpage from "./pages/ErrorPage";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/admin" element={<AdminPage />}></Route>
          <Route path="/bookings" element={<ViewBookingsPage />}></Route>
          <Route path="/admin/bookings" element={<AdminBookingsPage />}></Route>
          <Route path="*" element={<Errorpage/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

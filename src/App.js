import "./App.css";
import { Route, Routes, useNavigate, Router } from "react-router-dom";
import Login from "./components/Login";
// import TravelIn from "./components/TravelIn";
// import Protected from "./components/Protected";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Destination from "./pages/Destination";
import AdminHome from "./pages/AdminHome";
import Booking from "./pages/Booking";
import Packages from "./pages/Packages";
import Contactpage from "./pages/Contactpage";
import UserDetail from "./pages/UserDetail";
import Protected from "./components/Protected";
import AddPackage from "./components/AddPackage";
import PackForm from "./components/packForm";
function App() {
  let Navigator = useNavigate();
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={<Protected Component={AdminHome} />}>
          <Route
            path="UserDetail"
            element={<Protected Component={UserDetail} />}
          ></Route>
          <Route
            path="booking"
            element={<Protected Component={Booking} />}
          ></Route>
          <Route path="Contact" element={<Contactpage />}></Route>
          <Route path="destination" element={<Destination />}></Route>
          <Route path="packages" element={<Packages />}></Route>
          <Route path="*" element={<Navigator to="UserDetail" />}></Route>
          <Route path="addpackage" element={<AddPackage />}></Route>
          <Route path="form" element={<PackForm />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

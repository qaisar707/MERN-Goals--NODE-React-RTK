import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import HeaderComponent from "./components/HeaderComponent";
import "react-toastify/dist/ReactToastify.css";
import EditForm from "./components/EditForm";

function App() {

  return (
    <>
      <Router>
        <div className="container">
          <HeaderComponent />
          <Routes>
            <Route exact="/" path="/" element={<Dashboard />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/UpdateGoals/:id" element={<EditForm />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/resetPassword/:id" element={<ResetPassword />} />
          </Routes>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </>
  );
}

export default App;

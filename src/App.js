import './App.css';
import Chat from './components/Chat';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from './components/Navbar';

function App() {

  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children
  };
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <ProtectedRoute>
              <Navbar />
            </ProtectedRoute>
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

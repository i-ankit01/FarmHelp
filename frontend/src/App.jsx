import { useState } from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import './App.css'
import LandingPage from './pages/LandingPage';
import { UserLogin } from './pages/UserLogin';
import { UserSignup } from './pages/UserSignup';
import { CompanySignup } from './pages/CompanySignup';
import { CompanyLogin } from './pages/CompanyLogin';
import UserDashboard from './pages/UserDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import UserSettings from './pages/UserSettings';
import UserOrders from './pages/UserOrders';
import FindFarmers from './pages/FindFarmers';
import Demo from './pages/demo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signin/user" element={<UserLogin/>} />
          <Route path="/signin/company" element={<CompanyLogin/>} />
          <Route path="/signup/user" element={<UserSignup/>} />
          <Route path="/signup/company" element={<CompanySignup/>} />
          <Route path="/dashboard/user" element={<UserDashboard/>} />
          <Route path="/dashboard/company" element={<CompanyDashboard/>} />
          <Route path="/settings/user" element={<UserSettings/>} />
          <Route path="/orders/user" element={<UserOrders/>} />
          <Route path="/find" element={<FindFarmers/>} />
          <Route path="/demo" element={<Demo/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

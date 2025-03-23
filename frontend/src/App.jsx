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
import UserHelp from './pages/UserHelp';
import CompanyHelp from './pages/CompanyHelp';
import CompanyOrder from './pages/CompanyOrder';

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
          <Route path="/farmers/search" element={<FindFarmers/>} />
          <Route path="/help/user" element={<UserHelp/>} />
          <Route path="/help/company" element={<CompanyHelp/>} />
          <Route path="/orders/company" element={<CompanyOrder/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

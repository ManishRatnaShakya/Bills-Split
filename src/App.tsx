import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Layout from './layout/AppLayout';
import { Trips } from './pages/trips/Trips';
import { Settings } from './pages/settings/Settings';
import { AppSidebar } from './components/ui/app-sidebar';
import { UsersList } from './pages/users/UsersList';
import { AuthLayout } from './layout/AuthLayout';
import { RegisterForm } from './pages/auth/RegisterPage';
import { ForgotPasswordForm } from './pages/auth/ForgorPasswordForm';
import { BillsSplitPage } from './pages/bills-split/BillsSplitPage';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path="/trips" element={<Trips/>}></Route>
          <Route path="/users" element={<UsersList/>}></Route>
          <Route path="/trips/:id" element={<BillsSplitPage/>}/>
          </Route>
          <Route path="/auth" element={<AuthLayout/>}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterForm />} />        
            <Route path='forgot-password' element={<ForgotPasswordForm/>}/>
          </Route>
        <Route path="*" element={<NotFoundPage />} />  {/* 404 fallback */}
      </Routes>
    </Router>
  )
}

export default App

import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { Dashboard } from './pages/Dashboard/Dashboard';
import Layout from './layout/AppLayout';
import { Trips } from './pages/trips/Trips';
import { Settings } from './pages/settings/Settings';
import { NewTrip } from './pages/trips/NewTrip';
import { AppSidebar } from './components/ui/app-sidebar';
import { UsersList } from './pages/users/UsersList';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout children= {<AppSidebar/>} />}>
          <Route path="/" element={<Dashboard/>} />
          <Route path="/settings" element={<Settings/>}></Route>
          <Route path="/trips" element={<Trips/>}></Route>
          <Route path="/users" element={<UsersList/>}></Route>
          </Route>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />  {/* 404 fallback */}
      </Routes>
    </Router>
  )
}

export default App

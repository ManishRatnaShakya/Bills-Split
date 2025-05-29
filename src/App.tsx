import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/auth/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { Dashboard } from './pages/Dashboard/Dashboard';
import AppLayout from './layout/AppLayout';


function App() {

  return (
    <Router>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard/>} />
        </Route>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />  {/* 404 fallback */}
      </Routes>
    </Router>
  )
}

export default App

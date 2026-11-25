import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminApp } from './pages/AdminApp'
import { CustomerApp } from './pages/CustomerApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerApp />} />
        <Route path="/admin" element={<AdminApp />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

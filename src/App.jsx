import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import CreateCrewmate from './pages/CreateCrewmate'
import CrewmateGallery from './pages/CrewmateGallery'
import CrewmateDetails from './pages/CrewmateDetails'
import UpdateCrewmate from './pages/UpdateCrewmate'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateCrewmate />} />
          <Route path="/gallery" element={<CrewmateGallery />} />
          <Route path="/crewmate/:id" element={<CrewmateDetails />} />
          <Route path="/edit/:id" element={<UpdateCrewmate />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

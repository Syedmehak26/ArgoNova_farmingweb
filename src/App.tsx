import { Routes, Route } from 'react-router-dom';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SoilHealth from './pages/SoilHealth';
import DiseaseGuide from './pages/DiseaseGuide';
import CropRotation from './pages/CropRotation';
import HomeGrower from './pages/HomeGrower';
import LearningCenter from './pages/LearningCenter';
import MarketDashboard from './pages/MarketDashboard';

function AppContent() {
  return (
    <div className="min-h-screen bg-[#F5EDE0]">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/soil-health" element={<SoilHealth />} />
          <Route path="/disease-guide" element={<DiseaseGuide />} />
          <Route path="/crop-rotation" element={<CropRotation />} />
          <Route path="/home-grower" element={<HomeGrower />} />
          <Route path="/learning" element={<LearningCenter />} />
          <Route path="/market" element={<MarketDashboard />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </I18nProvider>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import NavBar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import About from './pages/association/About';
import Vidiotique from './pages/viddiotique/Vidiotique';
import Contact from './pages/Contact/Contact';
import Footer from './components/footer/Footer';
import Admin from './pages/Admin/Admin';
import Team from './pages/Admin/team/Team';
import Register from './pages/Admin/auth/Register';
import Login from './pages/Admin/auth/Login';
import MediaManager from './pages/Admin/mediaManager/MediaManager';
import Agpc from './pages/conference/AGPC/Agpc';
import Digestive from './pages/conference/digestive/Digestive';
import Hepatologie from './pages/conference/hepatologie/Hepatologie';
import Authers from './pages/conference/authers/Authers';
import { Outlet } from 'react-router-dom';
import Bureau from './pages/association/BUREAU/Bureau';
import Statuts from './pages/association/Statuts/Statuts';
import Agenda from './pages/Agenda/Agenda';
import Partenaire from './pages/Partenaire/partenaire';
import Members from './pages/association/Members/Members';
import WelcomLoader from './components/loader/welcomloader/WelcomLoader';
import Counter from './components/Counter/Counter';
import AnimatedCursor from 'react-animated-cursor';
import Index_Hepatologie from './pages/conference/hepatologie/index_Hepatologie';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulate a delay for the loader (you can adjust this or remove it)
    setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds delay
  }, []);

  if (loading) {
    return <WelcomLoader />;
  }

  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div>
      <NavBar className="navbar" />
      <div className="pt-20 md:pt-[90px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vidiotique" element={<Vidiotique />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/partenaires" element={<Partenaire />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="membres" element={<Team />} />
            <Route path="mediamanager" element={<MediaManager />} />
          </Route>
          {/* Association Routes */}
          <Route path="/association" element={<Outlet />}>
            <Route path="about" element={<About />} />
            <Route path="bureau" element={<Bureau />} />
            <Route path="membres" element={<Members />} />
            <Route path="statuts" element={<Statuts />} />
          </Route>
          {/* Conference Routes */}
          <Route path="/conferences" element={<Outlet />}>
            <Route path="agpc" element={<Agpc />} />
            <Route path="echographie_digestive" element={<Digestive />} />
            <Route path="journees_hepatologie" element={<Index_Hepatologie />} />
            <Route path="hepatologie/:dateParam" element={<Hepatologie />} />
            <Route path="authers_conferences" element={<Authers />} />
          </Route>
        </Routes>
      </div>
      <Footer className="footer" />
      {!isAdminRoute && (
        <AnimatedCursor
          innerSize={20}
          outerSize={20}
          color='234, 38, 29' // use #ea261d
          outerAlpha={0.2}
          innerScale={0.7}
          outerScale={5}
          clickables={[
            'a', 'p', 'h3', 'img', 'span',
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            'label[for]',
            'select',
            'textarea',
            'button',
            '.link'
          ]}
        />
      )}
    </div>
  );
}

export default App;

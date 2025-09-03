import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Aside from './components/Aside';
import ToTopButton from './components/ToTopButton';
import Home from './pages/Home';
import Reviews from './pages/Reviews';
import Team from './pages/Team';
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import './styles/base.css';
import './styles/layout.css';

function App() {
  return (
    <Router>
      <div className="layout">
        <Header />
        
        <main className="main">
          <div className="container">
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/team" element={<Team />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Aside />
            </div>
          </div>
        </main>
        
        <Footer />
        <ToTopButton />
      </div>
    </Router>
  );
}

export default App;

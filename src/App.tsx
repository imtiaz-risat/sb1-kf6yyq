import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Learn from './pages/Learn';
import Video from './pages/Video';
import Playground from './pages/Playground';
import LivePlayground from './pages/LivePlayground';
import DevDiscuss from './pages/DevDiscuss';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/video/:videoId" element={<Video />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/live-playground/:sessionId" element={<LivePlayground />} />
            <Route path="/devdiscuss" element={<DevDiscuss />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
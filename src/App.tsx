import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WhatsAppGenerator from './components/WhatsAppGenerator';
import Generators from './components/Generators';
import About from './components/About';

function App() {

  return (
    <div className="min-h-screen bg-white">
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/about" element={<About />} />
         <Route path="/whatsapp-chat-generator" element={<WhatsAppGenerator />} />
         <Route path="/generators" element={<Generators />} />
       </Routes>
    </div>
  );
}

export default App;
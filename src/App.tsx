import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import WhatsAppGenerator from './components/WhatsAppGenerator';

function App() {

  return (
    <div className="min-h-screen bg-white">
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/whatsapp-chat-generator" element={<WhatsAppGenerator />} />
       </Routes>
    </div>
  );
}

export default App;
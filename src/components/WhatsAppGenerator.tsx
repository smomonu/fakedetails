import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Mic, 
  Send,
  Check,
  CheckCheck,
  Camera,
  Image,
  FileText,
  MapPin,
  User,
  Settings,
  Search,
  Bell,
  Moon,
  Download,
  Copy,
  Shuffle,
  Trash2,
  Plus
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'audio' | 'document';
}

interface Contact {
  name: string;
  phone: string;
  avatar: string;
  status: string;
  lastSeen: string;
}

function WhatsAppGenerator() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'contact',
      timestamp: '10:30 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished my morning workout 💪',
      sender: 'user',
      timestamp: '10:32 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '3',
      text: 'That\'s awesome! What kind of workout did you do?',
      sender: 'contact',
      timestamp: '10:33 AM',
      status: 'read',
      type: 'text'
    },
    {
      id: '4',
      text: 'Just some cardio and strength training. Feeling energized! ⚡',
      sender: 'user',
      timestamp: '10:35 AM',
      status: 'delivered',
      type: 'text'
    }
  ]);

  const [contact, setContact] = useState<Contact>({
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    status: 'online',
    lastSeen: 'last seen today at 10:35 AM'
  });

  const [newMessage, setNewMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [chatTheme, setChatTheme] = useState('default');
  const [showTimestamps, setShowTimestamps] = useState(true);
  const [showReadReceipts, setShowReadReceipts] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent',
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate message status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'delivered' } : msg
        ));
      }, 1000);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'read' } : msg
        ));
      }, 2000);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const randomizeContact = () => {
    const contacts = [
      {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        status: 'online',
        lastSeen: 'last seen today at 10:35 AM'
      },
      {
        name: 'Mike Chen',
        phone: '+1 (555) 987-6543',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        status: 'typing...',
        lastSeen: 'last seen today at 9:45 AM'
      },
      {
        name: 'Emma Wilson',
        phone: '+1 (555) 456-7890',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        status: 'online',
        lastSeen: 'last seen today at 11:20 AM'
      }
    ];
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    setContact(randomContact);
  };

  const exportChat = () => {
    const chatData = {
      contact,
      messages,
      exportDate: new Date().toISOString(),
      theme: chatTheme
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `whatsapp-chat-${contact.name.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const copyToClipboard = () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp}] ${msg.sender === 'user' ? 'You' : contact.name}: ${msg.text}`
    ).join('\n');
    
    navigator.clipboard.writeText(chatText).then(() => {
      alert('Chat copied to clipboard!');
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const backgroundStyles = {
    default: 'bg-gray-100',
    dark: 'bg-gray-900',
    green: 'bg-green-50',
    blue: 'bg-blue-50'
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* iPhone 16 Pro Max Container */}
      <div className="iphone-container bg-black rounded-[3rem] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Dynamic Island */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50"></div>
          
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 pt-12 pb-2 bg-white text-black text-sm font-medium">
            <div className="flex items-center space-x-1">
              <span>9:41</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-black rounded-full"></div>
                <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              </div>
              <div className="w-6 h-3 border border-black rounded-sm">
                <div className="w-4 h-2 bg-green-500 rounded-sm m-0.5"></div>
              </div>
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-teal-600 text-white px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link to="/" className="p-1">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <img 
                src={contact.avatar} 
                alt={contact.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-base">{contact.name}</h3>
                <p className="text-xs text-teal-100">{contact.status}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Video className="w-5 h-5" />
              <Phone className="w-5 h-5" />
              <button onClick={() => setShowSettings(!showSettings)}>
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="absolute top-20 right-4 bg-white rounded-lg shadow-xl border z-40 w-64 p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  <input
                    type="text"
                    value={contact.name}
                    onChange={(e) => setContact({...contact, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={contact.status}
                    onChange={(e) => setContact({...contact, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="online">online</option>
                    <option value="typing...">typing...</option>
                    <option value="last seen recently">last seen recently</option>
                  </select>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Show Timestamps</span>
                  <button
                    onClick={() => setShowTimestamps(!showTimestamps)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      showTimestamps ? 'bg-teal-600' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      showTimestamps ? 'translate-x-6' : 'translate-x-1'
                    }`}></div>
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={randomizeContact}
                    className="flex-1 bg-teal-600 text-white px-3 py-2 rounded-md text-sm hover:bg-teal-700 flex items-center justify-center"
                  >
                    <Shuffle className="w-4 h-4 mr-1" />
                    Random
                  </button>
                  <button
                    onClick={clearChat}
                    className="flex-1 bg-red-500 text-white px-3 py-2 rounded-md text-sm hover:bg-red-600 flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear
                  </button>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={exportChat}
                    className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-purple-500 text-white px-3 py-2 rounded-md text-sm hover:bg-purple-600 flex items-center justify-center"
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ height: 'calc(100vh - 280px)', maxHeight: '500px' }}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-teal-500 text-white rounded-br-md'
                      : 'bg-white text-gray-800 rounded-bl-md shadow-sm border'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <div className={`flex items-center justify-end mt-1 space-x-1 ${
                    message.sender === 'user' ? 'text-teal-100' : 'text-gray-500'
                  }`}>
                    {showTimestamps && (
                      <span className="text-xs">{message.timestamp}</span>
                    )}
                    {message.sender === 'user' && showReadReceipts && (
                      <div className="ml-1">
                        {getStatusIcon(message.status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="bg-gray-50 px-4 py-3 flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <button className="p-2 text-gray-500 hover:text-gray-700">
                <Plus className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center space-x-3 border">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                placeholder="Message"
                className="flex-1 outline-none text-sm"
              />
              <button className="text-gray-500 hover:text-gray-700">
                <Smile className="w-5 h-5" />
              </button>
            </div>
            
            {newMessage.trim() ? (
              <button
                onClick={addMessage}
                className="bg-teal-600 text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            ) : (
              <button className="text-gray-500 hover:text-gray-700 p-2">
                <Mic className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Home Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full opacity-60"></div>
        </div>
      </div>

      {/* Desktop Controls */}
      <div className="hidden lg:block ml-8 bg-white rounded-xl shadow-lg p-6 w-80">
        <h3 className="text-xl font-bold text-gray-900 mb-6">WhatsApp Chat Generator</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
            <input
              type="text"
              value={contact.name}
              onChange={(e) => setContact({...contact, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="text"
              value={contact.phone}
              onChange={(e) => setContact({...contact, phone: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={contact.status}
              onChange={(e) => setContact({...contact, status: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="online">online</option>
              <option value="typing...">typing...</option>
              <option value="last seen recently">last seen recently</option>
              <option value="last seen today at 10:35 AM">last seen today at 10:35 AM</option>
            </select>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Show Timestamps</span>
            <button
              onClick={() => setShowTimestamps(!showTimestamps)}
              className={`w-12 h-6 rounded-full transition-colors ${
                showTimestamps ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                showTimestamps ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between py-2">
            <span className="text-sm text-gray-700">Read Receipts</span>
            <button
              onClick={() => setShowReadReceipts(!showReadReceipts)}
              className={`w-12 h-6 rounded-full transition-colors ${
                showReadReceipts ? 'bg-teal-600' : 'bg-gray-300'
              }`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                showReadReceipts ? 'translate-x-6' : 'translate-x-1'
              }`}></div>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-4">
            <button
              onClick={randomizeContact}
              className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center justify-center"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Random
            </button>
            <button
              onClick={clearChat}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear
            </button>
            <button
              onClick={exportChat}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center justify-center"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhatsAppGenerator;
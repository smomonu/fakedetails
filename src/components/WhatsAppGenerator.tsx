import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  ArrowLeft, 
  Send, 
  Paperclip, 
  Smile, 
  Mic, 
  Phone, 
  Video, 
  MoreVertical,
  Check,
  CheckCheck,
  Camera,
  Settings,
  Search,
  Download,
  Copy,
  Shuffle,
  MessageCircle,
  User,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface Contact {
  name: string;
  phone: string;
  avatar: string;
  status: string;
  lastSeen: string;
}

const WhatsAppGenerator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! How are you doing?',
      sender: 'contact',
      timestamp: '10:30 AM',
    },
    {
      id: '2',
      text: 'I\'m doing great! Just finished my morning workout 💪',
      sender: 'user',
      timestamp: '10:32 AM',
      status: 'read'
    },
    {
      id: '3',
      text: 'That\'s awesome! What kind of workout did you do?',
      sender: 'contact',
      timestamp: '10:33 AM',
    },
    {
      id: '4',
      text: 'Just some cardio and strength training. Feeling energized!',
      sender: 'user',
      timestamp: '10:35 AM',
      status: 'delivered'
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
  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('ios');
  const [_showSettings, _setShowSettings] = useState(false);
  const [_chatTheme, _setChatTheme] = useState<'light' | 'dark'>('light');
  const [_showTimestamps, _setShowTimestamps] = useState(true);
  const [_showReadReceipts, _setShowReadReceipts] = useState(true);
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
        status: 'sent'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const editMessage = (id: string, newText: string) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, text: newText } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const _clearChat = () => {
    setMessages([]);
  };

  const _randomizeContact = () => {
    const contacts = [
      {
        name: 'Alex Chen',
        phone: '+1 (555) 987-6543',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        status: 'online',
        lastSeen: 'last seen today at 11:20 AM'
      },
      {
        name: 'Maria Rodriguez',
        phone: '+1 (555) 456-7890',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        status: 'typing...',
        lastSeen: 'last seen today at 9:45 AM'
      },
      {
        name: 'David Kim',
        phone: '+1 (555) 321-0987',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
        status: 'last seen 5 minutes ago',
        lastSeen: 'last seen today at 10:15 AM'
      }
    ];
    const randomContact = contacts[Math.floor(Math.random() * contacts.length)];
    setContact(randomContact);
  };

  const _exportChat = () => {
    const chatData = {
      contact,
      messages,
      deviceType,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(chatData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `whatsapp-chat-${contact.name.replace(/\s+/g, '-').toLowerCase()}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const _copyToClipboard = async () => {
    const chatText = messages.map(msg => 
      `[${msg.timestamp}] ${msg.sender === 'user' ? 'You' : contact.name}: ${msg.text}`
    ).join('\n');
    
    try {
      await navigator.clipboard.writeText(chatText);
      alert('Chat copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const renderStatusIcon = (status?: string) => {
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

  const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                WhatsApp Generator
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls */}
          <div className="mb-8 bg-white rounded-xl shadow-sm p-6">
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-700">Device:</span>
                  <button
                    onClick={() => setDeviceType('ios')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      deviceType === 'ios'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    iOS
                  </button>
                  <button
                    onClick={() => setDeviceType('android')}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      deviceType === 'android'
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Android
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={_randomizeContact}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Shuffle className="w-4 h-4 mr-2" />
                  Random Contact
                </button>
                <button
                  onClick={_exportChat}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button
                  onClick={_copyToClipboard}
                  className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </button>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div className="flex justify-center">
            <div className={`relative ${deviceType === 'ios' ? 'iphone-container' : 'android-container'} mx-auto`}>
              {/* Phone Frame */}
              <div className={`
                relative w-full h-full
                ${deviceType === 'ios' 
                  ? 'bg-black rounded-[3rem] p-2 shadow-2xl iphone-aspect' 
                  : 'bg-gray-900 rounded-[2rem] p-1 shadow-2xl android-aspect'
                }
              `}>
                {/* Android Camera Hole */}
                {deviceType === 'android' && (
                  <div className="android-camera-hole"></div>
                )}

                {/* Screen */}
                <div className={`
                  w-full h-full bg-white overflow-hidden relative
                  ${deviceType === 'ios' ? 'rounded-[2.5rem]' : 'rounded-[1.5rem]'}
                `}>
                  {/* Status Bar */}
                  <div className={`
                    flex justify-between items-center px-6 py-2 text-black text-sm font-medium
                    ${deviceType === 'ios' ? 'pt-4' : 'pt-6'}
                  `}>
                    <div className="flex items-center space-x-1">
                      <span>{currentTime}</span>
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
                  <div className="bg-[#075E54] px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button className="text-white">
                        <ArrowLeft className="w-6 h-6" />
                      </button>
                      <img
                        src={contact.avatar}
                        alt={contact.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium text-base">{contact.name}</h3>
                        <p className="text-white/80 text-xs">{contact.status}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="text-white">
                        <Video className="w-5 h-5" />
                      </button>
                      <button className="text-white">
                        <Phone className="w-5 h-5" />
                      </button>
                      <button className="text-white">
                        <MoreVertical className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Chat Background */}
                  <div 
                    className="flex-1 bg-[url(https://i.imgur.com/oa8e0pS.png)] bg-cover bg-center relative"
                    style={{ height: 'calc(100% - 120px)' }}
                  >
                    {/* Messages Container */}
                    <div className="h-full overflow-y-auto px-4 py-2 custom-scrollbar">
                      <div className="space-y-2">
                        {messages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`
                                max-w-[75%] px-3 py-2 rounded-lg relative group cursor-pointer
                                ${message.sender === 'user'
                                  ? 'bg-[#25D366] text-white rounded-br-sm'
                                  : 'bg-white text-gray-900 rounded-bl-sm shadow-sm'
                                }
                              `}
                              onClick={() => {
                                const newText = prompt('Edit message:', message.text);
                                if (newText !== null && newText !== message.text) {
                                  editMessage(message.id, newText);
                                }
                              }}
                            >
                              <p className="text-sm leading-relaxed break-words">{message.text}</p>
                              <div className={`
                                flex items-center justify-end space-x-1 mt-1
                                ${message.sender === 'user' ? 'text-white/70' : 'text-gray-500'}
                              `}>
                                <span className="text-xs">{message.timestamp}</span>
                                {message.sender === 'user' && renderStatusIcon(message.status)}
                              </div>
                              
                              {/* Delete button on hover */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteMessage(message.id);
                                }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center justify-center"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="bg-[#f0f0f0] px-4 py-2 flex items-center space-x-2">
                    <button className="text-gray-600">
                      <Smile className="w-6 h-6" />
                    </button>
                    <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                        placeholder="Type a message"
                        className="flex-1 outline-none text-sm"
                      />
                      <button className="text-gray-600">
                        <Paperclip className="w-5 h-5" />
                      </button>
                      <button className="text-gray-600">
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={addMessage}
                      className="bg-[#25D366] text-white p-2 rounded-full hover:bg-[#128C7E] transition-colors"
                    >
                      {newMessage.trim() ? <Send className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-green-500" />
              How to Use
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <User className="w-4 h-4 mr-2 text-blue-500" />
                  Editing Messages
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click any message bubble to edit its text</li>
                  <li>• Hover over messages to see the delete button</li>
                  <li>• Messages automatically scroll to bottom</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-purple-500" />
                  Customization
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Switch between iOS and Android styles</li>
                  <li>• Use "Random Contact" for different profiles</li>
                  <li>• Export chat as JSON or copy as text</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppGenerator;
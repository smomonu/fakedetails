import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Send, 
  Download, 
  Copy as _Copy, 
  Trash2, 
  User, 
  Clock, 
  Check, 
  CheckCheck, 
  Phone, 
  Video, 
  MoreVertical,
  ArrowLeft,
  Smile,
  Paperclip,
  Mic,
  Camera as _Camera,
  Plus,
  Settings,
  Search,
  RefreshCw,
  Menu,
  X,
  Star,
  ArrowRight as _ArrowRight,
  Globe,
  Lock as _Lock,
  Zap as _Zap,
  Shield,
  Code,
  TestTube2,
  Palette,
  Mail,
  ChevronDown,
  Smartphone,
  Monitor
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'voice' | 'video';
}

interface Contact {
  name: string;
  phone: string;
  avatar: string;
  status: string;
  lastSeen: string;
}

const WhatsAppGenerator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentSender, setCurrentSender] = useState<'user' | 'contact'>('user');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contact, setContact] = useState<Contact>({
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ',
    status: 'Hey there! I am using WhatsApp.',
    lastSeen: 'online'
  });
  const [userProfile, _setUserProfile] = useState({
    name: 'You',
    avatar: 'YU'
  });
  const [_showSettings, _setShowSettings] = useState(false);
  const [_chatTheme, _setChatTheme] = useState<'light' | 'dark'>('light');
  const [showTimestamps, _setShowTimestamps] = useState(true);
  const [showReadReceipts, _setShowReadReceipts] = useState(true);
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  
  // Mobile Settings
  const [hideHeader, setHideHeader] = useState(false);
  const [hideFooter, setHideFooter] = useState(false);
  const [darkTheme, setDarkTheme] = useState(false);
  const [deviceType, setDeviceType] = useState<'android' | 'iphone'>('android');
  const [networkType, setNetworkType] = useState('5G');
  const [currentTime, setCurrentTime] = useState('10:04 AM');
  const [batteryPercentage, setBatteryPercentage] = useState(50);
  const [showBatteryPercentage, setShowBatteryPercentage] = useState(true);
  const [hidePayment, setHidePayment] = useState(false);
  const [dualSim, setDualSim] = useState(false);
  const [chatArrow, setChatArrow] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);



  const sampleContacts = [
    { name: 'Sarah Johnson', phone: '+1 (555) 123-4567', status: 'Hey there! I am using WhatsApp.', lastSeen: 'online' },
    { name: 'Mike Chen', phone: '+1 (555) 987-6543', status: 'Busy at work', lastSeen: 'last seen today at 2:30 PM' },
    { name: 'Emma Wilson', phone: '+1 (555) 456-7890', status: 'Living my best life 🌟', lastSeen: 'last seen yesterday at 11:45 PM' },
    { name: 'Alex Rodriguez', phone: '+1 (555) 321-0987', status: 'Available', lastSeen: 'last seen today at 9:15 AM' },
    { name: 'Lisa Thompson', phone: '+1 (555) 654-3210', status: 'Coffee lover ☕', lastSeen: 'online' }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Realistic Chat Interface',
      description: 'Pixel-perfect WhatsApp design with authentic message bubbles, timestamps, and status indicators.'
    },
    {
      icon: User,
      title: 'Dual Sender Mode',
      description: 'Switch between sending messages as yourself or the contact to create natural conversations.'
    },
    {
      icon: Settings,
      title: 'Full Customization',
      description: 'Customize contact details, chat themes, timestamps, and read receipts for perfect scenarios.'
    },
    {
      icon: Download,
      title: 'Export Options',
      description: 'Download conversations as text files or copy to clipboard for easy sharing and documentation.'
    },

    {
      icon: Shield,
      title: 'Privacy Focused',
      description: 'All conversations are generated locally in your browser. No data is stored or transmitted.'
    }
  ];

  const useCases = [
    {
      icon: TestTube2,
      title: 'App Testing',
      description: 'Test chat interfaces, messaging features, and user flows with realistic conversation data.',
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: 'Design Mockups',
      description: 'Create compelling design presentations and prototypes with authentic chat conversations.',
      color: 'bg-purple-500'
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Generate test data for chat applications, messaging systems, and social media platforms.',
      color: 'bg-blue-500'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Mobile App Developer',
      content: 'This WhatsApp generator saved me hours of creating test conversations. The authenticity is incredible!',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'UX Designer',
      content: 'Perfect for creating realistic mockups. Clients love seeing actual conversation flows in presentations.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'QA Engineer',
      content: 'Essential tool for testing chat features. The export functionality makes documentation so much easier.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Is this the real WhatsApp?',
      answer: 'No, this is a fake WhatsApp chat generator for creating realistic-looking conversations for testing, presentations, and educational purposes. It\'s not connected to the real WhatsApp service.'
    },
    {
      question: 'Can I export the conversations?',
      answer: 'Yes! You can download conversations as text files or copy them to your clipboard. This makes it easy to share or document your generated chats.'
    },
    {
      question: 'Are the conversations saved anywhere?',
      answer: 'No, all conversations are generated and stored locally in your browser. Nothing is sent to our servers, ensuring complete privacy.'
    },
    {
      question: 'Can I customize the contact information?',
      answer: 'Absolutely! You can customize the contact name, phone number, status message, and last seen information to create any scenario you need.'
    },
    {
      question: 'What formats can I export to?',
      answer: 'Currently, you can export conversations as plain text files (.txt) or copy the formatted text to your clipboard for pasting elsewhere.'
    }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: currentSender,
      timestamp: new Date(),
      status: 'read',
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const _clearChat = () => {
    setMessages([]);
  };



  const _randomizeContact = () => {
    const randomContact = sampleContacts[Math.floor(Math.random() * sampleContacts.length)];
    setContact({
      ...randomContact,
      avatar: randomContact.name.split(' ').map(n => n[0]).join('')
    });
  };

  const _exportChat = () => {
    const chatText = messages.map(msg => {
      const time = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sender = msg.sender === 'user' ? userProfile.name : contact.name;
      return `[${time}] ${sender}: ${msg.text}`;
    }).join('\n');

    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `whatsapp-chat-${contact.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const _copyToClipboard = () => {
    const chatText = messages.map(msg => {
      const time = msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sender = msg.sender === 'user' ? userProfile.name : contact.name;
      return `[${time}] ${sender}: ${msg.text}`;
    }).join('\n');

    navigator.clipboard.writeText(chatText);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-500" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-500" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-[#53bdeb]" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  WhatsApp Generator
                </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#use-cases" className="text-gray-600 hover:text-purple-600 transition-colors">Use Cases</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Reviews</a>
              <a href="#faq" className="text-gray-600 hover:text-purple-600 transition-colors">FAQ</a>
              <Link 
                to="/"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Back to Home
              </Link>
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
                Start Generating
              </button>
            </nav>

            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Features</a>
              <a href="#use-cases" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Use Cases</a>
              <a href="#testimonials" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Reviews</a>
              <a href="#faq" className="block px-3 py-2 text-gray-600 hover:text-purple-600">FAQ</a>
              <Link 
                to="/"
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600"
              >
                Back to Home
              </Link>
              <div className="px-3 py-2">
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg">
                  Start Generating
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Back to Tools Link */}
            <div className="mb-6">
              <Link 
                to="/"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              WhatsApp Generator
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Create realistic WhatsApp conversations with our intuitive interface. 
              Customize every detail to match your needs perfectly.
            </p>
          </div>
        </div>
      </section>

      {/* Chat Generator Interface */}
      <section id="generator" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* View Mode Toggle */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-6xl">
              <div className="flex bg-gray-100 rounded-lg p-1 shadow-sm">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    viewMode === 'desktop'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span>Desktop View</span>
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex-1 flex items-center justify-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                    viewMode === 'mobile'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Mobile View</span>
                </button>
              </div>
            </div>
          </div>

          {/* Settings Panel */}
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-6xl">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                {viewMode === 'desktop' ? (
                  /* Desktop Settings - Simplified */
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={hideFooter}
                          onChange={(e) => setHideFooter(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-600">Hide Footer</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={darkTheme}
                          onChange={(e) => setDarkTheme(e.target.checked)}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                        />
                        <span className="text-sm text-gray-600">Dark Theme</span>
                      </label>
                    </div>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
                      <Plus className="w-4 h-4" />
                      <span>Add Message</span>
                    </button>
                  </div>
                ) : (
                  /* Mobile Settings - Full Panel */
                  <>
                    <div className="grid grid-cols-3 gap-6">
                      
                      {/* Layout Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Layout :</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={hideHeader}
                              onChange={(e) => setHideHeader(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Hide Header</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={hideFooter}
                              onChange={(e) => setHideFooter(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Hide Footer</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={darkTheme}
                              onChange={(e) => setDarkTheme(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Dark Theme</span>
                          </label>
                        </div>
                      </div>

                      {/* Network Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Network</h3>
                        <div className="space-y-3">
                          <div>
                            <label className="flex items-center space-x-2 mb-2">
                              <input
                                type="radio"
                                name="deviceType"
                                checked={deviceType === 'android'}
                                onChange={() => setDeviceType('android')}
                                className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-600">Android</span>
                            </label>
                            <label className="flex items-center space-x-2">
                              <input
                                type="radio"
                                name="deviceType"
                                checked={deviceType === 'iphone'}
                                onChange={() => setDeviceType('iphone')}
                                className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                              />
                              <span className="text-sm text-gray-600">iPhone</span>
                            </label>
                          </div>
                          <div>
                            <select
                              value={networkType}
                              onChange={(e) => setNetworkType(e.target.value)}
                              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            >
                              <option value="5G">5G</option>
                              <option value="4G">4G</option>
                              <option value="3G">3G</option>
                              <option value="WiFi">WiFi</option>
                            </select>
                          </div>
                          <div className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={currentTime.includes('AM') || currentTime.includes('PM') ? 
                                currentTime.replace(' AM', '').replace(' PM', '') : '10:04'}
                              onChange={(e) => {
                                const time = e.target.value;
                                const [hours, minutes] = time.split(':');
                                const hour12 = parseInt(hours) > 12 ? parseInt(hours) - 12 : parseInt(hours);
                                const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
                                setCurrentTime(`${hour12}:${minutes} ${ampm}`);
                              }}
                              className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <Clock className="w-4 h-4 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      {/* Battery Options Section */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Battery Options</h3>
                        <div className="space-y-3">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={showBatteryPercentage}
                              onChange={(e) => setShowBatteryPercentage(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Show Percentage</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={hidePayment}
                              onChange={(e) => setHidePayment(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Hide Payment</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={dualSim}
                              onChange={(e) => setDualSim(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Dual Sim</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={chatArrow}
                              onChange={(e) => setChatArrow(e.target.checked)}
                              className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                            />
                            <span className="text-sm text-gray-600">Chat Arrow</span>
                          </label>
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="text-sm text-gray-600">{batteryPercentage}</span>
                              <span className="text-sm text-gray-600">% Battery</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={batteryPercentage}
                              onChange={(e) => setBatteryPercentage(parseInt(e.target.value))}
                              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex space-x-3">
                        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
                          <Plus className="w-4 h-4" />
                          <span>Add Message</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          <Palette className="w-4 h-4" />
                          <span>Change Background</span>
                        </button>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm">
                          <RefreshCw className="w-4 h-4" />
                          <span>Reset Background</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Chat Interface */}
            <div className="w-full max-w-6xl">
              <div className={`${viewMode === 'mobile' ? 'flex justify-center items-center min-h-screen py-2 max-w-full overflow-hidden' : ''}`}>
                <div className={`${viewMode === 'mobile' ? 'relative bg-black p-3 rounded-[3rem] shadow-2xl w-full iphone-container mx-2 overflow-hidden' : ''}`}>
                  {viewMode === 'mobile' && (
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-28 h-5 bg-black rounded-full z-20"></div>
                  )}
                  <div className={`bg-white overflow-hidden ${viewMode === 'mobile' ? 'w-full h-full rounded-[2.5rem] shadow-inner flex flex-col iphone-aspect max-w-full' : 'w-full rounded-xl shadow-lg border border-gray-200'}`}>
                  {/* iOS Status Bar */}
                  {viewMode === 'mobile' && (
                    <div className="bg-white px-6 pt-4 pb-2 flex justify-between items-center text-black text-sm font-medium relative z-10">
                      <div className="flex items-center space-x-1">
                        <span className="font-semibold">9:41</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-black rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                        </div>
                        <div className="w-7 h-3.5 border border-black rounded-sm relative">
                          <div className="w-5 h-2.5 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
                          <div className="w-0.5 h-1 bg-black rounded-sm absolute -right-1 top-1"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* Chat Header */}
                  <div className={`${viewMode === 'mobile' ? 'bg-[#075e54] px-3 py-2.5 flex-shrink-0' : 'bg-gray-100 border-b border-gray-300 px-6 py-3'}`}>
                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-2.5 min-w-0 flex-1' : 'space-x-4'}`}>
                      {viewMode === 'mobile' && (
                        <button className="text-white hover:text-gray-200 transition-colors flex-shrink-0">
                          <ArrowLeft className="w-4 h-4" />
                        </button>
                      )}
                      <div className={`${viewMode === 'mobile' ? 'w-8 h-8 flex-shrink-0' : 'w-10 h-10'} bg-gray-300 rounded-full flex items-center justify-center text-gray-700 font-semibold ${viewMode === 'mobile' ? 'text-sm' : 'text-lg'}`}>
                        {contact.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className={`font-medium truncate ${viewMode === 'mobile' ? 'text-white text-sm' : 'text-gray-900 text-base'}`}>
                          {contact.name}
                        </h3>
                        <p className={`truncate ${viewMode === 'mobile' ? 'text-gray-200 text-xs' : 'text-gray-500 text-sm'}`}>
                          {contact.lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-3 flex-shrink-0' : 'space-x-6'}`}>
                      {viewMode === 'desktop' && (
                        <button className="text-gray-600 hover:text-gray-800 transition-colors">
                          <Search className="w-5 h-5" />
                        </button>
                      )}
                      <button className={`${viewMode === 'mobile' ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                        <Video className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                      <button className={`${viewMode === 'mobile' ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                        <Phone className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                      <button className={`${viewMode === 'mobile' ? 'text-white hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors`}>
                        <MoreVertical className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Chat Messages */}
                <div 
                    className={`${viewMode === 'mobile' ? 'flex-1' : 'h-96'} overflow-y-auto ${viewMode === 'mobile' ? 'p-3' : 'p-6'} ${viewMode === 'mobile' ? 'space-y-3' : 'space-y-4'}`}
                  style={{
                    backgroundColor: '#efeae2',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg text-gray-500">
                        No messages yet
                      </p>
                      <p className="text-gray-400">
                        Start typing or load a sample conversation
                      </p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`group relative ${viewMode === 'mobile' ? 'max-w-[260px]' : 'max-w-xs lg:max-w-md'}`}>
                          <div
                            className={`${viewMode === 'mobile' ? 'px-3 py-2' : 'px-3 py-2'} rounded-lg ${
                              message.sender === 'user'
                                ? `${viewMode === 'mobile' ? 'bg-[#007aff] text-white rounded-br-md' : 'bg-[#d9fdd3] text-gray-900 rounded-br-sm'}`
                                : `${viewMode === 'mobile' ? 'bg-[#f0f0f0] text-black rounded-bl-md' : 'bg-white text-gray-900 rounded-bl-sm'}`
                            }`}
                            style={{
                              boxShadow: viewMode === 'mobile' ? '0 1px 2px rgba(0,0,0,.1)' : '0 1px 0.5px rgba(0,0,0,.13)'
                            }}
                          >
                            <p className={`${viewMode === 'mobile' ? 'text-base leading-snug' : 'text-sm leading-relaxed'}`}>{message.text}</p>
                            <div className="flex items-center justify-end space-x-1 mt-1">
                              {showTimestamps && (
                                <span className={`text-xs ${
                                  message.sender === 'user' 
                                    ? `${viewMode === 'mobile' ? 'text-blue-200' : 'text-gray-500'}` 
                                    : `${viewMode === 'mobile' ? 'text-gray-600' : 'text-gray-500'}`
                                }`}>
                                  {formatTime(message.timestamp)}
                                </span>
                              )}
                              {message.sender === 'user' && showReadReceipts && (
                                <div className="ml-1">
                                  {getStatusIcon(message.status)}
                                </div>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => deleteMessage(message.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className={`${viewMode === 'mobile' ? 'bg-[#f7f7f7] px-3 py-2 pb-4 max-w-full' : 'bg-[#f0f0f0] border-t border-gray-300 p-4'} flex-shrink-0`}>
                  <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-1 mb-1.5' : 'space-x-2 mb-3'}`}>
                    <span className={`text-gray-600 ${viewMode === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                      Send as:
                    </span>
                    <button
                      onClick={() => setCurrentSender('user')}
                      className={`${viewMode === 'mobile' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} rounded-full font-medium transition-colors ${
                        currentSender === 'user'
                          ? `${viewMode === 'mobile' ? 'bg-[#007aff] text-white' : 'bg-[#25d366] text-white'}`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {userProfile.name}
                    </button>
                    <button
                      onClick={() => setCurrentSender('contact')}
                      className={`${viewMode === 'mobile' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} rounded-full font-medium transition-colors ${
                        currentSender === 'contact'
                          ? `${viewMode === 'mobile' ? 'bg-[#007aff] text-white' : 'bg-[#25d366] text-white'}`
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {contact.name}
                    </button>
                  </div>
                  <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-2 max-w-full' : 'space-x-3'}`}>
                    <button className={`${viewMode === 'mobile' ? 'text-gray-500 hover:text-gray-600 flex-shrink-0' : 'text-gray-600 hover:text-gray-700'} transition-colors`}>
                      <Paperclip className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </button>
                    <div className="flex-1 relative min-w-0">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                        placeholder={`${viewMode === 'mobile' ? 'Message' : 'Type a message'}`}
                        className={`w-full ${viewMode === 'mobile' ? 'px-3 py-2.5 pr-10 text-sm' : 'px-4 py-3 pr-12'} ${viewMode === 'mobile' ? 'rounded-2xl' : 'rounded-full'} bg-white ${viewMode === 'mobile' ? 'border border-gray-200' : 'border border-gray-300'} text-gray-900 placeholder-gray-500 focus:outline-none ${viewMode === 'mobile' ? 'focus:border-blue-300' : 'focus:border-gray-400'}`}
                      />
                      <button className={`absolute ${viewMode === 'mobile' ? 'right-3' : 'right-4'} top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 transition-colors`}>
                        <Smile className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                    </div>
                    {newMessage.trim() ? (
                      <button
                        onClick={addMessage}
                        className={`${viewMode === 'mobile' ? 'w-10 h-10 bg-[#007aff] flex-shrink-0' : 'w-12 h-12 bg-[#25d366]'} text-white rounded-full flex items-center justify-center ${viewMode === 'mobile' ? 'hover:bg-[#0056b3]' : 'hover:bg-[#128c7e]'} transition-colors`}
                      >
                        <Send className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                    ) : (
                      <button className={`${viewMode === 'mobile' ? 'w-10 h-10 flex-shrink-0' : 'w-12 h-12'} text-gray-600 hover:text-gray-700 transition-colors flex items-center justify-center`}>
                        <Mic className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Realistic Chats
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create authentic WhatsApp conversations for any purpose.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Use Case
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From app development to design presentations, see how our WhatsApp generator fits your workflow.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="group hover:transform hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
                  <div className={`w-16 h-16 ${useCase.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <useCase.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{useCase.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what developers, designers, and testers say about our WhatsApp generator
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about the WhatsApp Chat Generator
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-6 h-6 text-gray-500 transition-transform duration-200 flex-shrink-0 ${
                      openFaq === index ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-8 pb-8">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Create Amazing WhatsApp Chats?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Start generating realistic WhatsApp conversations in seconds. Perfect for testing, presentations, and mockups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Generating Now
            </button>
            <Link 
              to="/"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              Explore More Tools
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">WhatsApp Generator</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Create realistic WhatsApp conversations for testing, presentations, and educational purposes.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 cursor-pointer">
                  <Code className="w-4 h-4" />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Features</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Chat Generator</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Customization</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Export Options</a></li>

                <li><a href="#" className="hover:text-white transition-colors">Theme Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Use Cases</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">App Testing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Design Mockups</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Presentations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Education</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><Link to="/" className="hover:text-white transition-colors">Back to Home</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 WhatsApp Generator. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <span className="text-gray-400">Privacy-focused • No data stored</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-gray-400">100% Secure</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WhatsAppGenerator;
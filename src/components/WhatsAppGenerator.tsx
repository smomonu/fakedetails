import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Send, 
  Download, 
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
  Plus,
  Settings,
  RefreshCw,
  Menu,
  X,
  Star,
  Globe,
  Shield,
  Code,
  TestTube2,
  Palette,
  Mail,
  ChevronDown,
  Smartphone,
  Monitor,
  Wifi,
  Signal,
  ChevronLeft,
  StopCircle,
  CircleDot
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'contact';
  timestamp: Date;
  status: 'sending' | 'sent' | 'delivered' | 'read';
  type: 'text' | 'image' | 'voice' | 'video';
  imageDataUrl?: string;
  ephemeral?: boolean;
}

interface Contact {
  name: string;
  phone: string;
  avatar: string;
  status: string;
  lastSeen: string;
  avatarImage?: string;
}

function generateDemoMessages(): Message[] {
  const sampleTexts = [
    'Hey! 👋',
    'Hi, how are you?',
    "I\'m good, you?",
    'Doing well! 😊',
    'Are you coming today?',
    'Yes, surely.',
    'Cool, see you soon!',
    '👍',
    "What\'s the plan?",
    'Lunch at 1?',
    'Perfect.',
    'Sending the file now.',
    'Got it, thanks! 📎',
    'No problem.',
    'Where are you?',
    'On my way.',
    'ETA 10 mins.',
    'Okay.',
    'Call me when free.',
    'Sure! 📞'
  ];

  const now = Date.now();
  return sampleTexts.map((text, index) => ({
    id: `demo-${index + 1}`,
    text,
    sender: index % 2 === 0 ? 'contact' : 'user',
    timestamp: new Date(now - (sampleTexts.length - index) * 120000),
    status: 'read',
    type: 'text'
  }));
}

function getDateKey(date: Date): string {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
}

function formatDateLabel(date: Date): string {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const today = new Date();
  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((t.getTime() - d.getTime()) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';

  const includeYear = d.getFullYear() !== t.getFullYear();
  return d.toLocaleDateString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    ...(includeYear ? { year: 'numeric' } : {})
  });
}

const WhatsAppGenerator: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(() => generateDemoMessages());
  const [newMessage, setNewMessage] = useState('');
  const [currentSender, setCurrentSender] = useState<'user' | 'contact'>('user');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [contact, _setContact] = useState<Contact>({
    name: 'Sarah Johnson',
    phone: '+1 (555) 123-4567',
    avatar: 'SJ',
    status: 'Hey there! I am using WhatsApp.',
    lastSeen: 'online'
  });
  const [userProfile] = useState({
    name: 'You',
    avatar: 'YU'
  });
  const [showTimestamps] = useState(true);
  const [showReadReceipts] = useState(true);
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
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(contact.name);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  
  // NEW: time format + battery style
  const [isTwelveHour, setIsTwelveHour] = useState(true);
  const [batteryStyle, setBatteryStyle] = useState<'Horizontal' | 'Vertical'>('Horizontal');
  
  // Add Message Modal
  const [showAddMessageModal, setShowAddMessageModal] = useState(false);
  const [modalMessageText, setModalMessageText] = useState('');
  const [modalSender, setModalSender] = useState<'user' | 'contact'>('user');
  const [modalDisappearing, setModalDisappearing] = useState(false);
  const [modalTime, setModalTime] = useState('08:00');
  const [modalStatus, setModalStatus] = useState<'sending' | 'sent' | 'delivered' | 'read'>('sent');
  const [modalImageDataUrl, setModalImageDataUrl] = useState<string | undefined>(undefined);
  const modalImageInputRef = useRef<HTMLInputElement>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Recording
  const recordTargetRef = useRef<HTMLDivElement>(null);
  const captureTargetRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingStreamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const mirrorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderIntervalRef = useRef<number | null>(null);

  const features = [
    {
      icon: MessageCircle,
      title: 'Realistic Chat Interface',
      description: 'Pixel‑perfect WhatsApp look with authentic bubbles, timestamps, read receipts, and device‑specific headers.'
    },
    {
      icon: User,
      title: 'Dual Sender Mode',
      description: 'Compose messages as you or your contact to storyboard believable conversations for screenshots and demos.'
    },
    {
      icon: Settings,
      title: 'Deep Customization',
      description: 'Switch iPhone/Android themes, toggle dark mode, edit names and avatars, and control status bar details.'
    },
    {
      icon: Download,
      title: 'Export & Share',
      description: 'Copy conversations or export text for documentation, bug reports, tutorials, and client approvals.'
    },
    {
      icon: Shield,
      title: 'Privacy‑First',
      description: 'Everything runs locally in your browser. We never upload chats or store personal data.'
    },
    {
      icon: RefreshCw,
      title: 'Quick Presets',
      description: 'Load ready‑made conversations to jumpstart screenshots, demos, and testing.'
    }
  ];

  const useCases = [
    {
      icon: TestTube2,
      title: 'App Testing',
      description: 'Test chat flows, message rendering, and edge cases with production‑like conversations — no real accounts needed.',
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: 'Design Mockups',
      description: 'Create high‑fidelity UI screenshots for portfolios, App Store assets, and stakeholder reviews.',
      color: 'bg-purple-500'
    },
    {
      icon: Code,
      title: 'Development',
      description: 'Generate consistent sample chats to validate layouts, typography, and interactions during implementation.',
      color: 'bg-blue-500'
    }
  ];

  const testimonials = [
    {
      name: 'Alex Chen',
      role: 'Mobile App Developer',
      content: 'Super handy for building and testing chat UIs. The device headers and dark mode look just like the real app.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'UX Designer',
      content: 'I can stage believable conversations in minutes for presentations. Clients grasp flows without extra explanation.',
      rating: 5
    },
    {
      name: 'David Kim',
      role: 'QA Engineer',
      content: 'Perfect for regression screenshots and documentation. Zero data risk since everything stays in the browser.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'Is this a real WhatsApp chat?',
      answer: 'No. This is a WhatsApp chat simulator for creating realistic mock conversations. It is not connected to WhatsApp and does not send messages.'
    },
    {
      question: 'Can I export the chats?',
      answer: 'Yes. You can copy the conversation text or download it for documentation, tickets, and tutorials.'
    },
    {
      question: 'Is any data uploaded?',
      answer: 'No. All generation happens locally in your browser. We do not store or transmit your content.'
    },
    {
      question: 'Can I customize contact details?',
      answer: 'Absolutely. Edit the contact name, avatar, last seen, theme, and device‑specific status bar elements.'
    },
    {
      question: 'What else is planned?',
      answer: 'Upcoming ideas include image and voice message placeholders, export to image, and sharable presets.'
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

  const addMessageFromModal = () => {
    const text = modalMessageText.trim();
    if (!text && !modalImageDataUrl) return;

    // Build timestamp from modalTime (HH:mm)
    const now = new Date();
    const [hh, mm] = modalTime.split(':');
    if (hh && mm) {
      now.setHours(parseInt(hh, 10));
      now.setMinutes(parseInt(mm, 10));
    }

    const message: Message = {
      id: Date.now().toString(),
      text: text || (modalImageDataUrl ? '' : ''),
      sender: modalSender,
      timestamp: now,
      status: modalStatus,
      type: modalImageDataUrl ? 'image' : 'text',
      imageDataUrl: modalImageDataUrl,
      ephemeral: modalDisappearing
    };
    setMessages(prev => [...prev, message]);
    setModalMessageText('');
    setModalImageDataUrl(undefined);
    setShowAddMessageModal(false);
    setCurrentSender(modalSender);
  };

  const handleAvatarClick = () => {
    avatarInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      _setContact({ ...contact, avatarImage: dataUrl });
    };
    reader.readAsDataURL(file);
    // reset input so same file can be selected again if desired
    e.currentTarget.value = '';
  };

  const commitNameChange = () => {
    const newName = nameInput.trim();
    if (newName && newName !== contact.name) {
      _setContact({ ...contact, name: newName });
    }
    setIsEditingName(false);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-[#8696A0]" />;
      case 'sent':
        return <Check className="w-3 h-3 text-[#8696A0]" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-[#8696A0]" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-[#53BDEB]" />;
      default:
        return null;
    }
  };

  const getSupportedMimeType = () => {
    const candidates = [
      'video/webm;codecs=vp9',
      'video/webm;codecs=vp8',
      'video/webm',
      'video/mp4' // may not be supported
    ];
    for (const type of candidates) {
      // @ts-ignore
      if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported?.(type)) return type;
    }
    return '';
  };

  const loadHtml2Canvas = async (): Promise<any> => {
    const w = window as any;
    if (w.html2canvas) return w.html2canvas;
    await new Promise<void>((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js';
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Failed to load html2canvas'));
      document.head.appendChild(s);
    });
    return (window as any).html2canvas;
  };

  const downloadChatImage = async () => {
    try {
      const html2canvas = await loadHtml2Canvas();
      const chatElement = captureTargetRef.current;
      
      if (!chatElement) {
        alert('Chat not found');
        return;
      }

      // Wait for fonts and rendering
      await new Promise(resolve => setTimeout(resolve, 200));

      const canvas = await html2canvas(chatElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: darkTheme ? '#0B141A' : '#ffffff',
          letterRendering: true,
        removeContainer: true,
        imageTimeout: 3000,
        ignoreElements: (element: Element) => {
          const el = element as HTMLElement;
          return el.getAttribute?.('data-h2c-ignore') === 'true' || 
                 el.classList?.contains('opacity-0') ||
                 el.style?.visibility === 'hidden';
        },
        onclone: (clonedDoc: Document) => {
          // Fix all Tailwind colors to exact values
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el: Element) => {
            const element = el as HTMLElement;
            if (!element.style) return;

            const classes = element.className?.toString() || '';
            
            // Fix WhatsApp specific colors
            if (classes.includes('bg-[#DCF8C6]')) element.style.backgroundColor = '#DCF8C6';
            if (classes.includes('bg-[#005C4B]')) element.style.backgroundColor = '#005C4B';
            if (classes.includes('bg-[#054640]')) element.style.backgroundColor = '#054640';
            if (classes.includes('bg-[#075E54]')) element.style.backgroundColor = '#075E54';
            if (classes.includes('bg-[#111B21]')) element.style.backgroundColor = '#111B21';
            if (classes.includes('bg-[#1F2C34]')) element.style.backgroundColor = '#1F2C34';
            if (classes.includes('bg-gray-50')) element.style.backgroundColor = '#f9fafb';
            if (classes.includes('bg-gray-100')) element.style.backgroundColor = '#f3f4f6';
            if (classes.includes('text-white')) element.style.color = '#ffffff';
            if (classes.includes('text-gray-900')) element.style.color = '#111827';
            if (classes.includes('text-gray-500')) element.style.color = '#6b7280';

            // Ensure crisp text rendering
            element.style.textRendering = 'optimizeLegibility';
            (element.style as any).fontSmooth = 'always';
            (element.style as any).webkitFontSmoothing = 'antialiased';
          });
        }
      });

      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png', 1.0);
      link.download = `whatsapp-chat.png`;
      link.click();
      
    } catch (error) {
      console.error(error);
      alert('Download failed');
    }
  };

  const startRecording = async () => {
    if (isRecording) return;
    try {
      const el = recordTargetRef.current;
      if (!el) return;

      // Try DisplayMedia + Element Capture crop first
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: { frameRate: 30, width: 1920, height: 1080 },
          audio: false
        });
        const track = stream.getVideoTracks()[0] as any;
        const anyWindow = window as any;
        if (track?.cropTo && anyWindow?.CropTarget && el) {
          const target = await anyWindow.CropTarget.fromElement(el);
          await track.cropTo(target);

          recordingStreamRef.current = stream;
          recordedChunksRef.current = [];
          const mimeType = getSupportedMimeType();
          const recorder = new MediaRecorder(stream, {
            mimeType: mimeType || undefined,
            videoBitsPerSecond: 8_000_000
          });
          mediaRecorderRef.current = recorder;
          recorder.ondataavailable = (e: BlobEvent) => {
            if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
          };
          recorder.onstop = () => {
            const blob = new Blob(recordedChunksRef.current, { type: mimeType || 'video/webm' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const ts = new Date().toISOString().replace(/[:.]/g, '-');
            a.href = url;
            a.download = `whatsapp-chat-${ts}.webm`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
          };
          recorder.start(250);
          setIsRecording(true);
          return;
        } else {
          // Not supported -> stop that stream and fallback
          stream.getTracks().forEach(t => t.stop());
        }
      } catch {
        // Ignore and fallback
      }

      // Fallback: html2canvas -> canvas.captureStream to record ONLY the chat element
      const html2canvas = await loadHtml2Canvas();
      const targetW = 1920;
      const targetH = 1080;
      const canvas = document.createElement('canvas');
      canvas.width = targetW;
      canvas.height = targetH;
      mirrorCanvasRef.current = canvas;
      const ctx = canvas.getContext('2d')!;

      const renderOnce = async () => {
        if (!recordTargetRef.current) return;
        const snapshot: HTMLCanvasElement = await html2canvas(recordTargetRef.current, {
          scale: 2,
          backgroundColor: null,
          useCORS: true
        });
        // Fit snapshot into 1080p canvas (letterbox if needed)
        const sw = snapshot.width;
        const sh = snapshot.height;
        const scale = Math.min(targetW / sw, targetH / sh);
        const dw = Math.round(sw * scale);
        const dh = Math.round(sh * scale);
        const dx = Math.floor((targetW - dw) / 2);
        const dy = Math.floor((targetH - dh) / 2);
        ctx.clearRect(0, 0, targetW, targetH);
        ctx.fillStyle = darkTheme ? '#0B141A' : '#ffffff';
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(snapshot, dx, dy, dw, dh);
      };

      await renderOnce();
      const stream = canvas.captureStream(30);
      recordingStreamRef.current = stream as any;
      recordedChunksRef.current = [];
      const mimeType = getSupportedMimeType();
      const recorder = new MediaRecorder(stream, {
        mimeType: mimeType || undefined,
        videoBitsPerSecond: 8_000_000
      });
      mediaRecorderRef.current = recorder;
      recorder.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) recordedChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        if (renderIntervalRef.current) {
          window.clearInterval(renderIntervalRef.current);
          renderIntervalRef.current = null;
        }
        const blob = new Blob(recordedChunksRef.current, { type: mimeType || 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        const ts = new Date().toISOString().replace(/[:.]/g, '-');
        a.href = url;
        a.download = `whatsapp-chat-${ts}.webm`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
      };
      recorder.start(250);
      // Update frames ~15 fps to balance quality/perf
      renderIntervalRef.current = window.setInterval(renderOnce, 1000 / 15);
      setIsRecording(true);
    } catch (err) {
      console.error('Recording failed', err);
    }
  };

  const stopRecording = () => {
    if (!isRecording) return;
    const recorder = mediaRecorderRef.current;
    if (recorder && recorder.state !== 'inactive') recorder.stop();
    recordingStreamRef.current?.getTracks().forEach(t => t.stop());
    recordingStreamRef.current = null;
    if (renderIntervalRef.current) {
      window.clearInterval(renderIntervalRef.current);
      renderIntervalRef.current = null;
    }
    setIsRecording(false);
  };

  // Reusable iOS-like toggle switch used in settings panel
  const ToggleSwitch: React.FC<{ label: string; checked: boolean; onChange: (checked: boolean) => void; small?: boolean }> = ({ label, checked, onChange, small }) => {
    const trackClasses = small ? 'w-9 h-5' : 'w-10 h-5';
    const knobClasses = small ? 'w-4 h-4 translate-x-0 peer-checked:translate-x-4 top-0.5 left-0.5' : 'w-5 h-5 translate-x-0 peer-checked:translate-x-5 top-0.5 left-0.5';
    return (
      <label className="inline-flex items-center cursor-pointer select-none">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className={`relative ${trackClasses} rounded-full bg-gray-300 peer-checked:bg-teal-600 transition-colors`}> 
          <span className={`absolute bg-white rounded-full transition-transform ${knobClasses}`} />
        </span>
        <span className="ml-3 text-[13px] text-gray-700">{label}</span>
      </label>
    );
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
                  Fake Detail
                </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-600 hover:text-purple-600 transition-colors">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
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
              <Link to="/" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Home</Link>
              <Link to="/about" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
              <Link to="/generators" className="block w-full text-left px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
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
              Fake Detail - WhatsApp Generator
            </h1>
            
            {/* Description */}
            <p className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
              Create realistic WhatsApp conversations for UI mockups, demos, and testing — complete with iPhone/Android styling and dark mode.
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
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6">
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
                    <div className="flex items-center gap-2">
                      <button onClick={() => setShowAddMessageModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
                        <Plus className="w-4 h-4" />
                        <span>Add Message</span>
                      </button>
                      <button onClick={downloadChatImage} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download Image</span>
                      </button>
                      {!isRecording ? (
                        <button onClick={startRecording} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          <CircleDot className="w-4 h-4" />
                          <span>Record</span>
                        </button>
                      ) : (
                        <button onClick={stopRecording} className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                          <StopCircle className="w-4 h-4" />
                          <span>Stop & Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  /* Mobile Settings - Full Panel */
                  <div className="text-[13px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                      {/* Column 1: Toggles */}
                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">&nbsp;</h3>
                        <div className="space-y-4">
                          <ToggleSwitch label="Hide Header" checked={hideHeader} onChange={setHideHeader} small />
                          <ToggleSwitch label="Hide Footer" checked={hideFooter} onChange={setHideFooter} small />
                          <ToggleSwitch label="Dark Theme" checked={darkTheme} onChange={setDarkTheme} small />
                        </div>
                      </div>

                      {/* Column 2: Layout */}
                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">Layout :</h3>
                        <div className="flex flex-col items-start gap-3">
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="deviceType"
                              checked={deviceType === 'android'}
                              onChange={() => setDeviceType('android')}
                              className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="text-[13px] text-gray-700">Android</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input
                              type="radio"
                              name="deviceType"
                              checked={deviceType === 'iphone'}
                              onChange={() => setDeviceType('iphone')}
                              className="w-4 h-4 text-teal-600 border-gray-300 focus:ring-teal-500"
                            />
                            <span className="text-[13px] text-gray-700">iPhone</span>
                          </label>
                        </div>
                      </div>

                      {/* Column 3: Network */}
                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">Network</h3>
                        <div className="space-y-3">
                          <select
                            value={networkType}
                            onChange={(e) => setNetworkType(e.target.value)}
                            className="w-full px-2 py-1.5 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option value="5G">5G</option>
                            <option value="4G">4G</option>
                            <option value="3G">3G</option>
                            <option value="WiFi">WiFi</option>
                          </select>
                          <div className="flex items-center gap-2">
                            <input
                              type="time"
                              value={(() => {
                                const raw = currentTime.trim();
                                if (raw.includes('AM') || raw.includes('PM')) {
                                  const [time, ampm] = raw.split(' ');
                                  let [hh, mm] = time.split(':');
                                  let h = parseInt(hh || '0', 10);
                                  if (ampm === 'PM' && h !== 12) h += 12;
                                  if (ampm === 'AM' && h === 12) h = 0;
                                  return `${String(h).padStart(2, '0')}:${mm}`;
                                }
                                return raw;
                              })()}
                              onChange={(e) => {
                                const time = e.target.value; // HH:mm 24h
                                if (isTwelveHour) {
                                  const [hours, minutes] = time.split(':');
                                  let h = parseInt(hours || '0', 10);
                                  const hour12 = h % 12 || 12;
                                  const ampm = h >= 12 ? 'PM' : 'AM';
                                  setCurrentTime(`${hour12}:${minutes} ${ampm}`);
                                } else {
                                  setCurrentTime(time);
                                }
                              }}
                              className="w-full px-2 py-1 text-[13px] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <Clock className="w-4 h-4 text-gray-400" />
                          </div>
                          <div>
                            <ToggleSwitch label="12 Hour" checked={isTwelveHour} onChange={setIsTwelveHour} small />
                          </div>
                        </div>
                      </div>

                      {/* Column 4: Battery Options */}
                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">Battery Options</h3>
                        <div className="space-y-3">
                          <select
                            value={batteryStyle}
                            onChange={(e) => setBatteryStyle(e.target.value as 'Horizontal' | 'Vertical')}
                            className="w-full px-2 py-1.5 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <option>Horizontal</option>
                            <option>Vertical</option>
                          </select>
                          <div className="flex items-center gap-3">
                            <input
                              type="number"
                              min={0}
                              max={100}
                              value={batteryPercentage}
                              onChange={(e) => {
                                const v = Math.max(0, Math.min(100, Number.isNaN(parseInt(e.target.value)) ? 0 : parseInt(e.target.value)));
                                setBatteryPercentage(v);
                              }}
                              className="w-20 px-2 py-1.5 text-[13px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                            />
                            <span className="text-[13px] text-gray-700">% Battery</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 5: More Options */}
                      <div>
                        <h3 className="text-[13px] font-semibold text-gray-700 mb-3">&nbsp;</h3>
                        <div className="space-y-4">
                          <ToggleSwitch label="Show Percentage" checked={showBatteryPercentage} onChange={setShowBatteryPercentage} small />
                          <ToggleSwitch label="Hide Payment" checked={hidePayment} onChange={setHidePayment} small />
                          <ToggleSwitch label="Dual Sim" checked={dualSim} onChange={setDualSim} small />
                          <ToggleSwitch label="Chat Arrow" checked={chatArrow} onChange={setChatArrow} small />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex flex-wrap gap-3">
                        <button onClick={() => setShowAddMessageModal(true)} className="flex items-center space-x-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm">
                          <Plus className="w-4 h-4" />
                          <span>Add Message</span>
                        </button>
                        <button onClick={downloadChatImage} className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm">
                          <Download className="w-4 h-4" />
                          <span>Download Image</span>
                        </button>
                        {!isRecording ? (
                          <button onClick={startRecording} className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            <CircleDot className="w-4 h-4" />
                            <span>Record</span>
                          </button>
                        ) : (
                          <button onClick={stopRecording} className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                            <StopCircle className="w-4 h-4" />
                            <span>Stop & Download</span>
                          </button>
                        )}
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
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            {/* Chat Interface */}
            <div className="w-full max-w-6xl">
              {viewMode === 'mobile' && false && (
                <div className="flex justify-center mb-4">
                  <div className="flex bg-gray-100 rounded-lg p-1 shadow-sm">
                    <button
                      onClick={() => setDeviceType('android')}
                      className={`px-4 py-2 rounded-md text-sm font-medium ${deviceType === 'android' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                      Android
                    </button>
                    <button
                      onClick={() => setDeviceType('iphone')}
                      className={`ml-1 px-4 py-2 rounded-md text-sm font-medium ${deviceType === 'iphone' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                    >
                      iPhone
                    </button>
                  </div>
                </div>
              )}
              <div ref={recordTargetRef} className={`${viewMode === 'mobile' ? 
                (deviceType === 'iphone' ? 
                  'iphone-container iphone-aspect rounded-[2rem] bg-black p-2 mx-auto' : 
                  'android-container android-aspect rounded-3xl bg-black p-1 mx-auto') : 
                ''} relative`}>
                <div ref={captureTargetRef} data-chat-capture="true" className={`${darkTheme ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'} 
                  rounded-[1.5rem] shadow-lg overflow-hidden border ${viewMode === 'mobile' ? 'w-full h-full' : 'w-full'} 
                  relative flex flex-col`}>
                {viewMode === 'mobile' && deviceType === 'android' && <div className="android-camera-hole" />}
                {/* Add Message Modal Overlay */}
                {showAddMessageModal && (
                  <div data-h2c-ignore="true" className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 p-3 sm:p-4">
                    <div className={`${darkTheme ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} w-full max-w-[22rem] sm:max-w-sm rounded-2xl shadow-2xl border ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                      {/* Header */}
                      <div className={`flex items-center justify-between px-4 py-3 border-b ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                        <div className={`inline-flex rounded-[18px] overflow-hidden border ${darkTheme ? 'border-gray-700' : 'border-teal-500'}`}>
                          <button onClick={() => setModalSender('user')} className={`${modalSender === 'user' ? 'bg-teal-600 text-white shadow-md' : (darkTheme ? 'bg-transparent text-gray-300' : 'bg-white text-gray-700')} px-4 py-1.5 text-sm font-semibold`}>Sender</button>
                          <button onClick={() => setModalSender('contact')} className={`${modalSender === 'contact' ? 'bg-teal-600 text-white shadow-md' : (darkTheme ? 'bg-transparent text-gray-300' : 'bg-white text-gray-700')} px-4 py-1.5 text-sm font-semibold border-l ${darkTheme ? 'border-gray-700' : 'border-teal-200'}`}>Receiver</button>
                        </div>
                        <button onClick={() => setShowAddMessageModal(false)} className="w-7 h-7 rounded-md flex items-center justify-center text-white bg-rose-500 hover:bg-rose-600">
                          <X className="w-4 h-4" />
                        </button>
                      </div>



                      {/* Body */}
                      <div className="px-5 py-4 space-y-4">
                        {/* Radios: Message/Disappearing */}
                        <div className="flex items-center gap-6">
                          <label className="inline-flex items-center gap-2">
                            <input type="radio" checked={!modalDisappearing} onChange={() => setModalDisappearing(false)} />
                            <span className="text-lg font-semibold">Message</span>
                          </label>
                          <label className="inline-flex items-center gap-2">
                            <input type="radio" checked={modalDisappearing} onChange={() => setModalDisappearing(true)} />
                            <span className="text-lg font-semibold">Disappearing</span>
                          </label>
                        </div>

                        {/* Textarea + attach */}
                        <div className="relative">
                          <textarea
                            rows={5}
                            value={modalMessageText}
                            onChange={(e) => setModalMessageText(e.target.value)}
                            placeholder="Message..."
                            className={`w-full resize-y px-4 py-3 pr-16 rounded-xl border ${darkTheme ? 'bg-gray-900 border-gray-700 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                          />
                          <button onClick={() => modalImageInputRef.current?.click()} className="absolute right-3 bottom-3 w-12 h-12 rounded-lg bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700">
                            <Paperclip className="w-5 h-5" />
                          </button>
                          <input ref={modalImageInputRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f=e.target.files?.[0]; if(!f) return; const r=new FileReader(); r.onload=()=> setModalImageDataUrl(r.result as string); r.readAsDataURL(f); e.currentTarget.value=''; }} />
                        </div>
                        {modalImageDataUrl && (
                          <div className={`rounded-lg overflow-hidden border ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                            <img src={modalImageDataUrl} alt="preview" className="max-h-56 w-full object-cover" />
                          </div>
                        )}

                        {/* Time + Select + Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <input
                              type="time"
                              value={modalTime}
                              onChange={(e) => setModalTime(e.target.value)}
                              className={`w-full pl-4 pr-4 py-2 rounded-md border ${darkTheme ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-teal-500 focus:border-transparent`}
                            />
                          </div>
                          <div className="relative">
                            <select className={`appearance-none w-full pl-4 pr-10 py-2 rounded-md border ${darkTheme ? 'bg-gray-900 border-gray-700 text-white' : 'bg-white border-gray-300 text-gray-900'}`} defaultValue="None">
                              <option>None</option>
                              <option>Starred</option>
                              <option>Pinned</option>
                            </select>
                            <ChevronDown className="w-4 h-4 text-gray-400 absolute right-8 top-1/2 -translate-y-1/2" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-teal-600" title="More info">i</button>
                          </div>
                        </div>

                        {/* Status */}
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          <label className="inline-flex items-center gap-3 text-gray-700">
                            <input type="radio" name="status" checked={modalStatus==='sending'} onChange={() => setModalStatus('sending')} />
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>Sending</span>
                          </label>
                          <label className="inline-flex items-center gap-3 text-gray-700">
                            <input type="radio" name="status" checked={modalStatus==='sent'} onChange={() => setModalStatus('sent')} />
                            <Check className="w-4 h-4 text-gray-400" />
                            <span>Sent</span>
                          </label>
                          <label className="inline-flex items-center gap-3 text-gray-700">
                            <input type="radio" name="status" checked={modalStatus==='delivered'} onChange={() => setModalStatus('delivered')} />
                            <CheckCheck className="w-5 h-5 text-gray-400" />
                            <span>Delivered</span>
                          </label>
                          <label className="inline-flex items-center gap-3 text-gray-700">
                            <input type="radio" name="status" checked={modalStatus==='read'} onChange={() => setModalStatus('read')} />
                            <CheckCheck className="w-5 h-5 text-blue-500" />
                            <span>Read</span>
                          </label>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className={`px-5 py-4 border-t ${darkTheme ? 'border-gray-700' : 'border-gray-200'} flex justify-end gap-3`}>
                        <button onClick={() => setShowAddMessageModal(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50">Cancel</button>
                        <button onClick={addMessageFromModal} className="px-6 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700 inline-flex items-center gap-2">
                          <span>Send</span>
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                {/* Device Status Bar (Mobile) */}
                {viewMode === 'mobile' && !hideHeader && (
                  deviceType === 'iphone' ? (
                    <div className={`${darkTheme ? 'bg-[#111B21] text-white' : 'bg-white text-gray-900'}`}>
                      <div className="relative h-12 px-4 flex items-center">
                        <div className="absolute left-4 text-[12px] font-medium">{currentTime}</div>
                        <div className="absolute right-4 flex items-center space-x-2">
                          <Signal className="w-3.5 h-3.5" />
                          <Wifi className="w-3.5 h-3.5" />
                          <div className="relative flex items-center">
                            {showBatteryPercentage && (
                              <span className="mr-1 text-[11px] opacity-90">{batteryPercentage}%</span>
                            )}
                            <div className="relative w-6 h-3">
                              <div className="absolute inset-0 rounded-[3px] border-2 border-current" />
                              <div className="absolute inset-[1px] rounded-[2px] overflow-hidden">
                                <div className="h-full bg-current" style={{ width: `${batteryPercentage}%` }} />
                              </div>
                              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[6px] rounded-[1px] border-2 border-current" />
                            </div>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black" style={{ top: 6 }} />
                      </div>
                    </div>
                  ) : (
                    <div className={`${darkTheme ? 'bg-[#0b3d37] text-white border-[#0b3d37]' : 'bg-[#075E54] text-white border-[#075E54]'} border-b`}>
                      <div className="h-8 px-3 flex items-center justify-between text-[12px] leading-none">
                        <div className="font-medium">{currentTime}</div>
                        <div className="flex items-center space-x-2">
                          {networkType === 'WiFi' ? (
                            <Wifi className="w-3.5 h-3.5" />
                          ) : (
                            <div className="flex items-center space-x-1">
                              {dualSim ? (
                                <>
                                  <Signal className="w-3.5 h-3.5" />
                                  <Signal className="w-3.5 h-3.5 opacity-70" />
                                </>
                              ) : (
                                <Signal className="w-3.5 h-3.5" />
                              )}
                              <span className="text-[10px] font-semibold opacity-90">{networkType}</span>
                            </div>
                          )}
                          <div className="relative flex items-center">
                            {showBatteryPercentage && (
                              <span className="mr-1 text-[10px] opacity-90">{batteryPercentage}%</span>
                            )}
                            <div className="relative w-6 h-3 rounded-[2px] overflow-hidden border border-current">
                              <div className="h-full bg-current" style={{ width: `${batteryPercentage}%` }} />
                              <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-2 bg-current rounded-sm" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* Chat Header */}
                {!hideHeader && (
                  <div className={`${viewMode === 'mobile' ? (deviceType === 'android' ? (darkTheme ? 'bg-[#0b3d37] text-white border-[#0b3d37]' : 'bg-[#075E54] text-white border-[#075E54]') : (darkTheme ? 'bg-[#111B21] text-white border-[#111B21]' : 'bg-white text-gray-900 border-gray-200')) : (darkTheme ? 'bg-gray-800 text-white border-gray-700' : 'bg-gray-50 text-gray-900 border-gray-200')} border-b ${viewMode === 'mobile' ? 'px-4 py-3' : 'px-6 py-4'}`}>

                  <div className="flex items-center justify-between">
                    <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-3' : 'space-x-4'}`}>
                      <button className={`${viewMode === 'mobile' ? (deviceType === 'android' ? 'text-white/90 hover:text-white' : deviceType === 'iphone' ? (darkTheme ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                        {deviceType === 'iphone' ? (
                          <ChevronLeft className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                        ) : (
                          <ArrowLeft className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                        )}
                      </button>
                      <div
                        onClick={handleAvatarClick}
                        title="Change profile photo"
                        className={`${viewMode === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer overflow-hidden`}
                      >
                        {contact.avatarImage ? (
                          <img src={contact.avatarImage} alt={`${contact.name} avatar`} className="w-full h-full object-cover" />
                        ) : (
                          contact.avatar
                        )}
                        <input
                          ref={avatarInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleAvatarChange}
                        />
                      </div>
                      <div>
                        {isEditingName ? (
                          <input
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onBlur={commitNameChange}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitNameChange();
                              if (e.key === 'Escape') setIsEditingName(false);
                            }}
                            autoFocus
                            className={`font-semibold ${viewMode === 'mobile' ? 'text-sm' : ''} bg-transparent outline-none border-b ${viewMode === 'mobile' && deviceType === 'android' ? 'text-white border-white/60 placeholder-white/60' : 'text-gray-900 border-gray-400 placeholder-gray-500'}`}
                            placeholder="Enter name"
                          />
                        ) : (
                          <h3
                            className={`font-semibold ${viewMode === 'mobile' && deviceType === 'android' ? 'text-white' : (viewMode === 'mobile' && deviceType === 'iphone' && darkTheme ? 'text-white' : 'text-gray-900')} ${viewMode === 'mobile' ? 'text-sm' : ''} cursor-text`}
                            onClick={() => {
                              setNameInput(contact.name);
                              setIsEditingName(true);
                            }}
                            title="Click to edit name"
                          >
                            {contact.name}
                          </h3>
                        )}
                        <p className={`${viewMode === 'mobile' && (deviceType === 'android' || (deviceType === 'iphone' && darkTheme)) ? 'text-white/70' : 'text-gray-500'} ${viewMode === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                          {contact.lastSeen}
                        </p>
                      </div>
                    </div>
                    <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-2' : 'space-x-4'}`}>
                      <button className={`${viewMode === 'mobile' ? (deviceType === 'android' ? 'text-white/90 hover:text-white' : deviceType === 'iphone' ? (darkTheme ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                        <Video className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                      </button>
                      <button className={`${viewMode === 'mobile' ? (deviceType === 'android' ? 'text-white/90 hover:text-white' : deviceType === 'iphone' ? (darkTheme ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                        <Phone className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                      </button>
                      <button className={`${viewMode === 'mobile' ? (deviceType === 'android' ? 'text-white/90 hover:text-white' : deviceType === 'iphone' ? (darkTheme ? 'text-white/90 hover:text-white' : 'text-gray-900 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900') : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                        <MoreVertical className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                      </button>
                    </div>
                  </div>
                </div>
                )}

                {/* Chat Messages */}
                <div 
                    className={`flex-1 min-h-0 overflow-y-auto ${viewMode === 'mobile' ? 'px-4 py-2' : 'p-6 max-h-[480px] custom-scrollbar'} ${darkTheme ? (deviceType === 'iphone' ? 'bg-[#0B141A]' : 'bg-[#0B141A]') : 'bg-[#EFEAE2]'}`}
                  style={{
                    backgroundImage: darkTheme 
                      ? 'none' 
                      : `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e5ddd5' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    backgroundSize: '20px 20px'
                  }}
                >
                  {messages.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageCircle className={`w-16 h-16 mx-auto mb-4 ${darkTheme && deviceType === 'iphone' ? 'text-white/70' : 'text-gray-400'}`} />
                      <p className={`text-lg ${darkTheme && deviceType === 'iphone' ? 'text-white' : 'text-gray-500'}`}>
                        No messages yet
                      </p>
                      <p className={`${darkTheme && deviceType === 'iphone' ? 'text-white/70' : 'text-gray-400'}`}>
                        Start typing or load a sample conversation
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {messages.map((message, index) => {
                        const previousMessage = index > 0 ? messages[index - 1] : null;
                        const shouldShowDate = !previousMessage || getDateKey(previousMessage.timestamp) !== getDateKey(message.timestamp);
                        const isFromSameSender = previousMessage && previousMessage.sender === message.sender;
                        
                        return (
                          <React.Fragment key={message.id}>
                            {shouldShowDate && (
                              <div className="flex justify-center my-4">
                                <span className={`px-3 py-1 rounded-full text-[13px] font-normal ${
                                  darkTheme 
                                    ? 'bg-[#182229] text-[#8696A0]' 
                                    : 'bg-[#FFFFFF] text-[#54656F] shadow-sm'
                                }`}>
                                  {formatDateLabel(message.timestamp)}
                                </span>
                              </div>
                            )}
                            <div
                              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${
                                isFromSameSender ? 'mb-[2px]' : 'mb-2'
                              }`}
                            >
                            <div className="group relative max-w-[85%] sm:max-w-xs lg:max-w-md mb-1">
                              <div
                                className={`relative px-3 py-2 ${
                                  message.sender === 'user'
                                    ? `${darkTheme 
                                        ? (deviceType === 'iphone' ? 'bg-[#005C4B]' : 'bg-[#005C4B]') 
                                        : 'bg-[#DCF8C6]'
                                      } rounded-[18px] ${message.sender === 'user' ? 'rounded-br-md' : ''}`
                                    : `${darkTheme 
                                        ? (deviceType === 'iphone' ? 'bg-[#1F2C34]' : 'bg-[#1F2C34]') 
                                        : 'bg-white shadow-sm'
                                      } rounded-[18px] ${message.sender === 'contact' ? 'rounded-bl-md' : ''}`
                                }`}
                                style={{
                                  filter: message.sender === 'contact' && !darkTheme ? 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' : 'none'
                                }}
                              >
                                {message.type === 'image' && message.imageDataUrl ? (
                                  <div className="mb-1">
                                    <img src={message.imageDataUrl} alt="sent" className="max-w-xs rounded-md" />
                                    {message.text && <div className="mt-2 text-[15px] leading-[20px]">{message.text}</div>}
                                  </div>
                                ) : (
                                  <div className="relative">
                                    <p className={`text-[15px] leading-[20px] pr-16 ${
                                      message.sender === 'user'
                                        ? (darkTheme ? 'text-white' : 'text-[#111B21]')
                                        : (darkTheme ? 'text-[#E9EDEF]' : 'text-[#111B21]')
                                    }`}>
                                      {message.text}
                                    </p>
                                    <div className="flex items-center gap-1 absolute bottom-0 right-0">
                                      {showTimestamps && (
                                        <span className={`text-[11px] leading-none ${
                                          message.sender === 'user' 
                                            ? (darkTheme ? 'text-[#8696A0]' : 'text-[#667781]')
                                            : (darkTheme ? 'text-[#8696A0]' : 'text-[#667781]')
                                        }`}>
                                          {formatTime(message.timestamp)}
                                        </span>
                                      )}
                                      {message.sender === 'user' && showReadReceipts && (
                                        <div className="flex items-center ml-1">
                                          {getStatusIcon(message.status)}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => deleteMessage(message.id)}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </React.Fragment>
                      );
                    })}
                      </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                {!hideFooter && (
                  <div className={`${darkTheme ? (deviceType === 'iphone' ? 'bg-[#111B21] border-[#111B21]' : 'bg-gray-800 border-gray-700') : 'bg-white border-gray-200'} ${viewMode === 'mobile' ? 'p-3' : 'p-4'} border-t`}>

                  {false && (
                  <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-1 mb-2' : 'space-x-2 mb-3'}`}>
                    <span className={`${darkTheme && deviceType === 'iphone' ? 'text-white' : 'text-gray-600'} ${viewMode === 'mobile' ? 'text-xs' : 'text-sm'}`}>
                      Send as:
                    </span>
                    <button
                      onClick={() => setCurrentSender('user')}
                      className={`${viewMode === 'mobile' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} rounded-full font-medium transition-colors ${
                        currentSender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {userProfile.name}
                    </button>
                    <button
                      onClick={() => setCurrentSender('contact')}
                      className={`${viewMode === 'mobile' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm'} rounded-full font-medium transition-colors ${
                        currentSender === 'contact'
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {contact.name}
                    </button>
                  </div>
                  )}
                  <div className={`flex items-center ${viewMode === 'mobile' ? 'space-x-2' : 'space-x-3'}`}>
                    <button className={`${darkTheme && deviceType === 'iphone' ? 'text-[#8696A0] hover:text-[#aeb6bb]' : 'text-gray-500 hover:text-gray-600'} transition-colors`}>
                      <Plus className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addMessage()}
                        onClick={() => setShowAddMessageModal(true)}
                        placeholder="Type a message..."
                        className={`w-full ${viewMode === 'mobile' ? 'px-3 py-2 pr-10 text-sm' : 'px-4 py-3 pr-12'} rounded-full ${darkTheme && deviceType === 'iphone' ? 'bg-[#1F2C34] border-[#22303A] text-[#E9EDEF] placeholder-[#8696A0]' : 'bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500'} border focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                      />
                      <button className={`absolute ${viewMode === 'mobile' ? 'right-2' : 'right-3'} top-1/2 transform -translate-y-1/2 ${darkTheme && deviceType === 'iphone' ? 'text-[#8696A0] hover:text-[#aeb6bb]' : 'text-gray-500 hover:text-gray-600'} transition-colors`}>
                        <Smile className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                    </div>
                    <button className={`${darkTheme && deviceType === 'iphone' ? 'text-[#8696A0] hover:text-[#aeb6bb]' : 'text-gray-500 hover:text-gray-600'} transition-colors`}>
                      <Paperclip className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                    </button>
                    {newMessage.trim() ? (
                      <button
                        onClick={addMessage}
                        className={`${viewMode === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} bg-[#25D366] text-white rounded-full flex items-center justify-center hover:bg-[#1ebe5d] transition-colors`}
                      >
                        <Send className={`${viewMode === 'mobile' ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </button>
                    ) : (
                      <button className={`${viewMode === 'mobile' ? 'w-10 h-10' : 'w-12 h-12'} text-gray-500 hover:text-gray-600 transition-colors flex items-center justify-center`}>
                        <Mic className={`${viewMode === 'mobile' ? 'w-5 h-5' : 'w-6 h-6'}`} />
                      </button>
                    )}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="pt-16 md:pt-20 pb-12 md:pb-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Realistic Chats
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
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

      {/* How It Works Section */}
      <section id="how-it-works" className="pt-10 md:pt-12 pb-16 md:pb-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Create a realistic WhatsApp conversation in three simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Compose Your Chat</h3>
              <p className="text-gray-600 leading-relaxed">Use dual sender mode to add messages from you and your contact. Organize believable conversations quickly.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customize the View</h3>
              <p className="text-gray-600 leading-relaxed">Toggle iPhone/Android headers, dark theme, status bar details, and chat options to match your scenario.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Download className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Export or Share</h3>
              <p className="text-gray-600 leading-relaxed">Copy the conversation text or download it for documentation, bug reports, and design presentations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section id="use-cases" className="pt-16 md:pt-20 pb-10 md:pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Use Case
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              From app development to design presentations, see how our Fake Detail WhatsApp generator fits your workflow.
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

      {/* Export Options Section */}
      <section id="export-options" className="pt-8 md:pt-10 pb-16 md:pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Export Options
            </h2>
            <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the format that fits your workflow — perfect for QA, design, and docs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-blue-500 rounded-xl flex items-center justify-center mb-6">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Copy to Clipboard</h3>
              <p className="text-gray-600 leading-relaxed">One‑click copy of your conversation text to paste directly into tickets, docs, or chat tools.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-green-500 rounded-xl flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Download .txt</h3>
              <p className="text-gray-600 leading-relaxed">Save your chat as plain text for archives, attachments, or offline review.</p>
            </div>
            <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-sm hover:shadow-xl border border-gray-100">
              <div className="w-16 h-16 bg-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Share in Markdown</h3>
              <p className="text-gray-600 leading-relaxed">Neatly formatted output that drops into README files, design specs, and knowledge bases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Professionals
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              See what developers, designers, and testers say about our Fake Detail WhatsApp generator
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
      <section id="faq" className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base md:text-xl text-gray-600">
              Everything you need to know about the Fake Detail WhatsApp Chat Generator
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
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
                <span className="text-xl font-bold text-white">Fake Detail</span>
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
              © 2025 Fake Detail. All rights reserved.
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

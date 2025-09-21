import React from 'react';
import { Link } from 'react-router-dom';
import { Database, MessageCircle, ArrowLeft, ArrowRight, Star, Globe, Mail, Code, Shield, MessageSquare, User, Image, Video, Camera, Play, Phone, PhoneCall, Send, Briefcase, Building2, MapPin, Key, Smartphone, Quote, Music2, Sparkles, Smile } from 'lucide-react';

const Generators: React.FC = () => {
  const demoSlugs = [
    'fake-whatsapp-chat-list-generator',
    'fake-facebook-chat-generator',
    'fake-facebook-post-generator',
    'fake-facebook-video-call-generator',
    'fake-instagram-profile-generator',
    'fake-instagram-chat-generator',
    'fake-instagram-post-generator',
    'fake-instagram-video-call-generator',
    'fake-instagram-thread-post-generator',
    'fake-twitter-chat-generator',
    'fake-twitter-tweet-generator',
    'fake-twitter-profile-generator',
    'fake-tiktok-profile-generator',
    'fake-tiktok-post-generator',
    'fake-youtube-video-generator',
    'fake-youtube-channel-generator',
    'fake-youtube-video-generator',
    'fake-youtube-channel-generator',
    'fake-android-hangouts-messenger-generator',
    'fake-iphone-hangouts-messenger-generator',
    'fake-hangouts-video-call-generator',
    'fake-telegram-chat-generator',
    'fake-snapchat-chat-generator',
    'fake-skype-chat-generator',
    'fake-wechat-chat-generator',
    'fake-line-chat-generator',
    'fake-linkedin-chat-generator',
    'fake-tumblr-chat-generator',
    'username-generator',
    'user-face-generator',
    'fake-company-generator',
    'fake-address-generator',
    'password-generator',
    'random-name-generator',
    'fake-name-generator',
    'fake-phone-number-generator',
    'imei-number-generator/apple',
    'fake-mail-generator',
    'fake-android-text-messenger-generator',
    'fake-iphone-text-messenger-generator',
    'nickname-generator',
    'band-name-generator',
    'dj-name-generator',
    'horse-name-generator',
    'planet-name-generator',
    'warrior-cat-name-generator',
    'insult-name-generator',
    'wow-name-generator',
    'bible-verse-generator',
    'personality-generator',
    'dwarf-name-generator',
    'orc-name-generator',
    'god-name-generator',
    'alien-name-generator',
    'aesthetic-generator'
  ];

  const brandTokenMap: Record<string, string> = {
    whatsapp: 'WhatsApp',
    facebook: 'Facebook',
    instagram: 'Instagram',
    thread: 'Threads',
    twitter: 'Twitter',
    tiktok: 'TikTok',
    youtube: 'YouTube',
    android: 'Android',
    iphone: 'iPhone',
    hangouts: 'Hangouts',
    telegram: 'Telegram',
    snapchat: 'Snapchat',
    skype: 'Skype',
    wechat: 'WeChat',
    line: 'LINE',
    linkedin: 'LinkedIn',
    tumblr: 'Tumblr',
    imei: 'IMEI',
    dj: 'DJ',
    wow: 'WoW'
  };

  function toTitle(word: string): string {
    const lower = word.toLowerCase();
    if (brandTokenMap[lower]) return brandTokenMap[lower];
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  function formatNameFromSlug(slug: string): string {
    const base = slug.split('/')[0].replace(/^fake-/, '');
    const parts = base.split('-');
    const formatted = parts.map((p) => toTitle(p));
    if (formatted[formatted.length - 1].toLowerCase() === 'generator') {
      formatted[formatted.length - 1] = 'Generator';
    }
    return formatted.join(' ');
  }

  function styleFor(slug: string) {
    const s = slug.toLowerCase();
    if (s.includes('whatsapp')) return { gradient: 'from-emerald-500 to-green-600', icon: MessageCircle };
    if (s.includes('facebook') && s.includes('post')) return { gradient: 'from-blue-700 to-sky-500', icon: Image };
    if (s.includes('facebook') && (s.includes('video') || s.includes('call'))) return { gradient: 'from-blue-700 to-sky-500', icon: Video };
    if (s.includes('facebook')) return { gradient: 'from-blue-700 to-sky-500', icon: MessageSquare };
    if (s.includes('instagram') && s.includes('profile')) return { gradient: 'from-pink-500 to-purple-600', icon: User };
    if (s.includes('instagram') && s.includes('post')) return { gradient: 'from-pink-500 to-purple-600', icon: Camera };
    if (s.includes('instagram') && (s.includes('video') || s.includes('call'))) return { gradient: 'from-pink-500 to-purple-600', icon: Video };
    if (s.includes('thread')) return { gradient: 'from-pink-500 to-purple-600', icon: Quote };
    if (s.includes('twitter') && s.includes('tweet')) return { gradient: 'from-sky-500 to-blue-500', icon: Quote };
    if (s.includes('twitter') && s.includes('profile')) return { gradient: 'from-sky-500 to-blue-500', icon: User };
    if (s.includes('twitter')) return { gradient: 'from-sky-500 to-blue-500', icon: MessageSquare };
    if (s.includes('tiktok') && s.includes('post')) return { gradient: 'from-fuchsia-500 to-cyan-500', icon: Play };
    if (s.includes('tiktok')) return { gradient: 'from-fuchsia-500 to-cyan-500', icon: Music2 };
    if (s.includes('youtube') && s.includes('channel')) return { gradient: 'from-red-600 to-rose-600', icon: Play };
    if (s.includes('youtube')) return { gradient: 'from-red-600 to-rose-600', icon: Play };
    if (s.includes('hangouts') && (s.includes('video') || s.includes('call'))) return { gradient: 'from-lime-500 to-green-600', icon: PhoneCall };
    if (s.includes('hangouts')) return { gradient: 'from-lime-500 to-green-600', icon: MessageSquare };
    if (s.includes('telegram')) return { gradient: 'from-sky-500 to-cyan-500', icon: Send };
    if (s.includes('snapchat')) return { gradient: 'from-yellow-400 to-amber-500', icon: Camera };
    if (s.includes('skype')) return { gradient: 'from-sky-600 to-blue-600', icon: Phone };
    if (s.includes('wechat')) return { gradient: 'from-emerald-500 to-green-600', icon: MessageSquare };
    if (s.includes('line-')) return { gradient: 'from-green-500 to-emerald-600', icon: MessageSquare };
    if (s.includes('linkedin')) return { gradient: 'from-blue-700 to-sky-600', icon: Briefcase };
    if (s.includes('tumblr')) return { gradient: 'from-slate-600 to-indigo-600', icon: Image };
    if (s.includes('user-face')) return { gradient: 'from-rose-500 to-orange-500', icon: Smile };
    if (s.includes('company')) return { gradient: 'from-teal-600 to-cyan-600', icon: Building2 };
    if (s.includes('address')) return { gradient: 'from-cyan-600 to-teal-600', icon: MapPin };
    if (s.includes('password')) return { gradient: 'from-violet-600 to-purple-600', icon: Key };
    if (s.includes('phone-number')) return { gradient: 'from-emerald-600 to-teal-500', icon: Phone };
    if (s.includes('imei')) return { gradient: 'from-slate-700 to-gray-600', icon: Smartphone };
    if (s.includes('mail')) return { gradient: 'from-rose-500 to-pink-500', icon: Mail };
    if (s.includes('android') && s.includes('text')) return { gradient: 'from-green-600 to-emerald-600', icon: Smartphone };
    if (s.includes('iphone') && s.includes('text')) return { gradient: 'from-gray-800 to-slate-600', icon: Smartphone };
    if (s.includes('username') || s.includes('random-name') || s.includes('fake-name')) return { gradient: 'from-indigo-500 to-purple-600', icon: User };
    if (s.includes('nickname') || s.includes('band-name') || s.includes('dj-name') || s.includes('horse-name') || s.includes('planet-name') || s.includes('warrior-cat') || s.includes('insult-name') || s.includes('wow-name') || s.includes('bible-verse') || s.includes('personality') || s.includes('dwarf-name') || s.includes('orc-name') || s.includes('god-name') || s.includes('alien-name') || s.includes('aesthetic')) {
      return { gradient: 'from-fuchsia-500 to-purple-600', icon: Sparkles };
    }
    return { gradient: 'from-purple-600 to-blue-600', icon: MessageCircle };
  }

  const tools = [
    {
      key: 'whatsapp',
              name: 'Fake Detail - WhatsApp Chat Generator',
      description: 'Create realistic WhatsApp conversations with iOS/Android themes for testing and mockups.',
      to: '/whatsapp-chat-generator',
      icon: MessageCircle,
      rating: 5,
      comingSoon: false,
      features: ['Realistic chat bubbles', 'iPhone & Android styles', 'Inline edits & export'],
      gradient: 'from-emerald-500 to-green-600'
    },
    ...demoSlugs.map((slug) => {
      const s = styleFor(slug);
      return {
        key: slug,
        name: formatNameFromSlug(slug),
        description: 'Generate high‑fidelity mockups and sample data for demos and testing.',
        to: '#',
        icon: s.icon,
        rating: 5,
        comingSoon: true,
        features: ['High‑fidelity preview', 'Customizable inputs', 'Share & export (soon)'],
        gradient: s.gradient
      };
    })
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Database className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Generators
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-purple-600 transition-colors">Home</Link>
              <Link to="/about" className="text-gray-600 hover:text-purple-600 transition-colors">About</Link>
              <Link to="/generators" className="text-gray-900 font-medium">Generators</Link>
              <Link to="/generators" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Title */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 text-sm">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Home
            </Link>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">All Generators</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">Explore our growing library of fake chat UIs, social posts, profiles, and data tools. Create realistic screenshots, demos, and test data — no real accounts required.</p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.key} className="group overflow-hidden rounded-3xl border border-gray-200 shadow-sm hover:shadow-lg transition h-full flex flex-col">
                <div className={`p-6 bg-gradient-to-r ${tool.gradient} text-white`}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/40">
                      <tool.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold leading-snug">{tool.name}</h3>
                      <p className="mt-1.5 text-white/90 text-sm md:text-base leading-relaxed line-clamp-2">{tool.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white flex-1 flex flex-col">
                  <div className="mb-3 text-gray-900 font-semibold">Key features:</div>
                  <ul className="space-y-2 mb-5">
                    {tool.features?.map((f: string, idx: number) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm">
                        <span className="mt-1 mr-2 h-2 w-2 rounded-full bg-purple-500" />{f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between pt-1">
                    <div className="flex items-center text-yellow-400 gap-1.5">
                      {Array.from({ length: tool.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    {tool.comingSoon ? (
                      <button disabled aria-disabled="true" className="inline-flex items-center rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow opacity-60 cursor-not-allowed">Coming Soon <ArrowRight className="ml-2 h-4 w-4" /></button>
                    ) : (
                      <Link to={tool.to} className="inline-flex items-center rounded-full px-5 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium shadow hover:opacity-90 transition">
                        Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer (full site footer like Home) */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-white">Fake Detail</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The most advanced fake data generator for developers, testers, and designers worldwide.
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
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Fake Detail. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex items-center space-x-6">
              <span className="text-gray-400">Built with ❤️ for developers</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-400">SOC 2 Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Generators; 
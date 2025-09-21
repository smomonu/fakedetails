import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, MapPin, CreditCard, Shield, Zap, Code, TestTube2, Palette, Database, Check, Menu, X, Star, ArrowRight, Download, Globe, Lock, RefreshCw as Refresh, ChevronDown } from 'lucide-react';

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const dataTypes = {
    personal: {
      icon: User,
      title: 'Personal Data',
      items: ['Full Names', 'Email Addresses', 'Phone Numbers', 'Date of Birth', 'Gender', 'Nationality']
    },
    address: {
      icon: MapPin,
      title: 'Address Data',
      items: ['Street Addresses', 'Cities & States', 'Postal Codes', 'Countries', 'Coordinates', 'Time Zones']
    },
    financial: {
      icon: CreditCard,
      title: 'Financial Data',
      items: ['Credit Card Numbers', 'Bank Accounts', 'IBAN Codes', 'Currencies', 'Transaction IDs', 'Tax Numbers']
    },
    business: {
      icon: Database,
      title: 'Business Data',
      items: ['Company Names', 'Job Titles', 'Department Names', 'Employee IDs', 'Business Emails', 'Office Numbers']
    }
  };

  const features = [
    {
      icon: Zap,
      title: 'Blazing‑Fast Data Generation',
      description: 'Spin up realistic synthetic datasets in seconds for development, QA, and demos — no waiting, no setup.'
    },
    {
      icon: Shield,
      title: 'Privacy‑Safe by Design',
      description: 'All data is synthetic and created locally in your browser. Nothing is stored or sent — GDPR/CCPA friendly.'
    },
    {
      icon: Globe,
      title: 'Export to Your Stack',
      description: 'Download JSON, CSV, XML, or SQL. Copy to clipboard in one click and drop directly into your project.'
    },
    {
      icon: Lock,
      title: 'Compliance Friendly',
      description: 'Use production‑like data without exposing real PII. Safe for staging, demos, screenshots, and documentation.'
    },
    {
      icon: Refresh,
      title: 'Bulk & Batch Generation',
      description: 'Create thousands of records at once with fine‑grained field controls, formats, and distributions.'
    },
    {
      icon: Download,
      title: 'API & SDK Integration',
      description: 'Automate data creation via REST and integrate with CI. TypeScript‑friendly snippets included.'
    }
  ];

  const useCases = [
    {
      icon: Code,
      title: 'Software Development',
      description: 'Seed databases, stub APIs, and validate UI states with realistic fixtures that mirror production data.',
      color: 'bg-blue-500'
    },
    {
      icon: TestTube2,
      title: 'Quality Assurance',
      description: 'Create repeatable test scenarios, edge cases, and boundary inputs for automated and manual testing.',
      color: 'bg-green-500'
    },
    {
      icon: Palette,
      title: 'Design & Prototyping',
      description: 'Fill Figma and product screenshots with believable content for portfolio shots and client demos.',
      color: 'bg-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Developer at TechCorp',
      content: 'We replaced hand-written fixtures with Fake Detail and shaved days off our sprint. The data feels real and is easy to export.',
      rating: 5
    },
    {
      name: 'Marcus Rodriguez',
      role: 'QA Lead at DataFlow',
      content: 'Perfect for regression suites. We cover more cases without touching real PII — our audits love that.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      role: 'Product Designer at DesignLab',
      content: 'Clients understand designs faster when layouts are filled with realistic names, posts, and chats. Huge upgrade.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['100 records per day', 'Core data types', 'JSON & CSV export', 'Community support'],
      popular: false,
      color: 'border-gray-200'
    },
    {
      name: 'Professional',
      price: '$29',
      period: 'per month',
      features: ['10,000 records per day', 'All data types', 'All export formats', 'API access', 'Priority support'],
      popular: true,
      color: 'border-purple-500'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: ['Unlimited records', 'Custom schemas', 'On‑prem option', 'Dedicated support', 'SLA guarantee'],
      popular: false,
      color: 'border-gray-200'
    }
  ];

  const faqs = [
    {
      question: 'Is the generated data completely fake?',
      answer: 'Yes, all data is synthetically generated using algorithms. No real personal information is ever used or referenced in our generation process.'
    },
    {
      question: 'Can I use this for production testing?',
      answer: 'Absolutely! Our fake data is designed to be realistic and comprehensive enough for production-level testing and development workflows.'
    },
    {
      question: 'What export formats do you support?',
      answer: 'We support JSON, CSV, XML, SQL, and custom formats. You can also use our API to integrate directly with your applications.'
    },
    {
      question: 'How do you ensure data quality?',
      answer: 'Our algorithms are trained on real data patterns and validated against common use cases to ensure the generated data is realistic and useful.'
    }
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
                Fake Detail
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-900 font-medium">Home</Link>
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
                <Link to="/" className="block px-3 py-2 text-gray-900 font-medium">Home</Link>
                <Link to="/about" className="block px-3 py-2 text-gray-600 hover:text-purple-600">About</Link>
                <Link to="/generators" className="block px-3 py-2 text-gray-600 hover:text-purple-600">Generators</Link>
              </div>
            </div>
          )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Generate Realistic
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent block">
                Fake Data Instantly
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Generate privacy‑safe, production‑like test data for apps, prototypes, and QA. Choose from 50+ data types and export to JSON, CSV, XML, or SQL in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg">
                Start Generating Free
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <Link 
                to="/whatsapp-chat-generator"
                className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-600 hover:text-white transition-colors"
              >
                Try Fake Detail - WhatsApp Generator
              </Link>
            </div>
            <div className="mt-12 text-sm text-gray-500">
              Trusted by 50,000+ developers • 100% synthetic data • No sign‑up required
            </div>
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Data Types
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Generate any type of data you need for your projects — from personal details and business profiles to social content and device metadata.
            </p>
          </div>

          <div className="flex flex-wrap justify-center mb-8">
            {Object.entries(dataTypes).map(([key, type]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 m-2 rounded-lg font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <type.icon className="w-5 h-5 inline mr-2" />
                {type.title}
              </button>
            ))}
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {dataTypes[activeTab as keyof typeof dataTypes].title}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {dataTypes[activeTab as keyof typeof dataTypes].items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-sm text-gray-500 mb-2">Sample Generated Data:</div>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  {activeTab === 'personal' && (
                    <>
                      <div>"name": "Jessica Martinez"</div>
                      <div>"email": "j.martinez@email.com"</div>
                      <div>"phone": "+1 (555) 123-4567"</div>
                      <div>"dob": "1992-03-15"</div>
                    </>
                  )}
                  {activeTab === 'address' && (
                    <>
                      <div>"street": "742 Oak Avenue"</div>
                      <div>"city": "Portland"</div>
                      <div>"state": "Oregon"</div>
                      <div>"zip": "97205"</div>
                    </>
                  )}
                  {activeTab === 'financial' && (
                    <>
                      <div>"card": "4532 1234 5678 9012"</div>
                      <div>"iban": "GB29 NWBK 6016 1331 9268 19"</div>
                      <div>"currency": "USD"</div>
                      <div>"amount": "$1,234.56"</div>
                    </>
                  )}
                  {activeTab === 'business' && (
                    <>
                      <div>"company": "TechFlow Solutions"</div>
                      <div>"title": "Senior Developer"</div>
                      <div>"department": "Engineering"</div>
                      <div>"id": "EMP-2024-0157"</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Every Use Case
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built by developers, for developers. Everything you need to generate, customize, and export fake data efficiently.
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Perfect for Every Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From startups to enterprise teams, see how Fake Detail accelerates workflows across design, engineering, and QA.
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
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Developers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what our community has to say about Fake Detail
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

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Start free and scale as you grow. Transparent pricing — no lock‑in or hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl shadow-sm border-2 ${plan.color} p-8 relative ${plan.popular ? 'transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-2">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:opacity-90'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-purple-600 hover:text-purple-600'
                  }`}>
                    {plan.name === 'Free' ? 'Get Started Free' : `Start ${plan.name} Plan`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about Fake Detail
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
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who trust Fake Detail for their data generation needs. 
            Start building with realistic fake data today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
              Schedule Demo
            </button>
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
}

export default Home;
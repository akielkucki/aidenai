"use client";
import { motion } from 'motion/react';
import React, {useState, useRef, useEffect, FormEvent} from 'react';

const App = () => {
  const [activePage, setActivePage] = useState('home');
  const [demoInput, setDemoInput] = useState('');
  const [demoOutput, setDemoOutput] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
    message: ''
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleDemoSubmit = (e: any) => {
    e.preventDefault();
    if (demoInput.trim()) {
      setDemoOutput("Aiden suggests: 'Book a Google Meet with this customer about their roof repair. They're ready to move forward - would you like me to schedule it for Thursday at 2 PM?'");
    }
  };

  const handleFormChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert('Thank you! We\'ll get back to you soon about getting Aiden for your business.');
    setFormData({name: '', email: '', business: '', message: ''});
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !(menuRef.current as Element).contains(event.target) && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  const Navbar = () => (
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Aiden</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {[
                  {key: 'home', label: 'Home'},
                  {key: 'features', label: 'Features'},
                  {key: 'pricing', label: 'Pricing'},
                  {key: 'demo', label: 'Demo'},
                  {key: 'contact', label: 'Contact'}
                ].map((item) => (
                    <button
                        key={item.key}
                        onClick={() => {
                          setActivePage(item.key);
                          closeMenu();
                        }}
                        className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                            activePage === item.key
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-700 hover:text-blue-600'
                        }`}
                    >
                      {item.label}
                    </button>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none"
              >
                <svg
                    className={`h-6 w-6 transform transition-transform duration-300 ${isMenuOpen ? 'rotate-90 scale-110' : ''}`}
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                  <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
            ref={menuRef}
            className={`fixed inset-0 z-40 md:hidden transform transition-all duration-500 ease-in-out ${
                isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
            }`}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={closeMenu}></div>

          <div
              className="absolute right-0 top-0 h-full w-full bg-white shadow-xl transform transition-all duration-500 ease-in-out">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h1 className="text-2xl font-bold text-gray-900">Aiden</h1>
                <button
                    onClick={closeMenu}
                    className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
                >
                  <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="px-4 py-6 space-y-1">
                  {[
                    {key: 'home', label: 'Home', delay: 0},
                    {key: 'features', label: 'Features', delay: 100},
                    {key: 'pricing', label: 'Pricing', delay: 200},
                    {key: 'demo', label: 'Demo', delay: 300},
                    {key: 'contact', label: 'Contact', delay: 400}
                  ].map((item) => (
                      <button
                          key={item.key}
                          onClick={() => {
                            setActivePage(item.key);
                            closeMenu();
                          }}
                          className={`block w-full text-left px-4 py-3 text-base font-medium transition-all duration-300 transform hover:translate-x-2 ${
                              activePage === item.key
                                  ? 'text-blue-600 bg-blue-50 rounded-lg'
                                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg'
                          }`}
                          style={{
                            transitionDelay: `${item.delay}ms`,
                            animation: isMenuOpen ? `slideInRight 0.5s ease-out ${item.delay}ms both` : 'none'
                          }}
                      >
                        {item.label}
                      </button>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t">
                <button
                    onClick={closeMenu}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideInRight {
            from {
              opacity: 0;
              transform: translateX(100%);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}</style>
      </nav>
  );

  const Footer = () => (
      <footer className="bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Aiden</h3>
              <p className="text-gray-600 mb-4">
                Your smart business assistant. Never miss a lead again.
              </p>
              <p className="text-sm text-gray-500">
                © 2024 Aiden. All rights reserved.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => {
                    setActivePage('features');
                    closeMenu();
                  }} className="text-gray-600 hover:text-blue-600 text-sm">Features
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setActivePage('pricing');
                    closeMenu();
                  }} className="text-gray-600 hover:text-blue-600 text-sm">Pricing
                  </button>
                </li>
                <li>
                  <button onClick={() => {
                    setActivePage('demo');
                    closeMenu();
                  }} className="text-gray-600 hover:text-blue-600 text-sm">Demo
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => {
                    setActivePage('contact');
                    closeMenu();
                  }} className="text-gray-600 hover:text-blue-600 text-sm">Contact
                  </button>
                </li>
                <li><a href="#" className="text-gray-600 hover:text-blue-600 text-sm">Help Center</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
  );

  const LeadForm = ({
                      title = "Get Aiden for Your Business Today",
                      subtitle = "Fill out the form below and we'll get back to you within 24 hours."
                    }) => (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="business" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
            <input
                type="text"
                id="business"
                name="business"
                value={formData.business}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Enter your business name"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Tell us about your business and how Aiden can help"
            ></textarea>
          </div>
          <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started with Aiden
          </button>
        </form>
      </div>
  );

  const HomePage = () => (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Meet <span className="text-blue-600">Aiden</span> — your smart business assistant
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              Never miss a lead again. Aiden watches your inbox, alerts you instantly, and follows up so customers never
              slip away.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900">Instant Alerts</span>
                </div>
                <p className="text-gray-600 text-sm">Know the moment a customer reaches out — no more missed
                  opportunities.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md">
                <div className="flex items-center mb-4">
                  <div className="bg-blue-100 p-2 rounded-full mr-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.69-1.007-2.187l-.548-.547z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900">Smart Suggestions</span>
                </div>
                <p className="text-gray-600 text-sm">Aiden proposes next steps so you don't waste time figuring out what
                  to do.</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-gray-900">One-Tap Action</span>
                </div>
                <p className="text-gray-600 text-sm">Approve and Aiden executes — bookings, reminders, follow-ups, all
                  automated.</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Stop losing revenue to missed leads</h2>
              <div className="space-y-6 text-gray-600">
                <div className="flex items-start">
                  <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Never miss a lead again</h3>
                    <p>Every inquiry gets immediate attention, so no opportunity slips through the cracks.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Save hours every week</h3>
                    <p>Aiden handles the admin work so you can focus on what matters most — your business.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-100 p-2 rounded-full mr-4 mt-1 flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Feel like you have a real assistant</h3>
                    <p>Aiden doesn't just notify — it takes initiative and makes smart suggestions.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Get Aiden for Your Business Today</h3>
                <p className="text-gray-600 mt-2">Fill out the form below and we'll get back to you within 24 hours.</p>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your Name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="Your Email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <input
                      type="text"
                      name="business"
                      value={formData.business}
                      onChange={handleFormChange}
                      placeholder="Business Name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Get Started with Aiden
                </button>
              </form>
              <p className="text-xs text-gray-500 text-center mt-4">
                By submitting, you agree to our Privacy Policy and Terms of Service.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">What business owners are saying</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic mb-4">"Aiden has doubled our response rate. We're closing
                  deals we would have missed before."
                </blockquote>
                <cite className="text-sm font-semibold text-gray-900">Sarah K., Roofing Contractor</cite>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic mb-4">"I used to spend hours each day on follow-ups. Now I
                  just say 'yes' to Aiden's suggestions and move on."
                </blockquote>
                <cite className="text-sm font-semibold text-gray-900">Mike T., HVAC Specialist</cite>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-yellow-100 p-2 rounded-full mr-3">
                    <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                          d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-gray-600 italic mb-4">"Aiden pays for itself in the first month. It's like
                  having a dedicated assistant for a fraction of the cost."
                </blockquote>
                <cite className="text-sm font-semibold text-gray-900">Lisa P., Home Remodeler</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
  );

  const FeaturesPage = () => (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How Aiden Works</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aiden acts like your virtual assistant, watching your leads and taking smart actions so you never miss an
              opportunity.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15 17h5l-5 5v-5zM12 19a7 7 0 110-14 7 7 0 010 14z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant Alerts</h3>
              <p className="text-gray-600 mb-6">
                Know the moment a customer reaches out — no more missed opportunities. Aiden monitors your contact forms
                and notifies you instantly via email, SMS, or Slack.
              </p>
              <div className="bg-blue-50 rounded-lg p-4">
                <p className="text-sm font-medium text-blue-800">"New lead: Dan wants a quote for roof repair. Message:
                  'My roof is leaking after the storm. Can you help?'"</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.69-1.007-2.187l-.548-.547z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Suggestions</h3>
              <p className="text-gray-600 mb-6">
                Aiden analyzes each lead and proposes the next best step, saving you time and mental energy. No more
                wondering what to do next.
              </p>
              <div className="bg-green-50 rounded-lg p-4">
                <p className="text-sm font-medium text-green-800">"Suggestion: Book a Google Meet with Dan about his
                  roof repair. He's ready to move forward — would you like me to schedule it for Thursday at 2 PM?"</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">One-Tap Action</h3>
              <p className="text-gray-600 mb-6">
                Approve Aiden's suggestion with one tap, and Aiden executes — books calendar events, sends
                confirmations, and schedules reminders automatically.
              </p>
              <div className="bg-purple-50 rounded-lg p-4">
                <p className="text-sm font-medium text-purple-800">"Action taken: Meeting scheduled with Dan for
                  Thursday at 2 PM. Confirmation email sent. Reminder set for 1 hour before."</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">The Aiden Difference</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Before Aiden</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Leads sit in your inbox for hours or days
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    You waste time deciding what to do next
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Manual follow-ups lead to missed opportunities
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-red-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                    Admin tasks eat into your productive time
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">With Aiden</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    Instant notifications for every new lead
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    Smart suggestions for next steps
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    One-tap approval for automated actions
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-1" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
                    </svg>
                    More time for what matters — your business
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to never miss a lead again?</h2>
            <LeadForm
                title="Get Aiden for Your Business Today"
                subtitle="Fill out the form below and we'll get back to you within 24 hours."
            />
          </div>
        </div>
      </div>
  );

  const plans = [
    {
      name: "Starter Plan",
      description: "Perfect for small businesses just getting started",
      price: 50,
      period: "/month",
      features: [
        "Up to 50 leads per month",
        "Email & SMS notifications",
        "Smart follow-up suggestions",
        "Calendar integration",
        "Basic reporting",
      ],
      highlight: false,
      button: {
        text: "Select Starter Plan",
        classes:
            "w-full bg-gray-100 text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200",
      },
      classes: "bg-white text-gray-900",
      iconColor: "text-green-500",
    },
    {
      name: "Professional Plan",
      description: "For growing businesses that want maximum results",
      price: 100,
      period: "/month",
      features: [
        "Unlimited leads",
        "Email, SMS & Slack notifications",
        "Advanced smart suggestions",
        "Full calendar integration",
        "Advanced reporting & analytics",
        "Priority support",
      ],
      highlight: true,
      button: {
        text: "Select Professional Plan",
        classes:
            "w-full bg-white text-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200",
      },
      classes: "bg-blue-600 text-white",
      iconColor: "text-yellow-300",
    },
  ];

  const PricingPage = () => (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Aiden is cheaper than hiring a real assistant, but works 24/7 without
              breaks. Get started today and never miss another lead.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {plans.map((plan, idx) => (
                <div
                    key={idx}
                    className={`${plan.classes} rounded-2xl shadow-xl p-8 relative`}
                >
                  {plan.highlight && (
                      <div
                          className="absolute top-0 right-0 bg-yellow-400 text-blue-900 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                        MOST POPULAR
                      </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="ml-1">{plan.period}</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                        <motion.li key={i} className={`flex items-center ${plan.name.toLowerCase().includes("starter") ? "text-black" : "text-white"}`} initial={{opacity: 0}} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: i * 0.5 }}>
                          <svg
                              className={`w-5 h-5 ${plan.iconColor} mr-3`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                          >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                          </svg>
                          {feature}
                        </motion.li>
                    ))}
                  </ul>
                  <button className={plan.button.classes}>{plan.button.text}</button>
                </div>
            ))}
          </div>
        </div>
      </div>
  );

  const DemoPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">See Aiden in Action</h1>
          <p className="text-xl text-gray-600">
            Paste a sample lead message below and see how Aiden would respond with a smart suggestion.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <form onSubmit={handleDemoSubmit} className="space-y-6">
            <div>
              <label htmlFor="demoInput" className="block text-lg font-medium text-gray-900 mb-3">
                Enter a sample lead message
              </label>
              <textarea
                id="demoInput"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                placeholder="Hi, I need a new roof for my house. The old one is leaking. Can you help? My name is Dan and I live at 123 Main St."
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              See Aiden's Suggestion
            </button>
          </form>
        </div>

        {demoOutput && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Aiden's Response</h2>
            <div className="bg-blue-50 rounded-lg p-6 border-l-4 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4 mt-1">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">{demoOutput}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p><strong>Note:</strong> This is a demonstration of how Aiden works. In the real system, Aiden would analyze your actual leads and make context-aware suggestions based on your business type, customer history, and availability.</p>
            </div>
          </div>
        )}

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">How Aiden Thinks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analyze</h3>
              <p className="text-gray-600">Aiden reads the lead message, identifies key information (name, needs, urgency), and understands the context.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
                <span className="text-green-600 font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Suggest</h3>
              <p className="text-gray-600">Based on the analysis, Aiden proposes the most appropriate next step, considering your business type and past patterns.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Execute</h3>
              <p className="text-gray-600">When you approve, Aiden takes action — booking meetings, sending confirmations, and setting reminders automatically.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Ready to try Aiden with your real leads?</h2>
          <LeadForm
            title="Get Aiden for Your Business Today"
            subtitle="Fill out the form below and we'll get back to you within 24 hours."
          />
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Contact Us</h1>
          <p className="text-xl text-gray-600">
            Have questions about Aiden? Fill out the form below and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <LeadForm
            title="Install Aiden for your business today"
            subtitle="Fill out the form below and we'll get back to you within 24 hours."
          />
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 mx-auto">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600">support@aidenassistant.com</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 mx-auto">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600">(555) 123-4567</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 mx-auto">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600">Chat with our team</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (activePage) {
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'demo':
        return <DemoPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;

"use client";
import React from 'react';

const contactCards = [
  {
    icon: (
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Email Support',
    description: 'Reach us anytime at support@travelis.com for help or feedback.'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    title: 'Phone',
    description: '+1 (555) 123-4567 (Mon-Fri, 9am-5pm)'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Office',
    description: '123 Adventure St, Nature City, NC 12345, United States'
  },
  {
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    ),
    title: 'Contact Form',
    description: 'Use the form below to send us a message directly from the website.'
  },
];

export default function ContactPage() {
  // Placeholder for success message
  const [success, setSuccess] = React.useState(false);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-green-700 mb-2 text-center">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-8 text-center">
        Have a question, suggestion, or just want to say hello? We’d love to hear from you!
      </p>

      {/* Contact Options Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">How to Reach Us</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {contactCards.map((card, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6 flex flex-col items-center text-center border-t-4 border-green-100 hover:border-green-400 transition-all animate-fade-in h-full">
            <div className="mb-3">{card.icon}</div>
            <h3 className="text-base font-bold mb-1 text-gray-900">{card.title}</h3>
            <p className="text-gray-600 text-sm">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full flex justify-center my-8">
        <div className="h-1 w-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-60" />
      </div>

      {/* Contact Form Section */}
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Send Us a Message</h2>
      {success && (
        <div className="mb-4 text-green-700 bg-green-100 border border-green-200 rounded-lg px-4 py-3 text-center">
          Thank you for reaching out! We’ll get back to you soon.
        </div>
      )}
      <form
        className="bg-white rounded-xl shadow p-8 space-y-6 animate-fade-in"
        onSubmit={e => {
          e.preventDefault();
          setSuccess(true);
        }}
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            className="input-field focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200"
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="input-field focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200"
            placeholder="you@email.com"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            className="input-field focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-200"
            rows={4}
            placeholder="How can we help you?"
            required
          />
        </div>
        <button
          type="submit"
          className="btn-primary w-full hover:scale-105 focus:ring-2 focus:ring-green-400 transition-all duration-200"
        >
          Send Message
        </button>
      </form>
    </div>
  );
} 
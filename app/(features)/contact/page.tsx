"use client";
import React, { useState } from 'react';
import ContactHero from '@/components/features/contact/ContactHero';
import ContactCards from '@/components/features/contact/ContactCards';
import ContactForm from '@/components/features/contact/ContactForm';
import ContactSidebar from '@/components/features/contact/ContactSidebar';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactCards = [
  {
    icon: 'email',
    title: 'Email Support',
    description: 'support@travelis.com',
    action: 'mailto:support@travelis.com'
  },
  {
    icon: 'phone',
    title: 'Phone',
    description: '+1 (555) 123-4567',
    action: 'tel:+15551234567'
  },
  {
    icon: 'location',
    title: 'Office',
    description: '123 Adventure St, Nature City, NC 12345',
    action: '#'
  }
];

const businessHours = [
  { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
  { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
  { day: 'Sunday', hours: 'Closed' }
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (responseData.success) {
        setSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setError(responseData.error || 'Failed to send message');
      }
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <ContactHero />
      
      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <ContactCards contactCards={contactCards} />
          
          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm
                isLoading={isLoading}
                success={success}
                error={error}
                onSubmit={handleSubmit}
              />
            </div>
            
            {/* Sidebar */}
            <div>
              <ContactSidebar businessHours={businessHours} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 
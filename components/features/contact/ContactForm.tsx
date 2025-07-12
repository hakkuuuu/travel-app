import React from 'react';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingButton from '@/components/ui/LoadingButton';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  formData: FormData;
  isLoading: boolean;
  success: boolean;
  error: string;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ContactForm({
  formData,
  isLoading,
  success,
  error,
  onSubmit,
  onChange
}: ContactFormProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Send us a message</h2>
        <p className="text-gray-600">We'll get back to you within 24 hours</p>
      </div>
      
      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-800">Thank you! We'll get back to you soon.</p>
          </div>
        </div>
      )}
      
      {error && (
        <ErrorMessage
          message={error}
          variant="form"
        />
      )}
      
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="you@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            required
          >
            <option value="">Select a subject</option>
            <option value="booking">Booking Assistance</option>
            <option value="destination">Destination Recommendations</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onChange}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            rows={5}
            placeholder="Tell us how we can help you..."
            required
          />
        </div>
        
        <LoadingButton
          type="submit"
          loading={isLoading}
          loadingText="Sending..."
          className="w-full"
        >
          Send Message
        </LoadingButton>
      </form>
    </div>
  );
} 
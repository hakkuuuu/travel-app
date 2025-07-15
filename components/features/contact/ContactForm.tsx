import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactFormSchema } from '@/lib/validation';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingButton from '@/components/ui/LoadingButton';
import { useAuth } from '@/contexts/AuthContext';
import FormField from '@/components/ui/FormField';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactFormProps {
  isLoading: boolean;
  success: boolean;
  error: string;
  onSubmit: (data: FormData) => void;
}

export default function ContactForm({
  isLoading,
  success,
  error,
  onSubmit
}: ContactFormProps) {
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: user ? user.email || '' : '',
      subject: '',
      message: '',
    },
  });

  const onFormSubmit = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
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
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Name" htmlFor="contact-name" error={errors.name?.message} required>
            <input
              id="contact-name"
              type="text"
              {...register('name')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="Your full name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
          </FormField>
          <FormField label="Email" htmlFor="contact-email" error={errors.email?.message} required>
            <input
              id="contact-email"
              type="email"
              {...register('email')}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              placeholder="you@email.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
          </FormField>
        </div>
        <FormField label="Subject" htmlFor="contact-subject" error={errors.subject?.message} required>
          <select
            id="contact-subject"
            {...register('subject')}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          >
            <option value="">Select a subject</option>
            <option value="booking">Booking Assistance</option>
            <option value="destination">Destination Recommendations</option>
            <option value="support">Technical Support</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="other">Other</option>
          </select>
        </FormField>
        <FormField label="Message" htmlFor="contact-message" error={errors.message?.message} required>
          <textarea
            id="contact-message"
            {...register('message')}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            rows={5}
            placeholder="Tell us how we can help you..."
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
          />
        </FormField>
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
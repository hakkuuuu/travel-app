interface BusinessHour {
  day: string;
  hours: string;
}

interface ContactSidebarProps {
  businessHours: BusinessHour[];
}

export default function ContactSidebar({ businessHours }: ContactSidebarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Get in touch</h3>
        <p className="text-gray-600">We're here to help with your travel plans</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Business Hours</h4>
          <div className="space-y-2">
            {businessHours.map((schedule, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-gray-600">{schedule.day}</span>
                <span className="font-medium text-gray-900">{schedule.hours}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Response Time</h4>
          <p className="text-sm text-gray-600">
            We typically respond to inquiries within 24 hours during business days.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Emergency Support</h4>
          <p className="text-sm text-gray-600">
            For urgent matters, please call our support line directly.
          </p>
        </div>
      </div>
    </div>
  );
} 
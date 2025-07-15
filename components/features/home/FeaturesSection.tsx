import Icon from '@/components/ui/Icon';

export default function FeaturesSection() {
  const features = [
    {
      icon: 'check-circle',
      title: 'Secure Booking',
      description: 'Your payments and personal information are protected with bank-level security.'
    },
    {
      icon: 'clock',
      title: '24/7 Support',
      description: 'Our customer support team is available around the clock to help you.'
    },
    {
      icon: 'map-pin',
      title: 'Verified Locations',
      description: 'All our destinations are personally verified to ensure quality and safety.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title">Why Choose Travelis?</h2>
          <p className="section-subtitle max-w-xl mx-auto text-center mt-4">
            We make travel planning effortless with our comprehensive platform and exceptional service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-soft mb-6">
                <Icon name={feature.icon} size="xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
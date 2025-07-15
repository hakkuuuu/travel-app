import Icon from '@/components/ui/Icon';

interface Value {
  icon: string;
  title: string;
  description: string;
}

interface ValuesSectionProps {
  values: Value[];
}

export default function ValuesSection({ values }: ValuesSectionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            <span className="text-green-600">Our Values</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl hover:border-green-200 transition-all duration-300 group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-50 rounded-full mb-4 group-hover:bg-green-100 transition-colors">
                <Icon name={value.icon} size="lg" className="text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
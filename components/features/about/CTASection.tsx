import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="py-16 bg-gradient-to-r from-green-500 to-blue-600">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Adventure?
        </h2>
        <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
          Discover amazing destinations and create memories that last a lifetime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/destinations"
            className="inline-block bg-white text-green-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Explore Destinations
          </Link>
          <Link
            href="/contact"
            className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-green-600 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
} 
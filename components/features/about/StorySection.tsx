import Link from 'next/link';

export default function StorySection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              <span className="text-green-600">Our Story</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Founded by passionate travelers, Travelis was born from a simple idea: 
              adventure should be accessible to everyone, not just the experienced few.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We believe that every journey has the power to transform lives. 
              Whether you're planning your first camping trip or your hundredth adventure, 
              we're here to make it easier, safer, and more memorable.
            </p>
          </div>
          
          <div className="text-center">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Join Our Community</h3>
            <p className="text-gray-600 mb-4">
              Connect with fellow travelers and share your adventures
            </p>
            <Link 
              href="/destinations" 
              className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Exploring
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
} 
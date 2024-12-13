export default function Hero() {
  return (
    <section className="relative bg-gray-900 text-white py-20">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80"
          alt="Bus Station"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-bold mb-6">
            Real-Time KSRTC Bus Status Tracking
          </h1>
          <p className="text-xl mb-8">
            Stay informed about your bus journey with live updates, schedules, and route information.
            Track any KSRTC bus in real-time and plan your travel efficiently.
          </p>
          <a
            href="#status"
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Check Bus Status
          </a>
        </div>
      </div>
    </section>
  );
}
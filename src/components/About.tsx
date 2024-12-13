export default function About() {
  return (
    <section className="bg-white py-16" id="about">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">About KSRTC Bus Tracker</h2>
        <div className="max-w-3xl mx-auto">
          <div className="prose lg:prose-lg">
            <p className="mb-6">
              The KSRTC Bus Status Tracker is a real-time tracking system that helps passengers
              stay informed about their bus journeys. Our platform provides accurate, up-to-date
              information about bus locations, schedules, and potential delays.
            </p>
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <p className="mb-6">
              Each KSRTC depot is equipped with a tracking system that regularly updates the
              status of their buses. This information is instantly reflected on our platform,
              allowing passengers to:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>Track their bus in real-time</li>
              <li>View detailed route information</li>
              <li>Check arrival and departure times</li>
              <li>Receive updates about delays or changes</li>
            </ul>
            <p>
              Our goal is to enhance the travel experience by providing transparent and
              reliable information to all KSRTC passengers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
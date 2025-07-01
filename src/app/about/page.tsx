"use client";

export default function About() {
  return (
    <div className="about-page p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        About Where&apos;s My Shattafe?
      </h2>

      <p className="mb-2">
        <strong>Where&apos;s My Shattafe?</strong> is a community-driven, open-source platform dedicated to mapping public toilets with bidets worldwide. Our mission is to make finding a clean, comfortable restroom easier for everyone.
      </p>

      <p className="mb-2">
        You can browse existing Shattafe locations on our interactive map, and contribute new entries or corrections through the <a href="/contribute" className="underline">Contribute</a> page. All submissions are reviewed by volunteer moderators to ensure accuracy and reliability.
      </p>

      <p className="mb-4">
        Data is currently managed manually by the project maintainer, with updates coming soon via automated workflows and real-time moderation.
      </p>

      <p>
        Built with Next.js, React-Leaflet, and CartoDB, Where&apos;s My Shattafe? is 100% open-source. Check out the code on <a href="https://github.com/Ibrahim-ElKhansa/Wheres-My-Shattafe" target="_blank" rel="noopener noreferrer" className="underline">GitHub</a>.
      </p>
    </div>
  );
}

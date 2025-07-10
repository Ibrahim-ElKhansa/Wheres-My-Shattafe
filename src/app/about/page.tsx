"use client";

import "@/styles/about-page.scss";

export default function About() {
  return (
    <div className="about-page">
      <h2 className="about-page__title">About Where&apos;s My Shattafe?</h2>

      <section className="about-page__section">
        <h3 className="about-page__section-title">Our Mission</h3>
        <p className="about-page__text">
          <strong>Where&apos;s My Shattafe?</strong> is a community-driven, open-source platform dedicated to mapping public toilets with bidets worldwide. Our mission is to make finding a clean,
          comfortable restroom easier for everyone. Because everyone deserves access to proper hygiene facilities!
        </p>
      </section>

      <section className="about-page__section">
        <h3 className="about-page__section-title">How It Works</h3>
        <div className="about-page__features">
          <div className="about-page__feature">
            <h4 className="about-page__feature-title">🗺️ Interactive Map</h4>
            <p className="about-page__feature-text">Browse existing toilet locations on our interactive map powered by CartoDB and Leaflet.</p>
          </div>

          <div className="about-page__feature">
            <h4 className="about-page__feature-title">📍 Find Closest Toilet</h4>
            <p className="about-page__feature-text">Use the &quot;Closest Bidet&quot; button to instantly locate the nearest toilet with a bidet based on your current location.</p>
          </div>

          <div className="about-page__feature">
            <h4 className="about-page__feature-title">➕ Easy Submission</h4>
            <p className="about-page__feature-text">Sign in and click &quot;Submit Toilet&quot; to add new locations. Simply confirm the location and fill out the details form.</p>
          </div>

          <div className="about-page__feature">
            <h4 className="about-page__feature-title">🔍 Detailed Information</h4>
            <p className="about-page__feature-text">Each toilet entry includes location type (restaurant, mall, campus, etc.), gender accessibility, and optional descriptions.</p>
          </div>

          <div className="about-page__feature">
            <h4 className="about-page__feature-title">✅ Quality Control</h4>
            <p className="about-page__feature-text">All submissions are reviewed by volunteer moderators before appearing on the map to ensure accuracy and reliability.</p>
          </div>

          <div className="about-page__feature">
            <h4 className="about-page__feature-title">👤 User Profiles</h4>
            <p className="about-page__feature-text">Sign in with Google to track your contributions and help build the community database.</p>
          </div>
        </div>
      </section>

      <section className="about-page__section">
        <h3 className="about-page__section-title">Technology Stack</h3>
        <p className="about-page__text">Built with modern web technologies for a fast, reliable experience:</p>
        <ul className="about-page__tech-list">
          <li className="about-page__tech-item">
            <strong>Next.js</strong> - React framework for optimal performance
          </li>
          <li className="about-page__tech-item">
            <strong>React-Leaflet</strong> - Interactive mapping functionality
          </li>
          <li className="about-page__tech-item">
            <strong>CartoDB</strong> - Map tiles and geographic data
          </li>
          <li className="about-page__tech-item">
            <strong>Supabase</strong> - Database and authentication
          </li>
          <li className="about-page__tech-item">
            <strong>TypeScript</strong> - Type-safe development
          </li>
          <li className="about-page__tech-item">
            <strong>SCSS</strong> - Modern styling with BEM methodology
          </li>
        </ul>
      </section>

      <section className="about-page__section">
        <h3 className="about-page__section-title">Open Source</h3>
        <p className="about-page__text">
          Where&apos;s My Shattafe? is 100% open-source and community-driven. Check out the code, report issues, or contribute improvements on{" "}
          <a href="https://github.com/Ibrahim-ElKhansa/Wheres-My-Shattafe" target="_blank" rel="noopener noreferrer" className="about-page__link">
            GitHub
          </a>
          .
        </p>
      </section>

      <section className="about-page__section">
        <h3 className="about-page__section-title">Future Plans</h3>
        <p className="about-page__text">
          We&apos;re working on exciting new features including mobile apps for iOS and Android, real-time updates, advanced filtering options, and community voting systems. Want to help make this
          happen? Check out our{" "}
          <a href="/support" className="about-page__link">
            Support page
          </a>{" "}
          to learn how you can contribute!
        </p>
      </section>
    </div>
  );
}

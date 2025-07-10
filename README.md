# 🚽 Where's My Shattafe?

**Public hygiene, one tap away.**

A community-driven, open-source platform dedicated to mapping public toilets with bidets worldwide. Because everyone deserves access to proper hygiene facilities!

![Where's My Shattafe Banner](./public/shattafe-marker.png)

## 🌟 About

**Where's My Shattafe?** is a community-powered map that makes finding clean, comfortable restrooms with bidets easier for everyone. Our interactive platform allows users to discover and contribute bidet locations worldwide, building a comprehensive database for better public hygiene access.

## ✨ Features

### 🗺️ Interactive Map
- Browse existing toilet locations on our interactive map powered by CartoDB and Leaflet
- Real-time location display with custom markers

### 📍 Find Closest Toilet
- Use the "Closest Bidet" button to instantly locate the nearest toilet with a bidet
- Based on your current GPS location for maximum accuracy

### ➕ Easy Submission
- Sign in with Google and click "Submit Toilet" to add new locations
- Simple form with location confirmation and detailed information

### 🔍 Detailed Information
- Location type (restaurant, mall, campus, etc.)
- Gender accessibility options
- Optional descriptions and additional details

### ✅ Quality Control
- All submissions reviewed by volunteer moderators
- Ensures accuracy and reliability of all data

### 👤 User Profiles
- Google OAuth authentication
- Track your contributions to the community database

## 🛠️ Technology Stack

- **Next.js 15** - React framework for optimal performance and SEO
- **React-Leaflet** - Interactive mapping functionality
- **CartoDB** - Map tiles and geographic data services
- **Supabase** - Database, authentication, and real-time features
- **TypeScript** - Type-safe development environment
- **SCSS** - Modern styling with BEM methodology
- **Material-UI Icons** - Consistent iconography
- **Vercel Analytics** - Performance monitoring

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ibrahim-ElKhansa/Wheres-My-Shattafe.git
   cd Wheres-My-Shattafe
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Configure Supabase**
   - Set up Google OAuth in your Supabase project
   - Add your site URL to the OAuth redirect URLs
   - For development: `http://localhost:3000/auth/callback`
   - For production: `https://yourdomain.com/auth/callback`

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── actions/           # Server actions
│   ├── auth/              # Authentication routes
│   └── support/           # Support page
├── components/            # Reusable React components
│   ├── auth-modal.tsx     # Authentication modal
│   ├── bidet-modal.tsx    # Toilet submission modal
│   ├── navigation-menu.tsx # Navigation component
│   └── shattafe-map.tsx   # Main map component
├── contexts/              # React contexts
│   └── app-context.tsx    # Global app state
├── models/                # TypeScript models
│   ├── coordinates.ts     # Coordinate utilities
│   ├── toilet.ts         # Toilet data model
│   ├── user.ts           # User data model
│   └── vote.ts           # Voting system model
├── styles/                # SCSS stylesheets
├── utils/                 # Utility functions
│   ├── findClosestToilet.ts
│   └── supabase/         # Supabase configuration
└── middleware.ts          # Next.js middleware
```

## 🎯 How to Contribute

### Adding Toilet Locations
1. Sign in with your Google account
2. Click "Submit Toilet" on the map
3. Confirm the location marker placement
4. Fill out the details form with accurate information
5. Submit for review by our volunteer moderators

### Development Contributions
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🚀 Future Plans

- **Mobile Apps** - Native iOS and Android applications
- **Real-time Updates** - Live status updates and notifications
- **Advanced Filtering** - Search by amenities, accessibility, ratings
- **Community Voting** - User rating and review systems
- **Offline Support** - Cached maps for areas with poor connectivity
- **Multi-language Support** - Internationalization for global users

## 💬 Contact & Support

Need help or want to contribute? Get in touch:

- **WhatsApp**: [Chat with me](https://wa.me/9613299973)
- **Email**: [ibrahimelkhansa02@gmail.com](mailto:ibrahimelkhansa02@gmail.com)
- **LinkedIn**: [My LinkedIn Profile](https://www.linkedin.com/in/ibrahimelkhansa/)
- **GitHub Issues**: [Report bugs or request features](https://github.com/Ibrahim-ElKhansa/Wheres-My-Shattafe/issues)

## 💝 Support the Project

Help us make **Where's My Shattafe** available as a mobile app! We need **$150** to cover:

- Domain name registration
- Apple Developer License ($99/year)
- Google Play Store License ($25 one-time)

### Donation Methods

**Whish & OMT (Optimum Money Transfer)**
- QR codes available on our [Support page](https://wheres-my-shattafe.vercel.app/support)

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Maps powered by [Leaflet](https://leafletjs.com/) and [CartoDB](https://carto.com/)
- Authentication and database by [Supabase](https://supabase.com/)
- Hosted on [Vercel](https://vercel.com/)

---

**Made with ❤️ by [Ibrahim El-Khansa](https://github.com/Ibrahim-ElKhansa)**

*Public hygiene should be accessible to everyone, everywhere.*

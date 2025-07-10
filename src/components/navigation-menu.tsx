"use client";

import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import AuthModal from "./auth-modal";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppContext } from "@/contexts/app-context";
export default function NavigationMenu() {
  const { session, authModalOpen, setAuthModalOpen } = useAppContext();

  return (
    <nav className="navigation-menu">
      <div className="navigation-menu__content">
        <Link href="/" className="navigation-menu__item">
          <HomeIcon /> Home
        </Link>
        <Link href="/support" className="navigation-menu__item">
          <FavoriteIcon /> Support
        </Link>
        <Link href="/about" className="navigation-menu__item">
          <InfoIcon /> About
        </Link>
        <button className="navigation-menu__item" onClick={() => setAuthModalOpen(true)}>
          <PersonIcon />
          {session ? "Profile" : "Sign In"}
        </button>
        <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      </div>
    </nav>
  );
}

"use client";

import { useAppContext } from "@/contexts/app-context";
import CloseIcon from "@mui/icons-material/Close";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { session, supabase } = useAppContext();

  if (!isOpen) return null;

  return (
    <div className="auth-modal auth-modal__overlay">
      <div className="auth-modal__content">
        <button className="auth-modal__close-btn" onClick={onClose} aria-label="Close auth modal">
          <CloseIcon />
        </button>

        {session ? (
          <div className="auth-modal__session">
            <p>Signed in as {session.user.email}</p>
            <button className="auth-modal__button auth-modal__button--sign-out" onClick={() => supabase.auth.signOut()}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="auth-modal__button-group">
            <button className="auth-modal__button auth-modal__button--google" onClick={() => supabase.auth.signInWithOAuth({ provider: "google" })}>
              Continue with Google
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

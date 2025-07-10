"use client";

import { useAppContext } from "@/contexts/app-context";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { session, supabase } = useAppContext();

  // Check if user profile exists and create it if it doesn't
  useEffect(() => {
    const checkAndCreateUserProfile = async () => {
      if (!session?.user) return;

      try {
        // Check if user exists in the database
        const { data: existingUser, error: fetchError } = await supabase.from("users").select("id").eq("id", session.user.id).single();

        if (fetchError && fetchError.code !== "PGRST116") {
          // PGRST116 is "not found" error, other errors should be logged
          console.error("Error checking user profile:", fetchError);
          return;
        }

        // If user doesn't exist, create the profile
        if (!existingUser) {
          const { error: insertError } = await supabase.from("users").insert({
            id: session.user.id,
            email: session.user.email || "",
            role: "user",
          });

          if (insertError) {
            console.error("Error creating user profile:", insertError);
          } else {
            console.log("User profile created successfully");
          }
        }
      } catch (error) {
        console.error("Unexpected error in user profile check:", error);
      }
    };

    checkAndCreateUserProfile();
  }, [session, supabase]);

  if (!isOpen) return null;

  return (
    <div
      className="auth-modal auth-modal__overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="auth-modal__content">
        <div className="auth-modal__title">{session ? "Profile" : "Sign In"}</div>
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

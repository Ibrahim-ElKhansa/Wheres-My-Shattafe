"use client";

import React from "react";
import Toilet, { Gender } from "@/models/toilet";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import LocationOnIcon from "@mui/icons-material/LocationOn";

interface ToiletPopupProps {
  toilet: Toilet;
}

export default function ToiletPopup({ toilet }: ToiletPopupProps) {
  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case "male":
        return <MaleIcon className="toilet-popup__gender-icon toilet-popup__gender-icon--male" />;
      case "female":
        return <FemaleIcon className="toilet-popup__gender-icon toilet-popup__gender-icon--female" />;
      case "both":
        return <WcIcon className="toilet-popup__gender-icon toilet-popup__gender-icon--both" />;
      default:
        return <PersonIcon className="toilet-popup__gender-icon toilet-popup__gender-icon--undefined" />;
    }
  };

  const getGenderText = (gender: Gender) => {
    switch (gender) {
      case "male":
        return "Male";
      case "female":
        return "Female";
      case "both":
        return "Unisex";
      default:
        return "Not specified";
    }
  };



  return (
    <div className="toilet-popup">
      <div className="toilet-popup__header">
        <h3 className="toilet-popup__title">{toilet.name}</h3>
      </div>

      <div className="toilet-popup__content">
        <div className="toilet-popup__info-row">
          <LocationOnIcon className="toilet-popup__icon" />
          <span className="toilet-popup__location-type">{toilet.locationType}</span>
        </div>

        <div className="toilet-popup__info-row">
          {getGenderIcon(toilet.gender)}
          <span className="toilet-popup__gender-text">{getGenderText(toilet.gender)}</span>
        </div>

        {toilet.description && (
          <div className="toilet-popup__description">
            <p>{toilet.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

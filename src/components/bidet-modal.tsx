"use client";

import Coordinates from "@/models/coordinates";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { addToilet } from "@/app/actions/toilets";
import { useAppContext } from "@/contexts/app-context";
import { Gender } from "@/models/toilet";

interface BidetmodalProps {//code break to avoid redeployment
  isOpen: boolean;
  coordinates: Coordinates;
  onClose: () => void;


export default function Bidetmodal({ isOpen, coordinates, onClose }: BidetmodalProps) {
  const { session } = useAppContext();
  const [locationName, setLocationName] = useState("");
  const [locationType, setLocationType] = useState("restaurant");
  const [gender, setGender] = useState<Gender>("undefined");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (locationName === "" && session) return;

    try {
      await addToilet({
        name: locationName,
        lat: coordinates.lat,
        lng: coordinates.lng,
        locationType,
        gender: gender as Gender,
        description,
        submittedById: session?.user.id ?? "", // Retrieve the user's ID
      });
      setLocationName("");
      setLocationType("restaurant");
      setGender("undefined");
      setDescription("");
      onClose();
    } catch (error) {
      console.error("Error adding toilet:", error);
      // Handle error (e.g., show a notification)
    }
  };

  return (
    <div
      className="bidet-modal bidet-modal__overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="bidet-modal__content">
        <div className="bidet-modal__title">Toilet Information</div>
        <button className="bidet-modal__close-btn" onClick={onClose} aria-label="Close auth modal">
          <CloseIcon />
        </button>
        <div className="bidet-modal__form">
          <div className="bidet-modal__input-container">
            <label htmlFor="bidet-name">Location</label>
            <input type="text" id="bidet-name" placeholder="Enter Location Name" value={locationName} onChange={(e) => setLocationName(e.target.value)} />
          </div>
          <div className="bidet-modal__input-group">
            <div className="bidet-modal__input-container">
              <label htmlFor="location-type">Location Type</label>
              <select id="location-type" value={locationType} onChange={(e) => setLocationType(e.target.value)}>
                <option value="restaurant">Restaurant</option>
                <option value="cafe">Cafe</option>
                <option value="mall">Mall</option>
                <option value="hotel">Hotel</option>
                <option value="campus">Campus</option>
                <option value="office">Office</option>
                <option value="public">Public Toilet</option>
                <option value="park">Park</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="bidet-modal__input-container">
              <label htmlFor="gender">For</label>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value as Gender)}>
                <option value="undefined">Unknown</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
          <div className="bidet-modal__input-container">
            <label htmlFor="description">Description (Optional)</label>
            <textarea id="description" placeholder="Enter any additional details about the toilet" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button className="bidet-modal__submit-button" onClick={handleSubmit} disabled={locationName === ""}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

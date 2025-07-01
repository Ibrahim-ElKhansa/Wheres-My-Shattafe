import Coordinates from "@/models/coordinates";
import Toilet from "@/models/toilet";

export interface ClosestToiletResult {
  toilet: Toilet;
  distance: number; // in meters
}

/**
 * Find the toilet whose coordinates are nearest to `current`.
 * @param current   the reference Coordinates
 * @param toilets   list of Toilet instances to search
 * @returns the closest Toilet + its distance, or null if `toilets` is empty
 */
export default function findClosestToilet(
  current: Coordinates,
  toilets: Toilet[]
): ClosestToiletResult | null {
  if (toilets.length === 0) return null;

  let closest = toilets[0];
  let minDist = current.calculateDistance(closest.getCoordinates());

  for (let i = 1; i < toilets.length; i++) {
    const t = toilets[i];
    const dist = current.calculateDistance(t.getCoordinates());
    if (dist < minDist) {
      closest = t;
      minDist = dist;
    }
  }

  return { toilet: closest, distance: minDist };
}

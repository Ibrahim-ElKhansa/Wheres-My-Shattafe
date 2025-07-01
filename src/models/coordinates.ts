export interface CoordinatesInterface {
  lat: number;
  lng: number;
}

export default class Coordinates implements CoordinatesInterface {
  lat: number;
  lng: number;

  constructor(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
  }

  isEmpty(): boolean {
    return this.lat === 0 && this.lng === 0;
  }

  getLatitude(): number {
    return this.lat;
  }

  getLongitude(): number {
    return this.lng;
  }

  calculateDistance(other: Coordinates): number {
    const R = 6371e3;
    const φ1 = (this.lat * Math.PI) / 180;
    const φ2 = (other.lat * Math.PI) / 180;
    const Δφ = ((other.lat - this.lat) * Math.PI) / 180;
    const Δλ = ((other.lng - this.lng) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  convertToNumberArray(): [number, number] {
    return [this.lat, this.lng];
  }

  duplicate(): Coordinates {
    return new Coordinates(this.lat, this.lng);
  }

  static getEmpty(): Coordinates {
    return new Coordinates(0, 0);
  }

  static getBeirutCenter(): Coordinates {
    return new Coordinates(33.89185540554506, 35.48990515917835);
  }
}

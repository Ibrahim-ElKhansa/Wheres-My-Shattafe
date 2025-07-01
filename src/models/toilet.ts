import Coordinates from "./coordinates";

export interface ToiletInterface {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export default class Toilet implements ToiletInterface {
  id: number;
  name: string;
  lat: number;
  lng: number;

  constructor(id: number, name: string, lat: number, lng: number) {
    this.id = id;
    this.name = name;
    this.lat = lat;
    this.lng = lng;
  }

  static convertFromInterface(data: ToiletInterface): Toilet {
    return new Toilet(data.id, data.name, data.lat, data.lng);
  }

  getCoordinates(): Coordinates {
    return new Coordinates(this.lat, this.lng);
  }
}
import { apiGet, apiGetImageLibrary } from "./api-client";

export interface ApodResponse {
  date: string;
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  media_type: string;
  copyright?: string;
}

export interface MarsPhoto {
  id: number;
  sol: number;
  img_src: string;
  earth_date: string;
  camera: { id: number; name: string; full_name: string };
  rover: { id: number; name: string; landing_date: string; launch_date: string; status: string };
}

export interface EpicImage {
  identifier: string;
  image: string;
  caption: string;
  date: string;
  centroid_coordinates: { lat: number; lon: number };
}

export interface NasaImageItem {
  data: Array<{ nasa_id: string; title: string; description: string; date_created: string; media_type: string }>;
  links: Array<{ href: string; rel: string; render?: string }>;
}

export interface NasaImageSearchResponse {
  collection: { items: NasaImageItem[]; metadata: { total_hits: number }; links?: Array<{ rel: string; prompt: string; href: string }> };
}

export async function getApod(): Promise<ApodResponse> {
  return apiGet<ApodResponse>("/planetary/apod", { ttl: 30 * 60 * 1000 });
}

export async function getMarsPhotos(rover: string = "curiosity", sol: number = 1000, page: number = 1): Promise<{ photos: MarsPhoto[] }> {
  return apiGet<{ photos: MarsPhoto[] }>(`/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&page=${page}`, { ttl: 15 * 60 * 1000 });
}

export async function getEpicLatest(): Promise<EpicImage[]> {
  return apiGet<EpicImage[]>("/EPIC/api/natural", { ttl: 15 * 60 * 1000 });
}

export async function searchNasaImages(query: string, page: number = 1): Promise<NasaImageSearchResponse> {
  return apiGetImageLibrary<NasaImageSearchResponse>(query, page);
}

export function getEpicImageUrl(epic: EpicImage): string {
  const dateStr = epic.date.split(" ")[0].replace(/-/g, "/");
  return `https://epic.gsfc.nasa.gov/archive/natural/${dateStr}/png/${epic.image}.png`;
}

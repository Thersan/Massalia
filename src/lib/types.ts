export type Villa = {
  slug: string;
  name: string;
  neighborhood: string;
  tagline: string;
  shortDescription: string;
  description: string[];
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number; // m²
  pricePerNight: number; // €
  amenities: string[];
  heroImage: string;
  images: string[];
};

export type ReservationStatus = "confirmee" | "en_cours" | "annulee";

export type Reservation = {
  id: string;
  villa_slug: string;
  owner_id: string;
  guest_name: string;
  check_in: string; // ISO date
  check_out: string; // ISO date
  nights: number;
  amount: number; // €
  status: ReservationStatus;
  created_at: string;
};

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  role: string | null;
};

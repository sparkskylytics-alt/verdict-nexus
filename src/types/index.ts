export interface NavbarProps {
  scrolled: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  specialty: string;
  experience: string;
  image: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  image: string;
}

export interface PracticeArea {
  title: string;
  description: string;
  icon: string;
}

export interface Client {
  name: string;
  logo: string;
}

export interface ContactInfo {
  icon: string;
  title: string;
  content: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
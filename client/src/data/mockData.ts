// Mock data for businesses - This will be replaced with API calls later
export interface Business {
  id: string;
  name: string;
  category: string;
  location: {
    city: string;
    country: string;
  };
  website: string;
  email: string;
  description: string;
}

export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "TechStart Solutions",
    category: "Technology",
    location: { city: "San Francisco", country: "United States" },
    website: "https://techstart.example.com",
    email: "divyanshvaid25042006@gmail.com",
    description: "Innovative tech startup focused on AI solutions",
  },
  {
    id: "2",
    name: "GreenLeaf Marketing",
    category: "Marketing",
    location: { city: "London", country: "United Kingdom" },
    website: "https://greenleaf.example.com",
    email: "vanshthapa14988@gmail.com",
    description: "Sustainable marketing agency",
  },
  {
    id: "3",
    name: "Nordic Design Studio",
    category: "Design",
    location: { city: "Stockholm", country: "Sweden" },
    website: "https://nordicdesign.example.com",
    email: "1700.karan@gmail.com",
    description: "Minimalist design consultancy",
  },
  {
    id: "4",
    name: "CloudBase Systems",
    category: "Technology",
    location: { city: "Berlin", country: "Germany" },
    website: "https://cloudbase.example.com",
    email: "pihuchauhan843@gmail.com",
    description: "Cloud infrastructure provider",
  },
  {
    id: "5",
    name: "Creative Minds Agency",
    category: "Marketing",
    location: { city: "New York", country: "United States" },
    website: "https://creativeminds.example.com",
    email: "team@creativeminds.example.com",
    description: "Full-service creative agency",
  },
  {
    id: "6",
    name: "FinTech Pro",
    category: "Finance",
    location: { city: "Toronto", country: "Canada" },
    website: "https://fintechpro.example.com",
    email: "inquiries@fintechpro.example.com",
    description: "Financial technology solutions",
  },
  {
    id: "7",
    name: "EcoCommerce Ltd",
    category: "E-commerce",
    location: { city: "Amsterdam", country: "Netherlands" },
    website: "https://ecocommerce.example.com",
    email: "sales@ecocommerce.example.com",
    description: "Sustainable e-commerce platform",
  },
  {
    id: "8",
    name: "DataDriven Analytics",
    category: "Technology",
    location: { city: "Sydney", country: "Australia" },
    website: "https://datadriven.example.com",
    email: "analytics@datadriven.example.com",
    description: "Business intelligence and analytics",
  },
  {
    id: "9",
    name: "Brand Builders Co",
    category: "Marketing",
    location: { city: "Los Angeles", country: "United States" },
    website: "https://brandbuilders.example.com",
    email: "contact@brandbuilders.example.com",
    description: "Brand strategy and development",
  },
  {
    id: "10",
    name: "Swiss Precision Tech",
    category: "Technology",
    location: { city: "Zurich", country: "Switzerland" },
    website: "https://swissprecision.example.com",
    email: "info@swissprecision.example.com",
    description: "High-precision technology solutions",
  },
  {
    id: "11",
    name: "Pixel Perfect Studios",
    category: "Design",
    location: { city: "Paris", country: "France" },
    website: "https://pixelperfect.example.com",
    email: "studio@pixelperfect.example.com",
    description: "UI/UX design specialists",
  },
  {
    id: "12",
    name: "Growth Hackers Inc",
    category: "Marketing",
    location: { city: "Austin", country: "United States" },
    website: "https://growthhackers.example.com",
    email: "growth@growthhackers.example.com",
    description: "Growth marketing experts",
  },
];

export const categories = [
  "All Categories",
  "Technology",
  "Marketing",
  "Design",
  "Finance",
  "E-commerce",
  "Healthcare",
  "Education",
  "Real Estate",
];

export const countries = [
  "All Countries",
  "United States",
  "United Kingdom",
  "Germany",
  "France",
  "Canada",
  "Australia",
  "Netherlands",
  "Sweden",
  "Switzerland",
];

export const cities: Record<string, string[]> = {
  "All Countries": ["All Cities"],
  "United States": ["All Cities", "San Francisco", "New York", "Los Angeles", "Austin", "Seattle", "Chicago"],
  "United Kingdom": ["All Cities", "London", "Manchester", "Birmingham", "Edinburgh"],
  "Germany": ["All Cities", "Berlin", "Munich", "Frankfurt", "Hamburg"],
  "France": ["All Cities", "Paris", "Lyon", "Marseille", "Nice"],
  "Canada": ["All Cities", "Toronto", "Vancouver", "Montreal", "Calgary"],
  "Australia": ["All Cities", "Sydney", "Melbourne", "Brisbane", "Perth"],
  "Netherlands": ["All Cities", "Amsterdam", "Rotterdam", "The Hague", "Utrecht"],
  "Sweden": ["All Cities", "Stockholm", "Gothenburg", "Malmö"],
  "Switzerland": ["All Cities", "Zurich", "Geneva", "Basel", "Bern"],
};

export const skills = [
  "Web Development",
  "Mobile Development",
  "UI/UX Design",
  "Graphic Design",
  "Content Writing",
  "SEO Specialist",
  "Digital Marketing",
  "Data Analysis",
  "Video Production",
  "Social Media Management",
];

export const experienceLevels = [
  "Entry Level (0-2 years)",
  "Mid Level (2-5 years)",
  "Senior Level (5-10 years)",
  "Expert (10+ years)",
];

export const industries = [
  "Technology",
  "Marketing & Advertising",
  "E-commerce",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Real Estate",
  "Media & Entertainment",
  "Consulting",
  "Any Industry",
];

export interface FeaturedEvent {
  title: string;
  subtitle: string;
  date: string;
  venue: string;
  image: string;
  theme: string;
  message: string;
  itemsNeeded: string[];
  contact: string;
  paymentLink: string;
  ticketPrice?: string;
  fullDescription: string;
  schedule: Array<{ time: string; activity: string }>;
  impactGoals: string[];
}

export const featuredEvent: FeaturedEvent = {
  title: "THE HUMAN MOSAIC",
  subtitle: "Presented by Tabasamu Charity",
  date: "24TH MAY 2026",
  venue: "MAGEUZI HUB, KILIMANI",
  image: "/events/human-mosaic-flyer.jpg",
  theme: "Faces, Stories, Smiles",
  ticketPrice: "500/=",
  message:
    "Piece by piece, story by story… We discover that what felt broken was never the end, it was part of something greater, something whole😊.\n\nJoin us for an evening of open mic, connecting conversations, networking, and community building — all wrapped up with music and games.",
  itemsNeeded: [],
  contact: "+254 112 459 483",
  paymentLink: "https://keychele.co.ke/ticket.php?id=26",
  fullDescription:
    "Piece by piece, story by story… We discover that what felt broken was never the end, it was part of something greater, something whole😊.\n\nThe Human Mosaic is a storytelling and community gathering presented by Tabasamu Charity — a space where faces, stories, and smiles come together to celebrate the beautiful complexity of the human experience.\n\nWhether you come with a story to tell or just a heart to listen, you belong here. Every voice adds a piece to the mosaic.",
  schedule: [
    { time: "TBA", activity: "Registration & Welcome" },
    { time: "TBA", activity: "Open Mic: Faces & Voices" },
    { time: "TBA", activity: "Connecting Conversations" },
    { time: "TBA", activity: "Networking & Community Building" },
    { time: "TBA", activity: "Music & Games" },
    { time: "TBA", activity: "Closing" },
  ],
  impactGoals: [
    "Create a safe space for storytelling and expression",
    "Build meaningful community connections",
    "Celebrate shared human experiences",
    "Promote mental health and emotional wellbeing",
  ],
};

// For homepage - recent programs (showing the featured event)
export const recentPrograms = [
  {
    image: featuredEvent.image,
    title: `${featuredEvent.title} — ${featuredEvent.subtitle}`,
    description: featuredEvent.fullDescription.split("\n\n")[0],
    date: featuredEvent.date,
    venue: featuredEvent.venue,
  },
];

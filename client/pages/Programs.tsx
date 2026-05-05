import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Phone,
  X,
  Heart,
  Gift,
  CheckCircle,
  Users,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { featuredEvent } from "@shared/programs-data";

const HumanMosaicBanner = ({ compact = false }: { compact?: boolean }) => (
  <div
    className={`w-full flex flex-col items-center justify-center bg-gradient-to-br from-[#1a3a0f] via-[#2d5a1b] to-[#6b1111] ${compact ? "h-64" : "h-80"}`}
  >
    <p className="text-white/60 text-xs font-semibold tracking-[0.3em] uppercase mb-3">
      Tabasamu Charity Presents
    </p>
    <h2 className={`font-extrabold text-center leading-none mb-2 ${compact ? "text-3xl" : "text-5xl md:text-6xl"}`}>
      <span className="text-[#e53e3e] italic">The </span>
      <span className="text-white">HUMAN</span>
      <br />
      <span className="text-[#e53e3e] italic">Mo</span>
      <span className="text-white">SAIC</span>
    </h2>
    <div className={`mt-3 border border-[#2d5a1b] bg-[#2d5a1b]/80 rounded-lg px-4 py-2 text-center ${compact ? "text-xs" : "text-sm"}`}>
      <p className="text-white font-bold tracking-widest">FACES · STORIES · SMILES</p>
    </div>
    {!compact && (
      <div className="mt-4 bg-white/10 rounded-lg px-6 py-2 text-center">
        <p className="text-white/70 text-xs tracking-widest uppercase">Date</p>
        <p className="text-white font-bold text-lg">MAY &nbsp;|&nbsp; <span className="text-[#e53e3e] text-2xl">24</span> &nbsp;|&nbsp; 2026</p>
      </div>
    )}
  </div>
);

const ModalHeader = ({ event }: { event: any }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="relative rounded-t-2xl overflow-hidden">
      {imgError ? (
        <HumanMosaicBanner />
      ) : (
        <>
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </>
      )}
      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold inline-block mb-4">
          {event.date}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          {event.title}
        </h1>
        <p className="text-xl text-white/90 italic">{event.subtitle}</p>
      </div>
    </div>
  );
};

const Programs = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [featuredImgError, setFeaturedImgError] = useState(false);

  const upcomingEvents = [
    {
      id: "human-mosaic-2026",
      title: "THE HUMAN MOSAIC",
      subtitle: "Faces • Stories • Smiles",
      date: "24TH MAY 2026",
      venue: "MAGEUZI HUB, KILIMANI",
      image: "/events/human-mosaic-flyer.jpg",
      theme: "Faces, Stories, Smiles",
      description:
        "Piece by piece, story by story… We discover that what felt broken was never the end, it was part of something greater, something whole😊.",
      contact: "+254 112 459 483",
      paymentLink: "https://keychele.co.ke/ticket.php?id=26",
      ticketPrice: "500/=",
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
      expectedImpact: [
        "Create a safe space for storytelling",
        "Build meaningful community connections",
        "Celebrate shared human experiences",
        "Promote mental health & emotional wellbeing",
      ],
      itemsNeeded: [],
    },
  ];

  const pastEvents = [
    {
      id: "nairobi-2025",
      title: "NAIROBI Edition",
      subtitle: "Creating smiles, one coin at a time😊",
      date: "19TH OCT 2025",
      venue: "BLESSINGS CHILDREN'S HOME - RUAI",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F1621da4a27844381af3e9ee9867abbdf%2F11507f84a3b5427fafee2b9a7a5b66c7?format=webp&width=800",
      theme: "Global harmony begins with kindness",
      description:
        "An unforgettable day of giving and community spirit at Blessings Children's Home in Ruai — spreading joy and creating lasting smiles.",
      contact: "+254794107724",
      impact: "200+ children supported with essential supplies",
      fullDescription:
        "Join us for an unforgettable day of giving and community spirit at the NAIROBI Edition. This special gathering brought together hearts and hands united in a common mission: to spread joy and create lasting smiles in the lives of children who needed it most.\n\nLocated at Blessings Children's Home in Ruai, this event was a celebration of humanity, kindness, and the power we have when we come together for a noble cause.",
      actualImpact: [
        "Essential supplies delivered to 200+ children",
        "Dry foodstuffs, water, and sanitary items distributed",
        "Community volunteers came together in service",
        "Beddings and detergent provided to families in need",
      ],
      testimonials: [
        {
          name: "Tabasamu Team",
          role: "Event Organisers",
          quote:
            "Every contribution, big or small, created ripples of positive change that extended far beyond the event day.",
        },
      ],
      longTermImpact:
        "The NAIROBI Edition established lasting partnerships with Blessings Children's Home and inspired future community-led initiatives across Kenya.",
    },
    {
      id: "kirinyaga-2024",
      title: "KIRINYAGA Edition",
      subtitle: "Free Medical Camp — Ndia Constituency (Kirinyaga County)",
      date: "14TH JUL 2023",
      venue: "VICTORIA CHILDREN'S HOME - KISUMU",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F72939ea3440543368bc0ebbfc320b894?format=webp&width=800",
      theme: "Community health and wellness",
      description:
        "A free medical camp serving Ndia Constituency in Kirinyaga County. Hundreds received checkups, medication, and referrals.",
      contact: "+254794107724",
      impact: "150 children supported, 50 families assisted",
      gallery: [
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F72939ea3440543368bc0ebbfc320b894?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2Fc30a66eb6e534bc2957dc40b4a930493?format=webp&width=800",
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2Fcf5e5110d5d1468ea1497a5989a33d23?format=webp&width=800",
      ],
      fullDescription:
        "The Kisumu Edition marked a turning point in our community outreach efforts. Located near Lake Victoria, this event brought together hearts and hands from across the region to support children whose potential knows no bounds.\n\nThis successful event created lasting partnerships with local organizations and established sustainable programs that continue to benefit the community today.",
      actualImpact: [
        "150 children received full educational support packages",
        "50 families received nutritional assistance for 6 months",
        "3 new classrooms were built and equipped",
        "25 teachers received professional development training",
        "Community garden project launched, now feeding 200+ people",
      ],
      testimonials: [
        {
          name: "Mary Achieng",
          role: "Local Teacher",
          quote:
            "This event transformed our school. The children now have hope and resources they never had before.",
        },
        {
          name: "James Ochieng",
          role: "Parent",
          quote:
            "My daughter received a scholarship that changed her life. She's now in university studying medicine.",
        },
      ],
      longTermImpact:
        "6 months later, 95% of supported children showed improved academic performance, and 3 children received secondary school scholarships.",
    },
    {
      id: "embu-2024",
      title: "EMBU Edition",
      subtitle: "Football Tournaments",
      date: "25TH MAY 2024",
      venue: "HIGHLANDS ORPHANAGE - ELDORET",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      gallery: [
        "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F8b4aecfd92534eb3b00f9bac06b116d9?format=webp&width=1200",
        "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2Feaa517097fb04e0a81fe3713b0f66c39?format=webp&width=1200",
        "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F7caa038804c84176baeaac551a17aa3a?format=webp&width=1200",
      ],
      theme: "Raising champions",
      description:
        "A community football tournament bringing together schools and youth teams, promoting sportsmanship and talent development.",
      contact: "+254794107724",
      impact: "200 children reached, sports equipment provided",
      fullDescription:
        "High in the Kenyan highlands, the Eldoret Edition combined our educational mission with sports and recreational programs. This unique approach recognized that children's development requires both academic support and physical activity.\n\nThe event was a celebration of potential, bringing together athletes, educators, and community members to create an unforgettable experience for children who rarely get such opportunities.",
      actualImpact: [
        "200 children participated in sports and educational activities",
        "Complete sports equipment provided to 5 schools",
        "20 young athletes identified for special training programs",
        "Health and nutrition workshops reached 100+ families",
        "Mobile library service established for 8 remote schools",
      ],
      testimonials: [
        {
          name: "Peter Kiprotich",
          role: "Former Olympic Runner",
          quote:
            "Seeing these children's joy and potential reminded me why sports can change lives.",
        },
        {
          name: "Grace Chepkemoi",
          role: "School Principal",
          quote:
            "The sports equipment has transformed our PE program. Children are more engaged in all subjects now.",
        },
      ],
      longTermImpact:
        "The sports program continues with 3 children now training for national competitions and attendance rates improved by 40%.",
    },
  ];

  const EventCard = ({
    event,
    type = "upcoming",
  }: {
    event: any;
    type?: "featured" | "upcoming" | "past";
  }) => {
    const [imgError, setImgError] = useState(false);
    return (
    <div
      className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
      onClick={() => {
        setSelectedEvent(event);
        setShowEventModal(true);
      }}
    >
      <div className="relative overflow-hidden">
        {imgError ? (
          <HumanMosaicBanner compact />
        ) : (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
            onError={() => setImgError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-sm font-medium">
              {type === "past" ? "View Impact" : "Learn More"}
            </span>
          </div>
        </div>
        <div
          className={`absolute top-4 right-4 px-4 py-2 rounded-lg font-bold transform rotate-3 ${
            type === "past"
              ? "bg-gray-500"
              : type === "upcoming"
                ? "bg-blue-500"
                : "bg-red-500"
          } text-white`}
        >
          {event.date}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-charity-neutral-800 mb-2 group-hover:text-charity-orange-600 transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-charity-orange-600 font-semibold mb-3 text-lg italic">
          {event.subtitle}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-charity-neutral-600">
            <Phone className="h-4 w-4 mr-2 text-charity-orange-500" />
            <span className="text-sm">{event.contact}</span>
          </div>
          {event.impact && (
            <div className="flex items-center text-charity-neutral-600">
              <Users className="h-4 w-4 mr-2 text-charity-green-500" />
              <span className="text-sm font-medium">{event.impact}</span>
            </div>
          )}
        </div>

        <p className="text-charity-neutral-600 mb-4 text-sm leading-relaxed">
          {event.description}
        </p>

        <div className="bg-charity-green-50 p-3 rounded-xl border-l-4 border-charity-green-500 mb-4">
          <p className="text-charity-green-700 italic font-medium text-sm">
            "{event.theme}"
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {event.paymentLink && type === "upcoming" && (
            <a
              href={event.paymentLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center px-4 py-2 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg text-sm font-bold transition-colors duration-200"
            >
              🎟️ {event.ticketPrice ? `Grab a Slot — ${event.ticketPrice}` : "Get Ticket"}
            </a>
          )}
          <span className="text-charity-orange-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200">
            {type === "past" ? "View Impact Story" : "Learn More"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </span>
        </div>
      </div>
    </div>
    );
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-0 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F153245ad30eb4b7e8c5599a0eca08317?alt=media&token=0664e38d-660f-485a-9b9e-d42392e23699&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 via-orange-400/40 to-orange-600/40 animate-gradient"></div>
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="white"/></svg>\')',
            backgroundSize: "40px 40px",
          }}
        ></div>

        <Navigation />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our Programs
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Creating lasting change through community events and initiatives
                across Kenya
              </p>
            </div>
          </AnimatedSection>
        </div>

        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 8s ease infinite;
          }
        `}</style>
      </section>

      {/* Featured Events */}
      <section
        id="featured-events"
        className="py-20 bg-gradient-to-br from-charity-orange-50 to-charity-green-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Featured Events
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Our spotlight events making the biggest impact in communities
                across Kenya
              </p>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scaleIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Main Featured Event - Full Layout */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    {featuredImgError ? (
                      <HumanMosaicBanner />
                    ) : (
                      <img
                        src={featuredEvent.image}
                        alt={featuredEvent.title}
                        className="w-full h-80 object-cover object-top"
                        onError={() => setFeaturedImgError(true)}
                      />
                    )}
                    <div className="absolute top-6 right-6 bg-red-600 text-white px-4 py-2 rounded-lg font-bold transform rotate-3 shadow-lg">
                      {featuredEvent.date}
                    </div>
                    {!featuredImgError && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                          {featuredEvent.title}
                        </h1>
                        <p className="text-xl text-white/90 italic">
                          {featuredEvent.subtitle}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center mb-4">
                            <MapPin className="h-5 w-5 text-charity-orange-600 mr-2" />
                            <span className="text-charity-neutral-700 font-semibold">
                              VENUE: {featuredEvent.venue}
                            </span>
                          </div>

                          <div className="bg-charity-green-50 p-4 rounded-xl border-l-4 border-charity-green-500">
                            <h3 className="font-bold text-charity-neutral-800 mb-2">
                              Our Theme for this year:
                            </h3>
                            <p className="text-charity-green-700 italic font-medium">
                              "{featuredEvent.theme}"
                            </p>
                          </div>
                        </div>

                        <div className="bg-charity-orange-50 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-charity-neutral-800 mb-4">
                            A Personal Message:
                          </h3>
                          <p className="text-charity-neutral-700 leading-relaxed whitespace-pre-line">
                            {featuredEvent.message}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        {/* Activities */}
                        <div className="bg-charity-neutral-800 p-6 rounded-xl">
                          <h3 className="text-lg font-bold text-white mb-4 text-center tracking-widest uppercase">
                            Activities
                          </h3>
                          <div className="space-y-2">
                            {[
                              "Open Mic: Faces & Voices",
                              "Connecting Conversations",
                              "Networking & Community Building",
                              "Music & Games",
                            ].map((activity, i) => (
                              <div
                                key={i}
                                className="flex items-center space-x-3"
                              >
                                <div className="w-2 h-2 bg-charity-orange-400 rounded-full flex-shrink-0" />
                                <span className="text-white/90 text-sm font-medium">
                                  {activity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="text-center space-y-4">
                          {/* Ticket price badge */}
                          <div className="bg-charity-green-700 p-4 rounded-xl flex items-center justify-center gap-3">
                            <div className="text-center">
                              <p className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                                Grab a Slot
                              </p>
                              <p className="text-white font-bold text-2xl">
                                {featuredEvent.ticketPrice}
                              </p>
                            </div>
                            <div className="border-l border-white/30 pl-3">
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-white/80" />
                                <span className="font-bold text-white text-sm">
                                  {featuredEvent.contact}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <a
                              href={featuredEvent.paymentLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-charity-orange-600 hover:bg-charity-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105 text-center"
                            >
                              🎟️ Get Your Ticket
                            </a>

                            <button
                              onClick={() => {
                                setSelectedEvent(featuredEvent);
                                setShowEventModal(true);
                              }}
                              className="w-full border-2 border-charity-green-600 text-charity-green-600 hover:bg-charity-green-600 hover:text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center group"
                            >
                              Learn More Details
                              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Upcoming Events
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Mark your calendars for these exciting upcoming community events
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <AnimatedSection
                key={index}
                animation="scaleIn"
                delay={index * 100}
              >
                <EventCard event={event} type="upcoming" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-charity-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Past Events
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Celebrating the success and impact of our previous initiatives
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {pastEvents.map((event, index) => (
              <AnimatedSection
                key={index}
                animation="scaleIn"
                delay={index * 100}
              >
                <EventCard event={event} type="past" />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F6e6cd1f699bd474291819d0e39e4b2f7?alt=media&token=048d505d-fefc-43f7-b7e2-23a554802fa6&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-charity-orange-600/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Join Our Next Event?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Whether you want to volunteer, donate, or partner with us,
                there's a place for you in our mission.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/get-involved/volunteer"
                  className="inline-flex items-center px-8 py-3 bg-white text-charity-orange-600 hover:bg-charity-neutral-100 rounded-lg font-bold transition-colors duration-200"
                >
                  Volunteer With Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-charity-orange-600 rounded-lg font-bold transition-colors duration-200"
                >
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => {
                  setShowEventModal(false);
                  setSelectedEvent(null);
                }}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Modal Header */}
              <ModalHeader event={selectedEvent} />

              <div className="p-8">
                {/* Event Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-charity-neutral-800 mb-4 flex items-center">
                    <Heart className="h-6 w-6 text-charity-orange-600 mr-2" />
                    About This Event
                  </h2>
                  <p className="text-charity-neutral-700 leading-relaxed whitespace-pre-line">
                    {selectedEvent.fullDescription}
                  </p>
                </div>

                {/* Event Schedule or Impact for past events */}
                {selectedEvent.schedule && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charity-neutral-800 mb-4 flex items-center">
                      <Calendar className="h-6 w-6 text-charity-green-600 mr-2" />
                      Event Schedule
                    </h2>
                    <div className="bg-charity-neutral-50 rounded-xl p-6">
                      {selectedEvent.schedule.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-4 mb-4 last:mb-0"
                        >
                          <div className="bg-charity-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold min-w-20 text-center">
                            {item.time}
                          </div>
                          <div className="flex-1">
                            <p className="text-charity-neutral-700 font-medium">
                              {item.activity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.gallery && selectedEvent.gallery.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charity-neutral-800 mb-4">
                      Photo Gallery
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedEvent.gallery.map(
                        (url: string, index: number) => (
                          <img
                            key={index}
                            src={url}
                            alt={`${selectedEvent.title} photo ${index + 1}`}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        ),
                      )}
                    </div>
                  </div>
                )}

                {/* Expected Impact or Actual Impact */}
                {(selectedEvent.expectedImpact ||
                  selectedEvent.actualImpact) && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charity-neutral-800 mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 text-charity-green-600 mr-2" />
                      {selectedEvent.expectedImpact
                        ? "Expected Impact"
                        : "Actual Impact Achieved"}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(
                        selectedEvent.expectedImpact ||
                        selectedEvent.actualImpact
                      ).map((goal, index) => (
                        <div
                          key={index}
                          className="flex items-start space-x-3 bg-charity-green-50 p-4 rounded-lg"
                        >
                          <CheckCircle className="h-5 w-5 text-charity-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-charity-neutral-700">
                            {goal}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Testimonials for past events */}
                {selectedEvent.testimonials && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charity-neutral-800 mb-4 flex items-center">
                      <Heart className="h-6 w-6 text-charity-orange-600 mr-2" />
                      Community Voices
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {selectedEvent.testimonials.map((testimonial, index) => (
                        <div
                          key={index}
                          className="bg-charity-orange-50 p-6 rounded-xl"
                        >
                          <p className="text-charity-neutral-700 italic mb-4">
                            "{testimonial.quote}"
                          </p>
                          <div className="border-t border-charity-orange-200 pt-4">
                            <p className="font-bold text-charity-neutral-800">
                              {testimonial.name}
                            </p>
                            <p className="text-sm text-charity-orange-600">
                              {testimonial.role}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Long-term Impact for past events */}
                {selectedEvent.longTermImpact && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-charity-neutral-800 mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 text-charity-green-600 mr-2" />
                      Long-term Impact
                    </h2>
                    <div className="bg-charity-green-50 p-6 rounded-xl border-l-4 border-charity-green-500">
                      <p className="text-charity-neutral-700 leading-relaxed">
                        {selectedEvent.longTermImpact}
                      </p>
                    </div>
                  </div>
                )}

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-charity-orange-50 p-6 rounded-xl">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-charity-orange-600" />
                      <span className="text-charity-neutral-700">
                        {selectedEvent.contact}
                      </span>
                    </div>
                  </div>

                  {selectedEvent.itemsNeeded && (
                    <div className="bg-red-50 p-6 rounded-xl">
                      <h3 className="text-lg font-bold text-charity-neutral-800 mb-4 flex items-center">
                        <Gift className="h-5 w-5 text-red-600 mr-2" />
                        Items Needed
                      </h3>
                      <div className="grid grid-cols-1 gap-2">
                        {selectedEvent.itemsNeeded.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <span className="text-charity-neutral-700 text-sm">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Theme Section */}
                <div className="bg-charity-green-50 p-6 rounded-xl mb-8 border-l-4 border-charity-green-500">
                  <h3 className="text-lg font-bold text-charity-neutral-800 mb-2">
                    Event Theme:
                  </h3>
                  <p className="text-xl text-charity-green-700 italic font-medium">
                    "{selectedEvent.theme}"
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {selectedEvent.paymentLink && (
                    <a
                      href={selectedEvent.paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-charity-orange-600 hover:bg-charity-orange-700 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105 text-center"
                    >
                      {selectedEvent.ticketPrice
                        ? `🎟️ Grab a Slot — ${selectedEvent.ticketPrice}`
                        : "💝 Make a Contribution"}
                    </a>
                  )}

                  <Link
                    to="/contact"
                    className="flex-1 border-2 border-charity-green-600 text-charity-green-600 hover:bg-charity-green-600 hover:text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 text-center"
                  >
                    Contact Us for More Info
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Programs;

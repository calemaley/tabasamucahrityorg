// client/pages/Index.tsx
import { useState, useEffect, useRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Heart,
  Users,
  GraduationCap,
  Droplets,
  Utensils,
  TrendingUp,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";
import { redirectToPayment, CAMPAIGN_SOURCES } from "@/lib/payment";
import { recentBlogs } from "@shared/blog-data";
import { recentPrograms } from "@shared/programs-data";
import Carousel from "@/components/Carousel";

/**
 * SectionReveal: simple reveal-on-scroll wrapper using IntersectionObserver.
 * Adds "reveal-in" class when visible; default state is hidden with translate+opacity.
 *
 * Usage: wrap each major <section> content with <SectionReveal>...</SectionReveal>
 */
const SectionReveal = ({
  children,
  rootMargin = "-10% 0px -10% 0px",
  threshold = 0.12,
}: {
  children: ReactNode;
  rootMargin?: string;
  threshold?: number;
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // keep visible once revealed
            obs.unobserve(el);
          }
        });
      },
      { root: null, rootMargin, threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, threshold]);

  return (
    <section
      ref={ref as any}
      className={cn(
        // initial hidden state
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      aria-hidden={!visible}
    >
      {children}
    </section>
  );
};

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Featured children for homepage (first 4)
  const featuredChildren = [
    {
      id: "kevin-001",
      name: "Kevin Gitonga",
      age: 8,
      location: "Mwanza Region",
      school: "Mwanza Primary School",
      grade: "Grade 3",
      story:
        "Maria loves mathematics and dreams of becoming a teacher. She walks 5km to school daily and helps her mother with farming after classes.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2Fb8b21871733e41299357e2253b20e98f?format=webp&width=800",
      monthlyNeed: 45,
      interests: ["Mathematics", "Reading", "Farming"],
      dreamJob: "Teacher",
    },
    {
      id: "david-002",
      name: "David Kimaro",
      age: 12,
      location: "Arusha Region",
      school: "Arusha Community Secondary",
      grade: "Grade 9",
      story:
        "David is passionate about science and wants to become a doctor. His father is a subsistence farmer and struggles to pay school fees.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F950583433afd4f3aa883c9d1cc87031d?format=webp&width=800",
      monthlyNeed: 65,
      interests: ["Biology", "Chemistry", "Football"],
      dreamJob: "Doctor",
    },
    {
      id: "grace-003",
      name: "Grace Mtema",
      age: 15,
      location: "Dodoma Region",
      school: "Dodoma Girls Education Center",
      grade: "Form 3",
      story:
        "Grace excels in her studies and wants to become an engineer. She comes from a single-parent household and needs support to continue her education.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F4938be7564894703871587a39102255b?format=webp&width=800",
      monthlyNeed: 75,
      interests: ["Mathematics", "Physics", "Technology"],
      dreamJob: "Engineer",
    },
    {
      id: "john-004",
      name: "John Massawe",
      age: 10,
      location: "Kilimanjaro Region",
      school: "Kilimanjaro Primary School",
      grade: "Grade 5",
      story:
        "John is a bright student who loves to read. His parents work as casual laborers and cannot afford his educational expenses consistently.",
      image:
        "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F5de7bd1782db4332a9ee345b7cc61f01?format=webp&width=800",
      monthlyNeed: 50,
      interests: ["Reading", "Writing", "History"],
      dreamJob: "Writer",
    },
  ];

  const heroImages = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2Fcf3963a51367466792ca6dbf43055584?format=webp&width=1600",
      quote: "We value humanity",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2Fee16c7e0b8ce45359bc3469c94b5dd8e?format=webp&width=1600",
      quote: "Together, we build brighter futures",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F4b47460764c141f4b485cd1e04cff903?format=webp&width=1600",
      quote: "Every smile tells a story of hope",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F756bbf432a7540c6bfd45df87aa8734b?format=webp&width=1600",
      quote: "Compassion in action",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2Fda40ee32fcc744a6b9b61967b1b448ce?format=webp&width=1600",
      quote: "Community, care, and dignity",
    },
  ];

  const popularProjects = [
    {
      icon: Heart,
      title: "Make a Donation",
      description:
        "Your contribution helps us provide essential resources to children in need.",
      color: "charity-orange-500",
    },
    {
      icon: Users,
      title: "Sponsor a Child",
      description:
        "Create a lasting impact by sponsoring a child's education and development.",
      color: "charity-green-500",
    },
    {
      icon: GraduationCap,
      title: "Become a Volunteer",
      description:
        "Join our team and make a direct difference in children's lives.",
      color: "charity-orange-600",
    },
  ];

  const helpItems = [
    {
      icon: TrendingUp,
      title: "Start investing in our volunteer group",
      description:
        "Join our growing community of dedicated volunteers making real change.",
    },
    {
      icon: Droplets,
      title: "Because Everyone Deserves Clean Water",
      description:
        "Help us provide access to clean, safe drinking water for all.",
    },
    {
      icon: GraduationCap,
      title: "Childhood Education development support",
      description:
        "Support educational programs that give children the tools for success.",
    },
    {
      icon: Utensils,
      title: "Child Deserves Better Healthy Foods",
      description:
        "Ensure children have access to nutritious meals for healthy growth.",
    },
  ];

  const stats = [
    { number: "15+", label: "Total Campaigns" },
    { number: "50+", label: "Volunteers" },
    { number: "8K+", label: "Quick Fundraise" },
    { number: "87+", label: "Happy Volunteers" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  return (
    <>
      {/* Hero Carousel */}
      <SectionReveal>
        <section className="relative h-screen overflow-hidden">
          <Navigation />
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "absolute inset-0 transition-opacity duration-1000",
                  index === currentSlide ? "opacity-100" : "opacity-0",
                )}
              >
                <img
                  src={heroImages[index].src}
                  alt="Tabasamu Charity"
                  className="w-full h-full object-cover object-[center_35%]"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            ))}
          </div>

          <div className="relative h-full flex items-center justify-center text-center text-white px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {heroImages[currentSlide].quote}
              </h1>
              <div className="flex justify-center gap-4 mt-8">
                <Link
                  to="/get-involved/volunteer"
                  className="px-8 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Join Us Today
                </Link>
                <button
                  onClick={() =>
                    redirectToPayment("donationUrl", {
                      source: CAMPAIGN_SOURCES.hero,
                      campaign: "hero-donate",
                    })
                  }
                  className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-charity-neutral-800 rounded-lg transition-colors duration-200 font-medium"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors duration-200",
                  index === currentSlide ? "bg-white" : "bg-white/50",
                )}
              />
            ))}
          </div>
        </section>
      </SectionReveal>

      {/* About Us Snippet */}
      <SectionReveal>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <img
                    src="https://i.ibb.co/vxjcpZjD/Screenshot-from-2025-08-12-23-27-35.png"
                    alt="About Us"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charity-orange-500/20 to-transparent" />
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-4xl font-bold text-charity-neutral-800">
                  About Tabasamu Charity
                </h2>
                <p className="text-lg text-charity-neutral-600 leading-relaxed">
                  Tabasamu Charity is dedicated to transforming lives and
                  building stronger communities through education, healthcare,
                  and sustainable development. Since our founding, we've been
                  committed to creating lasting positive change for children and
                  families across Kenya.
                </p>
                <p className="text-charity-neutral-600">
                  Our comprehensive programs focus on providing quality
                  education, essential healthcare services, and opportunities
                  for community development. Together with our volunteers and
                  supporters, we're building a brighter future for the next
                  generation.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Call-to-Action Section */}
      <SectionReveal>
        <section className="py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Volunteer Section */}
            <div className="relative h-80 lg:h-96 bg-charity-orange-600 flex items-center justify-center overflow-hidden group cursor-pointer">
              <img
                src="https://i.ibb.co/vxjcpZjD/Screenshot-from-2025-08-12-23-27-35.png"
                alt="Volunteer"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charity-orange-600/80 to-charity-orange-500/80 group-hover:from-charity-orange-700/90 group-hover:to-charity-orange-600/90 transition-all duration-500" />
              <div className="relative text-center text-white px-8 group-hover:scale-105 transition-transform duration-500">
                <Users className="h-16 w-16 mx-auto mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500" />
                <h3 className="text-3xl font-bold mb-4 group-hover:text-yellow-100 transition-colors duration-300">
                  Become A Volunteer
                </h3>
                <p className="text-xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  Join our mission to make a difference
                </p>
                <Link
                  to="/get-involved/volunteer"
                  className="inline-block px-8 py-3 bg-white text-charity-orange-600 hover:bg-yellow-100 hover:scale-105 hover:shadow-lg rounded-lg font-bold transition-all duration-300 group-hover:animate-pulse"
                >
                  JOIN NOW
                  <ArrowRight className="inline ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Link>
              </div>
            </div>

            {/* Donate Section */}
            <div className="relative h-80 lg:h-96 bg-charity-green-700 flex items-center justify-center overflow-hidden group cursor-pointer">
              <img
                src="https://i.ibb.co/vxjcpZjD/Screenshot-from-2025-08-12-23-27-35.png"
                alt="Donate"
                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-charity-green-700/80 to-charity-green-600/80 group-hover:from-charity-green-800/90 group-hover:to-charity-green-700/90 transition-all duration-500" />
              <div className="relative text-center text-white px-8 group-hover:scale-105 transition-transform duration-500">
                <Heart className="h-16 w-16 mx-auto mb-4 group-hover:scale-110 group-hover:text-pink-200 transition-all duration-500 fill-current" />
                <h3 className="text-3xl font-bold mb-4 group-hover:text-green-100 transition-colors duration-300">
                  Support Our Cause
                </h3>
                <p className="text-xl mb-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  Every donation creates lasting impact
                </p>
                <button
                  onClick={() =>
                    redirectToPayment("donationUrl", {
                      source: CAMPAIGN_SOURCES.cta,
                      campaign: "donate-section",
                    })
                  }
                  className="inline-block px-8 py-3 bg-white text-charity-green-700 hover:bg-green-100 hover:scale-105 hover:shadow-lg rounded-lg font-bold transition-all duration-300 group-hover:animate-pulse"
                >
                  DONATE NOW
                  <ArrowRight className="inline ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Popular Projects */}
      <SectionReveal>
        <section className="py-20 bg-charity-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-sm uppercase tracking-wide text-charity-orange-600 font-semibold mb-2">
                OUR BEST FEATURES
              </h2>
              <h3 className="text-4xl font-bold text-charity-neutral-800">
                We're Popular To Provide Best Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularProjects.map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 text-center cursor-pointer group border-2 border-transparent hover:border-charity-orange-200"
                  >
                    <div
                      className={cn(
                        "w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500",
                        `bg-${project.color}/10 group-hover:bg-${project.color}/20`,
                      )}
                    >
                      <IconComponent
                        className={cn(
                          "h-8 w-8 group-hover:scale-125 transition-transform duration-300",
                          `text-${project.color}`,
                        )}
                      />
                    </div>
                    <h4 className="text-xl font-bold text-charity-neutral-800 mb-4 group-hover:text-charity-orange-600 group-hover:scale-105 transition-all duration-300">
                      {project.title}
                    </h4>
                    <p className="text-charity-neutral-600 group-hover:text-charity-neutral-700 transition-colors duration-300">
                      {project.description}
                    </p>
                    <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                      {project.title === "Make a Donation" ? (
                        <button
                          onClick={() =>
                            redirectToPayment("donationUrl", {
                              source: CAMPAIGN_SOURCES.hero,
                              campaign: "popular-projects-donate",
                            })
                          }
                          className="inline-block px-6 py-2 bg-charity-orange-600 text-white rounded-lg hover:bg-charity-orange-700 transition-colors duration-200"
                        >
                          Donate Now
                        </button>
                      ) : project.title === "Sponsor a Child" ? (
                        <Link
                          to="/sponsor"
                          className="inline-block px-6 py-2 bg-charity-orange-600 text-white rounded-lg hover:bg-charity-orange-700 transition-colors duration-200"
                        >
                          Sponsor Now
                        </Link>
                      ) : (
                        <Link
                          to="/get-involved/volunteer"
                          className="inline-block px-6 py-2 bg-charity-orange-600 text-white rounded-lg hover:bg-charity-orange-700 transition-colors duration-200"
                        >
                          Learn More
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Meet Our Children */}
      <SectionReveal>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Meet Our Children
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Every child has a unique story and dreams waiting to be
                fulfilled. Meet some of the amazing children who need your
                support to achieve their goals.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              {featuredChildren.slice(0, 2).map((child, index) => (
                <div
                  key={child.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
                  onClick={() =>
                    (window.location.href = `/sponsor?child=${child.id}`)
                  }
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={child.image}
                      alt={child.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 text-white">
                        <span className="text-sm font-medium">
                          Dreams of being a {child.dreamJob}
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-charity-green-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                      Available
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-charity-neutral-800 mb-2 group-hover:text-charity-orange-600 transition-colors duration-200">
                      {child.name}
                    </h3>

                    <div className="flex items-center text-charity-neutral-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2 text-charity-orange-500" />
                      <span className="font-medium">{child.age} years old</span>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium text-charity-neutral-700 mb-2">
                        Interests:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {child.interests.map((interest, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-charity-green-100 text-charity-green-700 text-sm rounded-full font-medium"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6 p-4 bg-charity-orange-50 rounded-xl">
                      <div className="text-center">
                        <span className="text-charity-neutral-700 font-medium text-sm block mb-1">
                          Monthly Support:
                        </span>
                        <div className="text-2xl font-bold text-charity-orange-600">
                          KES {(child.monthlyNeed * 135).toLocaleString()}
                        </div>
                        <div className="text-xs text-charity-neutral-500">
                          ≈ ${child.monthlyNeed} USD
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/sponsor?child=${child.id}`}
                      className="block w-full text-center px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium group-hover:transform group-hover:scale-105"
                      onClick={(e) => e.stopPropagation()}
                    >
                      💝 Sponsor {child.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/children"
                className="inline-flex items-center px-8 py-4 bg-charity-green-600 hover:bg-charity-green-700 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
              >
                View All Children
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* How You Can Help Us */}
      <SectionReveal>
        <section className="py-20 relative overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F8d975f746acc4941bfe12ec3f1c5138a?alt=media&token=2e1e0384-83fc-4b15-ae49-a302f7da8126&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-charity-orange-600/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                How You Can Help Us?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={index}
                    className="text-center text-white group cursor-pointer"
                  >
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/20 group-hover:bg-white/30 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 group-hover:shadow-xl">
                      <IconComponent className="h-10 w-10 group-hover:scale-125 group-hover:text-yellow-200 transition-all duration-300" />
                    </div>
                    <h4 className="text-lg font-bold mb-3 group-hover:text-yellow-100 group-hover:scale-105 transition-all duration-300">
                      {item.title}
                    </h4>
                    <p className="text-white/90 text-sm group-hover:text-white group-hover:scale-105 transition-all duration-300">
                      {item.description}
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                      <div className="w-16 h-1 bg-white/50 mx-auto rounded-full group-hover:bg-yellow-200 transition-colors duration-300"></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Featured Events */}
      <SectionReveal>
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-4xl font-bold text-charity-neutral-800">
                Featured Events
              </h2>
              <Link
                to="/programs#featured-event"
                className="flex items-center text-charity-orange-600 hover:text-charity-orange-700 font-medium group"
              >
                View All Programs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {recentPrograms.map((program, index) => (
                <Link
                  key={index}
                  to="/programs#featured-event"
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group block"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg font-bold transform rotate-3">
                      {program.date}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-charity-orange-200 transition-colors duration-200">
                        {program.title}
                      </h4>
                      {program.venue && (
                        <div className="flex items-center text-white/90 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{program.venue}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-charity-neutral-600 leading-relaxed">
                      {program.description}
                    </p>
                    <div className="mt-4 text-charity-orange-600 font-medium flex items-center group-hover:translate-x-1 transition-transform duration-200">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Impact Statistics */}
      <SectionReveal>
        <section className="py-20 relative overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F5ab93ce551fe442ba1ad6d5cb267b689?alt=media&token=6c7413b8-90dc-43b0-94ba-f01de3392756&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="absolute inset-0 bg-charity-green-700/85" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                LET'S SUPPORT US TO HELP THEM
              </h2>
              <p className="text-xl text-white/90">
                Join your hands with us for a better life and future
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center text-white group cursor-pointer"
                >
                  <div className="bg-white/10 rounded-xl p-6 group-hover:bg-white/20 group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 border border-white/20 group-hover:border-white/40">
                    <div className="text-5xl font-bold mb-2 group-hover:text-yellow-100 group-hover:scale-110 transition-all duration-300">
                      {stat.number}
                    </div>
                    <div className="text-lg opacity-90 group-hover:opacity-100 group-hover:text-green-100 transition-all duration-300">
                      {stat.label}
                    </div>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-12 h-1 bg-yellow-200 mx-auto rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-white text-charity-green-700 hover:bg-charity-neutral-100 rounded-lg font-bold transition-colors duration-200"
              >
                Read More
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Featured Blog */}
      <SectionReveal>
        <section className="py-20 bg-gradient-to-br from-charity-neutral-50 to-charity-orange-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Latest Story
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Discover inspiring stories of hope, transformation, and the
                power of community support
              </p>
            </div>

            {recentBlogs.map((blog, index) => (
              <Link
                key={index}
                to="/blog"
                className="block bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 cursor-pointer group transform hover:-translate-y-2 hover:scale-[1.02]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative overflow-hidden h-80 lg:h-auto">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center px-4 py-2 bg-charity-orange-600 text-white rounded-full text-sm font-bold shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        {blog.category}
                      </span>
                    </div>

                    {/* Featured Label */}
                    <div className="absolute top-6 right-6">
                      <span className="inline-flex items-center px-3 py-1 bg-charity-green-600 text-white rounded-full text-xs font-bold shadow-lg animate-pulse">
                        FEATURED
                      </span>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center justify-between text-white">
                        <div className="flex items-center space-x-4 text-sm font-medium">
                          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{blog.date}</span>
                          </div>
                          <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                            <User className="h-3 w-3 mr-1" />
                            <span>{blog.author}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-charity-orange-100 rounded-full opacity-20 transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-charity-green-100 rounded-full opacity-30 transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>

                    <div className="relative z-10">
                      <h3 className="text-3xl lg:text-4xl font-bold text-charity-neutral-800 mb-6 leading-tight group-hover:text-charity-orange-600 transition-colors duration-300">
                        {blog.title}
                      </h3>

                      <p className="text-lg text-charity-neutral-600 leading-relaxed mb-8 line-clamp-4">
                        {blog.snippet}
                      </p>

                      {/* Call to Action */}
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-charity-orange-600 to-charity-orange-500 hover:from-charity-orange-700 hover:to-charity-orange-600 text-white rounded-xl font-bold shadow-lg group-hover:shadow-xl transform group-hover:scale-105 transition-all duration-300">
                          <span className="mr-2">Read Full Story</span>
                          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                        </div>

                        {/* Reading Time */}
                        <div className="flex items-center text-charity-neutral-500 text-sm font-medium">
                          <div className="w-2 h-2 bg-charity-green-500 rounded-full mr-2 animate-pulse"></div>
                          <span>5 min read</span>
                        </div>
                      </div>

                      {/* Decorative Quote */}
                      <div className="mt-8 p-4 bg-charity-orange-50 rounded-xl border-l-4 border-charity-orange-500 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <p className="text-charity-orange-700 italic font-medium text-sm">
                          "Every act of kindness is a push forward towards a
                          brighter future."
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </SectionReveal>

      <Footer />
    </>
  );
};

export default Index;

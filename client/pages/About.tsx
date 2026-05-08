import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Heart,
  Target,
  Globe,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { redirectToPayment, CAMPAIGN_SOURCES } from "@/lib/payment";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We approach every situation with empathy and understanding, putting the needs of children and families first.",
    },
    {
      icon: Target,
      title: "Impact",
      description:
        "We focus on creating measurable, sustainable change that transforms lives and strengthens communities.",
    },
    {
      icon: Globe,
      title: "Community",
      description:
        "We work hand-in-hand with local communities, respecting their wisdom and building on their strengths.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We continuously seek new and better ways to address challenges and maximize our positive impact.",
    },
  ];

  const milestones = [
    {
      year: "2021",
      event: "First Charity",
      achievement:
        "Tabasamu Charity was founded with a mission to transform lives",
    },
    {
      year: "2022",
      event: "- Football tournaments ",
      achievement: "Mens mental health awareness",
    },
    {
      year: "2023",
      event: "Free Medical Camp",
      achievement: "Mobile clinic program started",
    },
    {
      year: "2024",
      event: "Charity Work",
      achievement: "visited Rwai childrens home ",
    },
    {
      year: "2025",
      event: "Free Medical Camp",
      achievement: "More smiles were created ",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-0 relative overflow-hidden bg-gradient-to-br from-charity-orange-50 to-charity-green-50">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F8e424a7266c54eedaca8ca2ed8bd1bc3?alt=media&token=6df04b8b-d8fe-4334-903e-49f0c58d8860&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/30" />
        <Navigation />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-charity-neutral-800 mb-6">
                About Tabasamu
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-charity-neutral-600">
                Building brighter futures through education, healthcare, and
                community development since 2021
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About Tabasamu Charity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-8 text-center">
                About Tabasamu Charity
              </h2>
              <div className="space-y-6 text-lg text-charity-neutral-600 leading-relaxed">
                <p>
                  Tabasamu Charity is a social impact initiative dedicated to
                  supporting vulnerable children while building stronger, more
                  resilient communities. We believe that when a child is
                  empowered, an entire community is transformed.
                </p>
                <p>
                  Through community outreach, mental health advocacy, and
                  storytelling platforms like The Human Mosaic, we create safe
                  spaces where communities feel supported, heard, and empowered.
                  Our work spans access to basic needs, education support,
                  emotional wellbeing, and mentorship; ensuring both immediate
                  relief and long-term impact.
                </p>
                <p>
                  At Tabasamu, we don't just respond to need; we nurture
                  potential, strengthen communities, and restore hope, one smile
                  at a time.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideRight">
              <div>
                <h2 className="text-4xl font-bold text-charity-neutral-800 mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-charity-neutral-600 leading-relaxed">
                  To drive transformative community outreach across Kenya by
                  using storytelling, media, and grassroots engagement to
                  champion mental health, expand access to education, and meet
                  essential needs; igniting hope, amplifying voices, and
                  creating lasting impact.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={200}>
              <div className="bg-charity-orange-50 p-8 rounded-2xl">
                <h2 className="text-4xl font-bold text-charity-neutral-800 mb-6">
                  Our Vision
                </h2>
                <p className="text-lg text-charity-neutral-600 leading-relaxed">
                  To inspire a generation across Kenya that turns compassion
                  into action; building communities where every story matters,
                  every voice is heard, and every life has a reason to smile.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-charity-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Our Values
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                These core values guide everything we do and shape how we
                approach our work in communities.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 100}
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-center group">
                    <div className="w-16 h-16 mx-auto mb-4 bg-charity-orange-100 rounded-full flex items-center justify-center group-hover:bg-charity-orange-200 transition-colors duration-300">
                      <IconComponent className="h-8 w-8 text-charity-orange-600 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-charity-neutral-800 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-charity-neutral-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Our Journey
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                From humble beginnings to significant impact - see how we've
                grown and evolved over the years.
              </p>
            </div>
          </AnimatedSection>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-charity-orange-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <AnimatedSection
                  key={index}
                  animation="slideUp"
                  delay={index * 100}
                >
                  <div
                    className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                  >
                    <div className="flex-1 px-8">
                      <div
                        className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${index % 2 === 0 ? "text-right" : "text-left"}`}
                      >
                        <div className="text-charity-orange-600 font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-bold text-charity-neutral-800 mb-2">
                          {milestone.event}
                        </h3>
                        <p className="text-charity-neutral-600">
                          {milestone.achievement}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="w-8 h-8 bg-charity-orange-500 rounded-full border-4 border-white shadow-lg z-10 relative">
                        <div className="absolute inset-0 bg-charity-orange-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                    </div>

                    <div className="flex-1"></div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F826bd7ba94cd48cdaf77d52398dbec6c?alt=media&token=86a392a8-40c2-4e0b-abbe-8d53a9454655&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-charity-green-700/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join us in our mission to transform lives and build stronger
                communities across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/get-involved/volunteer"
                  className="inline-flex items-center px-8 py-3 bg-white text-charity-green-700 hover:bg-charity-neutral-100 rounded-lg font-bold transition-colors duration-200"
                >
                  Become a Volunteer
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <button
                  onClick={() =>
                    redirectToPayment("donationUrl", {
                      source: CAMPAIGN_SOURCES.about,
                      campaign: "about-cta",
                    })
                  }
                  className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-charity-green-700 rounded-lg font-bold transition-colors duration-200"
                >
                  Make a Donation
                  <Heart className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;

import { Link } from "react-router-dom";
import { Heart, ArrowRight, Quote } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { redirectToPayment, CAMPAIGN_SOURCES } from "@/lib/payment";

const MeetOurFounder = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-0 relative overflow-hidden bg-gradient-to-br from-charity-orange-50 to-charity-green-50">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://cdn.builder.io/o/assets%2F80b74e3fdcaa4c0ca29f792322dc0e5f%2F8e424a7266c54eedaca8ca2ed8bd1bc3?alt=media&token=6df04b8b-d8fe-4334-903e-49f0c58d8860&apiKey=80b74e3fdcaa4c0ca29f792322dc0e5f"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
        <Navigation />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <AnimatedSection animation="slideUp">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Meet Our Founder
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                The heart and vision behind Tabasamu Charity
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Founder Profile */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideRight">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* Founder Photo */}
              <div className="relative">
                <div className="transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="bg-gradient-to-br from-charity-orange-100 to-charity-green-100 p-8 rounded-3xl shadow-2xl">
                    <div className="transform -rotate-2">
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F1621da4a27844381af3e9ee9867abbdf%2F44c32d1cc5014f039d98cddadbcab10b?format=webp&width=800"
                        alt="A.O.Suleiman Kagwe - Founder"
                        className="w-full h-[480px] object-cover object-top rounded-2xl shadow-lg"
                      />
                    </div>
                    <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-full shadow-xl">
                      <Heart className="h-8 w-8 text-charity-orange-600" />
                    </div>
                    <div className="absolute -top-4 -left-4 bg-charity-green-500 text-white px-4 py-2 rounded-full text-sm font-bold transform -rotate-12">
                      Founder
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-4xl font-bold text-charity-neutral-800 mb-6">
                    A Message from Our Founder
                  </h2>
                  <div className="text-lg text-charity-neutral-600 leading-relaxed space-y-5">
                    <div className="flex gap-3">
                      <Quote className="h-8 w-8 text-charity-orange-300 flex-shrink-0 mt-1" />
                      <p className="italic text-charity-orange-700 text-xl">
                        Every child has a dream, and every smile holds a
                        promise. As I journey through life, my story unfolds
                        with a simple yet profound purpose: to ignite sparks of
                        joy and fuel the dreams of those around me.
                      </p>
                    </div>
                    <p>
                      In nurturing the needy and spreading love, I believe we
                      embody the truest essence of humanity. Every act of
                      kindness creates ripples that extend far beyond what we
                      can see, touching lives and transforming communities in
                      ways we may never fully comprehend.
                    </p>
                    <p>
                      Tabasamu — which means "smile" in Swahili — was born from
                      a conviction that one person's compassion, when channelled
                      intentionally, can set an entire community on a path
                      toward healing and hope. Every program we run, every child
                      we support, and every community we serve is a reflection
                      of that founding belief.
                    </p>
                  </div>
                </div>

                {/* Signature */}
                <div className="border-t border-charity-neutral-200 pt-8">
                  <div className="flex items-center space-x-6">
                    <div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets%2F1621da4a27844381af3e9ee9867abbdf%2F7770cebdcca846749404ed197d79d32c?format=webp&width=800"
                        alt="A.O.Suleiman Kagwe Signature"
                        className="h-16 w-auto"
                      />
                      <div className="mt-2">
                        <p className="font-bold text-charity-neutral-800 text-lg">
                          A.O.Suleiman Kagwe
                        </p>
                        <p className="text-charity-orange-600 font-medium">
                          Founder &amp; CEO
                        </p>
                        <p className="text-sm text-charity-neutral-500">
                          Tabasamu Charity
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-charity-orange-50 p-6 rounded-xl border-l-4 border-charity-orange-500">
                  <h3 className="font-bold text-charity-neutral-800 mb-2">
                    Join Our Mission
                  </h3>
                  <p className="text-charity-neutral-600 mb-4">
                    Together, we can create lasting change in the lives of
                    children and communities across Kenya.
                  </p>
                  <Link
                    to="/get-involved"
                    className="inline-flex items-center px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium group"
                  >
                    Get Involved Today
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Vision Banner */}
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
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
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
                    campaign: "founder-cta",
                  })
                }
                className="inline-flex items-center px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-charity-green-700 rounded-lg font-bold transition-colors duration-200"
              >
                Make a Donation
                <Heart className="ml-2 h-4 w-4" />
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MeetOurFounder;

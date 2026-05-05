import { FileText, Download, BookOpen, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const resources = [
  {
    icon: FileText,
    title: "Annual Report 2024",
    description:
      "A comprehensive overview of our programs, impact, and financials for the year 2024.",
    tag: "Report",
    comingSoon: true,
  },
  {
    icon: BookOpen,
    title: "Community Outreach Guide",
    description:
      "Learn how we approach community outreach and mental health advocacy in our programs.",
    tag: "Guide",
    comingSoon: true,
  },
  {
    icon: FileText,
    title: "Media Kit",
    description:
      "Logos, brand assets, and press materials for media partners and collaborators.",
    tag: "Media",
    comingSoon: true,
  },
  {
    icon: Download,
    title: "Volunteer Handbook",
    description:
      "Everything you need to know before joining Tabasamu as a volunteer or intern.",
    tag: "Handbook",
    comingSoon: true,
  },
];

const Resources = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-0 relative overflow-hidden min-h-[45vh] flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-charity-green-600 to-charity-orange-600" />
        <div className="absolute inset-0 bg-black/30" />
        <Navigation />
        <div className="relative z-10 flex-1 flex items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <AnimatedSection animation="slideUp">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Resources
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
                Reports, guides, and materials to learn more about our work and
                mission
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-charity-neutral-800 mb-4">
                Publications & Downloads
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Access our reports, guides, and other materials. More resources
                will be added as they become available.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {resources.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 100}
                >
                  <div className="bg-white border-2 border-charity-neutral-100 rounded-2xl p-6 hover:border-charity-orange-200 hover:shadow-lg transition-all duration-300 group">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-charity-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-charity-orange-200 transition-colors duration-300">
                        <IconComponent className="h-6 w-6 text-charity-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-semibold text-charity-orange-600 bg-charity-orange-50 px-2 py-0.5 rounded-full">
                            {item.tag}
                          </span>
                          {item.comingSoon && (
                            <span className="text-xs font-medium text-charity-neutral-400 bg-charity-neutral-100 px-2 py-0.5 rounded-full">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-charity-neutral-800 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-charity-neutral-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-16 bg-charity-neutral-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-bold text-charity-neutral-800 mb-4">
              Want to Learn More?
            </h2>
            <p className="text-lg text-charity-neutral-600 mb-8 max-w-2xl mx-auto">
              Follow our blog for the latest stories, news, and updates from our
              programs on the ground.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/blog"
                className="inline-flex items-center px-8 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-bold transition-colors duration-200"
              >
                Read Our Blog
                <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 border-2 border-charity-orange-600 text-charity-orange-600 hover:bg-charity-orange-600 hover:text-white rounded-lg font-bold transition-colors duration-200"
              >
                Contact Us
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Resources;

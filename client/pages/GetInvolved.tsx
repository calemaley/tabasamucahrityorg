import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Heart,
  Users,
  GraduationCap,
  DollarSign,
  Clock,
  Globe,
  Award,
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const GetInvolved = () => {
  const [donationAmount, setDonationAmount] = useState('50');
  const [sponsorshipType, setSponsorshipType] = useState('education');

  const volunteerOpportunities = [
    {
      icon: GraduationCap,
      title: "Education Volunteer",
      description: "Help teach children in schools or provide tutoring support",
      commitment: "3-6 months",
      skills: "Teaching, patience, creativity",
      impact: "Direct impact on 20-30 children",
      image: "/placeholder.svg",
    },
    {
      icon: Users,
      title: "Community Outreach",
      description: "Work with local communities on development projects",
      commitment: "6-12 months",
      skills: "Communication, project management",
      impact: "Support 100+ community members",
      image: "/placeholder.svg",
    },
    {
      icon: Heart,
      title: "Healthcare Support",
      description: "Assist in mobile clinics and health education programs",
      commitment: "6-12 months",
      skills: "Medical background preferred",
      impact: "Serve 200+ patients monthly",
      image: "/placeholder.svg",
    },
  ];

  const donationImpacts = [
    { amount: 25, impact: "Provides school supplies for one child for a month" },
    { amount: 50, impact: "Covers medical expenses for a family in need" },
    { amount: 100, impact: "Sponsors a child's education for three months" },
    { amount: 250, impact: "Supports a mobile clinic visit to a remote village" },
    { amount: 500, impact: "Funds a clean water well installation" },
  ];

  const sponsorshipBenefits = [
    "Regular updates on your sponsored child's progress",
    "Annual school and health reports",
    "Letters and artwork from your sponsored child",
    "Opportunity to visit and meet your sponsored child",
    "Tax-deductible contribution receipt",
    "Join our sponsor community events",
  ];

  const volunteerSteps = [
    { step: 1, title: "Apply Online", description: "Complete our volunteer application form" },
    { step: 2, title: "Interview", description: "Phone or video interview with our team" },
    { step: 3, title: "Training", description: "Comprehensive orientation and skill training" },
    { step: 4, title: "Placement", description: "Matched with a program that fits your skills" },
  ];

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-to-br from-charity-orange-500 to-charity-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Get Involved
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Join our mission to transform lives and build stronger communities. Every contribution makes a difference.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#volunteer" className="px-8 py-3 bg-white text-charity-orange-600 hover:bg-charity-neutral-100 rounded-lg font-bold transition-colors duration-200">
                  Volunteer Now
                </a>
                <a href="#donate" className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-charity-orange-600 rounded-lg font-bold transition-colors duration-200">
                  Make a Donation
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Volunteer Section */}
      <section id="volunteer" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">Volunteer Opportunities</h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Use your skills and passion to make a direct impact in the lives of children and communities.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {volunteerOpportunities.map((opportunity, index) => {
              const IconComponent = opportunity.icon;
              return (
                <AnimatedSection key={index} animation="scaleIn" delay={index * 100}>
                  <div className="bg-white border border-charity-neutral-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                    <div className="relative">
                      <img
                        src={opportunity.image}
                        alt={opportunity.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 w-12 h-12 bg-charity-orange-600 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-charity-neutral-800 mb-3">{opportunity.title}</h3>
                      <p className="text-charity-neutral-600 mb-4">{opportunity.description}</p>

                      <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-charity-neutral-500">
                          <Clock className="h-4 w-4 mr-2" />
                          <span>{opportunity.commitment}</span>
                        </div>
                        <div className="flex items-center text-sm text-charity-neutral-500">
                          <Award className="h-4 w-4 mr-2" />
                          <span>{opportunity.skills}</span>
                        </div>
                        <div className="flex items-center text-sm text-charity-neutral-500">
                          <Globe className="h-4 w-4 mr-2" />
                          <span>{opportunity.impact}</span>
                        </div>
                      </div>

                      <button className="w-full px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-medium transition-colors duration-200">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>

          {/* Volunteer Process */}
          <AnimatedSection animation="slideUp">
            <div className="bg-charity-neutral-50 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-charity-neutral-800 text-center mb-12">How to Become a Volunteer</h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {volunteerSteps.map((step, index) => (
                  <div key={index} className="text-center relative">
                    <div className="w-16 h-16 bg-charity-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {step.step}
                    </div>
                    <h4 className="text-lg font-bold text-charity-neutral-800 mb-2">{step.title}</h4>
                    <p className="text-charity-neutral-600 text-sm">{step.description}</p>

                    {index < volunteerSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full">
                        <ArrowRight className="h-6 w-6 text-charity-orange-400 mx-auto" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <button className="px-8 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-bold transition-colors duration-200">
                  Start Your Application
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-charity-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">Make a Donation</h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Your donation directly supports our programs and creates lasting change in communities across Tanzania.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <AnimatedSection animation="slideRight">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-charity-neutral-800 mb-6">Choose Your Donation Amount</h3>

                <div className="grid grid-cols-3 gap-3 mb-6">
                  {['25', '50', '100'].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setDonationAmount(amount)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        donationAmount === amount
                          ? 'border-charity-orange-600 bg-charity-orange-50 text-charity-orange-600'
                          : 'border-charity-neutral-300 hover:border-charity-orange-400'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                    Custom Amount
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charity-neutral-400" />
                    <input
                      type="number"
                      value={donationAmount}
                      onChange={(e) => setDonationAmount(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                    Donation Frequency
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 border-2 border-charity-orange-600 bg-charity-orange-50 text-charity-orange-600 rounded-lg">
                      One-time
                    </button>
                    <button className="p-3 border-2 border-charity-neutral-300 hover:border-charity-orange-400 rounded-lg">
                      Monthly
                    </button>
                  </div>
                </div>

                <button className="w-full px-6 py-4 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-bold text-lg transition-colors duration-200">
                  Donate ${donationAmount}
                </button>
              </div>
            </AnimatedSection>

            {/* Donation Impact */}
            <AnimatedSection animation="slideLeft" delay={200}>
              <div>
                <h3 className="text-2xl font-bold text-charity-neutral-800 mb-6">Your Impact</h3>

                <div className="space-y-4 mb-8">
                  {donationImpacts.map((impact, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        parseInt(donationAmount) >= impact.amount
                          ? 'border-charity-green-500 bg-charity-green-50'
                          : 'border-charity-neutral-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full mr-3 flex items-center justify-center ${
                            parseInt(donationAmount) >= impact.amount
                              ? 'bg-charity-green-500'
                              : 'bg-charity-neutral-300'
                          }`}>
                            {parseInt(donationAmount) >= impact.amount && (
                              <Check className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <span className="font-medium">${impact.amount}</span>
                        </div>
                      </div>
                      <p className="text-sm text-charity-neutral-600 mt-2 ml-9">{impact.impact}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-charity-orange-50 p-6 rounded-xl">
                  <h4 className="font-bold text-charity-orange-800 mb-2">100% Direct Impact</h4>
                  <p className="text-charity-orange-700 text-sm">
                    Every dollar you donate goes directly to our programs. Administrative costs are covered by separate funding.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Child Sponsorship */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slideRight">
              <div>
                <h2 className="text-4xl font-bold text-charity-neutral-800 mb-6">Sponsor a Child</h2>
                <p className="text-lg text-charity-neutral-600 mb-6 leading-relaxed">
                  Create a lasting bond and transform a child's life through education, healthcare,
                  and emotional support. Child sponsorship is one of the most personal and impactful
                  ways to make a difference.
                </p>

                <div className="space-y-3 mb-8">
                  {sponsorshipBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-charity-green-500 mr-3 flex-shrink-0" />
                      <span className="text-charity-neutral-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                      Sponsorship Type
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSponsorshipType('education')}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          sponsorshipType === 'education'
                            ? 'border-charity-orange-600 bg-charity-orange-50 text-charity-orange-600'
                            : 'border-charity-neutral-300 hover:border-charity-orange-400'
                        }`}
                      >
                        Education ($50/month)
                      </button>
                      <button
                        onClick={() => setSponsorshipType('full')}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          sponsorshipType === 'full'
                            ? 'border-charity-orange-600 bg-charity-orange-50 text-charity-orange-600'
                            : 'border-charity-neutral-300 hover:border-charity-orange-400'
                        }`}
                      >
                        Full Support ($75/month)
                      </button>
                    </div>
                  </div>

                  <button className="w-full px-6 py-4 bg-charity-green-600 hover:bg-charity-green-700 text-white rounded-lg font-bold text-lg transition-colors duration-200">
                    Start Sponsorship
                  </button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={200}>
              <div className="relative">
                <img
                  src="/placeholder.svg"
                  alt="Children"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-lg font-semibold mb-2">Join 500+ sponsors</p>
                  <p className="text-sm opacity-90">Making dreams come true, one child at a time</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-charity-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Have questions about volunteering, donating, or sponsoring? Get in touch with our team.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Mail className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Email Us</p>
                  <p className="text-sm opacity-90">info@tabasamu.org</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Phone className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Call Us</p>
                  <p className="text-sm opacity-90">+255 123 456 789</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-sm opacity-90">Dar es Salaam, Tanzania</p>
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-3 bg-white text-charity-orange-600 hover:bg-charity-neutral-100 rounded-lg font-bold transition-colors duration-200"
              >
                Contact Us Today
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default GetInvolved;

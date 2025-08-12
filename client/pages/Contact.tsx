import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Users,
  Heart,
  CheckCircle,
  Globe,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Office",
      details: [
        "123 Charity Street",
        "Dar es Salaam, Tanzania",
        "P.O. Box 12345",
      ],
      action: "Get Directions",
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+255 123 456 789", "+255 987 654 321", "Mon-Fri: 8AM-5PM"],
      action: "Call Now",
    },
    {
      icon: Mail,
      title: "Email Us",
      details: [
        "info@tabasamu.org",
        "volunteer@tabasamu.org",
        "Response within 24 hours",
      ],
      action: "Send Email",
    },
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "8:00 AM - 5:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" },
  ];

  const faqs = [
    {
      question: "How can I volunteer with Tabasamu Charity?",
      answer:
        "You can start by filling out our volunteer application form. We'll then schedule an interview and provide comprehensive training before your placement.",
    },
    {
      question: "Is my donation tax-deductible?",
      answer:
        "Yes, Tabasamu Charity is a registered nonprofit organization. All donations are tax-deductible and you'll receive a receipt for your records.",
    },
    {
      question: "Can I sponsor a specific child?",
      answer:
        "Absolutely! Our child sponsorship program allows you to form a personal connection with a child while supporting their education and healthcare needs.",
    },
    {
      question: "Do you accept in-kind donations?",
      answer:
        "Yes, we accept donations of school supplies, medical equipment, and other items. Please contact us first to confirm what items are currently needed.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-0 bg-gradient-to-br from-charity-green-500 to-charity-orange-500 relative">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Get in touch with our team. We'd love to hear from you and
                answer any questions about our programs.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Get In Touch
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                We're here to help and answer any questions you might have about
                our programs, volunteering opportunities, or how to get
                involved.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 100}
                >
                  <div className="bg-charity-neutral-50 p-8 rounded-xl text-center hover:shadow-lg hover:scale-105 transition-all duration-300 group">
                    <div className="w-16 h-16 bg-charity-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-charity-neutral-800 mb-4">
                      {info.title}
                    </h3>

                    <div className="space-y-2 mb-6">
                      {info.details.map((detail, detailIndex) => (
                        <p
                          key={detailIndex}
                          className="text-charity-neutral-600"
                        >
                          {detail}
                        </p>
                      ))}
                    </div>

                    <button className="text-charity-orange-600 hover:text-charity-orange-700 font-medium transition-colors duration-200">
                      {info.action}
                    </button>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-charity-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <AnimatedSection animation="slideRight">
              <div className="bg-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-charity-neutral-800 mb-6">
                  Send Us a Message
                </h3>

                {isSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-16 w-16 text-charity-green-500 mx-auto mb-4" />
                    <h4 className="text-xl font-bold text-charity-green-700 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-charity-neutral-600">
                      Thank you for reaching out. We'll get back to you within
                      24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="volunteer">Volunteering</option>
                        <option value="donation">Donations</option>
                        <option value="sponsorship">Child Sponsorship</option>
                        <option value="partnership">Partnerships</option>
                        <option value="media">Media & Press</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent"
                        placeholder="Brief subject of your message"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-charity-neutral-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent resize-none"
                        placeholder="Tell us more about your inquiry..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-bold transition-colors duration-200 flex items-center justify-center group"
                    >
                      <Send className="h-5 w-5 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </AnimatedSection>

            {/* Office Hours & Location */}
            <AnimatedSection animation="slideLeft" delay={200}>
              <div className="space-y-8">
                {/* Office Hours */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <Clock className="h-6 w-6 text-charity-orange-600 mr-3" />
                    <h3 className="text-xl font-bold text-charity-neutral-800">
                      Office Hours
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {officeHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-charity-neutral-100 last:border-b-0"
                      >
                        <span className="text-charity-neutral-700 font-medium">
                          {schedule.day}
                        </span>
                        <span className="text-charity-neutral-600">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-charity-orange-50 rounded-lg">
                    <p className="text-sm text-charity-orange-800">
                      <strong>Emergency Contact:</strong> For urgent matters
                      outside office hours, call +255 123 456 789
                    </p>
                  </div>
                </div>

                {/* Interactive Map */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-6">
                    <MapPin className="h-6 w-6 text-charity-orange-600 mr-3" />
                    <h3 className="text-xl font-bold text-charity-neutral-800">
                      Our Location
                    </h3>
                  </div>

                  <div className="relative group cursor-pointer">
                    <div className="w-full h-64 bg-charity-neutral-200 rounded-lg overflow-hidden">
                      <div className="relative w-full h-full bg-gradient-to-br from-charity-green-400/30 to-charity-orange-400/30 flex items-center justify-center">
                        {/* Simulated map with landmarks */}
                        <div className="absolute inset-0 p-4">
                          {/* Roads */}
                          <div className="absolute top-8 left-0 right-0 h-1 bg-charity-neutral-400"></div>
                          <div className="absolute top-16 left-12 right-0 h-1 bg-charity-neutral-400"></div>
                          <div className="absolute left-8 top-0 bottom-0 w-1 bg-charity-neutral-400"></div>
                          <div className="absolute left-24 top-8 bottom-0 w-1 bg-charity-neutral-400"></div>

                          {/* Buildings */}
                          <div className="absolute top-4 left-4 w-6 h-6 bg-charity-neutral-500 rounded-sm"></div>
                          <div className="absolute top-12 left-16 w-4 h-4 bg-charity-neutral-500 rounded-sm"></div>
                          <div className="absolute top-20 right-8 w-8 h-4 bg-charity-neutral-500 rounded-sm"></div>

                          {/* Our location marker */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-300">
                            <div className="relative">
                              <div className="w-8 h-8 bg-charity-orange-500 rounded-full border-4 border-white shadow-lg animate-pulse"></div>
                              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-charity-orange-500"></div>
                            </div>
                          </div>

                          {/* Ripple effects */}
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                            <div className="w-16 h-16 border-4 border-charity-orange-400 rounded-full animate-ping"></div>
                          </div>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                            <div
                              className="w-24 h-24 border-4 border-charity-orange-300 rounded-full animate-ping"
                              style={{ animationDelay: "1s" }}
                            ></div>
                          </div>
                        </div>

                        <div className="absolute bottom-2 right-2 text-xs text-charity-neutral-500 opacity-50">
                          Dar es Salaam, Tanzania
                        </div>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-charity-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white px-4 py-2 rounded-lg shadow-lg">
                          <p className="text-sm text-charity-neutral-800 font-medium">
                            Click to open in maps
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="mt-4 w-full px-4 py-2 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-medium transition-colors duration-200">
                    Get Directions
                  </button>
                </div>

                {/* Social Media */}
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-xl font-bold text-charity-neutral-800 mb-6">
                    Follow Us
                  </h3>

                  <div className="flex justify-center gap-4">
                    <a
                      href="#"
                      className="w-12 h-12 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="w-12 h-12 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                    >
                      <Globe className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-charity-neutral-800 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-charity-neutral-600">
                Quick answers to common questions about our organization and
                programs.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <AnimatedSection
                key={index}
                animation="slideUp"
                delay={index * 100}
              >
                <div className="bg-charity-neutral-50 p-6 rounded-xl hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-start">
                    <MessageCircle className="h-6 w-6 text-charity-orange-600 mr-4 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-bold text-charity-neutral-800 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-charity-neutral-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection animation="slideUp" delay={400}>
            <div className="text-center mt-8">
              <p className="text-charity-neutral-600 mb-4">
                Don't see your question answered?
              </p>
              <button className="px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-medium transition-colors duration-200">
                Ask Us Anything
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;

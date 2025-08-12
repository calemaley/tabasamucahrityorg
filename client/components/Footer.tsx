import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-charity-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="space-y-4">
            <img
              src="/placeholder.svg"
              alt="Tabasamu Logo"
              className="h-12 w-auto"
            />
            <p className="text-charity-neutral-300 text-sm leading-relaxed">
              Tabasamu Charity is dedicated to improving the lives of children
              and communities through education, healthcare, and sustainable
              development programs.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-charity-orange-600 rounded-full hover:bg-charity-orange-700 transition-colors duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-charity-orange-600 rounded-full hover:bg-charity-orange-700 transition-colors duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="p-2 bg-charity-orange-600 rounded-full hover:bg-charity-orange-700 transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/get-involved/volunteer"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  to="/get-involved/donate"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Programs</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/programs/schools"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  School Volunteering
                </Link>
              </li>
              <li>
                <Link
                  to="/programs/hospitals"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  Hospital Internships
                </Link>
              </li>
              <li>
                <Link
                  to="/get-involved/sponsor"
                  className="text-charity-neutral-300 hover:text-charity-orange-400 transition-colors duration-200"
                >
                  Child Sponsorship
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Map */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-charity-orange-400 mt-0.5 flex-shrink-0" />
                <p className="text-charity-neutral-300 text-sm">
                  123 Charity Street
                  <br />
                  Dar es Salaam, Tanzania
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-charity-orange-400 flex-shrink-0" />
                <p className="text-charity-neutral-300 text-sm">
                  +255 123 456 789
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-charity-orange-400 flex-shrink-0" />
                <p className="text-charity-neutral-300 text-sm">
                  info@tabasamu.org
                </p>
              </div>
            </div>

            {/* Interactive Mini Map */}
            <div className="relative group">
              <h4 className="text-sm font-semibold text-charity-neutral-200 mb-2">
                Find Us
              </h4>
              <div className="w-full h-32 bg-charity-neutral-700 rounded-lg overflow-hidden cursor-pointer group-hover:shadow-lg transition-shadow duration-300 border border-charity-neutral-600">
                <div className="relative w-full h-full bg-gradient-to-br from-charity-green-400/20 to-charity-orange-400/20 flex items-center justify-center">
                  {/* Simulated map with landmarks */}
                  <div className="absolute inset-0 p-2">
                    {/* Roads */}
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-charity-neutral-500"></div>
                    <div className="absolute top-8 left-6 right-0 h-0.5 bg-charity-neutral-500"></div>
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-charity-neutral-500"></div>
                    <div className="absolute left-12 top-4 bottom-0 w-0.5 bg-charity-neutral-500"></div>

                    {/* Buildings */}
                    <div className="absolute top-2 left-2 w-3 h-3 bg-charity-neutral-600 rounded-sm"></div>
                    <div className="absolute top-6 left-8 w-2 h-2 bg-charity-neutral-600 rounded-sm"></div>
                    <div className="absolute top-10 right-4 w-4 h-2 bg-charity-neutral-600 rounded-sm"></div>

                    {/* Our location marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform duration-300">
                      <div className="relative">
                        <div className="w-4 h-4 bg-charity-orange-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-3 border-l-transparent border-r-transparent border-t-charity-orange-500"></div>
                      </div>
                    </div>

                    {/* Ripple effect */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-30 group-hover:opacity-60 transition-opacity duration-300">
                      <div className="w-8 h-8 border-2 border-charity-orange-400 rounded-full animate-ping"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-1 right-1 text-xs text-charity-neutral-400 opacity-50">
                    Tanzania
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-charity-orange-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-xs text-white font-medium">
                    Click to view larger map
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-charity-neutral-700">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-charity-neutral-300 mb-4">
              Subscribe to our newsletter to receive the latest updates about
              our programs and impact.
            </p>
            <div className="max-w-md mx-auto flex space-x-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-charity-neutral-700 border border-charity-neutral-600 rounded-lg text-white placeholder-charity-neutral-400 focus:outline-none focus:ring-2 focus:ring-charity-orange-500"
              />
              <button className="px-6 py-2 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-charity-neutral-700 text-center">
          <p className="text-charity-neutral-400 text-sm">
            © {new Date().getFullYear()} Tabasamu Charity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Home,
  Users,
  GraduationCap,
  Heart,
  BookOpen,
  Phone,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { redirectToPayment, CAMPAIGN_SOURCES } from "@/lib/payment";

interface SubMenuItem {
  label: string;
  href: string;
  isPayment?: boolean;
  paymentType?: 'donationUrl' | 'sponsorshipUrl' | 'generalUrl' | 'volunteerUrl';
}

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll to add background when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const menuItems = [
    { label: "Home", href: "/", icon: Home },
    {
      label: "About",
      href: "/about",
      icon: Users,
    },
    {
      label: "Programs",
      href: "/programs",
      icon: GraduationCap,
      subItems: [
        { label: "Volunteering in Schools", href: "/programs/schools" },
        { label: "Internship in Hospitals", href: "/programs/hospitals" },
      ],
    },
    {
      label: "Get Involved",
      href: "/get-involved",
      icon: Heart,
      subItems: [
        { label: "Sponsor a Child", href: "/get-involved/sponsor", isPayment: true, paymentType: "sponsorshipUrl" },
        { label: "Donate Now", href: "/get-involved/donate", isPayment: true, paymentType: "donationUrl" },
        { label: "Volunteer", href: "/get-involved/volunteer" },
      ],
    },
    { label: "Blog", href: "/blog", icon: BookOpen },
    { label: "Contact Us", href: "/contact", icon: Phone },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled || isMenuOpen
        ? "bg-white/95 backdrop-blur-md shadow-lg"
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fde779a14d1ab4ec09cf8fa4e9c38ad5e%2F1c5373d728e64db5ab1f1f166fe14982?format=webp&width=800"
                alt="Tabasamu Logo"
                className="h-36 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.label} className="relative group">
                  {item.subItems ? (
                    <>
                      <button
                        className={cn(
                          "flex items-center space-x-1.5 transition-all duration-300 font-medium px-2 py-1.5 rounded-lg group",
                          isScrolled || isMenuOpen
                            ? "text-charity-neutral-800 hover:text-charity-orange-600 hover:bg-charity-orange-50"
                            : "text-white hover:text-charity-orange-200 hover:bg-white/10"
                        )}
                        onClick={() => toggleDropdown(item.label)}
                      >
                        <IconComponent className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-sm">
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "h-3.5 w-3.5 transition-all duration-200",
                            activeDropdown === item.label
                              ? "rotate-180" + (isScrolled || isMenuOpen ? " text-charity-orange-600" : " text-charity-orange-200")
                              : "group-hover:rotate-12",
                          )}
                        />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in slide-in-from-top-2 duration-200">
                          {item.subItems.map((subItem) => (
                            subItem.isPayment ? (
                              <button
                                key={subItem.label}
                                onClick={() => {
                                  redirectToPayment(subItem.paymentType, {
                                    source: CAMPAIGN_SOURCES.navigation,
                                    campaign: subItem.label.toLowerCase().replace(' ', '-')
                                  });
                                  setActiveDropdown(null);
                                }}
                                className="block w-full text-left px-4 py-3 text-charity-neutral-600 hover:text-charity-orange-600 hover:bg-charity-orange-50 hover:translate-x-1 transition-all duration-200 mx-2 rounded-lg"
                              >
                                {subItem.label}
                              </button>
                            ) : (
                              <Link
                                key={subItem.label}
                                to={subItem.href}
                                className="block px-4 py-3 text-charity-neutral-600 hover:text-charity-orange-600 hover:bg-charity-orange-50 hover:translate-x-1 transition-all duration-200 mx-2 rounded-lg"
                                onClick={() => setActiveDropdown(null)}
                              >
                                {subItem.label}
                              </Link>
                            )
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center space-x-1.5 transition-all duration-300 font-medium px-2 py-1.5 rounded-lg group",
                        isScrolled || isMenuOpen
                          ? "text-charity-neutral-800 hover:text-charity-orange-600 hover:bg-charity-orange-50"
                          : "text-white hover:text-charity-orange-200 hover:bg-white/10"
                      )}
                    >
                      <IconComponent className="h-3.5 w-3.5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="group-hover:translate-x-0.5 transition-transform duration-200 text-sm">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={cn(
                "p-2 rounded-md transition-colors duration-200",
                isScrolled || isMenuOpen
                  ? "text-charity-neutral-800 hover:text-charity-orange-600 hover:bg-charity-orange-50"
                  : "text-white hover:text-charity-orange-200 hover:bg-white/10"
              )}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 flex">
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <div className="relative flex flex-col w-80 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-out translate-x-0">
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-6 border-b border-charity-neutral-200 bg-gradient-to-r from-charity-orange-50 to-charity-green-50">
                <div className="flex items-center space-x-3">
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets%2Fde779a14d1ab4ec09cf8fa4e9c38ad5e%2F1c5373d728e64db5ab1f1f166fe14982?format=webp&width=800"
                    alt="Tabasamu Logo"
                    className="h-12 w-auto"
                  />
                  <div>
                    <h3 className="font-bold text-charity-neutral-800">Tabasamu</h3>
                    <p className="text-xs text-charity-neutral-600">Charity</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-charity-neutral-100 transition-colors duration-200"
                >
                  <X className="h-5 w-5 text-charity-neutral-600" />
                </button>
              </div>

              {/* Sidebar Content */}
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.label}>
                        {item.subItems ? (
                          <>
                            <button
                              className="flex items-center justify-between w-full text-left p-3 rounded-xl hover:bg-charity-orange-50 transition-all duration-200 group"
                              onClick={() => toggleDropdown(item.label)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-lg bg-charity-orange-100 flex items-center justify-center group-hover:bg-charity-orange-200 transition-colors duration-200">
                                  <IconComponent className="h-5 w-5 text-charity-orange-600" />
                                </div>
                                <span className="font-medium text-charity-neutral-800 group-hover:text-charity-orange-600 transition-colors duration-200">
                                  {item.label}
                                </span>
                              </div>
                              <ChevronDown
                                className={cn(
                                  "h-5 w-5 text-charity-neutral-400 transition-all duration-200",
                                  activeDropdown === item.label ? "rotate-180 text-charity-orange-600" : "group-hover:text-charity-orange-600",
                                )}
                              />
                            </button>
                            {activeDropdown === item.label && (
                              <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-1 duration-200">
                                {item.subItems.map((subItem) => (
                                  subItem.isPayment ? (
                                    <button
                                      key={subItem.label}
                                      onClick={() => {
                                        redirectToPayment(subItem.paymentType, {
                                          source: CAMPAIGN_SOURCES.navigation,
                                          campaign: subItem.label.toLowerCase().replace(' ', '-')
                                        });
                                        setIsMenuOpen(false);
                                        setActiveDropdown(null);
                                      }}
                                      className="flex items-center w-full text-left p-3 rounded-lg hover:bg-charity-green-50 transition-all duration-200 group"
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-charity-green-100 flex items-center justify-center mr-3 group-hover:bg-charity-green-200 transition-colors duration-200">
                                        <Heart className="h-4 w-4 text-charity-green-600" />
                                      </div>
                                      <span className="text-charity-neutral-700 group-hover:text-charity-green-600 transition-colors duration-200">
                                        {subItem.label}
                                      </span>
                                    </button>
                                  ) : (
                                    <Link
                                      key={subItem.label}
                                      to={subItem.href}
                                      className="flex items-center p-3 rounded-lg hover:bg-charity-green-50 transition-all duration-200 group"
                                      onClick={() => {
                                        setIsMenuOpen(false);
                                        setActiveDropdown(null);
                                      }}
                                    >
                                      <div className="w-8 h-8 rounded-lg bg-charity-green-100 flex items-center justify-center mr-3 group-hover:bg-charity-green-200 transition-colors duration-200">
                                        <ArrowRight className="h-4 w-4 text-charity-green-600" />
                                      </div>
                                      <span className="text-charity-neutral-700 group-hover:text-charity-green-600 transition-colors duration-200">
                                        {subItem.label}
                                      </span>
                                    </Link>
                                  )
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <Link
                            to={item.href}
                            className="flex items-center p-3 rounded-xl hover:bg-charity-orange-50 transition-all duration-200 group"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div className="w-10 h-10 rounded-lg bg-charity-orange-100 flex items-center justify-center mr-3 group-hover:bg-charity-orange-200 transition-colors duration-200">
                              <IconComponent className="h-5 w-5 text-charity-orange-600" />
                            </div>
                            <span className="font-medium text-charity-neutral-800 group-hover:text-charity-orange-600 transition-colors duration-200">
                              {item.label}
                            </span>
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-charity-neutral-200 bg-charity-neutral-50">
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      redirectToPayment('donationUrl', {
                        source: CAMPAIGN_SOURCES.navigation,
                        campaign: 'sidebar-donate'
                      });
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center p-3 bg-gradient-to-r from-charity-orange-600 to-charity-orange-700 hover:from-charity-orange-700 hover:to-charity-orange-800 text-white rounded-xl font-bold transition-all duration-200 transform hover:scale-105"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </button>
                  <div className="text-center">
                    <p className="text-xs text-charity-neutral-500">
                      © 2024 Tabasamu Charity
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

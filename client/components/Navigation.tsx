import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const menuItems = [
    { label: 'Home', href: '/' },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Programs',
      href: '/programs',
      subItems: [
        { label: 'Volunteering in Schools', href: '/programs/schools' },
        { label: 'Internship in Hospitals', href: '/programs/hospitals' },
      ],
    },
    {
      label: 'Get Involved',
      href: '/get-involved',
      subItems: [
        { label: 'Sponsor a Child', href: '/get-involved/sponsor' },
        { label: 'Donate Now', href: '/get-involved/donate' },
        { label: 'Volunteer', href: '/get-involved/volunteer' },
      ],
    },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img
                src="/placeholder.svg"
                alt="Tabasamu Logo"
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.label} className="relative group">
                {item.subItems ? (
                  <>
                    <button
                      className="flex items-center space-x-1 text-charity-neutral-700 hover:text-charity-orange-600 transition-colors duration-200 font-medium"
                      onClick={() => toggleDropdown(item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            to={subItem.href}
                            className="block px-4 py-2 text-charity-neutral-600 hover:text-charity-orange-600 hover:bg-gray-50 transition-colors duration-200"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className="text-charity-neutral-700 hover:text-charity-orange-600 transition-colors duration-200 font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-charity-neutral-700 hover:text-charity-orange-600 hover:bg-gray-100 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="space-y-4">
              {menuItems.map((item) => (
                <div key={item.label}>
                  {item.subItems ? (
                    <>
                      <button
                        className="flex items-center justify-between w-full text-left text-charity-neutral-700 hover:text-charity-orange-600 transition-colors duration-200 font-medium"
                        onClick={() => toggleDropdown(item.label)}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={cn(
                            "h-4 w-4 transition-transform duration-200",
                            activeDropdown === item.label && "rotate-180"
                          )}
                        />
                      </button>
                      {activeDropdown === item.label && (
                        <div className="mt-2 pl-4 space-y-2">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.label}
                              to={subItem.href}
                              className="block text-charity-neutral-600 hover:text-charity-orange-600 transition-colors duration-200"
                              onClick={() => {
                                setIsMenuOpen(false);
                                setActiveDropdown(null);
                              }}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      className="block text-charity-neutral-700 hover:text-charity-orange-600 transition-colors duration-200 font-medium"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

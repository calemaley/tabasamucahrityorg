import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  User,
  Tag,
  Search,
  ArrowRight,
  Heart,
  MessageCircle,
  Share2,
  Filter
} from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', label: 'All Posts', count: 24 },
    { id: 'education', label: 'Education', count: 8 },
    { id: 'healthcare', label: 'Healthcare', count: 6 },
    { id: 'community', label: 'Community', count: 5 },
    { id: 'volunteers', label: 'Volunteers', count: 3 },
    { id: 'success-stories', label: 'Success Stories', count: 2 },
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Transforming Lives Through Education: Maria's Journey",
      excerpt: "Follow Maria's incredible transformation from a struggling student to a community leader, made possible through our education support program.",
      content: "In the heart of rural Tanzania, Maria's story represents hope and determination...",
      image: "/placeholder.svg",
      category: "education",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "5 min read",
      likes: 42,
      comments: 12,
      featured: true,
    },
    {
      id: 2,
      title: "Mobile Clinics Reach Remote Communities",
      excerpt: "Our healthcare initiative brings essential medical services to underserved populations across Tanzania.",
      content: "Breaking down barriers to healthcare access...",
      image: "/placeholder.svg",
      category: "healthcare",
      author: "Dr. Michael Brown",
      date: "March 10, 2024",
      readTime: "4 min read",
      likes: 38,
      comments: 8,
      featured: false,
    },
    {
      id: 3,
      title: "Building Stronger Communities Together",
      excerpt: "Community-led initiatives are creating sustainable solutions for local challenges and fostering independence.",
      content: "When communities come together...",
      image: "/placeholder.svg",
      category: "community",
      author: "Emma Wilson",
      date: "March 5, 2024",
      readTime: "6 min read",
      likes: 51,
      comments: 15,
      featured: false,
    },
    {
      id: 4,
      title: "Volunteer Spotlight: John's Impact in Tanzania",
      excerpt: "Meet John, a volunteer teacher who has dedicated two years to improving literacy rates in rural schools.",
      content: "John's journey began with a simple desire to make a difference...",
      image: "/placeholder.svg",
      category: "volunteers",
      author: "Community Team",
      date: "February 28, 2024",
      readTime: "3 min read",
      likes: 29,
      comments: 6,
      featured: false,
    },
    {
      id: 5,
      title: "Clean Water Initiative: 500 Families Now Have Access",
      excerpt: "Our latest clean water project has successfully provided safe drinking water to 500 families in the Mwanza region.",
      content: "Access to clean water is a fundamental human right...",
      image: "/placeholder.svg",
      category: "community",
      author: "Project Team",
      date: "February 20, 2024",
      readTime: "4 min read",
      likes: 67,
      comments: 23,
      featured: false,
    },
    {
      id: 6,
      title: "Success Story: From Patient to Healer",
      excerpt: "How one young woman's medical treatment led her to become a community health worker in her village.",
      content: "Amina's story is one of resilience and giving back...",
      image: "/placeholder.svg",
      category: "success-stories",
      author: "Health Team",
      date: "February 15, 2024",
      readTime: "5 min read",
      likes: 84,
      comments: 31,
      featured: false,
    },
  ];

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="pt-0 bg-gradient-to-br from-charity-orange-500 to-charity-green-600 relative">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
                Stories from the field, insights from our work, and updates on the impact we're making together
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-12 bg-white border-b border-charity-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-charity-neutral-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-charity-orange-600 text-white'
                      : 'bg-charity-neutral-100 text-charity-neutral-700 hover:bg-charity-orange-100'
                  }`}
                >
                  {category.label} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && selectedCategory === 'all' && (
        <section className="py-16 bg-charity-neutral-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnimatedSection animation="slideUp">
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-charity-orange-600" />
                  <span className="text-charity-orange-600 font-semibold">Featured Story</span>
                </div>
                <h2 className="text-3xl font-bold text-charity-neutral-800">Editor's Pick</h2>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="scaleIn" delay={200}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-64 lg:h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-charity-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {featuredPost.category}
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center text-sm text-charity-neutral-500 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="mr-4">{featuredPost.date}</span>
                      <User className="h-4 w-4 mr-2" />
                      <span className="mr-4">{featuredPost.author}</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h3 className="text-3xl font-bold text-charity-neutral-800 mb-4 leading-tight">
                      {featuredPost.title}
                    </h3>

                    <p className="text-charity-neutral-600 mb-6 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <button className="inline-flex items-center px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-medium transition-colors duration-200 group">
                        Read Full Story
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>

                      <div className="flex items-center gap-4 text-charity-neutral-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{featuredPost.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          <span className="text-sm">{featuredPost.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-bold text-charity-neutral-800">
                {selectedCategory === 'all' ? 'Latest Articles' : `${categories.find(c => c.id === selectedCategory)?.label} Articles`}
              </h2>
              <div className="flex items-center gap-2 text-charity-neutral-500">
                <Filter className="h-4 w-4" />
                <span className="text-sm">{filteredPosts.length} articles found</span>
              </div>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <AnimatedSection key={post.id} animation="scaleIn" delay={index * 100}>
                <article className="bg-white border border-charity-neutral-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-charity-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center text-xs text-charity-neutral-500 mb-3">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.date}</span>
                      <User className="h-3 w-3 mr-1" />
                      <span className="mr-3">{post.author}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl font-bold text-charity-neutral-800 mb-3 group-hover:text-charity-orange-600 transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-charity-neutral-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <button className="text-charity-orange-600 hover:text-charity-orange-700 font-medium text-sm flex items-center group">
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-200" />
                      </button>

                      <div className="flex items-center gap-3 text-charity-neutral-400">
                        <div className="flex items-center gap-1 hover:text-charity-orange-600 cursor-pointer transition-colors duration-200">
                          <Heart className="h-3 w-3" />
                          <span className="text-xs">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-charity-orange-600 cursor-pointer transition-colors duration-200">
                          <MessageCircle className="h-3 w-3" />
                          <span className="text-xs">{post.comments}</span>
                        </div>
                        <Share2 className="h-3 w-3 hover:text-charity-orange-600 cursor-pointer transition-colors duration-200" />
                      </div>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            ))}
          </div>

          {/* Load More */}
          <AnimatedSection animation="slideUp" delay={400}>
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-medium transition-colors duration-200">
                Load More Articles
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-charity-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">
                Subscribe to our newsletter and never miss a story from the field
              </p>

              <div className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-lg text-charity-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="px-6 py-3 bg-white text-charity-orange-600 hover:bg-charity-neutral-100 rounded-lg font-medium transition-colors duration-200">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm opacity-75 mt-3">
                  Join 2,000+ subscribers. No spam, unsubscribe anytime.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;

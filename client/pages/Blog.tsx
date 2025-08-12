import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const Blog = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <PlaceholderPage 
          title="Our Blog"
          description="Stay updated with our latest news, stories from the field, and insights about our ongoing projects and community impact."
        />
      </div>
      <Footer />
    </>
  );
};

export default Blog;

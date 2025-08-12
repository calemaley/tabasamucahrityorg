import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const About = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <PlaceholderPage 
          title="About Us"
          description="Learn more about Tabasamu Charity's mission, values, and the impact we're making in communities across Tanzania."
        />
      </div>
      <Footer />
    </>
  );
};

export default About;

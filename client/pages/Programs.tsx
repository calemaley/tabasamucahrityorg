import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const Programs = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <PlaceholderPage 
          title="Our Programs"
          description="Discover our comprehensive programs including school volunteering, hospital internships, and community development initiatives."
        />
      </div>
      <Footer />
    </>
  );
};

export default Programs;

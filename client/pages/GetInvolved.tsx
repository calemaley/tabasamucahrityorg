import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const GetInvolved = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <PlaceholderPage 
          title="Get Involved"
          description="Join our mission! Sponsor a child, make a donation, or volunteer your time to help us create lasting change in communities."
        />
      </div>
      <Footer />
    </>
  );
};

export default GetInvolved;

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PlaceholderPage from '@/components/PlaceholderPage';

const Contact = () => {
  return (
    <>
      <Navigation />
      <div className="pt-20">
        <PlaceholderPage 
          title="Contact Us"
          description="Get in touch with our team. We'd love to hear from you and answer any questions about our programs and how you can help."
        />
      </div>
      <Footer />
    </>
  );
};

export default Contact;

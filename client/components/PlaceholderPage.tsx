import { Link } from "react-router-dom";
import { ArrowLeft, Construction } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-charity-neutral-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <Construction className="h-24 w-24 text-charity-orange-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-charity-neutral-800 mb-4">
            {title}
          </h1>
          <p className="text-charity-neutral-600 mb-6">
            {description ||
              "This page is currently under development. Please check back soon for updates on our latest content and features."}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>

          <p className="text-sm text-charity-neutral-500">
            Want to see this page completed? Let us know what content would be
            most helpful to you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlaceholderPage;

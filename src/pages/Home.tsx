import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Play, MessageSquare } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to CodeEdu</h1>
      <p className="text-xl mb-8">
        Empowering students through accessible and engaging coding education.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          to="/learn"
          icon={<BookOpen size={48} />}
          title="Learn"
          description="Access curated coding tutorials and resources."
        />
        <FeatureCard
          to="/playground"
          icon={<Play size={48} />}
          title="Playground"
          description="Practice coding in real-time with our interactive IDE."
        />
        <FeatureCard
          to="/devdiscuss"
          icon={<MessageSquare size={48} />}
          title="DevDiscuss"
          description="Join our community forum for discussions and support."
        />
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ to, icon, title, description }) => (
  <Link
    to={to}
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
  >
    <div className="text-blue-600 mb-4">{icon}</div>
    <h2 className="text-2xl font-semibold mb-2">{title}</h2>
    <p>{description}</p>
  </Link>
);

export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

const Learn: React.FC = () => {
  const [tutorials, setTutorials] = useState<any[]>([]);

  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        // Replace with your actual YouTube Data API key and desired search query
        const API_KEY = 'YOUR_YOUTUBE_API_KEY';
        const SEARCH_QUERY = 'coding tutorials for beginners';
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${SEARCH_QUERY}&type=video&key=${API_KEY}`
        );
        setTutorials(response.data.items);
      } catch (error) {
        console.error('Error fetching tutorials:', error);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Learn Coding</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <TutorialCard
            key={tutorial.id.videoId}
            videoId={tutorial.id.videoId}
            title={tutorial.snippet.title}
            thumbnail={tutorial.snippet.thumbnails.medium.url}
          />
        ))}
      </div>
    </div>
  );
};

const TutorialCard: React.FC<{
  videoId: string;
  title: string;
  thumbnail: string;
}> = ({ videoId, title, thumbnail }) => (
  <Link to={`/video/${videoId}`} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
    <img src={thumbnail} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2 line-clamp-2">{title}</h2>
      <div className="flex items-center text-blue-600">
        <Play size={18} />
        <span className="ml-2">Watch Now</span>
      </div>
    </div>
  </Link>
);

export default Learn;
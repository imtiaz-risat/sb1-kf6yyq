import React, { useState, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import axios from 'axios';

const DevDiscuss: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPost, setNewPost] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    // Fetch posts from an API or load from local storage
    const savedPosts = JSON.parse(localStorage.getItem('devDiscussPosts') || '[]');
    setPosts(savedPosts);
  }, []);

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = { id: Date.now(), content: newPost, responses: [] };
      const updatedPosts = [post, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('devDiscussPosts', JSON.stringify(updatedPosts));
      setNewPost('');

      // Get AI response
      try {
        const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
          prompt: `Question: ${newPost}\nAnswer:`,
          max_tokens: 150,
          n: 1,
          stop: null,
          temperature: 0.7,
        }, {
          headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json',
          },
        });
        const aiAnswer = response.data.choices[0].text.trim();
        setAiResponse(aiAnswer);
        
        // Add AI response to the post
        const postWithAiResponse = { ...post, responses: [{ id: Date.now(), content: aiAnswer, isAi: true }] };
        const updatedPostsWithAi = [postWithAiResponse, ...posts.slice(1)];
        setPosts(updatedPostsWithAi);
        localStorage.setItem('devDiscussPosts', JSON.stringify(updatedPostsWithAi));
      } catch (error) {
        console.error('Error getting AI response:', error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">DevDiscuss Forum</h1>
      <form onSubmit={handlePostSubmit} className="mb-8">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          placeholder="Ask a question or start a discussion..."
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
        >
          <Send size={18} className="mr-2" />
          Post
        </button>
      </form>
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow">
            <p className="mb-4">{post.content}</p>
            {post.responses.map((response: any) => (
              <div key={response.id} className={`mt-2 p-2 rounded ${response.isAi ? 'bg-green-100' : 'bg-gray-100'}`}>
                {response.isAi && <span className="font-semibold">AI Response: </span>}
                {response.content}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DevDiscuss;
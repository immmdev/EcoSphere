import React, { useState } from 'react';

const tabs = [
  'All',
  'DIY Recyclers',
  'Zero Waste India',
  'Plastic-Free Campus',
  'Eco Advice',
  'Volunteering Calls',
];

const posts = [
  {
    id: 1,
    title: 'Join our cleanup drive this Sunday!',
    author: 'EcoWarrior_21',
    content: 'We are organizing a cleanup near Riverfront Park. Volunteers needed!',
    tag: 'Volunteering Calls',
    time: '3 hours ago',
    image: 'https://images.mid-day.com/images/images/2022/sep/Clean-up-a_d.jpg',
    comments: [
      { user: 'NatureLover', text: 'I will be there!' },
      { user: 'CleanPlanet', text: 'Let’s do this 💪' }
    ],
  },
  {
    id: 2,
    title: 'DIY: Turn bottles into planters 🌱',
    author: 'GreenCrafts',
    content: 'Here’s a simple guide with photos to convert plastic bottles into hanging planters.',
    tag: 'DIY Recyclers',
    time: '1 day ago',
    image: 'https://i.pinimg.com/originals/7d/75/2f/7d752ffd94a07b808b89574a047d4b72.jpg',
    comments: [
      { user: 'RebootReuse', text: 'So cool! Will try this.' }
    ],
  },
  {
    id: 3,
    title: 'Zero Waste Challenge Completed! 🎉',
    author: 'MinWasteQueen',
    content: '7 days of zero waste — it was tough but worth it. Sharing tips inside!',
    tag: 'Zero Waste India',
    time: '2 days ago',
    image: 'https://www.seventhgeneration.com/sites/default/files/legacy/styles/1600w/public/2019-12/zerowastechallengeherobanner499x395-small.png',
    comments: [
      { user: 'SustainHero', text: 'You inspired me to try this!' }
    ],
  },
];

const CommunityCards = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [chatInputs, setChatInputs] = useState({});
  const [openComments, setOpenComments] = useState({});

  const filteredPosts = activeTab === 'All' ? posts : posts.filter((post) => post.tag === activeTab);

  const handleInputChange = (id, value) => {
    setChatInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddComment = (id) => {
    const value = chatInputs[id];
    if (value?.trim()) {
      const postIndex = posts.findIndex((p) => p.id === id);
      posts[postIndex].comments.push({ user: 'You', text: value });
      setChatInputs((prev) => ({ ...prev, [id]: '' }));
    }
  };

  const toggleComments = (id) => {
    setOpenComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Tabs */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors duration-200 ${
              activeTab === tab
                ? 'bg-green-900 text-white'
                : 'bg-white text-green-700 border-green-600 hover:bg-green-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative">
              <img src={post.image} alt={post.title} className="w-full h-60 object-cover" />
              <span className="absolute top-2 left-2 bg-green-700 text-white text-xs px-2 py-1 rounded">
                {post.tag}
              </span>
            </div>
            <div className="p-4">
              <h2 className="font-bold text-md uppercase mb-2">{post.title}</h2>
              <p className="text-sm text-gray-700 mb-3">{post.content}</p>
              <div className="text-xs text-gray-500 flex justify-between mb-2">
                <span>Posted by {post.author}</span>
                <span>{post.time}</span>
              </div>

              <button
                onClick={() => toggleComments(post.id)}
                className="text-green-700 text-sm font-medium hover:underline"
              >
                {openComments[post.id] ? 'Hide Comments' : 'View Comments'}
              </button>

              {openComments[post.id] && (
                <div className="mt-4 border-t pt-3">
                  <h4 className="text-green-700 font-medium mb-2">Comments</h4>
                  {post.comments.map((cmt, idx) => (
                    <div key={idx} className="text-sm text-gray-800 mb-1">
                      <strong className="text-green-800">{cmt.user}:</strong> {cmt.text}
                    </div>
                  ))}
                  <div className="mt-2 flex gap-2">
                    <input
                      value={chatInputs[post.id] || ''}
                      onChange={(e) => handleInputChange(post.id, e.target.value)}
                      className="flex-1 border border-green-300 px-3 py-1 rounded-md text-sm"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                    >
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-14 text-center">
        <h3 className="text-2xl font-bold text-green-700">Want to Share or Ask Something?</h3>
        <p className="text-sm text-green-800 mt-1 mb-4">
          Post your tips, guides, or initiatives with the community.
        </p>
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md">
          + Create Post
        </button>
      </div>
    </div>
  );
};

export default CommunityCards;

import React, { useState, useContext, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from "jwt-decode";

function LearnArticleInDetail() {
  const { backendUrl, token, refresh, setRefresh } = useContext(ShopContext);
  const { id } = useParams();
  const location = useLocation();


  const [liked, setLiked]=useState(false);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Article state
  const [article, setArticle] = useState(null);

  // Likes state
  const [likes, setLikes] = useState(0);

// Fetch article details
useEffect(() => {
  if (location.state?.articles) {
    // Coming from list page
    const found = location.state.articles.find((a) => a._id === id);
    if (found) setArticle(found);
  } else {
    // Direct open or refresh
    axios
      .get(`${backendUrl}/api/learn/${id}`)
      .then((res) => {
        setArticle(res.data);
      })
      .catch(() => {
        toast.error('Failed to fetch article');
      });
  }
}, [id, location.state, backendUrl]);

// Fetch likes & isLiked
const fetchLikes = () => {
  axios
    .get(`${backendUrl}/api/learn/${id}`)
    .then((res) => {
      setLikes(res.data.likes || 0);
      const decoded = jwtDecode(token);
      let isLiked=res.data.likesArray.includes(decoded.id);
      setLiked(isLiked);
    })
    .catch((err) => {
      if(err){
        console.log(err);
      }
     
    });
};

useEffect(() => {
  fetchLikes();
}, [refresh]);

// Like/Unlike handler
const updateLike = () => {
  setLoading(true);
  axios
    .post(
      `${backendUrl}/api/learn/likes-update`,
      { articleId: id },
      { headers: { token } }
    )
    .then(() => {
      setLoading(false);
      setRefresh(!refresh); //refresh likes
    })
    .catch(() => {
      setLoading(false);
      toast.error('Failed to update like');
    });
};

const handleLike = () => {
  updateLike();
};

// Share handler
const handleShare = async () => {
  const url = window.location.href;
  const title = article?.title || 'Check this out!';
  const text = 'Have a look at this article I found:';

  if (navigator.share) {
    try {
      await navigator.share({ title, text, url });
    } catch {
      try {
        await navigator.clipboard.writeText(url);
        toast.info('Link copied to clipboard!');
      } catch {
        toast.error('Failed to share link');
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link');
    }
  }
};

// Loading / Not found
if (!article) {
  return (
    <div className="text-center text-green-600 p-6">
      Loading article...
    </div>
  );
}

return (
  <div className="eco-static-bg">
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-green-50 shadow-lg rounded-lg overflow-hidden">
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            {article.title}
          </h1>

          <div className="flex justify-between text-sm text-green-900 mb-4">
            <span>
              By {article.author?.name || 'Unknown'} (
              <span className="text-green-900">{article.category}</span>)
            </span>
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
          </div>

          {/* Like & Share Section */}
          <div className="mb-1 flex items-center gap-3">
            <div className="flex items-center gap-1">
          
              <svg xmlns="http://www.w3.org/2000/svg" disabled={loading}
                onClick={handleLike}
                 fill='#0d542b' height={30} width={30} viewBox="0 0 640 640"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/></svg>
              
              <span className="text-xl items-center text-green-900 mb-1">
                {likes}
              </span>
            </div>

            <svg
              onClick={handleShare}
              xmlns="http://www.w3.org/2000/svg"
              height="25"
              width="25"
              fill="#0d542b"
              viewBox="0 0 640 640"
            >
              <path d="M448 256C501 256 544 213 544 160C544 107 501 64 448 64C395 64 352 107 352 160C352 165.4 352.5 170.8 353.3 176L223.6 248.1C206.7 233.1 184.4 224 160 224C107 224 64 267 64 320C64 373 107 416 160 416C184.4 416 206.6 406.9 223.6 391.9L353.3 464C352.4 469.2 352 474.5 352 480C352 533 395 576 448 576C501 576 544 533 544 480C544 427 501 384 448 384C423.6 384 401.4 393.1 384.4 408.1L254.7 336C255.6 330.8 256 325.5 256 320C256 314.5 255.5 309.2 254.7 304L384.4 231.9C401.3 246.9 423.6 256 448 256z" />
            </svg>
          </div>

          {/* Article content */}
          <p className="text-green-900 text-base leading-relaxed">
            {article.content}
          </p>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default LearnArticleInDetail;

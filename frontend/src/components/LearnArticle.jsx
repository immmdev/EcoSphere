import React, { useEffect, useState, useContext } from 'react';

import { Link } from 'react-router-dom';
import { ShopContext } from '../contexts/ShopContext';
import { toast } from 'react-toastify';
import learnService from '../services/learnService';

const PAGE_SIZE = 9;

function LearnArticle({ isVideo }) {
  const { refresh, articles, setArticles, activeTab } = useContext(ShopContext);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // function to fetch articles for the current page/category
  const fetchArticles = () => {
    learnService
      .getArticles({ page, limit: PAGE_SIZE, category: activeTab })
      .then((res) => {
        setArticles(res.data.allArticles);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch(() => {
        toast.error("Article server error");
      });
  }

  // reset to page 1 whenever the category filter changes
  useEffect(() => {
    setPage(1);
  }, [activeTab]);

  // re-fetch on refresh, page, or category change
  useEffect(() => {
    fetchArticles();
  }, [refresh, page, activeTab]);

  return (
    <div className="py-4 px-4 lg:px-16 md:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          className="bg-emerald-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-2
                 transition-all duration-200 ease-out
                 text-green-900 text-center flex flex-col items-center justify-center gap-2 min-h-[180px] sm:min-h-[260px]"
          to={isVideo ? "/learn/video/new" : "/learn/article/new"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" className="sm:w-20 sm:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
          <span className="font-semibold text-sm sm:text-base">Create New</span>
        </Link>
        {articles.map((article) => (
          <div

            key={article._id}
            className="bg-emerald-100 shadow-md rounded-lg overflow-hidden hover:shadow-xl hover:-translate-y-2
               transition-all duration-200 ease-out"
          >
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-48 object-cover"
            />
            <Link
              to={`/learn/article/${article._id}`}
              state={{ articles }}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
                  <span className="  uppercase text-green-900">{article.author?.name || "Unknown"} </span>
                  <span className="uppercase text-green-900">{new Date(article.createdAt).toLocaleDateString()}</span>
                </div>

                <h3 className="text-xl text-start font-semibold text-green-900 mb-2">
                  {article.title}
                </h3>

                <p className="text-green-900 text-start text-sm mb-4 line-clamp-3">
                  {article.summary}
                </p>



                <Link
                  to={`/learn/article/${article._id}`}
                  state={{ articles }}
                  className="text-green-900 flex font-medium hover:underline"
                >
                  Read More →
                </Link>


              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-emerald-400 text-green-900 font-semibold px-5 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150 disabled:opacity-40"
          >
            Prev
          </button>
          <span className="text-green-100 font-medium">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="bg-emerald-400 text-green-900 font-semibold px-5 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150 disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default LearnArticle;

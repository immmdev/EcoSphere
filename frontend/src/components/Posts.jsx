import { FaHeart } from "react-icons/fa";

export default function PostComponent({post,toggleComments,openComments,chatInputs,handleInputChange,handleAddComment}) {
  
return (
    <>
      <div className="relative">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-60 object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold text-md uppercase mb-2">{post.title}</h2>
        <p className="text-sm text-green-800 mb-3">{post.content}</p>
        <div className="text-xs text-green-800 flex justify-between  mb-2">
          <div className="bg-green-700 text-white text-xs px-2 py-1 rounded">
            {post.tag}
          </div>
          <div className="flex justify-between">
            <div>
              <button>
                <FaHeart className="text-green-600 w-10 h-4 transition-colors duration-200" />
              </button>
            </div>
            <div>{post.likes}</div>
          </div>
        </div>

        <div className="flex justify-between mb-5 mt-2">
          <div className="text-sm">Posted by {post.authorId.name}</div>
          <div className="text-sm">{post.time}</div>
        </div>

        <button
          onClick={() => toggleComments(post.id)}
          className="text-green-700 text-sm font-medium hover:underline"
        >
          {openComments[post.id] ? "Hide Comments" : "View Comments"}
        </button>

        {openComments[post.id] && (
          <div className="mt-4 border-t pt-3">
            <h4 className="text-green-700 font-medium mb-2">Comments</h4>
            {post.comments.map((cmt, idx) => (
              <div key={idx} className="text-sm text-gray-800 mb-1">
                <strong className="text-green-800">{cmt.user}:</strong>{" "}
                {cmt.text}
              </div>
            ))}
            <div className="mt-2 flex gap-2">
              <input
                value={chatInputs[post.id] || ""}
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
    </>
  );
}

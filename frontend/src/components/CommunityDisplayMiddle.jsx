import React from 'react';

function CommunityDisplayMiddle({
    filteredPosts,
    handleAddComment,
    handleInputChange,
    chatInputs,
    toggleComments,
    openComments,
    handleToggleLike,
    userId
}) {
    return (
        <>
            <div className="w-full lg:px-16 md:px-14 px-4 py-5">
                <div className="bg-green-100 text-green-900 h-10 w-full mb-4 flex justify-center rounded-xl items-center text-2xl">
                    Community Feed
                </div>

                {/* SCROLLABLE WRAPPER */}
                <div className="lg:h-[600px] lg:overflow-y-auto md:h-[600px] md:overflow-y-auto  no-scrollbar ">

                    {filteredPosts.map((post) => {
                        const isLiked = post.likes?.some((likeId) => likeId === userId || likeId?._id === userId);
                        return (
                        <div
                            key={post._id}
                            className="bg-green-100 rounded-xl shadow-md mb-5 overflow-hidden"
                        >
                            <div className="relative">
                                <div className="flex justify-between items-center  ">
                                    <div className="text-md flex p-2 gap-3 items-center justify-center">
                                        <div className='bg-green-900 rounded-full p-1'>
                                            <img className='h-8 w-8 rounded-full' src="https://png.pngtree.com/png-vector/20231019/ourlarge/pngtree-user-profile-avatar-png-image_10211467.png" alt={post.title} />
                                        </div>
                                        <div className='font-semibold text-lg'>
                                            {post.authorId?.name}
                                        </div>
                                    </div>
                                </div>

                                {post.image && (
                                    <img src={post.image} alt={post.title} className="w-full h-60 object-cover" />
                                )}
                            </div>
                            <div className="px-4">
                                <div className='flex gap-4 mb-2 py-2'>
                                    <button
                                        onClick={() => handleToggleLike(post._id)}
                                        className='flex gap-1.5 items-center'
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={isLiked ? '#0d542b' : 'none'} stroke='#0d542b' strokeWidth={isLiked ? 0 : 30} height={22} width={22} viewBox="0 0 640 640"><path d="M442.9 144C415.6 144 389.9 157.1 373.9 179.2L339.5 226.8C335 233 327.8 236.7 320.1 236.7C312.4 236.7 305.2 233 300.7 226.8L266.3 179.2C250.3 157.1 224.6 144 197.3 144C150.3 144 112.2 182.1 112.2 229.1C112.2 279 144.2 327.5 180.3 371.4C221.4 421.4 271.7 465.4 306.2 491.7C309.4 494.1 314.1 495.9 320.2 495.9C326.3 495.9 331 494.1 334.2 491.7C368.7 465.4 419 421.3 460.1 371.4C496.3 327.5 528.2 279 528.2 229.1C528.2 182.1 490.1 144 443.1 144zM335 151.1C360 116.5 400.2 96 442.9 96C516.4 96 576 155.6 576 229.1C576 297.7 533.1 358 496.9 401.9C452.8 455.5 399.6 502 363.1 529.8C350.8 539.2 335.6 543.9 320 543.9C304.4 543.9 289.2 539.2 276.9 529.8C240.4 502 187.2 455.5 143.1 402C106.9 358.1 64 297.7 64 229.1C64 155.6 123.6 96 197.1 96C239.8 96 280 116.5 305 151.1L320 171.8L335 151.1z"/></svg>
                                        <span>{post.likes?.length || 0}</span>
                                    </button>
                                    <button onClick={() => toggleComments(post._id)} className='flex gap-1.5 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill='#0d542b' height={22} width={22} viewBox="0 0 640 640"><path d="M115.9 448.9C83.3 408.6 64 358.4 64 304C64 171.5 178.6 64 320 64C461.4 64 576 171.5 576 304C576 436.5 461.4 544 320 544C283.5 544 248.8 536.8 217.4 524L101 573.9C97.3 575.5 93.5 576 89.5 576C75.4 576 64 564.6 64 550.5C64 546.2 65.1 542 67.1 538.3L115.9 448.9zM153.2 418.7C165.4 433.8 167.3 454.8 158 471.9L140 505L198.5 479.9C210.3 474.8 223.7 474.7 235.6 479.6C261.3 490.1 289.8 496 319.9 496C437.7 496 527.9 407.2 527.9 304C527.9 200.8 437.8 112 320 112C202.2 112 112 200.8 112 304C112 346.8 127.1 386.4 153.2 418.7z"/></svg>
                                        <span>{post.comments?.length || 0}</span>
                                    </button>
                                </div>


                                <h2 className="font-bold text-md uppercase mb-2">{post.title}</h2>
                                <p className="text-sm text-green-800 mb-3">{post.content}</p>

                                {openComments[post._id] && (
                                    <div className="mt-4 border-t pt-3">
                                        <h4 className="text-green-700 font-medium mb-2">Comments</h4>
                                        {post.comments?.map((cmt, idx) => (
                                            <div key={idx} className="text-sm text-gray-800 mb-1">
                                                <strong className="text-green-800">{cmt.user?.name || "User"}:</strong> {cmt.content}
                                            </div>
                                        ))}
                                        <div className="mt-2 flex gap-2">
                                            <input
                                                value={chatInputs?.[post._id] || ""}
                                                onChange={(e) => handleInputChange(post._id, e.target.value)}
                                                className="flex-1 border border-green-300 px-3 py-1 rounded-md text-sm"
                                                placeholder="Add a comment..."
                                            />
                                            <button
                                                onClick={() => handleAddComment(post._id)}
                                                className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 text-sm"
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>

        </>
    );
}

export default CommunityDisplayMiddle;

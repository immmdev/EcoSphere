import React, { useState, useContext } from 'react';
import axios from "axios";
import { ShopContext } from '../contexts/ShopContext';
import { toast } from 'react-toastify';

function LearnArticleCreate() {
    const { backendUrl, token, refresh, setRefresh, navigate, activeTab, setActiveTab } = useContext(ShopContext);

    const [form, setForm] = useState({
        title: '',
        summary: '',
        content: '',
        coverImage: '',
        tags: '',
        category: 'Beginner',
        type: 'Article',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const postArticle = async (data) => {
        try {
            await axios.post(
                `${backendUrl}/api/learn/new-article`,
                data,
                { headers: { token } }
            );
            toast.success("Article saved successfully");
            return true;
        } catch (err) {
            toast.error("Article failed to save");
            console.error(err);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.title || !form.content) {
            setError('Title and Content are required.');
            return;
        }

        const newArticle = {
            ...form,
            tags: form.tags
                .split(',')
                .map((tag) => tag.trim())
                .filter(Boolean)
        };
        console.log(newArticle);
        const isCreated = await postArticle(newArticle);
        if (isCreated) {
            setRefresh(!refresh);
            navigate("/learn");

            setForm({
                title: '',
                summary: '',
                content: '',
                coverImage: '',
                tags: '',
                category: 'Beginner',
                type: 'Article',
            });
            setError('');
        }
    };

    return (
        <div className='eco-static-bg p-10'>
            <h2 className="text-4xl font-bold text-white text-center mb-4 tracking-wide">
                Sow Words, Grow Change
            </h2>
            <p className='text-green-50 mb-5 text-lg text-center'>
                Inspire others with your green lifestyle tips, climate thoughts, or sustainability stories.
                Every article contributes to a more aware and eco-conscious world
            </p>

            <div className="max-w-3xl mx-auto p-6 bg-green-50 rounded-lg shadow-md">

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Title *"
                        className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
                    />

                    <input
                        type="text"
                        name="summary"
                        value={form.summary}
                        onChange={handleChange}
                        placeholder="Summary"
                        className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
                    />

                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleChange}
                        placeholder="Full Content *"
                        rows={6}
                        className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
                    />

                    <input
                        type="text"
                        name="coverImage"
                        value={form.coverImage}
                        onChange={handleChange}
                        placeholder="Cover Image URL"
                        className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
                    />

                    <input
                        type="text"
                        name="tags"
                        value={form.tags}
                        onChange={handleChange}
                        placeholder="Tags (comma-separated)"
                        className="w-full text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
                    />

                    <div className="flex flex-wrap gap-4">
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className=" text-green-900 border-b border-green-800 focus:border-green-600 outline-none py-2"
                        >
                            <option value="All">All</option>
                            <option value="Climate Change">Climate Change</option>
                            <option value="Sustainable Living">Sustainable Living</option>
                            <option value="Renewable Energy">Renewable Energy</option>
                            <option value="Food & Diet">Food & Diet</option>
                            <option value="Sustainable Fashion">Sustainable Fashion</option>
                            <option value="Eco-Friendly Homes">Eco-Friendly Homes</option>
                            <option value="Waste & Recycling">Waste & Recycling</option>
                            <option value="Biodiversity & Nature">Biodiversity & Nature</option>
                            <option value="DIY Projects">DIY Projects</option>

                        </select>
                    </div>

                    <button
                        type="submit"
                        className=" bg-emerald-400 text-green-900 font-semibold px-6 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LearnArticleCreate;

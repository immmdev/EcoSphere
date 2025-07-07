import React, { useCallback, useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import RTE from "./RTE";
import { useNavigate } from "react-router-dom";
import authContext from "../contexts/authContext";

export default function PostArticle({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      summary: post?.summary || "",
      content: post?.content || "",
      category: post?.category || "Beginner",
      tags: post?.tags?.join(", ") || "",
      type: post?.type || "Article",
      status: post?.status || "active",
    },
  });

  const navigate = useNavigate();
  const { authUser } = useContext(authContext);
  const [imagePreview, setImagePreview] = useState(post?.coverImage || null);

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const submit = (data) => {
    const article = {
      ...data,
      author: authUser?.name || "Anonymous",
      tags: data.tags.split(",").map((tag) => tag.trim()),
      coverImage: imagePreview,
      createdAt: new Date().toISOString(),
    };

    console.log("✅ Article Submitted:", article);

    const existing = JSON.parse(localStorage.getItem("ecosArticles")) || [];
    localStorage.setItem("ecosArticles", JSON.stringify([...existing, article]));

    navigate("/learn");
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="flex justify-center p-5 flex-wrap gap-4">
      {/* Left Side */}
      <div className="w-full md:w-2/3 px-2 space-y-4">
        <div>
          <label className="block text-green-800 font-medium mb-1">Title</label>
          <input
            type="text"
            placeholder="e.g. 5 Tips to Reduce Waste"
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("title", { required: true })}
          />
        </div>

        <div>
          <label className="block text-green-800 font-medium mb-1">Slug</label>
          <input
            type="text"
            placeholder="auto-generated-from-title"
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("slug", { required: true })}
            onInput={(e) =>
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              })
            }
          />
        </div>

        <div>
          <label className="block text-green-800 font-medium mb-1">Summary</label>
          <textarea
            placeholder="Short summary of the article"
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("summary", { required: true })}
          ></textarea>
        </div>

        <RTE
          label="Content"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/3 px-2 space-y-4">
        <div>
          <label className="block text-green-800 font-medium mb-1 ">Featured Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border-1"
            {...register("image", { required: !post })}
            onChange={handleImageChange}
          />
        </div>

        {imagePreview && (
          <div>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-md shadow"
            />
          </div>
        )}

        <div>
          <label className="block text-green-800 font-medium mb-1">Category</label>
          <select
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("category", { required: true })}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-green-800 font-medium mb-1">Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. plastic, sustainability"
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("tags", { required: true })}
          />
        </div>

        

        <div>
          <label className="block text-green-800 font-medium mb-1">Status</label>
          <select
            className="w-full border border-green-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            {...register("status", { required: true })}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-700 text-white font-semibold px-4 py-2 rounded-md hover:bg-green-800 transition duration-200"
        >
          {post ? "Update Article" : "Publish Article"}
        </button>
      </div>
    </form>
  );
}
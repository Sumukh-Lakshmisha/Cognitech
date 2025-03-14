import React, { useState } from "react";

const initialBlogs = [
  {
    id: 1,
    title: "Exploring AI in 2025",
    content: "AI is evolving rapidly, and 2025 is set to bring major breakthroughs...",
    meetLink: "https://meet.google.com/example1",
  },
  {
    id: 2,
    title: "Sustainable Living Tips",
    content: "Sustainability is the key to our future. Here are some essential tips...",
    meetLink: "https://meet.google.com/example2",
  },
];

function HomePage({ onSelectBlog, onCreateBlog }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blogs</h1>
      <button onClick={onCreateBlog} className="mb-4 p-2 bg-green-500 text-white rounded">Write a Blog</button>
      <ul>
        {initialBlogs.map((blog) => (
          <li key={blog.id} className="mb-4 p-4 border rounded-lg shadow">
            <h2
              className="text-xl font-semibold text-blue-600 cursor-pointer"
              onClick={() => onSelectBlog(blog)}
            >
              {blog.title}
            </h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BlogPage({ blog, onBack }) {
  return (
    <div className="p-6">
      <button onClick={onBack} className="mb-4 p-2 bg-gray-200 rounded">⬅ Back</button>
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="mb-4">{blog.content}</p>
      {blog.meetLink ? (
        <a
          href={blog.meetLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-blue-500 text-white rounded-lg"
        >
          Join Discussion
        </a>
      ) : (
        <p className="text-gray-500">No discussion scheduled</p>
      )}
    </div>
  );
}

function CreateBlogPage({ onPublish }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [meetLink, setMeetLink] = useState("");

  const handlePublish = () => {
    if (title && content) {
      onPublish({ id: Date.now(), title, content, meetLink });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Write a Blog</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      ></textarea>
      <input
        type="text"
        placeholder="Google Meet Link (Optional)"
        value={meetLink}
        onChange={(e) => setMeetLink(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={handlePublish} className="p-2 bg-blue-500 text-white rounded-lg">
        Publish
      </button>
    </div>
  );
}

export default function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [creatingBlog, setCreatingBlog] = useState(false);
  const [blogs, setBlogs] = useState(initialBlogs);

  const handlePublish = (newBlog) => {
    setBlogs([newBlog, ...blogs]);
    setCreatingBlog(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      {selectedBlog ? (
        <BlogPage blog={selectedBlog} onBack={() => setSelectedBlog(null)} />
      ) : creatingBlog ? (
        <CreateBlogPage onPublish={handlePublish} />
      ) : (
        <HomePage onSelectBlog={setSelectedBlog} onCreateBlog={() => setCreatingBlog(true)} />
      )}
    </div>
  );
}

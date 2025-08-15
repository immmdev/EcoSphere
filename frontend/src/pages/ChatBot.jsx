import { useState, useContext, useRef } from "react";
import axios from "axios";
import { ShopContext } from "../contexts/ShopContext";
import { FiCopy } from "react-icons/fi";
import ecoAIContext from "../assets/Finetune.js";


import ReactMarkdown from "react-markdown";
import CopyButton from "../components/CopyButton.jsx";

function ChatBot() {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const { backendUrl } = useContext(ShopContext);
    const chatEndRef = useRef(null);

    const getAIResponse = async () => {
        if (!prompt.trim()) return;

        const newMessages = [...messages, { sender: "user", text: prompt }];
        setMessages(newMessages);
        setPrompt("");
        setLoading(true);
        const payLoad = prompt + ecoAIContext;

        try {
            const res = await axios.post(`${backendUrl}/api/ai/generate`, { payLoad });
            const aiText = res.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No output";

            let typedText = "";
            let i = 0;
            const typingInterval = setInterval(() => {
                if (i < aiText.length) {
                    typedText += aiText[i];
                    i++;
                    setMessages([...newMessages, { sender: "ai", text: typedText }]);
                } else {
                    clearInterval(typingInterval);
                }
            }, 20);
        } catch {
            setMessages([...newMessages, { sender: "ai", text: "Error fetching AI response" }]);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => navigator.clipboard.writeText(text);

    return (

        <div className="eco-static-bg">
            <div className="p-5">
                <h1 className="text-4xl md:text-4xl text-center font-bold text-white mb-4">
                    Ask EcoAi – Your Sustainability Assistant
                </h1>
                <p className="text-green-100  text-lg text-center">
                    EcoAi is here to answer your questions, clear doubts, and guide you on every step toward greenery and sustainability.
                </p>

            </div>

            <div className=" flex items-center justify-center text-white p-4">
                <div className="w-full min-h-50 max-w-3xl bg-green-100 rounded-2xl shadow-lg flex flex-col ">

                    {/* Chat Messages */}
                    <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                <div className="flex flex-col max-w-[80%]">
                                    <div
                                        className={`p-3 rounded-xl text-sm shadow ${msg.sender === "user"
                                            ? "bg-green-400 text-green-900"
                                            : " bg-green-900 text-green-100 prose prose-sm prose-green max-w-none"
                                            }`}
                                    >
                                        {msg.sender === "ai" ? (
                                            <ReactMarkdown
                                                components={{
                                                    h1: ({ node, ...props }) => <h1 className="text-lg font-bold text-green-800 mb-2" {...props} />,
                                                    h2: ({ node, ...props }) => <h2 className="text-base font-semibold text-green-700 mb-1" {...props} />,
                                                    p: ({ node, ...props }) => <p className="mb-2" {...props} />,
                                                    li: ({ node, ...props }) => <li className="list-disc ml-6" {...props} />
                                                }}
                                            >
                                                {msg.text}
                                            </ReactMarkdown>
                                        ) : (
                                            msg.text
                                        )}
                                    </div>
                                    {msg.sender === "ai" && (

                                        <CopyButton text={msg.text} />
                                    )}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef}></div>
                    </div>

                    {/* Input Area */}
                    <div className="flex items-center gap-2 p-3 border-t  bg-green-900">
                        <textarea
                            rows="1"
                            className="flex-1 resize-none p-2 rounded-lg border border-white/10 bg-white/10 text-white text-sm outline-none focus:ring-2 focus:ring-green-100"
                            value={prompt}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault();
                                    getAIResponse();
                                }}}

                                onChange = {(e) => setPrompt(e.target.value)}
                        placeholder="Ask to EcoAi..."
                        />
                        <button
                            onClick={getAIResponse}
                            disabled={loading || !prompt.trim()}
                            className={`font-semibold text-white transition-all shadow-lg ${loading || !prompt.trim()
                                ? "opacity-50 cursor-not-allowed "
                                : "bg-gradient-to-r  hover:scale-105"
                                }`}
                        >
                            {loading ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ellipsis-icon lucide-ellipsis"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload-icon lucide-upload"><path d="M12 3v12" /><path d="m17 8-5-5-5 5" /><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /></svg>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBot;

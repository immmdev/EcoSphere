import React, { useState } from 'react';
import { FiCopy } from 'react-icons/fi';

const CopyButton = ({ text }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(() => alert("Failed to copy"));
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-green-600 hover:text-green-900 mt-1"
        >
            <FiCopy /> {copied ? "Copied" : "Copy"}
        </button>
    );
};

export default CopyButton;

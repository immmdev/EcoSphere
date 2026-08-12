import React, { useRef, useState } from "react";

function ImageCapture({ onChange, label = "Cover Image" }) {
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [preview, setPreview] = useState(null);

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onChange?.(file);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-green-800 mb-2">{label}</label>

      {preview && (
        <img
          src={preview}
          alt="Selected preview"
          className="w-full h-40 object-cover rounded-md mb-3"
        />
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex-1 bg-emerald-400 text-green-900 font-semibold px-4 py-2 rounded-full shadow-[0_4px_0_#047857] hover:translate-y-[1px] hover:shadow-[0_2px_0_#047857] active:translate-y-[2px] active:shadow-none transition-all duration-150"
        >
          Take Photo
        </button>
        <button
          type="button"
          onClick={() => galleryInputRef.current?.click()}
          className="flex-1 bg-lime-300 text-green-900 font-semibold px-4 py-2 rounded-full shadow-[0_4px_0_#65a30d] hover:translate-y-[1px] hover:shadow-[0_2px_0_#65a30d] active:translate-y-[2px] active:shadow-none transition-all duration-150"
        >
          Gallery
        </button>
      </div>

      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFile}
        className="hidden"
      />
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}

export default ImageCapture;

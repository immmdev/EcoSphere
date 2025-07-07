import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full flex flex-col space-y-2">
      {label && (
        <label className="text-green-800 font-medium text-lg pl-1">
          {label}
        </label>
      )}

      <div className="border border-green-300 rounded-lg overflow-hidden shadow-sm">
        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange } }) => (
            <Editor
              apiKey="319eonwu1vlj87gl2ufhw9l1xs9f41zhv42llh5qx34q80hn"
              initialValue={defaultValue}
              onEditorChange={onChange}
              init={{
                height: 500,
                menubar: true,
                plugins: [
                  "advlist", "autolink", "lists", "link", "image", "preview",
                  "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
                  "insertdatetime", "media", "table", "help", "wordcount"
                ],
                toolbar:
                  "undo redo | styles | bold italic underline | " +
                  "alignleft aligncenter alignright alignjustify | " +
                  "bullist numlist outdent indent | link image media | preview code | help",
                content_style: `
                  body {
                    font-family: Helvetica, Arial, sans-serif;
                    font-size: 16px;
                    background-color: #f4fff4;
                    color: #2f4f2f;
                    padding: 10px;
                  }
                  h1, h2, h3 { color: #006400; }
                  a { color: #008000; }
                `,
                file_picker_callback: function (cb, value, meta) {
                  if (meta.filetype === 'image') {
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.onchange = function () {
                      const file = this.files[0];
                      const reader = new FileReader();
                      reader.onload = function () {
                        cb(reader.result, { title: file.name });
                      };
                      reader.readAsDataURL(file);
                    };
                    input.click();
                  }
                },
                setup: function (editor) {
                  editor.on('keydown', function (e) {
                    const text = editor.getContent({ format: 'text' });
                    const wordCount = text.trim().split(/\s+/).length;
                    if (wordCount > 500) {
                      e.preventDefault();
                      alert("Maximum word limit of 500 reached!");
                    }
                  });
                }
              }}
            />
          )}
        />
      </div>
    </div>
  );
}

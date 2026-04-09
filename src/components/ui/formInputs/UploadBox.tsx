import { useRef, type ChangeEvent } from "react";
import { BsUpload } from "react-icons/bs";
import "./index.css";

interface UploadFile {
  name: string;
  size: number;
  preview?: string;
}

interface UploadBoxProps {
  label?: string;
  file?: UploadFile | null;
  accept?: string;
  onChange?: (file: File | null) => void;
}

export default function UploadBox({
  label,
  file = null,
  accept = "image/png,image/jpeg,image/webp",
  onChange,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    onChange?.(selectedFile);
  };

  const formatFileSize = (size: number) => {
    if (size >= 1024 * 1024) {
      return `${Math.round((size / (1024 * 1024)) * 10) / 10}MB`;
    }

    return `${Math.round(size / 1024)}KB`;
  };

  return (
    <div className="upload-field">
      {label && <label className="upload-label">{label}</label>}

      <div className={`upload-box ${file ? "has-file" : ""}`}>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="upload-hidden-input"
          onChange={handleFileChange}
        />

        {!file ? (
          <div className="upload-empty-state">
            <BsUpload className="upload-icon" />

            <p className="upload-title">
              Drag and drop or{" "}
              <span className="upload-link" onClick={handleOpenFilePicker}>
                Upload file
              </span>
            </p>

            <p className="upload-subtitle">JPG, PNG or WebP</p>
          </div>
        ) : (
          <div className="upload-file-state">
            <div className="upload-file-preview">
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="upload-preview-image"
                />
              ) : (
                <div className="upload-preview-fallback" />
              )}
            </div>

            <div className="upload-file-info">
              <p className="upload-file-name">{file.name}</p>
              <p className="upload-file-size">
                Size - {formatFileSize(file.size)}
              </p>
              <button
                type="button"
                className="upload-link-button"
                onClick={handleOpenFilePicker}
              >
                Change
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

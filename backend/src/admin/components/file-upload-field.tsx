import clsx from 'clsx';
import React, { useRef, useState } from 'react';

type FileUploadFieldProps = {
  onFileChosen: (files: File[]) => void;
  filetypes: string[];
  errorMessage?: string;
  placeholder?: React.ReactElement | string;
  className?: string;
  multiple?: boolean;
  text?: React.ReactElement | string;
};

const defaultText = (
  <span>
    Drop your images here, or{' '}
    <span className="text-orange-600">click to browse</span>
  </span>
);

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  onFileChosen,
  filetypes,
  errorMessage,
  className,
  text = defaultText,
  placeholder = '',
  multiple = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileUploadError, setFileUploadError] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const files = Array.from(fileList).filter((file) =>
        filetypes.includes(file.type)
      );
      if (files.length) {
        onFileChosen(files);
      } else {
        setFileUploadError(true);
      }
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileUploadError(false);

    const files: File[] = [];
    if (e.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < e.dataTransfer.items.length; i++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          if (file && filetypes.includes(file.type)) {
            files.push(file);
          }
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      files.push(
        ...Array.from(e.dataTransfer.files).filter((file) =>
          filetypes.includes(file.type)
        )
      );
    }

    if (files.length) {
      onFileChosen(files);
    } else {
      setFileUploadError(true);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDrop={handleFileDrop}
      onDragOver={(e) => e.preventDefault()}
      className={clsx(
        'inter-base-regular text-grey-50 rounded-rounded border-grey-20 hover:border-blue-600 hover:text-grey-40 flex h-full w-full cursor-pointer select-none flex-col items-center justify-center border-2 border-dashed transition-colors',
        className
      )}
    >
      <div className="flex flex-col items-center">
        <p>{text}</p>
        {placeholder}
      </div>
      {fileUploadError && (
        <span className="text-rose-60">
          {errorMessage || 'Please upload a valid image file'}
        </span>
      )}
      <input
        ref={inputRef}
        accept={filetypes.join(', ')}
        multiple={multiple}
        type="file"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};

export default FileUploadField;

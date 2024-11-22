import React, { useCallback } from 'react';
import { ImagePlus, Upload } from 'lucide-react';

interface LogoUploadBoxProps {
  id: string;
  image: string | null;
  onImageSelect: (file: File) => void;
  isSelected?: boolean;
  isDrawn?: boolean;
  readOnly?: boolean;
}

export default function LogoUploadBox({ 
  id, 
  image, 
  onImageSelect, 
  isSelected, 
  isDrawn,
  readOnly = false 
}: LogoUploadBoxProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onImageSelect(file);
    }
  }, [onImageSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  }, []);

  const Component = readOnly ? 'div' : 'label';

  return (
    <Component
      {...(!readOnly && { htmlFor: id })}
      className={`relative flex flex-col items-center justify-center w-[250px] h-[250px] border-2 border-dashed rounded-lg transition-all group
        ${isSelected 
          ? 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-pulse' 
          : isDrawn
            ? 'border-gray-300 opacity-40'
            : readOnly
              ? 'border-gray-300'
              : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50/50 cursor-pointer'}`}
      {...(!readOnly && {
        onDrop: handleDrop,
        onDragOver: handleDragOver
      })}
    >
      {!readOnly && (
        <input
          type="file"
          id={id}
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          disabled={isDrawn}
        />
      )}
      
      {image ? (
        <div className="relative w-full h-full p-4">
          <img
            src={image}
            alt="Logo preview"
            className="w-full h-full object-contain rounded-lg"
          />
          {!readOnly && !isDrawn && (
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Upload className="w-8 h-8 text-white" />
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-2 p-4 text-gray-500 group-hover:text-blue-500">
          <ImagePlus className="w-10 h-10" />
          <div className="text-sm font-medium text-center">
            {!readOnly && (
              <>
                <p>Click or drag image</p>
                <p className="text-xs text-gray-400">500 x 500 recommended</p>
              </>
            )}
          </div>
        </div>
      )}
    </Component>
  );
}
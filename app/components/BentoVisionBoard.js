"use client";
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const BentoVisionBoard = () => {
  // State to store uploaded images for each box
  const [boxes, setBoxes] = useState({
    box1: null,
    box2: null,
    box3: null,
    box4: null,
    box5: null,
    box6:null,
    box7:null,
    box8:null,
    box9:null,
    box10:null
  });

  // Handle file upload for a specific box
  const handleFileUpload = (e, boxId) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBoxes(prev => ({
          ...prev,
          [boxId]: event.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-screen mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Vision Board</h1> */}
      
      <div className="grid grid-cols-4 gap-2 aspect-[6/3]">
        {/* Large featured box */}
        <div className="col-span-2 row-span-1 bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box1"
            image={boxes.box1}
            onUpload={handleFileUpload}
          />
        </div>
        
        {/* Smaller boxes */}
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box2"
            image={boxes.box2}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box3"
            image={boxes.box3}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box4"
            image={boxes.box4}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="col-span-2 row-span-1 bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box5"
            image={boxes.box5}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box6"
            image={boxes.box6}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box7"
            image={boxes.box7}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box8"
            image={boxes.box8}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box9"
            image={boxes.box9}
            onUpload={handleFileUpload}
          />
        </div>
        <div className="bg-gray-100 rounded-xl overflow-hidden relative">
          <UploadBox
            boxId="box10"
            image={boxes.box10}
            onUpload={handleFileUpload}
          />
        </div>
      </div>
    </div>
  );
};

// Subcomponent for individual upload boxes
const UploadBox = ({ boxId, image, onUpload }) => {
  return (
    <>
      <input
        type="file"
        id={boxId}
        className="hidden"
        accept="image/*"
        onChange={(e) => onUpload(e, boxId)}
      />
      <label
        htmlFor={boxId}
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group bg-[#f0f6f4]"
      >
        {image ? (
          <img
            src={image}
            alt="Vision board item"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
            <span className="text-sm text-gray-400 group-hover:text-gray-600">
              Click to upload image
            </span>
          </div>
        )}
      </label>
    </>
  );
};

export default BentoVisionBoard;
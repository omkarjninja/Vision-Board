"use client";
import React, { useState } from 'react';
import { Upload, Move } from 'lucide-react';

const BentoVisionBoardDraggable = () => {
  const [boxes, setBoxes] = useState([
    { id: 'box1', image: null, size: 'large' },
    { id: 'box2', image: null, size: 'small' },
    { id: 'box3', image: null, size: 'small' },
    { id: 'box4', image: null, size: 'small' },
    { id: 'box5', image: null, size: 'large' },
    { id: 'box6', image: null, size: 'small' },
    { id: 'box7', image: null, size: 'small' },
    { id: 'box8', image: null, size: 'small' },
    { id: 'box9', image: null, size: 'small' },
    { id: 'box10', image: null, size: 'small' }
  ]);
  
  const [draggedBox, setDraggedBox] = useState(null);

  // Handle file upload
  const handleFileUpload = (e, boxId) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBoxes(prev => prev.map(box => 
          box.id === boxId ? { ...box, image: event.target.result } : box
        ));
      };
      reader.readAsDataURL(file);
    }
  };

  // Drag handlers
  const handleDragStart = (e, box) => {
    setDraggedBox(box);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetBox) => {
    e.preventDefault();
    if (!draggedBox || draggedBox.id === targetBox.id) return;

    setBoxes(prev => {
      const newBoxes = [...prev];
      const draggedIdx = newBoxes.findIndex(box => box.id === draggedBox.id);
      const targetIdx = newBoxes.findIndex(box => box.id === targetBox.id);
      
      // Swap positions while maintaining size properties
      const draggedSize = newBoxes[draggedIdx].size;
      newBoxes[draggedIdx] = { 
        ...newBoxes[draggedIdx], 
        size: newBoxes[targetIdx].size 
      };
      newBoxes[targetIdx] = { 
        ...newBoxes[targetIdx], 
        size: draggedSize 
      };
      
      // Swap the boxes
      [newBoxes[draggedIdx], newBoxes[targetIdx]] = 
      [newBoxes[targetIdx], newBoxes[draggedIdx]];
      
      return newBoxes;
    });
    setDraggedBox(null);
  };

  return (
    <div className="max-screen mx-auto p-4">
      {/* <h1 className="text-3xl font-bold mb-6 text-center">Vision Board</h1> */}
      
      <div className="grid grid-cols-4 gap-4 aspect-[6/3]">
        {boxes.map(box => (
          <div 
            key={box.id}
            className={`${
              box.size === 'large' ? 'col-span-2 row-span-1' : ''
            } bg-gray-100 rounded-xl overflow-hidden relative
            ${draggedBox && draggedBox.id !== box.id ? 'border-2 border-dashed border-blue-300' : ''}
            transition-all duration-200`}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, box)}
          >
            <UploadBox
              box={box}
              onUpload={handleFileUpload}
              onDragStart={handleDragStart}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const UploadBox = ({ box, onUpload, onDragStart }) => {
  return (
    <>
      <input
        type="file"
        id={box.id}
        className="hidden"
        accept="image/*"
        onChange={(e) => onUpload(e, box.id)}
      />
      <label
        htmlFor={box.id}
        className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
        draggable={true}
        onDragStart={(e) => onDragStart(e, box)}
      >
        {box.image ? (
          <div className="relative w-full h-full">
            <img
              src={box.image}
              alt="Vision board item"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
              <Move className="text-white opacity-0 group-hover:opacity-100 w-8 h-8" />
            </div>
          </div>
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

export default BentoVisionBoardDraggable;
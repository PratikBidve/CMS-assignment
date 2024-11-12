"use client";
import { registerPlugin } from './pluginManager';
import React, { useEffect, useState } from 'react';

export const ImageSlider: React.FC<{ images: string[]; onImageClick: (index: number) => void }> = ({
  images,
  onImageClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Handle keyboard events for Escape, Left Arrow, and Right Arrow keys
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeModal();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen]);

  return (
    <div>
      {/* Image Slider Thumbnails */}
      <div className="relative w-full flex overflow-x-scroll space-x-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 cursor-pointer w-1/5 h-32 rounded-lg overflow-hidden"
            onClick={() => openModal(index)}
          >
            <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover hover:opacity-75 transition-opacity" />
          </div>
        ))}
      </div>

      {/* Modal for Full-Screen Image Preview */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="relative w-3/4 max-w-5xl bg-white p-4 rounded-lg">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
              aria-label="Close Preview"
            >
              &times;
            </button>

            {/* Image Display */}
            <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} className="w-full h-auto object-contain rounded-lg shadow-lg" />

            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition focus:outline-none"
              aria-label="Previous Slide"
            >
              &#10094;
            </button>

            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition focus:outline-none"
              aria-label="Next Slide"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

registerPlugin({
  name: 'ImageSliderPlugin',
  components: {
    ImageSlider,
  },
  initialize: () => {
    console.log('ImageSliderPlugin initialized');
  },
});

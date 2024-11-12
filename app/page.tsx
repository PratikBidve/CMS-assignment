"use client";
import { useState } from 'react';
import { getRegisteredPlugins } from '../utils/plugins/pluginManager';
import '../utils/plugins/imageSliderPlugin'; // Ensure the plugin is registered

export default function Page() {
  const plugins = getRegisteredPlugins();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalImages, setModalImages] = useState<string[]>([]);

  const openModal = (images: string[], index: number) => {
    setModalImages(images);
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <main className="p-4">
      {!isModalOpen && (
        <>
          <h1 className="text-4xl font-bold mb-4">Hello, Home page!</h1>
          <section>
            <h2 className="text-2xl font-semibold mb-2">Click on any image to see the full Preview</h2>
            {plugins.length > 0 ? (
              plugins.map((plugin) => (
                <div key={plugin.name} className="my-4 p-4 border border-gray-200 rounded-md">
                  <h3 className="text-xl font-medium">{plugin.name}</h3>
                  {Object.entries(plugin.components).map(([name, Component]) => (
                    <div key={name} className="mt-4">
                      <h4 className="font-semibold text-gray-600">{name}</h4>
                      <Component
                        images={[
                          "https://www.kgkgroup.com/wp-content/uploads/2020/07/Web-Blog_KGK-Group_May_Innovative-diamond-products-1366-x-657.jpg",
                          "https://kgk.cc/assetss/img/kgkmilestone3Inner.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/The-entire-KGK-team-in-the-new-office.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/L-to-R-Mr-Sanjay-Kothari-Mr-Navrattan-Kothari-Ms-Vanya-Mishra-Mr-Rajpurohit-Mr-Sandeep-Kothari.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/Ms-Varda-Shine-Lighting-the-lamp.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/1KGK-Chairman-Mr-Navrattan-Kothari-with-Hon-Kitso-Mokaila-Minister-of-Minerals-Energy-and-Water-Resources-Botwana.jpg",
                        ]}
                        onImageClick={(index: number) => openModal([
                          "https://www.kgkgroup.com/wp-content/uploads/2020/07/Web-Blog_KGK-Group_May_Innovative-diamond-products-1366-x-657.jpg",
                          "https://kgk.cc/assetss/img/kgkmilestone3Inner.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/The-entire-KGK-team-in-the-new-office.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/L-to-R-Mr-Sanjay-Kothari-Mr-Navrattan-Kothari-Ms-Vanya-Mishra-Mr-Rajpurohit-Mr-Sandeep-Kothari.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/Ms-Varda-Shine-Lighting-the-lamp.jpg",
                          "https://www.kgkgroup.com/wp-content/uploads/2017/03/1KGK-Chairman-Mr-Navrattan-Kothari-with-Hon-Kitso-Mokaila-Minister-of-Minerals-Energy-and-Water-Resources-Botwana.jpg"
                        ], index)} 
                      />
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p>No plugins loaded</p>
            )}
          </section>
        </>
      )}

      {isModalOpen && modalImages.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition"
            aria-label="Close Preview"
          >
            &times;
          </button>
          <img
            src={modalImages[currentImageIndex]}
            alt={`Slide ${currentImageIndex}`}
            className="max-w-3xl w-full h-auto max-h-full object-contain rounded-lg shadow-lg"
          />
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev - 1 + modalImages.length) % modalImages.length)}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition focus:outline-none"
            aria-label="Previous Slide"
          >
            &#10094;
          </button>
          <button
            onClick={() => setCurrentImageIndex((prev) => (prev + 1) % modalImages.length)}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition focus:outline-none"
            aria-label="Next Slide"
          >
            &#10095;
          </button>
        </div>
      )}
    </main>
  );
}

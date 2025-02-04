import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const categories = ['Home', 'Tokyo', 'Portrait', 'Food'];
  const photos = [
    { id: 1, category: 'Home', title: 'Time', description: 'Welcome' },
    { id: 2, category: 'Home', title: 'HOME', description: 'Sam' },
    { id: 3, category: 'Tokyo', title: 'City Lights', description: 'Tokyo at night' },
    { id: 4, category: 'Tokyo', title: 'Street Scene', description: 'Rain-soaked streets of Kyoto' },
    { id: 5, category: 'Portrait', title: 'Me', description: 'It me' },
    { id: 6, category: 'Food', title: 'El Pueblo', description: 'The best dollar tacos on Earth' }
  ];

  const [activeCategory, setActiveCategory] = useState('Home');
  const filteredPhotos = photos.filter(photo => photo.category === activeCategory);

  // Style variables based on dark mode
  const bgColor = isDarkMode ? 'bg-gray-900' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const navBgColor = isDarkMode ? 'bg-gray-900/90' : 'bg-white/90';
  const secondaryTextColor = isDarkMode ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className={`min-h-screen ${bgColor} transition-colors duration-300`}>
      {/* Navigation */}
      <nav className={`fixed top-0 w-full ${navBgColor} backdrop-blur-sm z-50 transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className={`text-xl noto-sans-tc-font tracking-wider ${textColor}`}>
              主恩WIP
            </h1>
            
            <div className="hidden md:flex md:items-center md:space-x-8">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-3 py-2 text-sm font-light transition-colors ${
                    activeCategory === category ? textColor : secondaryTextColor
                  }`}
                >
                  {category}
                </button>
              ))}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative inline-flex items-center p-1 rounded-full focus:outline-none"
              >
                <div className={`w-14 h-7 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className={`absolute w-6 h-6 rounded-full transition-transform duration-300 flex items-center justify-center
                    ${isDarkMode ? 'translate-x-7 bg-gray-800' : 'translate-x-1 bg-white'}`}
                  >
                    {isDarkMode ? (
                      <Moon size={14} className="text-gray-200" />
                    ) : (
                      <Sun size={14} className="text-gray-600" />
                    )}
                  </div>
                </div>
              </button>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              {/* Mobile Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative inline-flex items-center p-1 rounded-full focus:outline-none"
              >
                <div className={`w-12 h-6 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                  <div
                    className={`absolute w-5 h-5 rounded-full transition-transform duration-300 flex items-center justify-center
                    ${isDarkMode ? 'translate-x-6 bg-gray-800' : 'translate-x-1 bg-white'}`}
                  >
                    {isDarkMode ? (
                      <Moon size={12} className="text-gray-200" />
                    ) : (
                      <Sun size={12} className="text-gray-600" />
                    )}
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={secondaryTextColor}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`fixed inset-0 z-40 ${bgColor} transition-colors duration-300 pt-16`}>
          <div className="p-4 space-y-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 text-base font-light ${
                  activeCategory === category ? textColor : secondaryTextColor
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedImage(photo)}
              className="aspect-square relative overflow-hidden group cursor-pointer"
            >
              <img
                src={`/api/placeholder/${400}/${400}`}
                alt={photo.title}
                className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="text-white text-lg font-light">{photo.title}</h3>
                  <p className="text-gray-300 text-sm">{photo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={24} />
          </button>
          <div className="relative max-w-4xl max-h-screen p-4">
            <img
              src={`/api/placeholder/${800}/${600}`}
              alt={selectedImage.title}
              className="max-h-[80vh] object-contain"
            />
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center text-white">
              <h3 className="text-xl font-light">{selectedImage.title}</h3>
              <p className="text-sm text-gray-300 mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;

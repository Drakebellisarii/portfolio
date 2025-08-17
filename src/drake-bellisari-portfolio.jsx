import React, { useState, useEffect, useRef } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Camera,
  BookOpen, 
  Code, 
  GraduationCap, 
  Calendar, 
  Award, 
  Brain,
  Trophy,
  ChevronRight,
  Star,
  Menu,
  X,
  Dumbbell,
  ChevronDown
} from 'lucide-react';

// Creative grid layout system
const PhotoCard = ({ photo, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const getCardClass = () => {
    const baseClass = "cursor-pointer transition-all duration-500 transform-gpu";
    
    // Create a variety of sizes for visual interest using valid Tailwind classes
    const sizeVariations = [
      'col-span-1 row-span-1', // Small square
      'col-span-2 row-span-1', // Wide
      'col-span-1 row-span-2', // Tall
      'col-span-2 row-span-2', // Large square
      'col-span-2 row-span-1', // Wide (replacing col-span-3)
      'col-span-1 row-span-2', // Tall (replacing row-span-3)
    ];
    
    // Use index to create a pattern that looks random but is predictable
    const sizeIndex = index % sizeVariations.length;
    const sizeClass = sizeVariations[sizeIndex];
    
    // Add some rotation for visual interest
    const rotationClass = index % 3 === 0 ? 'rotate-1' : index % 3 === 1 ? '-rotate-1' : '';
    
    return `${baseClass} ${sizeClass} ${rotationClass}`;
  };




  return (
    <div className={getCardClass()} onClick={handleClick}>
      <div className={`relative w-full h-full transition-all duration-500 transform-gpu ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        {/* Front of card - Image */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <img 
            src={photo.image} 
            alt={photo.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
            onError={(e) => {
              console.error(`Failed to load image: ${photo.image}`);
              e.target.style.display = 'none';
              // Show a fallback div with the image path for debugging
              const fallback = document.createElement('div');
              fallback.className = 'w-full h-full bg-gray-300 rounded-lg flex items-center justify-center text-gray-600 text-xs p-2';
              fallback.innerHTML = `Image not found:<br/>${photo.image}`;
              e.target.parentNode.appendChild(fallback);
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center">
            <div className="text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <p className="text-sm font-semibold">{photo.title}</p>
              <p className="text-xs">{photo.location}</p>
            </div>
          </div>
        </div>
        
        {/* Back of card - Text Information */}
        <div 
          className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-lg flex flex-col items-center justify-center text-white p-4 text-center"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <h3 className="text-lg font-bold mb-2">{photo.title}</h3>
          <p className="text-sm mb-1">{photo.location}</p>
          <p className="text-xs mb-3">{photo.date}</p>
          <p className="text-xs opacity-75">Click to flip back</p>
        </div>
      </div>
    </div>
  );
};

const BookCard = ({ book, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="cursor-pointer transition-all duration-500 transform-gpu w-full h-full" onClick={handleClick}>
      <div className={`relative w-full h-full transition-all duration-500 transform-gpu ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
        {/* Front of card - Book Cover */}
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg h-full">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={(e) => {
                e.target.src = '/api/placeholder/200/300';
              }}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-semibold">Click to flip</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card - Book Details */}
        <div 
          className="absolute inset-0 w-full h-full rounded-lg flex flex-col items-center justify-center text-white shadow-lg overflow-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
          }}
        >
          {/* Top subtle glow */}
          <div className="absolute top-0 left-0 right-0 h-1/5 overflow-hidden opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl transform -translate-y-1/2"></div>
          </div>
          
          {/* Content container with minimal glass effect */}
          <div className="relative z-10 w-[90%] h-[85%] flex flex-col justify-between p-5">
            {/* Book title - larger and more prominent */}
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{book.title}</h3>
            </div>
            
            {/* Author name - larger and positioned separately */}
            <div className="text-center mt-2">
              <p className="text-base sm:text-lg text-blue-100 font-medium">by {book.author}</p>
            </div>
            
            {/* Rating stars */}
            <div className="flex items-center justify-center space-x-2 my-3">
              {renderStars(book.rating)}
            </div>
            

            
            {/* Flip button at bottom */}
            <button className="mt-3 py-1.5 px-4 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-xs font-medium transition-all duration-300 group flex items-center justify-center mx-auto">
              <span className="mr-1">Flip Back</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
          
          {/* Subtle corner accent */}
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/5 rounded-tl-full"></div>
        </div>
      </div>
    </div>
  );
};

const InterestsDropdown = ({ books, photography }) => {
  const [activeTab, setActiveTab] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Films and music data removed

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isDropdownOpen) {
      setActiveTab(null);
    }
  };

  // Set active tab
  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsDropdownOpen(false);
  };

  // Render stars for ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          size={16}
          className={`${i <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Dropdown Button */}
      <div className="flex flex-col items-center justify-center mb-10">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center space-x-2 text-blue-400 hover:text-blue-300 py-2 transition-all duration-300 group border-b border-transparent hover:border-blue-400/30"
        >
          <span className="text-lg font-medium">Learn More About Me</span>
          <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="mt-4 bg-white rounded-lg shadow-2xl border border-gray-200 p-2 w-full max-w-md animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleTabClick('books')}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:text-blue-500 transition-colors duration-300"
              >
                <BookOpen className="h-8 w-8 text-blue-400 mb-2" />
                <span className="text-gray-800 font-medium">Favorite Books</span>
              </button>
              <button
                onClick={() => handleTabClick('photography')}
                className="flex flex-col items-center justify-center p-4 rounded-lg hover:text-blue-500 transition-colors duration-300"
              >
                <Camera className="h-8 w-8 text-blue-400 mb-2" />
                <span className="text-gray-800 font-medium">My Photography</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Content Areas */}
      <div className="mt-8">
        {/* Books Section */}
        {activeTab === 'books' && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-center mb-8 sm:mb-10">
              <BookOpen className="text-blue-400 mr-3 sm:mr-4" size={24} />
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent">Favorite Reads</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto px-4 sm:px-6 mb-8">
              {books.map((book, index) => (
                <div key={index} className="group w-full h-56 sm:h-72 md:h-80 p-1 sm:p-2">
                  <div className="relative w-full h-full transition-all duration-300 hover:scale-105">                    
                    <BookCard book={book} index={index} />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mb-16 sm:mb-24">
              <a 
                href="https://www.goodreads.com/user/show/145474773" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center bg-[#f4f1ea] hover:bg-[#ede6d6] text-[#382110] py-3 px-6 rounded-lg text-base font-medium transition-all duration-300 shadow-md hover:shadow-lg border border-[#d6d0c4]"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 448 512" 
                  className="w-5 h-5 mr-3 fill-current"
                  aria-hidden="true"
                > 
                  <path d="M299.9 191.2c5.1 37.3-4.7 79-35.9 100.7-22.3 15.5-52.8 14.1-70.8 5.7-37.1-17.3-49.5-58.6-46.8-97.2 4.3-60.9 40.9-87.9 75.3-87.5 46.9-.2 71.8 31.8 78.2 78.3zM448 88v336c0 30.9-25.1 56-56 56H56c-30.9 0-56-25.1-56-56V88c0-30.9 25.1-56 56-56h336c30.9 0 56 25.1 56 56zM330 313.2s-.1-34-.1-217.3h-29v40.3c-.8.3-1.2-.5-1.6-1.2-9.6-20.7-35.9-46.3-76-46-51.9.4-87.2 31.2-100.6 77.8-4.3 14.9-5.8 30.1-5.5 45.6 1.7 77.9 45.1 117.8 112.4 115.2 28.9-1.1 54.5-17 69-45.2.5-1 1.1-1.9 1.7-2.9.2.1.4.1.6.2.3 3.8.2 30.7.1 34.5-.2 14.8-2 29.5-7.2 43.5-7.8 21-22.3 34.7-44.5 39.5-17.8 3.9-35.6 3.8-53.2-1.2-21.5-6.1-36.5-19-41.1-41.8-.3-1.6-1.3-1.3-2.3-1.3h-26.8c.8 10.6 3.2 20.3 8.5 29.2 24.2 40.5 82.7 48.5 128.2 37.4 49.9-12.3 67.3-54.9 67.4-106.3z"/>
                </svg>
                See what I'm reading on Goodreads
              </a>
            </div>
          </div>
        )}

        {/* Photography Section */}
        {activeTab === 'photography' && (
          <div className="animate-fadeIn">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <Camera className="text-blue-400 mr-3 sm:mr-4" size={24} />
              <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-white bg-clip-text text-transparent">
                Photography
              </h3>
            </div>
            <p className="text-center text-gray-600 mb-4 text-sm">💡 Click the images to flip them!</p>
            
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[140px] md:auto-rows-[160px]">
                {photography.map((photo, index) => (
                  <PhotoCard 
                    key={index}
                    photo={photo}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Default state when no tab is selected */}
        {!activeTab && null}
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [showWebsite, setShowWebsite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contactMethod: '',
    contactValue: '',
    subject: '',
    message: ''
  });

  const photography = [
    { 
      image: '/sailboat.JPG', 
      title: 'Sailboat at Sunset',
      location: 'Hudson River, NJ',
      date: 'Summer 2025',
      orientation: 'horizontal'
    },
    { 
      image: '/bridge.jpeg', 
      title: 'Austrian Bridge',
      location: 'Murau, Austria',
      date: 'Spring 2025',
      orientation: 'horizontal'
    },
    { 
      image: '/car.JPG', 
      title: 'Classic Car',
      location: 'St Augustine, FL',
      date: 'Summer 2024',
      orientation: 'horizontal'
    },
    { 
      image: '/country.jpeg', 
      title: 'Countryside of Austria',
      location: 'Murau, Austria',
      date: 'Spring 2025',
      orientation: 'horizontal'
    },
    { 
      image: '/flag.JPG', 
      title: 'American Flag',
      location: 'Fair Haven, NJ',
      date: 'Independence Day 2025',
      orientation: 'horizontal'
    },
    { 
      image: '/Sunset.jpeg', 
      title: 'Florida Evening',
      location: 'Fernandina Beach, FL',
      date: 'Winter 2024',
      orientation: 'vertical'
    },
    { 
      image: '/Gunnar.JPG', 
      title: 'Good Boy',
      location: 'Burt Lake, MI',
      date: 'Summer 2022',
      orientation: 'vertical'
    },
    { 
      image: '/Cod.PNG', 
      title: 'Clean Living',
      location: 'Cape Cod, MA',
      date: 'Summer 2023',
      orientation: 'horizontal'
    },
    { 
      image: '/Lil-boat.PNG', 
      title: 'Lil Boat',
      location: 'Burt Lake, MI',
      date: 'Spring 2023',
      orientation: 'horizontal'
    },
    { 
      image: '/Breakfast.jpeg', 
      title: 'Breakfast over flame',
      location: 'Athens, OH',
      date: 'Summer 2023',
      orientation: 'vertical'
    },
    { 
      image: '/cabin.PNG', 
      title: 'Cabin In the woods',
      location: 'Burt Lake, MI',
      date: 'Summer 2023',
      orientation: 'horizontal'
    },
    { 
      image: '/Colorado-river.jpeg', 
      title: 'River ',
      location: 'Vail, CO',
      date: 'Winter 2023',
      orientation: 'vertical'
    },
    { 
      image: '/Newyork.jpg', 
      title: 'New York Illumination',
      location: 'New York, NY',
      date: 'Summer 2023',
      orientation: 'vertical'
    },
    { 
      image: '/trin-chap.jpeg', 
      title: 'Trinity Chapel',
      location: 'Oxford, UK',
      date: 'Summer 2023',
      orientation: 'vertical'
    },
    { 
      image: '/utah.jpeg', 
      title: 'Utah Landscape',
      location: 'Moab, UT',
      date: 'Summer 2023',
      orientation: 'horizontal'
    },
    { 
      image: '/Island.JPG', 
      title: 'Island View',
      location: 'Burt Lake, MI',
      date: 'Summer 2023',
      orientation: 'horizontal'
    },
    { 
      image: '/Train.jpeg', 
      title: 'Beach Sunset',
      location: 'New Haven, CT',
      date: 'Spring 2023',
      orientation: 'horizontal'
    }
  ];
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsite(true);
    }, 4200);
    
    return () => clearTimeout(timer);
  }, []);

  // Effect to handle headshot spinning animation
  useEffect(() => {
    if (showWebsite) {
      // Set a timeout to allow DOM to be fully ready
      const animationTimer = setTimeout(() => {
        const desktopHeadshot = document.getElementById('spinning-headshot');
        const mobileHeadshot = document.getElementById('mobile-spinning-headshot');
        
        // Stop animation after 2 seconds
        const stopTimer = setTimeout(() => {
          if (desktopHeadshot) {
            desktopHeadshot.classList.remove('animate-coin-spin-initial');
          }
          if (mobileHeadshot) {
            mobileHeadshot.classList.remove('animate-coin-spin-initial');
          }
        }, 2000);
        
        return () => clearTimeout(stopTimer);
      }, 500);
      
      return () => clearTimeout(animationTimer);
    }
  }, [showWebsite]);

  // Handle email click
  const handleEmailClick = () => {
    setShowContactForm(true);
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.contactMethod === 'email' && !formData.contactValue.includes('@')) {
      alert('Please enter a valid email address with an @ sign.');
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('contactMethod', formData.contactMethod);
      formDataToSend.append('contactValue', formData.contactValue);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      
      const response = await fetch('https://formspree.io/f/mzzvglrd', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        alert('Thank you for your message! I\'ll get back to you soon.');
        setShowContactForm(false);
        setFormData({ name: '', contactMethod: '', contactValue: '', subject: '', message: '' });
      } else {
        alert('Oops! There was a problem sending your message. Please try again.');
      }
    } catch (error) {
      alert('Oops! There was a problem sending your message. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const EducationSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCourses, setExpandedCourses] = useState({});
  const sectionRef = useRef(null);

  const toggleCourse = (courseId) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  // Intersection Observer to trigger animation when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [isVisible]);

  return (
          <section id="education" className="py-12 sm:py-20 relative overflow-hidden" ref={sectionRef}>
        
        {/* Trinity College Background Image - Blurred */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url('/Trin.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(1px) brightness(0.25) saturate(0.2)',
            opacity: 0.98
          }}
        />
        
        {/* Overlay with subtle grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-15"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
        
        {/* Subtle gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-gray-500/40 to-gray-800/60"
        />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">

        <div className="max-w-4xl mx-auto" style={{ perspective: '1000px' }}>
          <div 
            className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-500 ease-out hover:scale-[1.02] hover:rotate-1 hover:shadow-2xl relative transform-gpu"
            style={{
              boxShadow: `
                0 15px 20px -5px rgba(0, 0, 0, 0.1),
                0 8px 8px -5px rgba(0, 0, 0, 0.05),
                inset 0 1px 0 rgba(255, 255, 255, 0.8),
                0 0 15px 3px rgba(59, 130, 246, 0.08),
                0 20px 40px -15px rgba(59, 130, 246, 0.07)
              `,
              transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
              opacity: isVisible ? 1 : 0
            }}
          >
            {/* Trinity Seal Background Element - Top Right */}
            <div 
              className="absolute top-2 right-2 sm:top-6 sm:right-6 opacity-80 transition-all duration-300 cursor-pointer hover:opacity-100 w-16 h-16 sm:w-[140px] sm:h-[140px]"
              style={{
                backgroundImage: `url('/Trinity-seal.svg')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'grayscale(100%) brightness(1.5) contrast(1.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.filter = 'grayscale(0%) brightness(1.2) contrast(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.filter = 'grayscale(100%) brightness(1.5) contrast(1.3)';
              }}
            />
            
            {/* Header Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 sm:p-8 text-white">
              <div className="flex flex-col items-start space-y-6">
                <div className="flex flex-col items-start w-full">
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4">Trinity College</h3>
                  <div className="flex items-center mb-4">
                    <GraduationCap size={32} className="text-blue-400 mr-3" />
                    <p className="text-gray-300 text-sm sm:text-lg lg:text-xl">Bachelor of Science in Computer Science</p>
                  </div>
                  <div className="flex items-center text-gray-400 text-sm sm:text-base">
                    <Calendar size={18} className="mr-3 text-blue-400" />
                    <span>Expected Graduation: May 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coursework Overview */}
            <div className="p-6 sm:p-8">
                              <h4 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <BookOpen className="mr-3 text-blue-600" size={20} />
                  Academic Focus Areas
                </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                      <div className="flex items-center mb-6">
                      <div className="flex-shrink-0">
                        <Code className="text-blue-600 mr-3" size={24} />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800 leading-tight">Core Computer Science</h5>
                    </div>
                  
                  {/* Course Blocks */}
                  <div className="space-y-3">
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('ds-algos')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Data Structures + Algorithms</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['ds-algos'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['ds-algos'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Mastered fundamental algorithms and data structure implementations</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Developed efficient problem-solving strategies and run-time optimization</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('computer-systems')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Computer Systems</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['computer-systems'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['computer-systems'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Understanding of computer architecture and system-level programming</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Memory management and process control concepts</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('python-fundamentals')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-600 transition-colors duration-300">Python Fundamentals</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['python-fundamentals'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['python-fundamentals'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Core Python syntax and object-oriented programming principles</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Data manipulation and basic algorithmic implementations</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                      <div className="flex items-center mb-6">
                      <div className="flex-shrink-0">
                        <Brain className="text-blue-600 mr-3" size={24} />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800 leading-tight">Mathematics & Theory</h5>
                    </div>
                  
                  {/* Course Blocks */}
                  <div className="space-y-3">
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('discrete-math')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Discrete Mathematics</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['discrete-math'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['discrete-math'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Logic, set theory, and mathematical proof techniques</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Combinatorics and probability fundamentals</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('calculus')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Calculus 1 & 2</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['calculus'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['calculus'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Differential and integral calculus concepts</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Applications to real-world problem solving</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('linear-algebra')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">Linear Algebra</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['linear-algebra'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['linear-algebra'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Vector spaces, matrices, and linear transformations</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Eigenvalues and applications in computer science</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                                      <div className="flex items-center mb-6">
                      <div className="flex-shrink-0">
                        <Star className="text-blue-600 mr-3" size={24} />
                      </div>
                      <h5 className="text-lg font-semibold text-gray-800 leading-tight">Specialized Electives</h5>
                    </div>
                  
                  {/* Course Blocks */}
                  <div className="space-y-3">
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('cloud-native')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300">Cloud Native Development</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['cloud-native'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['cloud-native'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Microservices architecture and containerization technologies</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Cloud platform deployment and scaling strategies</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('software-design')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300">Software Design</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['software-design'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['software-design'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Design patterns and software architecture principles</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>User experience and interface design methodologies</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div 
                      className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 cursor-pointer overflow-hidden"
                      onClick={() => toggleCourse('computer-security')}
                    >
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-green-600 transition-colors duration-300">Computer Security</span>
                          <ChevronRight 
                            size={16} 
                            className={`text-gray-400 transition-transform duration-300 ${expandedCourses['computer-security'] ? 'rotate-90' : ''}`}
                          />
                        </div>
                      </div>
                      <div className={`transition-all duration-300 ease-in-out ${expandedCourses['computer-security'] ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 space-y-2 border-t border-gray-100">
                          <div className="flex items-start text-xs text-gray-600 pt-3">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Cryptography and secure communication protocols</span>
                          </div>
                          <div className="flex items-start text-xs text-gray-600">
                            <span className="text-amber-500 mr-2 mt-1 flex-shrink-0">•</span>
                            <span>Vulnerability assessment and security best practices</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Achievements */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h5 className="text-lg sm:text-xl font-semibold text-gray-800 mb-6 flex items-center justify-center">
                  <div className="flex-shrink-0 mr-3">
                    <Award className="text-blue-600" size={24} />
                  </div>
                  <span className="text-center">  Collegiate Achievements</span>
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <div className="flex items-center justify-start">
                    <div className="flex-shrink-0 mr-3">
                      <Trophy className="text-blue-500" size={18} />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">Dean's List Member</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex-shrink-0 mr-3">
                      <Star className="text-blue-500" size={18} />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">4 year CS Club Contributor</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex-shrink-0 mr-3">
                      <Dumbbell className="text-blue-500" size={18} />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">4 year varsity athlete</span>
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="flex-shrink-0 mr-3">
                      <BookOpen className="text-blue-500" size={18} />
                    </div>
                    <span className="text-gray-700 text-sm sm:text-base font-medium">3.5+ Computer Science GPA</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

  const projects = [
    {
      title: 'AI-Powered Movie Selector',
      description: 'Designed a cloud native movie selection platform to minimize the time it takes to select a title for movie night. Make an account or browse as a guest if you would like to check out my work',
      tech: ['Javascript', 'Python', 'SQL', 'HTML/CSS', 'API Integration', 'Credential Managment'],
      link: 'https://flickfinda.onrender.com/'
    },
    {
      title: 'Guided Peak Potential',
      description: 'Developed a professional website for my mom who needed to filter her clients through one place providing an ease of communication to allow for seamless scheduling and ease of purchase for her clients',
      tech: ['React', 'Javascript', 'HTML/CSS'],
      link: 'https://gpppartnersgroup.com/'
    },
    {
      title: 'Queralt Inc.',
      description: 'Was the sole web developer of our companies commercial website, from everything from market research to wireframes to deployment',
      tech: ['UI/UX', 'HTML/CSS', 'Miro'],
      link: 'https://queraltinc.com/'
    },
    {
      title: 'Cloud Native Real Estate Predictor',
      description: 'Designed a real estate prediction service that utilizes Zillow\'s API to predict real estate prices in the 500 most populous cities around the world',
      tech: ['Docker', 'AWS', 'Kubernetes'],
      link: 'https://flickfinda.onrender.com/'
    },
  ];

  const books = [
    {
      title: 'A Man\'s Search For Meaning',
      author: 'Viktor Frankl',
      cover: '/Book-Images/mans_search_fm.jpg',
      rating: 5
    },
    {
      title: 'Outliers',
      author: 'Malcolm Gladwell',
      cover: '/Book-Images/outliers.jpg',
      rating: 4
    },
    {
      title: 'Tuesdays With Morrie',
      author: 'Mitch Albom',
      cover: '/Book-Images/tuesdays_with_morrie.jpg',
      rating: 5
    },
    {
      title: 'Flowers For Algernon',
      author: 'Daniel Keyes',
      cover: '/Book-Images/flowers_for_algernon.jpg',
      rating: 4
    },
    {
      title: 'My Brilliant Friend',
      author: 'Elena Ferrante',
      cover: '/Book-Images/my_brilliant_friend.jpg',
      rating: 4
    },
    {
      title: 'The way of the Hermit',
      author: 'Ken Smith',
      cover: '/Book-Images/the_way_of_the_hermit.jpg',
      rating: 3
    },
    {
      title: 'The Great Alone',
      author: 'Kristin Hannah',
      cover: '/Book-Images/the_great_alone.jpg',
      rating: 4
    },
    {
      title: 'Remarkably Bright Creatures',
      author: 'Shelby Van Pelt',
      cover: '/Book-Images/remarkably_bright.jpg',
      rating: 5
    },
    {
      title: 'Algorithms to live by',
      author: 'Brian Christian and Tom Griffiths',
      cover: '/Book-Images/algorithms_to_live_by.jpg',
      rating: 4
    },
    {
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      cover: '/Book-Images/steve_jobs.jpg',
      rating: 5
    },
    {
      title: 'Scar Tissue',
      author: 'Anthony Kiedis',
      cover: '/Book-Images/scar_tissue.jpg',
      rating: 4
    },
    {
      title: 'Anything You Want',
      author: 'Derek Sivers',
      cover: '/Book-Images/anything_you_want.jpeg',
      rating: 4
    },
  ];



  const handleProjectClick = (projectLink) => {
    window.open(projectLink, '_blank');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };
  
  if (showWebsite) {
      return (
    <div className="text-gray-900 min-h-screen">
      <style jsx>{`
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-gpu {
          transform-style: preserve-3d;
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes spinCoin {
          0% { 
            transform: rotateY(0deg) translateZ(0); 
            filter: brightness(1);
          }
          25% { 
            transform: rotateY(90deg) translateZ(0); 
            filter: brightness(0.85);
          }
          50% { 
            transform: rotateY(180deg) translateZ(0); 
            filter: brightness(0.7);
          }
          75% { 
            transform: rotateY(270deg) translateZ(0);
            filter: brightness(0.85); 
          }
          100% { 
            transform: rotateY(360deg) translateZ(0);
            filter: brightness(1); 
          }
        }
        
        .animate-coin-spin {
          animation: spinCoin 4s linear 1;
          transform-style: preserve-3d;
          perspective: 1000px;
          will-change: transform;
          backface-visibility: visible;
        }
        
        .animate-coin-spin-initial {
          animation-play-state: running;
        }
        
        .animate-coin-spin:hover {
          animation: spinCoin 2s linear infinite;
          animation-play-state: running;
        }
      `}</style>
        {/* Professional Navigation Header */}
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg z-50 border-b border-gray-700">
          <div className="container mx-auto px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden border border-blue-400/30">
                <span className="text-white font-bold text-lg sm:text-xl">DB</span>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Libertinus Serif', serif" }}>Drake Bellisari</h1>
                <p className="text-xs text-blue-300 hidden sm:block">Computer Science @ Trinity College</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex">
              <div className="flex space-x-1">
                <button onClick={() => scrollToSection('about')} className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">About</button>
                <button onClick={() => scrollToSection('experience')} className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">Experience</button>
                <button onClick={() => scrollToSection('education')} className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">Education</button>
                <button onClick={() => scrollToSection('projects')} className="px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">Projects</button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-800 border-t border-gray-700 shadow-lg">
              <nav className="flex flex-col p-3">
                <button onClick={() => scrollToSection('about')} className="text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">About</button>
                <button onClick={() => scrollToSection('experience')} className="text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">Experience</button>
                <button onClick={() => scrollToSection('education')} className="text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">Education</button>
                <button onClick={() => scrollToSection('projects')} className="text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-md transition duration-150">Projects</button>
              </nav>
            </div>
          )}
        </header>

        {/* Professional Hero Section */}
        <section id="about" className="relative min-h-screen w-full overflow-hidden pt-16 sm:pt-20">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                minWidth: '100%',
                minHeight: '100%',
              }}
            >
              <source src="/About-vid.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-gray-900/70 to-black/60"></div>
            
            {/* Subtle overlay accents */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-blue-400/5 rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center px-4 sm:px-6 lg:px-8 py-16">
            <div className="container mx-auto max-w-5xl">
              {/* Unified hero container with layered design */}
              <div className="relative overflow-hidden">
                {/* Main content container */}
                <div className="backdrop-blur-md bg-black/40 rounded-xl border border-white/10 shadow-2xl overflow-hidden">
                  {/* Content area with improved layout */}
                  <div className="p-8 lg:p-12">
                    {/* Combined header section with integrated photo */}
                    <div className="flex flex-col lg:flex-row items-center mb-8 lg:mb-12">
                      {/* Photo integrated with header */}
                      <div className="lg:mr-8 mb-6 lg:mb-0 relative flex-shrink-0">
                        <div className="w-40 h-40 lg:w-44 lg:h-44 rounded-full border-4 border-blue-500/20 overflow-hidden">
                          <img
                            src="/Headshot.png"
                            alt="Drake Bellisari"
                            className="w-full h-full object-cover"
                            style={{ objectPosition: "center 30%" }}
                          />
                        </div>
                      </div>
                      
                      {/* Header text content */}
                      <div className="flex-grow">
                        <div className="space-y-2 text-center lg:text-left">
                          {/* Professional Headline */}
                          <div className="inline-flex items-center justify-center lg:justify-start">
                            <span className="text-blue-400 font-medium tracking-wider uppercase text-sm py-1 px-3 border border-blue-500/30 rounded-full bg-blue-900/20">Software Developer</span>
                          </div>
                          
                          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                            Drake Bellisari
                          </h1>
                          <h2 className="text-lg sm:text-xl font-light text-blue-100">
                            B.S. Computer Science - Trinity College
                          </h2>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content divider */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent my-6"></div>
                    
                    {/* Two-column content layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main content column */}
                      <div className="lg:col-span-2">
                        <div className="text-base leading-relaxed text-gray-200 space-y-4">
                          <p>
                            I'm a computer science major at Trinity College with a passion for creating innovative 
                            technology solutions that make a meaningful impact.
                          </p>
                          <p>
                            I specialize in combining technical precision with creative thinking, developing software 
                            that bridges the gap between functionality and user experience.
                          </p>
                          <p>
                            My expertise spans multiple programming languages and frameworks, allowing me to approach 
                            challenges with versatility and deliver elegant, efficient solutions.
                          </p>
                        </div>
                      </div>
                      
                      {/* Stats/highlights column */}
                      <div className="lg:col-span-1 bg-white/5 rounded-lg border border-white/10 p-4">
                        <h3 className="text-sm font-semibold text-blue-300 mb-3 uppercase tracking-wide">Expertise</h3>
                        <div className="space-y-3">
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full mr-2"></div>
                            <p className="text-sm text-gray-300">Full Stack Development</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full mr-2"></div>
                            <p className="text-sm text-gray-300">Cloud Native Solutions</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full mr-2"></div>
                            <p className="text-sm text-gray-300">UI/UX Design Principles</p>
                          </div>
                          <div className="flex items-start">
                            <div className="w-2 h-2 mt-1.5 bg-blue-500 rounded-full mr-2"></div>
                            <p className="text-sm text-gray-300">Algorithm Development</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Tech stack and CTA section */}
                    <div className="mt-8 flex flex-col space-y-6">
                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 items-center">
                        <h3 className="text-xs font-semibold text-gray-400 mr-2 uppercase tracking-wider bg-white/5 px-2 py-1 rounded">Tech Stack:</h3>
                        {['Java', 'Python', 'React', 'JavaScript', 'C', 'HTML', 'CSS'].map((tech, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-900/20 text-blue-100 text-xs rounded-sm border border-blue-500/20 hover:border-blue-400/40 transition-colors">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Action button without background */}
                      <div className="flex flex-wrap gap-4 justify-center lg:justify-start mt-2">
                        <a 
                          href="https://www.linkedin.com/in/drake-bellisari/" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-md font-medium transition-all duration-300 hover:translate-y-[-2px] shadow-md text-sm flex items-center gap-2 border border-blue-500/50"
                        >
                          <span>Connect on LinkedIn</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7" /></svg>
                        </a>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience - Mobile Optimized */}
        <section id="experience" className="py-12 sm:py-20 relative overflow-hidden">
          {/* Topography Background */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('/topography.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(0.5px) brightness(1) contrast(1.1)',
              opacity: 0.3
            }}
          />
          
          {/* Content overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-gray-100/85 pointer-events-none"></div>
          
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-8 sm:mb-12" style={{ fontFamily: "'Libertinus Serif', serif" }}>
              Work Experience
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Enhanced Timeline Design */}
                <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-1 bg-blue-600 rounded-none shadow-none" style={{ 
                  boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                  background: 'linear-gradient(to bottom, #3b82f6, #2563eb)'
                }}></div>
                
                <div className="space-y-8 sm:space-y-12">
                  <div className="relative flex items-start">
                    {/* Enhanced Timeline Dot */}
                    <div className="absolute left-6 sm:left-8 w-4 h-4 sm:w-5 sm:h-5 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2 shadow-md" style={{ boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(59, 130, 246, 0.4)' }}></div>
                    
                    {/* Enhanced Date on Timeline - Hidden on Mobile */}
                    <div className="hidden sm:block absolute left-8 top-24 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-full whitespace-nowrap shadow-md">
                        Summer 2025
                      </div>
                    </div>
                    
                    <div 
                      className="ml-14 sm:ml-28 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 w-full relative overflow-hidden group"
                      onMouseEnter={(e) => {
                        const logo = e.currentTarget.querySelector('.company-logo');
                        if (logo) {
                          logo.style.filter = 'grayscale(10%)';
                          logo.style.opacity = '0.35';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const logo = e.currentTarget.querySelector('.company-logo');
                        if (logo) {
                          logo.style.filter = 'grayscale(100%)';
                          logo.style.opacity = '0.25';
                        }
                      }}
                    >
                      {/* Queralt Logo - Top Right */}
                      <div 
                        className="absolute top-2 right-4 opacity-50 pointer-events-none transition-all duration-300 company-logo w-[120px] h-[80px] sm:w-[180px] sm:h-[120px]"
                        style={{
                          backgroundImage: `url('/queralt-logo.svg')`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          filter: 'grayscale(100%)'
                        }}
                      />
                      
                      <div className="relative z-10">
                        {/* Mobile Date - Visible on Mobile Only */}
                        <div className="sm:hidden mb-3">
                          <span className="text-xs bg-blue-500 text-white px-3 py-1 rounded-full font-medium">Summer 2025</span>
                        </div>
                        
                        <div className="mb-3">
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Web Development Intern</h3>
                          <p className="text-blue-600 font-medium">Queralt Inc.</p>
                        </div>
                        
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          Led the development and design process of our commercial website into production. Conducted extensive market research on competitors. Produced multiple iterations of wireframes and copy decks to present to our board of investors and CEO.
                           Managed outsourced design talent, and set up communication channels of exterior applications providing secure data store.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">UI/UX</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Web Design</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Production</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Database Management</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    {/* Enhanced Timeline Dot */}
                    <div className="absolute left-6 sm:left-8 w-4 h-4 sm:w-5 sm:h-5 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2 shadow-md" style={{ boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(59, 130, 246, 0.4)' }}></div>
                    
                    {/* Enhanced Date on Timeline - Hidden on Mobile */}
                    <div className="hidden sm:block absolute left-8 top-24 transform -translate-x-1/2">
                      <div className="bg-blue-600 text-white text-sm font-semibold px-3 py-2 rounded-full whitespace-nowrap shadow-md">
                        Summer 2024
                      </div>
                    </div>
                    
                    <div 
                      className="ml-14 sm:ml-28 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 w-full relative overflow-hidden group"
                      onMouseEnter={(e) => {
                        const logo = e.currentTarget.querySelector('.company-logo');
                        if (logo) {
                          logo.style.filter = 'grayscale(0%)';
                          logo.style.opacity = '0.7';
                        }
                      }}
                      onMouseLeave={(e) => {
                        const logo = e.currentTarget.querySelector('.company-logo');
                        if (logo) {
                          logo.style.filter = 'grayscale(100%)';
                          logo.style.opacity = '0.25';
                        }
                      }}
                    >
                      {/* Atlantic Logo - Top Right */}
                      <div 
                        className="absolute top-2 right-4 opacity-50 pointer-events-none transition-all duration-300 company-logo w-[120px] h-[80px] sm:w-[180px] sm:h-[120px]"
                        style={{
                          backgroundImage: `url('/atlantic-logo.svg')`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          filter: 'grayscale(100%)'
                        }}
                      />
                      
                      <div className="relative z-10">
                        {/* Mobile Date - Visible on Mobile Only */}
                        <div className="sm:hidden mb-3">
                          <span className="text-xs bg-purple-500 text-white px-3 py-1 rounded-full font-medium">Summer 2024</span>
                        </div>
                        
                        <div className="mb-3">
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Field Engineering Intern</h3>
                          <p className="text-purple-600 font-medium">Atlantic Security</p>
                        </div>
                                              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          Worked with a talented team of engineers to install complex commercial and residential Fire and security systems. 
                          Developed my networking skills by connecting Cat-6 wires for LAN's inside of companies and homes in Northern Florida.
                          Programmed the connection of various housing zones to provide a seamless connection to all devices in the system. 
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Security Systems</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Smart Home</span>
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">Installation</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <EducationSection />

        {/* Projects Section - Mobile First, Left-Aligned */}
        <section id="projects" className="py-12 sm:py-20 bg-gray-50">
          <div className="px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-left text-gray-800">
              Featured Projects
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => handleProjectClick(project.link)}
                  className="group bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 overflow-hidden"
                >
                  <div className="p-4 sm:p-6">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 mb-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500">
                          <ExternalLink size={16} className="mr-2 text-blue-500" />
                          <span className="truncate">Click to view project</span>
                        </div>
                      </div>
                      <div className="flex-shrink-0 ml-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                          <ExternalLink size={16} className="sm:w-5 sm:h-5 text-blue-600" />
                        </div>
                      </div>
                    </div>

                    {/* Project Description */}
                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
                      {project.description}
                    </p>

                    {/* Technology Stack */}
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm border border-gray-200 group-hover:border-blue-200 transition-colors duration-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hover Effect Bar */}
                  <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ))}
            </div>

            {/* Professional GitHub Call to Action */}
            <div className="mt-8 sm:mt-12 p-6 sm:p-8 bg-gradient-to-r from-gray-900 to-gray-800 rounded-md sm:rounded-lg border border-gray-700 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-center sm:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
                    Discover More Projects
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base">
                    Explore additional projects, code samples, and development work on my GitHub.
                  </p>
                </div>
                <a 
                  href="https://github.com/DrakeBellisarii"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-all duration-300 text-sm sm:text-base whitespace-nowrap border border-blue-500/50 shadow-md hover:translate-y-[-2px]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2.5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Mobile Optimized */}
        <footer className="py-8 sm:py-12 bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <p className="text-gray-400 mb-4 text-sm sm:text-base">I hope you enjoy, please feel free to reach out about anything</p>
            
            {/* Learn More About Me dropdown */}
            <div className="mb-8">
              <InterestsDropdown 
                books={books} 
                photography={photography} 
              />
            </div>
            
            <div className="flex justify-center space-x-6">
              <button 
                onClick={handleEmailClick}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Mail size={20} className="sm:hidden" />
                <Mail size={24} className="hidden sm:block" />
              </button>
            </div>
            <p className="text-gray-500 text-xs sm:text-sm mt-4 sm:mt-6">© 2025 Drake Bellisari. All rights reserved.</p>
          </div>
        </footer>

        {/* Contact Form Modal - Mobile Optimized */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
              
              <div className="p-4 sm:p-6">
             <div className="flex justify-between items-center mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Get In Touch</h2>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl p-1"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Contact Method *
                      </label>
                      <select
                        name="contactMethod"
                        value={formData.contactMethod}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      >
                        <option value="">Choose how to reach you</option>
                        <option value="email">Email</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="phone">Phone</option>
                        <option value="discord">Discord</option>
                        <option value="twitter">Twitter/X</option>
                        <option value="instagram">Instagram</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Details *
                    </label>
                    <input
                      type="text"
                      name="contactValue"
                      value={formData.contactValue}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder={
                        formData.contactMethod === 'email' ? 'your.email@example.com' :
                        formData.contactMethod === 'linkedin' ? 'LinkedIn profile URL or username' :
                        formData.contactMethod === 'phone' ? 'Your phone number' :
                        formData.contactMethod === 'discord' ? 'Discord username' :
                        formData.contactMethod === 'twitter' ? 'Twitter/X handle' :
                        formData.contactMethod === 'instagram' ? 'Instagram handle' :
                        formData.contactMethod === 'other' ? 'How can I reach you?' :
                        'Your contact information'
                      }
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
                      placeholder="Tell me what you'd like to discuss..."
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Loading/Intro Screen - Mobile Optimized
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video - Fixed for Mobile */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
          }}
        >
          <source src="/Golf-bd.MP4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-6xl rounded-xl sm:rounded-2xl" style={{minHeight: '80vh'}}>
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 drop-shadow-lg">Welcome to my portfolio</h1>
            <p className="text-white/90 text-base sm:text-xl lg:text-2xl mb-4 sm:mb-6 drop-shadow">
              Let's get our bearings first...
            </p>
          </div>

          <div className="relative h-full">
            <div className="relative w-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden flex items-center justify-center" style={{height: 'min(60vh, 400px)'}}>
              <video
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg"
                style={{
                  minWidth: '100%',
                  minHeight: '100%',
                }}
              >
                <source src="/port_ent.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
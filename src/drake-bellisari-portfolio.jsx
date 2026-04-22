import React, { useState, useEffect, useRef } from 'react';
import {
  Mail,
  ExternalLink,
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
  Dumbbell
} from 'lucide-react';


/* BOOK CARD COMPONENT - commented out for performance (book images slow load times)
   Restore this + BooksHidden + books data array if you want to re-enable the book grid.

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
        <div className="absolute inset-0 w-full h-full" style={{ backfaceVisibility: 'hidden' }}>
          <div className="aspect-[3/4] relative overflow-hidden rounded-lg h-full">
            <img
              src={book.cover}
              alt={`${book.title} cover`}
              className="w-full h-full object-cover rounded-lg shadow-lg"
              onError={(e) => { e.target.src = '/api/placeholder/200/300'; }}
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-all duration-300 rounded-lg flex items-center justify-center">
              <div className="text-white text-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm font-semibold">Click to flip</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 w-full h-full rounded-lg flex flex-col items-center justify-center text-white shadow-lg overflow-hidden"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/5 overflow-hidden opacity-20">
            <div className="w-full h-full bg-gradient-to-r from-blue-400 to-cyan-400 blur-xl transform -translate-y-1/2"></div>
          </div>
          <div className="relative z-10 w-[90%] h-[85%] flex flex-col justify-between p-5">
            <div className="text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">{book.title}</h3>
            </div>
            <div className="text-center mt-2">
              <p className="text-base sm:text-lg text-blue-100 font-medium">by {book.author}</p>
            </div>
            <div className="flex items-center justify-center space-x-2 my-3">
              {renderStars(book.rating)}
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400/5 rounded-tl-full"></div>
        </div>
      </div>
    </div>
  );
};
*/

/* BOOKS HIDDEN COMPONENT - commented out (book grid disabled for performance)
   Re-enable alongside BookCard and books data array to restore the full book grid + Goodreads button.

const BooksHidden = ({ books }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700/30 hover:text-gray-500/50 transition-colors duration-300 p-1" aria-label="Favorite reads" title="Favorite reads">
        <BookOpen size={14} />
      </button>
      {isOpen && (
        <div className="mt-6 w-full animate-fadeIn">
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
        </div>
      )}
    </div>
  );
};
*/


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

  
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsite(true);
    }, 0);
    
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

  // Hero scroll-driven animation refs
  const heroRef          = useRef(null);
  const heroBadgeRef     = useRef(null);
  const heroNamesRef     = useRef(null);
  const heroSubRef       = useRef(null);
  const heroDividerRef   = useRef(null);
  const heroBioRef       = useRef(null);
  const heroTagsRef      = useRef(null);
  const heroSocialsRef   = useRef(null);
  const heroScrollIndRef = useRef(null);

  useEffect(() => {
    const norm = (p, a, b) => Math.max(0, Math.min(1, (p - a) / (b - a)));
    const lerp = (a, b, t) => a + (b - a) * t;

    const update = () => {
      const section = heroRef.current;
      if (!section) return;
      const totalScroll = section.offsetHeight - window.innerHeight;
      const progress = totalScroll > 0 ? Math.min(Math.max(window.scrollY / totalScroll, 0), 1) : 0;

      // Role badge: 0.00–0.12 — fully bidirectional
      const bP = norm(progress, 0, 0.12);
      if (heroBadgeRef.current) {
        heroBadgeRef.current.style.opacity = bP;
        heroBadgeRef.current.style.transform = `translateY(${lerp(20, 0, bP)}px)`;
      }

      // Letters — toggle .hero-lv per-letter threshold so CSS transition bounces in/out
      if (heroNamesRef.current) {
        heroNamesRef.current.querySelectorAll('.hero-letter-a').forEach((s, i) => {
          const show = progress >= 0.05 + i * 0.022;
          s.classList.toggle('hero-lv', show);
        });
        heroNamesRef.current.querySelectorAll('.hero-letter-b').forEach((s, i) => {
          const show = progress >= 0.13 + i * 0.018;
          s.classList.toggle('hero-lv', show);
        });
      }

      // Subline: 0.28–0.42
      const sP = norm(progress, 0.28, 0.42);
      if (heroSubRef.current) {
        heroSubRef.current.style.opacity = sP;
        heroSubRef.current.style.transform = `translateY(${lerp(16, 0, sP)}px)`;
      }

      // Divider line grows: 0.35–0.55
      const lP = norm(progress, 0.35, 0.55);
      if (heroDividerRef.current) {
        heroDividerRef.current.style.width = `${lP * 100}%`;
      }

      // Bio: 0.52–0.67
      const bioP = norm(progress, 0.52, 0.67);
      if (heroBioRef.current) {
        heroBioRef.current.style.opacity   = bioP;
        heroBioRef.current.style.transform = `translateY(${lerp(20, 0, bioP)}px)`;
      }

      // Tags: 0.60–0.74
      const tagP = norm(progress, 0.60, 0.74);
      if (heroTagsRef.current) {
        heroTagsRef.current.style.opacity   = tagP;
        heroTagsRef.current.style.transform = `translateY(${lerp(16, 0, tagP)}px)`;
      }

      // Socials + nav: 0.70–0.88
      const socP = norm(progress, 0.70, 0.88);
      if (heroSocialsRef.current) {
        heroSocialsRef.current.style.opacity   = socP;
        heroSocialsRef.current.style.transform = `translateY(${lerp(16, 0, socP)}px)`;
      }

      // Scroll indicator: visible at start, gone by 0.06
      if (heroScrollIndRef.current) {
        heroScrollIndRef.current.style.opacity = `${Math.max(0, 1 - progress / 0.06)}`;
      }
    };

    window.addEventListener('scroll', update, { passive: true });
    update(); // set initial state
    return () => window.removeEventListener('scroll', update);
  }, []);

  // Custom cursor tracking
  const cursorDotRef  = useRef(null);
  const cursorRingRef = useRef(null);
  const cursorRafRef  = useRef(null);

  useEffect(() => {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let dx = mx, dy = my, rx = mx, ry = my;
    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      dx += (mx - dx) * 0.4;
      dy += (my - dy) * 0.4;
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      if (cursorDotRef.current)  { cursorDotRef.current.style.left  = `${dx}px`; cursorDotRef.current.style.top  = `${dy}px`; }
      if (cursorRingRef.current) { cursorRingRef.current.style.left = `${rx}px`; cursorRingRef.current.style.top = `${ry}px`; }
      cursorRafRef.current = requestAnimationFrame(tick);
    };
    document.addEventListener('mousemove', onMove);
    cursorRafRef.current = requestAnimationFrame(tick);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(cursorRafRef.current); };
  }, []);

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

    const node = sectionRef.current;
    if (node) {
      observer.observe(node);
    }

    return () => {
      if (node) {
        observer.unobserve(node);
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
      title: 'Marty B Solutions',
      description: 'A professional business website showcasing services and solutions.',
      tech: ['Next.js', 'React', 'Vercel'],
      link: 'https://marty-b-solutions.vercel.app'
    },
    {
      title: 'Mandel Moving',
      description: 'Built and launched a professional marketing website end-to-end for Mandel Moving (NJ), handling everything from design system creation to production deployment. Focused on clean UI, fast load performance, and a conversion-first layout designed to drive service inquiries and establish credibility in a competitive local market.',
      tech: ['Next.js', 'React', 'SEO Optimization'],
      link: 'https://mandel-moving.vercel.app/'
    },
    {
      title: 'Queralt Inc.',
      description: 'Was the sole web developer of our companies commercial website, from everything from market research to wireframes to deployment',
      tech: ['UI/UX', 'HTML/CSS', 'Miro'],
      link: 'https://queraltinc.com/'
    },
  ];

  /* BOOKS DATA - commented out for performance (images slow load times)
     Re-enable alongside BookCard and BooksHidden to restore the book grid.
  const books = [
    { title: "A Man's Search For Meaning", author: 'Viktor Frankl', cover: '/Book-Images/mans_search_fm.jpg', rating: 5 },
    { title: 'Outliers', author: 'Malcolm Gladwell', cover: '/Book-Images/outliers.jpg', rating: 4 },
    { title: 'Tuesdays With Morrie', author: 'Mitch Albom', cover: '/Book-Images/tuesdays_with_morrie.jpg', rating: 5 },
    { title: 'Flowers For Algernon', author: 'Daniel Keyes', cover: '/Book-Images/flowers_for_algernon.jpg', rating: 4 },
    { title: 'My Brilliant Friend', author: 'Elena Ferrante', cover: '/Book-Images/my_brilliant_friend.jpg', rating: 4 },
    { title: 'The way of the Hermit', author: 'Ken Smith', cover: '/Book-Images/the_way_of_the_hermit.jpg', rating: 3 },
    { title: 'The Great Alone', author: 'Kristin Hannah', cover: '/Book-Images/the_great_alone.jpg', rating: 4 },
    { title: 'Remarkably Bright Creatures', author: 'Shelby Van Pelt', cover: '/Book-Images/remarkably_bright.jpg', rating: 5 },
    { title: 'Algorithms to live by', author: 'Brian Christian and Tom Griffiths', cover: '/Book-Images/algorithms_to_live_by.jpg', rating: 4 },
    { title: 'Steve Jobs', author: 'Walter Isaacson', cover: '/Book-Images/steve_jobs.jpg', rating: 5 },
    { title: 'Scar Tissue', author: 'Anthony Kiedis', cover: '/Book-Images/scar_tissue.jpg', rating: 4 },
    { title: 'Anything You Want', author: 'Derek Sivers', cover: '/Book-Images/anything_you_want.jpeg', rating: 4 },
  ];
  */



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
      {/* Custom cursor — desktop only */}
      <div ref={cursorDotRef}  className="cursor-dot"  style={{ left: '-100px', top: '-100px' }} />
      <div ref={cursorRingRef} className="cursor-ring" style={{ left: '-100px', top: '-100px' }} />
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

        /* ── Hero redesign ──────────────────────────────── */
        @keyframes heroSlideUp {
          from { transform: translateY(110%); }
          to   { transform: translateY(0); }
        }
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes heroPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(96,165,250,.5); }
          60%     { box-shadow: 0 0 0 7px rgba(96,165,250,0); }
        }
        @keyframes heroSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes heroKenBurns {
          from { transform: scale(1.07) translate(-1%,0); }
          to   { transform: scale(1)    translate(0,0); }
        }

        .hero-kenburns { animation: heroKenBurns 18s ease-out forwards; }

        .hero-pulse {
          display: inline-block; width: 6px; height: 6px; border-radius: 50%;
          background: #60a5fa; animation: heroPulse 2.4s ease infinite;
        }

        /* Letters: start hidden above; .hero-lv bounces them into place.
           Removing .hero-lv reverses the transition going back up. */
        .hero-letter-a,
        .hero-letter-b {
          opacity: 0;
          transform: translateY(-40px);
          display: inline-block;
          transition: opacity 0.32s ease, transform 0.52s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .hero-letter-a.hero-lv,
        .hero-letter-b.hero-lv {
          opacity: 1;
          transform: translateY(0);
        }

        .h-a1 { animation: heroFadeUp .55s ease .08s both; }
        .h-a2 { animation: heroFadeUp .55s ease .22s both; }
        .h-a3 { animation: heroFadeUp .55s ease .80s both; }
        .h-a4 { animation: heroFadeUp .55s ease .95s both; }
        .h-a5 { animation: heroFadeUp .55s ease 1.08s both; }
        .h-a6 { animation: heroFadeUp .55s ease 1.20s both; }
        .h-photo { animation: heroFadeUp .7s ease .55s both; }

        .hero-line-grow {
          transform-origin: left;
          animation: heroLineGrow 1.4s cubic-bezier(.4,0,.2,1) .92s both;
        }

        .hero-outline { color: transparent; -webkit-text-stroke: 2px rgba(255,255,255,.28); }

        .hero-social {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 7px; font-size: 12.5px; font-weight: 600;
          text-decoration: none; cursor: pointer; white-space: nowrap;
          background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.14);
          color: rgba(255,255,255,.78);
          transition: background .2s, border-color .2s, color .2s, transform .2s;
        }
        .hero-social:hover {
          background: rgba(255,255,255,.13); border-color: rgba(255,255,255,.32);
          color: white; transform: translateY(-2px);
        }

        .hero-nav {
          color: rgba(255,255,255,.45); font-size: 10.5px; font-weight: 700;
          letter-spacing: .12em; text-transform: uppercase;
          background: none; border: none; cursor: pointer; padding: 0;
          position: relative; transition: color .22s;
        }
        .hero-nav::after {
          content: ''; position: absolute; bottom: -3px; left: 0;
          width: 0; height: 1.5px; background: #3b82f6;
          transition: width .25s ease;
        }
        .hero-nav:hover { color: rgba(255,255,255,.9); }
        .hero-nav:hover::after { width: 100%; }

        @media (max-width: 420px) {
          .hero-social-label { display: none; }
          .hero-social { padding: 8px; border-radius: 50%; }
        }

        /* ── Custom cursor ──────────────────────────────── */
        @media (hover: hover) and (pointer: fine) {
          * { cursor: none !important; }
        }
        .cursor-dot {
          position: fixed; pointer-events: none; z-index: 9999;
          width: 7px; height: 7px; border-radius: 50%;
          background: #60a5fa;
          box-shadow: 0 0 14px rgba(96,165,250,.9), 0 0 28px rgba(96,165,250,.3);
          margin: -3.5px 0 0 -3.5px;
          will-change: left, top;
          mix-blend-mode: screen;
        }
        .cursor-ring {
          position: fixed; pointer-events: none; z-index: 9998;
          width: 34px; height: 34px; border-radius: 50%;
          border: 1.5px solid rgba(96,165,250,.4);
          margin: -17px 0 0 -17px;
          will-change: left, top;
        }

        /* ── Marquee ──────────────────────────────── */
        @keyframes heroMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-marquee-inner {
          display: flex; width: max-content;
          animation: heroMarquee 36s linear infinite;
        }

        /* ── Scroll indicator ──────────────────────────────── */
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateY(0); opacity: .55; }
          50%       { transform: translateY(7px); opacity: 1; }
        }
        .hero-scroll-ind { animation: heroScrollBounce 1.9s ease-in-out 1.8s both infinite; }

        /* ── Watermark ──────────────────────────────── */
        .hero-watermark {
          position: absolute; right: -2%; bottom: 3%;
          font-size: clamp(80px, 15vw, 210px); font-weight: 900;
          letter-spacing: -.04em; line-height: 1;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.055);
          pointer-events: none; user-select: none; white-space: nowrap;
        }

        /* ── Vertical label ──────────────────────────────── */
        .hero-vert {
          writing-mode: vertical-rl; text-orientation: mixed;
          font-size: 9px; letter-spacing: .22em; text-transform: uppercase;
          font-weight: 600; color: rgba(255,255,255,.22);
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

        {/* Hero Section — 220vh sticky scroll */}
        <section ref={heroRef} id="about" className="relative w-full" style={{ height: '220vh' }}>

          {/* Sticky 100vh viewport */}
          <div className="sticky top-0 w-full overflow-hidden" style={{ height: '100vh' }}>

            {/* Video background */}
            <div className="absolute inset-0">
              <video autoPlay muted loop playsInline className="hero-kenburns w-full h-full object-cover"
                style={{ position: 'absolute', inset: 0, minWidth: '100%', minHeight: '100%' }}>
                <source src="/About-vid.mp4" type="video/mp4" />
              </video>
              {/* Left-heavy gradient fades rightward so video breathes on the open side */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to right, rgba(0,0,0,.93) 0%, rgba(0,0,0,.85) 36%, rgba(0,0,0,.44) 70%, rgba(0,0,0,.10) 100%)'
              }} />
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(to top, rgba(0,0,0,.62) 0%, transparent 44%)'
              }} />
            </div>

            {/* Decorative watermark */}
            <div className="hero-watermark">DEVELOPER</div>

            {/* CS · 2026 corner label */}
            <div className="absolute z-20 flex justify-end items-center w-full px-6 sm:px-10 lg:px-16"
              style={{ top: 'calc(64px + 20px)' }}>
              <span style={{ color: 'rgba(255,255,255,.18)', fontSize: 11, fontFamily: 'monospace', letterSpacing: '.1em' }}>
                CS · 2026
              </span>
            </div>

            {/* Scroll-driven content */}
            <div className="relative z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16"
              style={{ height: '100%', paddingTop: '80px', paddingBottom: '80px' }}>

              {/* Role badge */}
              <div ref={heroBadgeRef} className="flex items-center gap-3 mb-5"
                style={{ opacity: 0, transform: 'translateY(20px)', willChange: 'opacity, transform' }}>
                <div style={{ width: 32, height: 1.5, background: '#3b82f6', borderRadius: 1 }} />
                <span style={{ color: '#60a5fa', fontSize: 10.5, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase' }}>
                  Software Developer
                </span>
              </div>

              {/* Giant name — letters bounce in on scroll */}
              <div ref={heroNamesRef} className="mb-1">
                <div style={{ lineHeight: .92, paddingBottom: 4 }}>
                  <div style={{ fontSize: 'clamp(52px,10.5vw,138px)', fontWeight: 900, color: 'white', letterSpacing: '-.03em', display: 'flex' }}>
                    {'DRAKE'.split('').map((l, i) => (
                      <span key={i} className="hero-letter-a">{l}</span>
                    ))}
                  </div>
                </div>
                <div style={{ lineHeight: .92, paddingBottom: 6 }}>
                  <div className="hero-outline"
                    style={{ fontSize: 'clamp(52px,10.5vw,138px)', fontWeight: 900, letterSpacing: '-.03em', display: 'flex' }}>
                    {'BELLISARI'.split('').map((l, i) => (
                      <span key={i} className="hero-letter-b">{l}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* B.S. subline */}
              <p ref={heroSubRef}
                style={{ color: 'rgba(255,255,255,.38)', fontSize: 12, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 22, opacity: 0, transform: 'translateY(16px)', willChange: 'opacity, transform' }}>
                B.S. Computer Science — Trinity College
              </p>

              {/* Divider line — grows from left */}
              <div style={{ marginBottom: 22, height: 1, background: 'rgba(255,255,255,.08)', position: 'relative', overflow: 'hidden' }}>
                <div ref={heroDividerRef}
                  style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: 0,
                    background: 'linear-gradient(to right, #3b82f6 0%, rgba(147,197,253,.45) 55%, transparent 100%)' }} />
              </div>

              {/* Bio */}
              <p ref={heroBioRef}
                style={{ color: 'rgba(255,255,255,.58)', fontSize: 'clamp(13px,1.1vw,15px)',
                  lineHeight: 1.75, maxWidth: 480, marginBottom: 18,
                  opacity: 0, transform: 'translateY(20px)', willChange: 'opacity, transform' }}>
                CS major at Trinity College crafting innovative technology solutions.
                I combine technical precision with creative thinking to build software
                that bridges functionality and user experience.
              </p>

              {/* Tech stack tags */}
              <div ref={heroTagsRef} className="flex flex-wrap gap-2"
                style={{ marginBottom: 28, opacity: 0, transform: 'translateY(16px)', willChange: 'opacity, transform' }}>
                {['Full Stack', 'Cloud Native', 'UI/UX', 'DevOps'].map(x => (
                  <span key={x} style={{
                    padding: '3px 10px', borderRadius: 3, fontSize: 10.5, fontWeight: 600,
                    background: 'rgba(255,255,255,.06)', color: 'rgba(255,255,255,.55)',
                    border: '1px solid rgba(255,255,255,.11)', letterSpacing: '.05em',
                  }}>{x}</span>
                ))}
                <span style={{ color: 'rgba(255,255,255,.2)', margin: '0 4px', alignSelf: 'center', fontSize: 10 }}>·</span>
                {['Java', 'Python', 'React', 'JS', 'C', 'HTML', 'CSS'].map(t => (
                  <span key={t} style={{
                    padding: '3px 9px', borderRadius: 3, fontSize: 10.5, fontWeight: 600,
                    background: 'rgba(59,130,246,.1)', color: '#93c5fd',
                    border: '1px solid rgba(59,130,246,.25)', letterSpacing: '.04em',
                  }}>{t}</span>
                ))}
              </div>

              {/* Socials + section nav */}
              <div ref={heroSocialsRef} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6"
                style={{ opacity: 0, transform: 'translateY(16px)', willChange: 'opacity, transform' }}>
                <div className="flex flex-wrap gap-2.5">
                  <a href="https://www.linkedin.com/in/drake-bellisari/" target="_blank" rel="noopener noreferrer"
                    className="hero-social" style={{ background: '#0a66c2', borderColor: 'transparent', color: 'white' }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                    <span className="hero-social-label">LinkedIn</span>
                  </a>
                  <a href="https://github.com/DrakeBellisarii" target="_blank" rel="noopener noreferrer" className="hero-social">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                    <span className="hero-social-label">GitHub</span>
                  </a>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="hero-social">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                      <polyline points="14 2 14 8 20 8"/>
                      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
                    </svg>
                    <span className="hero-social-label">Resume</span>
                  </a>
                  <button onClick={handleEmailClick} className="hero-social">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <span className="hero-social-label">Contact</span>
                  </button>
                </div>
                <div className="hidden sm:block" style={{ width: 1, height: 28, background: 'rgba(255,255,255,.14)' }} />
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {[
                    { id: 'experience', label: 'Work Experience' },
                    { id: 'education',  label: 'Education' },
                    { id: 'projects',   label: 'Projects' },
                  ].map(s => (
                    <button key={s.id} className="hero-nav" onClick={() => scrollToSection(s.id)}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Scroll indicator */}
            <div ref={heroScrollIndRef}
              className="absolute z-20 flex flex-col items-center gap-2"
              style={{ bottom: 72, left: '50%', transform: 'translateX(-50%)' }}>
              <span style={{ color: 'rgba(255,255,255,.3)', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase' }}>Scroll</span>
              <svg width="14" height="20" viewBox="0 0 14 20" fill="none" stroke="rgba(255,255,255,.38)" strokeWidth="1.5" className="hero-scroll-ind">
                <path d="M7 2v14M1 9l6 7 6-7"/>
              </svg>
            </div>

            {/* Scrolling marquee strip */}
            <div className="absolute bottom-0 left-0 right-0 z-20 py-3 overflow-hidden"
              style={{ borderTop: '1px solid rgba(255,255,255,.06)', background: 'rgba(0,0,0,.28)' }}>
              <div className="hero-marquee-inner">
                {[...Array(2)].map((_, ri) => (
                  <div key={ri} className="flex items-center">
                    {['Software Engineering', 'Full Stack Development', 'Cloud Infrastructure', 'UI/UX Design', 'Java', 'Python', 'React', 'DevOps', 'Trinity College', 'Hartford CT'].map((item, i) => (
                      <React.Fragment key={i}>
                        <span style={{ padding: '0 28px', color: 'rgba(255,255,255,.25)', fontSize: 10.5, fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{item}</span>
                        <span style={{ color: 'rgba(255,255,255,.1)', fontSize: 7, flexShrink: 0 }}>✶</span>
                      </React.Fragment>
                    ))}
                  </div>
                ))}
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
                    
                    <div
                      className="ml-14 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 w-full relative overflow-hidden group"
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
                      {/* Queralt Logo - Better positioned */}
                      <div 
                        className="absolute top-0 right-4 -translate-y-[10%] opacity-50 pointer-events-none transition-all duration-300 company-logo w-[120px] h-[80px] sm:w-[180px] sm:h-[120px]"
                        style={{
                          backgroundImage: `url('/queralt-logo.svg')`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          filter: 'grayscale(100%)',
                          zIndex: 5
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="mb-3">
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Software Engineer</h3>
                          <p className="text-blue-600 font-medium">Queralt Inc.</p>
                          <p className="text-xs text-gray-500 mt-0.5">Jan 2026 - Present &middot; 4 mos</p>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          Built and maintained a secure, password protected, responsive investor portal using Next.js, React, and Node.js, with an emphasis on performance, modular architecture, and cross device reliability. Implemented protected navigation flows, reusable component systems, analytics, and domain level configuration to support deployment and ongoing iteration.  
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Next.js</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">React.js</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Node.js</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Hosting</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4 mb-3">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Web Development Intern</h3>
                          <p className="text-sm text-blue-600 font-medium">Queralt Inc.</p>
                          <p className="text-xs text-gray-500 mt-0.5">Summer 2025</p>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          Led the development and design process of our commercial website into production. Conducted extensive market research on competitors. Produced multiple iterations of wireframes and copy decks to present to our board of investors and CEO. Managed outsourced design talent, and set up communication channels of exterior applications providing secure data store.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">HTML</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">CSS</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">UI/UX</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    {/* Enhanced Timeline Dot */}
                    <div className="absolute left-6 sm:left-8 w-4 h-4 sm:w-5 sm:h-5 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2 shadow-md" style={{ boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(59, 130, 246, 0.4)' }}></div>
                    
                    
                    <div 
                      className="ml-14 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 w-full relative overflow-hidden group"
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
                      {/* Atlantic Logo - Better positioned */}
                      <div 
                        className="absolute top-0 right-4 -translate-y-[10%] opacity-50 pointer-events-none transition-all duration-300 company-logo w-[120px] h-[80px] sm:w-[180px] sm:h-[120px]"
                        style={{
                          backgroundImage: `url('/atlantic-logo.svg')`,
                          backgroundSize: 'contain',
                          backgroundPosition: 'center',
                          backgroundRepeat: 'no-repeat',
                          filter: 'grayscale(100%)',
                          zIndex: 5
                        }}
                      />
                      
                      <div className="relative z-10">
                        <div className="mb-3">
                          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800">Software Engineer</h3>
                          <p className="text-blue-600 font-medium">Atlantic Security</p>
                          <p className="text-xs text-gray-500 mt-0.5">Seasonal &middot; Dec 2025 - Jan 2026 &middot; 2 mos &middot; On-site</p>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          Designed and implemented a backend webhook service in Python using FastAPI to receive approved bid events, validate requests, normalize third-party data, and persist structured payloads for automation. Integrated the backend service with simPRO to support automated quote creation and cost-center mapping, using Zapier as an event trigger.
                        </p>

                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">API Development</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Python</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">FastAPI</span>
                        </div>

                        <div className="border-t border-gray-100 pt-4 mt-4 mb-3">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Field Engineering Intern</h3>
                          <p className="text-sm text-blue-600 font-medium">Atlantic Security</p>
                          <p className="text-xs text-gray-500 mt-0.5">Summer 2024</p>
                        </div>

                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                          Worked with a talented team of engineers to install complex commercial and residential Fire and security systems.
                          Developed my networking skills by connecting Cat-6 wires for LAN's inside of companies and homes in Northern Florida.
                          Programmed the connection of various housing zones to provide a seamless connection to all devices in the system.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Security Systems</span>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Smart Home</span>
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
          <div className="container mx-auto px-4 sm:px-6">
            {/* Featured Contact Section */}
            <div className="max-w-4xl mx-auto mb-10 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 sm:p-8 border border-blue-900/50 shadow-xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="flex-shrink-0 bg-blue-600/20 p-4 rounded-full">
                  <Mail size={32} className="text-blue-400" />
                </div>
                <div className="flex-grow text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Let's Connect</h3>
                  <p className="text-gray-300 mb-6">Have a question or want to work together? I'm always open to new opportunities and collaborations.</p>
                  <button 
                    onClick={handleEmailClick}
                    className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-all duration-300 shadow-lg hover:translate-y-[-2px] text-sm sm:text-base"
                  >
                    <Mail size={18} className="mr-2" />
                    <span>Contact Me</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Goodreads link */}
            <div className="mb-8 flex justify-center">
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
            
            <p className="text-gray-500 text-xs sm:text-sm mt-8 text-center">© 2025 Drake Bellisari.</p>
          </div>
        </footer>

        {/* Enhanced Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl sm:rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto shadow-2xl border border-blue-200">
              {/* Blue accent bar */}
              <div className="h-1.5 bg-gradient-to-r from-blue-500 to-blue-700 w-full"></div>
              
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6 sm:mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                      <Mail size={24} className="text-blue-600 mr-3" />
                      Get In Touch
                    </h2>
                    <p className="text-gray-600 mt-2">I'd love to hear from you!</p>
                  </div>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl p-1 hover:bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
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
                  
                  <div className="flex gap-3 pt-6">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md font-semibold transition-all duration-300 text-sm sm:text-base shadow-lg hover:shadow-xl flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
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

 
}
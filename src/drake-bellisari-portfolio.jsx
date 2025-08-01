
import React, { useState, useEffect, useRef } from 'react';
import { Analytics } from "@vercel/analytics/react"
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
  Star
} from 'lucide-react';

export default function Portfolio() {
  const [showWebsite, setShowWebsite] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contactMethod: '',
    contactValue: '',
    subject: '',
    message: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  
  // Auto-transition to website after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsite(true);
    }, 5500);
    
    return () => clearTimeout(timer);
  }, []);

  // Handle video speed
  const handleVideoLoad = (e) => {
    e.target.playbackRate = 0.75;
  };

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
  const [selectedCategory, setSelectedCategory] = useState('core');
  const [animatedGPA, setAnimatedGPA] = useState(0);
  const [visibleCourses, setVisibleCourses] = useState([]);
  const [isVisible, setIsVisible] = useState(false);  
  const sectionRef = useRef(null);                     

  const actualGPA = 3.45;
  const maxGPA = 4.0;

  const courseCategories = {
    core: {
      title: 'Core Computer Science',
      icon: Code,
      color: 'blue',
      courses: [
        { name: 'Data Structures & Algorithms', grade: 'A-', credits: 4, difficulty: 'High' },
        { name: 'Object-Oriented Programming', grade: 'A', credits: 4, difficulty: 'Medium' },
        { name: 'Computer Systems Organization', grade: 'B+', credits: 4, difficulty: 'High' },
        { name: 'Database Systems', grade: 'A-', credits: 3, difficulty: 'Medium' },
        { name: 'Software Engineering', grade: 'A', credits: 4, difficulty: 'Medium' },
        { name: 'Programming Languages', grade: 'B+', credits: 3, difficulty: 'High' }
      ]
    },
    math: {
      title: 'Mathematics & Theory',
      icon: Brain,
      color: 'purple',
      courses: [
        { name: 'Discrete Mathematics', grade: 'A-', credits: 4, difficulty: 'High' },
        { name: 'Calculus I & II', grade: 'B+', credits: 8, difficulty: 'Medium' },
        { name: 'Linear Algebra', grade: 'A', credits: 3, difficulty: 'Medium' },
        { name: 'Statistics & Probability', grade: 'A-', credits: 3, difficulty: 'Medium' },
        { name: 'Algorithm Analysis', grade: 'B+', credits: 3, difficulty: 'High' }
      ]
    },
    electives: {
      title: 'Specialized Electives',
      icon: Star,
      color: 'orange',
      courses: [
        { name: 'Machine Learning', grade: 'A', credits: 4, difficulty: 'High' },
        { name: 'Web Development', grade: 'A', credits: 3, difficulty: 'Medium' },
        { name: 'Mobile App Development', grade: 'A-', credits: 3, difficulty: 'Medium' },
        { name: 'Artificial Intelligence', grade: 'B+', credits: 4, difficulty: 'High' },
        { name: 'Human-Computer Interaction', grade: 'A', credits: 3, difficulty: 'Low' }
      ]
    }
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
        threshold: 0.3, // Trigger when 30% of the section is visible
        rootMargin: '0px 0px -100px 0px' // Start animation slightly before fully in view
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

  // Animate GPA when section becomes visible
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          setAnimatedGPA(prev => {
            if (prev >= actualGPA) {
              clearInterval(interval);
              return actualGPA;
            }
            return prev + 0.05;
          });
        }, 30);
      }, 300); // Small delay for better effect

      return () => clearTimeout(timer);
    }
  }, [isVisible, actualGPA]);

  // Animate course visibility when category changes or section becomes visible
  useEffect(() => {
    if (isVisible) {
      const courses = courseCategories[selectedCategory].courses;
      setVisibleCourses([]);
      
      courses.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCourses(prev => [...prev, index]);
        }, index * 150);
      });
    }
  }, [selectedCategory, isVisible]);


  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimatedGPA(prev => {
          if (prev >= actualGPA) {
            clearInterval(interval);
            return actualGPA;
          }
          return prev + 0.05;
        });
      }, 30);
    }, 500);

    return () => clearTimeout(timer);
  }, [actualGPA]);

  useEffect(() => {
    const courses = courseCategories[selectedCategory].courses;
    setVisibleCourses([]);
    
    courses.forEach((_, index) => {
      setTimeout(() => {
        setVisibleCourses(prev => [...prev, index]);
      }, index * 150);
    });
  }, [selectedCategory]);

  const getGradeColor = (grade) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryButtonClass = (category) => {
    const baseClass = "flex items-center px-3 py-3 rounded-lg transition-all duration-300 hover:scale-105";
    const colors = {
      blue: selectedCategory === category ? 'bg-blue-500 text-white shadow-lg' : 'bg-blue-100 text-blue-700 hover:bg-blue-200',
      purple: selectedCategory === category ? 'bg-purple-500 text-white shadow-lg' : 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      orange: selectedCategory === category ? 'bg-orange-500 text-white shadow-lg' : 'bg-orange-100 text-orange-700 hover:bg-orange-200'
    };
    
    return `${baseClass} ${colors[courseCategories[category].color]}`;
  };

  return (
    <section id="education" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Education
          </h2>
          <p className="text-xl text-gray-600">Building a strong foundation in computer science</p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="flex items-center mb-6 lg:mb-0">
                  <GraduationCap size={48} className="mr-4" />
                  <div>
                    <h3 className="text-3xl font-bold">Trinity College</h3>
                    <p className="text-blue-100 text-lg">Bachelor of Science in Computer Science</p>
                    <div className="flex items-center mt-2 text-blue-200">
                      <Calendar size={16} className="mr-2" />
                      <span>Expected Graduation: May 2026</span>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="mb-4">
                    <span className="text-5xl font-bold">{animatedGPA.toFixed(2)}</span>
                    <span className="text-2xl text-blue-200">/{maxGPA}</span>
                  </div>
                  
                  <div className="w-64 bg-white/20 rounded-full h-4 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-400 to-green-400 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(animatedGPA / maxGPA) * 100}%` }}
                    />
                  </div>
                  <p className="text-blue-200 text-sm mt-2">Major GPA</p>
                </div>
              </div>
            </div>

            <div className="p-8">
              <h4 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <BookOpen className="mr-3 text-blue-600" />
                Coursework by Category
              </h4>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
                {Object.entries(courseCategories).map(([key, category]) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedCategory(key)}
                      className={getCategoryButtonClass(key)}
                    >
                      <Icon size={20} className="mr-2" />
                      <span className="font-medium text-sm">{category.title}</span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h5 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  {React.createElement(courseCategories[selectedCategory].icon, { 
                    size: 24, 
                    className: `mr-3 text-${courseCategories[selectedCategory].color}-600` 
                  })}
                  {courseCategories[selectedCategory].title}
                </h5>

                <div className="grid gap-3">
                  {courseCategories[selectedCategory].courses.map((course, index) => (
                    <div
                      key={course.name}
                      className={`bg-white rounded-xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300 transform ${
                        visibleCourses.includes(index) 
                          ? 'translate-x-0 opacity-100' 
                          : 'translate-x-8'
                      }`}
                      style={{ 
                        transitionDelay: visibleCourses.includes(index) ? '0ms' : `${index * 150}ms` 
                      }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="flex-1 mb-3 sm:mb-0">
                          <h6 className="font-semibold text-gray-800 text-lg">{course.name}</h6>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-sm text-gray-600">
                              {course.credits} Credits
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                              {course.difficulty} Difficulty
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center">
                          <span className={`px-3 py-1 rounded-full font-bold text-sm ${getGradeColor(course.grade)}`}>
                            {course.grade}
                          </span>
                          <ChevronRight size={16} className="ml-2 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                <h5 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                  <Award className="mr-3 text-yellow-600" />
                  Academic Achievements
                </h5>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <Trophy className="text-yellow-600 mr-3" size={20} />
                    <span className="text-gray-700">Member of the Dean's List</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="text-yellow-600 mr-3" size={20} />
                    <span className="text-gray-700">CS Department Honor Roll</span>
                  </div>
                  <div className="flex items-center">
                    <Award className="text-yellow-600 mr-3" size={20} />
                    <span className="text-gray-700">Academic Excellence Scholarship</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="text-yellow-600 mr-3" size={20} />
                    <span className="text-gray-700">Phi Beta Kappa Eligible</span>
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
      image: '/api/placeholder/400/250',
      link: 'https://flickfinda.onrender.com/'
    },
    {
      title: 'Guided peak potential',
      description: 'Developed a professional website for my mom who needed to filter her clients through one place providing an ease of communication to allow for seamless scheduling integrated directly with her calendar',
      tech: ['React', 'Javascript', 'HTML/CSS'],
      image: '/api/placeholder/400/250',
      link: 'https://cpp-website-six.vercel.app/'
    },
    {
      title: 'Queralt Inc.',
      description: 'Was the sole web developer of our companies commercial website, from everything from market research to wireframes to deployment',
      tech: ['UI/UX', 'HTML/CSS', 'Miro'],
      image: '/api/placeholder/400/250',
      link: 'https://bobcat-buffalo-f8tf.squarespace.com/'
    },
    {
      title: 'Cloud native realesate predictor',
      description: 'Designed a realestate prediction service that utilizes Zillows Api to predict realestate prices in the 500 most populous cities around the world',
      tech: ['Docker', 'AWS', 'Kubernetes'],
      image: '/api/placeholder/400/250',
      link: 'https://flickfinda.onrender.com/'
    },
  ];

  const books = [
    {
      title: 'A Man\'s Search For Meaning',
      author: 'Viktor Frankl',
      cover: '/Book-Images/mans_search_fm.jpg'
    },
    {
      title: 'Outliers',
      author: 'Malcolm Gladwell',
      cover: '/Book-Images/outliers.jpg'
    },
    {
      title: 'Tuesdays With Morrie',
      author: 'Mitch Albom',
      cover: '/Book-Images/tuesdays_with_morrie.jpg'
    },
    {
      title: 'Flowers For Algernon',
      author: 'Daniel Keyes',
      cover: '/Book-Images/flowers_for_algernon.jpg'
    },
    {
      title: 'My Brilliant Friend',
      author: 'Elena Ferrante',
      cover: '/Book-Images/my_brilliant_friend.jpg'
    },
    {
      title: 'The way of the Hermit',
      author: 'Ken Smith',
      cover: '/Book-Images/the_way_of_the_hermit.jpg'
    },
    {
      title: 'The Great Alone',
      author: 'Kristin Hannah',
      cover: '/Book-Images/the_great_alone.jpg'
    },
    {
      title: 'Remarkably Bright Creatures',
      author: 'Shelby Van Pelt',
      cover: '/Book-Images/remarkably_bright.jpg'
    },
    {
      title: 'Algorithms to live by',
      author: 'Brian Christian and Tom Griffiths',
      cover: '/Book-Images/algorithms_to_live_by.jpg'
    },
    {
      title: 'Steve Jobs',
      author: 'Walter Isaacson',
      cover: '/Book-Images/steve_jobs.jpg'
    },
    {
      title: 'Scar Tissue',
      author: 'Anthony Kiedis',
      cover: '/Book-Images/scar_tissue.jpg'
    },
    {
      title: 'Anything You Want',
      author: 'Derek Sivers',
      cover: '/Book-Images/anything_you_want.jpeg'
    },
  ];

  const photography = [
    { image: '/sailboat.JPG' },
    { image: '/bridge.jpeg' },
    { image: '/car.JPG' },
    { image: '/country.jpeg' },
    { image: '/flag.JPG' },
    { image: '/rome.jpeg' }
  ];

  const handleProjectClick = (projectLink) => {
    window.open(projectLink, '_blank');
  };
  
  if (showWebsite) {
    return (
      <>
      <div className="text-gray-900 min-h-screen">
        {/* Navigation Header */}
        <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 animate-fade-in">
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600">Drake Bellisari</h1>
            <nav className="space-x-6 text-sm font-medium">
              <button onClick={() => document.getElementById('about')?.scrollIntoView()} className="text-gray-700 hover:text-blue-500">About</button>
              <button onClick={() => document.getElementById('experience')?.scrollIntoView()} className="text-gray-700 hover:text-blue-500">Experience</button>
              <button onClick={() => document.getElementById('education')?.scrollIntoView()} className="text-gray-700 hover:text-blue-500">Education</button>
              <button onClick={() => document.getElementById('certifications')?.scrollIntoView()} className="text-gray-700 hover:text-blue-500">Certifications</button>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView()} className="text-gray-700 hover:text-blue-500">Projects</button>
            </nav>
          </div>
        </header>

        <section id="about" className="relative h-screen w-full overflow-hidden pt-20">
          <video
            autoPlay
            muted
            loop
            style={{
              width: '100%',
              height: '100vh',
              objectFit: 'cover',
              position: 'fixed',
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          >
            <source src="/About-vid.mp4" type="video/mp4" />
          </video>

          <style jsx>{`
            @keyframes slideInFade {
              0% {
                opacity: 0;
                transform: translateY(30px);
              }
              100% {
                opacity: 1;
                transform: translateY(0px);
              }
            }
            
            .animate-slide-in {
              animation: slideInFade 1.2s ease-out forwards;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-fade-in {
              animation: fadeIn 1s ease-out;
            }
          `}</style>

          <div className="relative z-10 h-full flex items-center justify-center px-6 lg:px-16">
            <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 lg:p-10 max-w-4xl w-full shadow-2xl animate-slide-in">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                <div className="flex-shrink-0">
                  <div className="w-38 h-48 lg:w-38 lg:h-56 rounded-xl overflow-hidden border-2 border-white/30 shadow-xl">
                    <img
                      src="/Headshot.png"
                      alt="Drake Bellisari"
                      className="w-full h-full object-contain grayscale hover:grayscale-0 transition duration-700"
                    />
                  </div>
                </div>

                <div className="flex-1 text-white text-center lg:text-left">
                  <h1 className="text-3xl lg:text-4xl font-bold mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Drake Bellisari
                  </h1>
                  <h2 className="text-lg lg:text-xl font-light mb-5 text-blue-100">
                    B.S. Computer Science - Trinity College 
                  </h2>
                  <p className="text-sm lg:text-base leading-relaxed text-white/90 mb-4">
                    I'm a 21-year-old computer science major at Trinity College in Hartford, Connecticut. 
                    I am deeply passionate about evolving technology and eager to gain hands-on experience 
                    wherever I can make an impact. All of the images/videos are property of myself if you would like to purchase any please let me know.
                  </p>
                  <p className="text-sm lg:text-base leading-relaxed text-white/90 mb-4">
                    I value the importance of maintaining the intersection of art and technology through software development and I try to reflect this importance in all of my projects and would appreciate any feedback you want to provide.
                  </p>
                  <p className="text-sm lg:text-base leading-relaxed text-white/90 mb-6">
                    With experience in Java, Python, Kotlin, React, Assembly, JavaScript, and C, 
                    I enjoy blending logic and creativity in my work.
                  </p>
                  
                  <button 
                    onClick={() => window.open('https://www.linkedin.com/in/drake-bellisari/', '_blank')}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    Let's Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience */}
        <section id="experience" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
              Work Experience
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
                
                <div className="space-y-12">
                  <div className="relative flex items-start">
                    <div className="absolute left-8 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
                    
                    <div className="ml-20 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800">Web Development Intern</h3>
                          <p className="text-blue-600 font-medium">Queralt Inc.</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Summer 2025</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Led the development and design process of our commercial website into production. Conducted extensive market research on competitors. Produced multiple iterations of wireframes and copy decks to present to our board of investors and CEO.
                         Manged outsourced design talent, and set up communication channels of exterior applications providing secure data store.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">UI/UX</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Web Design</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Production</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Database Managment</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="absolute left-8 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
                    
                    <div className="ml-20 bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-2xl font-semibold text-gray-800">Field Engineering Intern</h3>
                          <p className="text-purple-600 font-medium">Atlantic Security</p>
                        </div>
                        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Summer 2024</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        Worked with a talented team of engineers to install complex commercial and residential Fire and security systems. 
                        Developed my networking skills by connecting Cat-6 wires for LAN's inside of companies and homes in Northern Florida.
                        Programmed the connection of various housing zones to provide a seamless connection to all devices in the system. 
                      </p>
                      <div className="mt-4 flex gap-2">
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
        </section>

        {/* Education Section */}
        <EducationSection />

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Featured Projects
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => handleProjectClick(project.link)}
                  className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="relative overflow-hidden">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <Code size={64} className="text-blue-400 opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <ExternalLink size={32} className="text-white" />
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-3 text-blue-400">{project.title}</h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Section
        <section id="research" className="py-20 bg-gray-800/30">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Research & Innovation
            </h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
                <div className="flex items-center mb-8">
                  <Search className="text-purple-400 mr-4" size={32} />
                  <h3 className="text-3xl font-bold">Current Research Focus</h3>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-purple-400 mb-4">AI & Machine Learning</h4>
                    <p className="text-gray-300 leading-relaxed mb-6">
                      Investigating novel approaches to neural network optimization and their applications
                      in real-world problem solving. Focus on efficiency and interpretability.
                    </p>

                    <h4 className="text-xl font-semibold text-purple-400 mb-4">Web3 & Blockchain</h4>
                    <p className="text-gray-300 leading-relaxed">
                      Exploring decentralized applications and smart contract optimization for enhanced
                      security and scalability in distributed systems.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-purple-400 mb-4">Publications</h4>
                    <ul className="space-y-3 text-gray-300">
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>"Optimizing Neural Networks for Edge Computing" - AI Conference 2024</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>"Blockchain Security Patterns" - Journal of Distributed Systems 2023</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        <span>"Modern Web Architecture Principles" - Tech Review 2023</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Interests Section */}
        <section id="interests" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-pink-400 to-orange-500 bg-clip-text text-transparent">
              Interests & Hobbies
            </h2>

            {/* Books */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <BookOpen className="text-pink-400 mr-4" size={32} />
                <h3 className="text-3xl font-bold">Favorite Books</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {books.map((book, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-lg overflow-hidden border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="aspect-[3/4] relative overflow-hidden">
                      <img
                        src={book.cover}
                        alt={`${book.title} cover`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = '/api/placeholder/200/300';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2">{book.title}</h4>
                      {book.author && (
                        <p className="text-gray-400 text-xs">{book.author}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photography */}
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8">
                <Camera className="text-blue-400 mr-4" size={32} />
                <h3 className="text-3xl font-bold">Photography</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {photography.map((photo, index) => (
                  <div key={index} className="relative group overflow-hidden rounded-xl">
                    <img
                      src={photo.image}
                      alt={`Photography ${index + 1}`}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 items-center justify-center hidden">
                      <Camera size={48} className="text-blue-400 opacity-50" />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-400 mb-4">I hope you enjoy, please feel free to reach out about anything</p>
            <div className="flex justify-center space-x-6">
              <button 
                onClick={handleEmailClick}
                className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                <Mail size={24} />
              </button>
            </div>
            <p className="text-gray-500 text-sm mt-6">© 2025 Drake Bellisari. All rights reserved.</p>
          </div>
        </footer>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="bg-yellow-50 border-b border-yellow-200 p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 text-yellow-500 text-xl">⚠️</div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-yellow-800 mb-2">
                      Why I use a contact form instead of displaying my email
                    </h3>
                    <p className="text-sm text-yellow-700 leading-relaxed">
                      Publicly displaying email addresses makes them vulnerable to spam bots and automated harvesting. 
                      This contact form protects my inbox while keeping communication open. You can also connect with me on 
                      <strong> LinkedIn</strong> or through my project platforms!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Get In Touch</h2>
                  <button 
                    onClick={() => setShowContactForm(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell me what you'd like to discuss..."
                    />
                  </div>
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
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
      <Analytics />
      </>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/Golf-bd.MP4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />

      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-2xl bg-white/10 border shadow-2xl p-8 w-9/10 h-9/10" style={{width: '90%', height: '90vh'}}>
          <div className="text-center mb-6">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">Welcome to my portfolio</h1>
            <p className="text-gray-600 text-2xl mb-6">
              Lets get our bearings first...
            </p>
          </div>

          <div className="relative h-full">
            <div className="relative w-full h-4/5 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden flex items-center justify-center">
              <video
                autoPlay
                muted
                playsInline
                onLoadedData={handleVideoLoad}
                className="w-full h-full object-cover rounded-lg"
              >
                <source src="/port_entrance.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
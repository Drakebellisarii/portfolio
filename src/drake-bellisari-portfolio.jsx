import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Camera,
  BookOpen, 
  Code, 
  Search
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
  
  // Auto-transition to website after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWebsite(true);
    }, 5500); // Increased to 8 seconds since video will be slower
    
    return () => clearTimeout(timer);
  }, []);

  // Handle video speed
  const handleVideoLoad = (e) => {
    e.target.playbackRate = 0.75; // Play at 75% speed (slower)
  };

  // Handle email click
  const handleEmailClick = () => {
    setShowContactForm(true);
  };
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    // Only validate @ sign if user chose email as contact method
    if (formData.contactMethod === 'email' && !formData.contactValue.includes('@')) {
      alert('Please enter a valid email address with an @ sign.');
      return;
    }
    
    try {
      // Create FormData object for Formspree
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('contactMethod', formData.contactMethod);
      formDataToSend.append('contactValue', formData.contactValue);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      
      // Send to Formspree
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

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
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
      title: 'Central Point Partners',
      description: 'Developed a professional website for my mom who needed to filter her clients through one place providing an ease of communication to allow for seamless scheduling integrated directly with her calendar',
      tech: ['Python', 'TensorFlow', 'Matplotlib'],
      image: '/api/placeholder/400/250',
      link: 'https://flickfinda.onrender.com/'
    },
    {
      title: 'Garden Reading tracker',
      description: 'Created an application where garden lovers can track their reading progress through an interactive garden',
      tech: ['React', 'Javascript', 'Web3'],
      image: '/api/placeholder/400/250',
      link: 'https://flickfinda.onrender.com/'
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
      title: 'A Mans Search For Meaning',
      author: 'Robert Martin',
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
      title: 'Algorithims to live by',
      author: 'Brian Christian and Tom Griffiths',
      cover: '/Book-Images/algorithms_to_live_by.jpg'
    },
    {
      title: 'Steve Jobs',
      author: 'Walter Issacson',
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

  // Function to handle project clicks
  const handleProjectClick = (projectLink) => {
    window.open(projectLink, '_blank');
  };
  
  if (showWebsite) {
    return (
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
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>
        
        {/* Experience items */}
        <div className="space-y-12">
          <div className="relative flex items-start">
            {/* Timeline dot */}
            <div className="absolute left-8 w-4 h-4 bg-blue-500 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
            
            {/* Content card */}
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
            {/* Timeline dot */}
            <div className="absolute left-8 w-4 h-4 bg-purple-500 rounded-full -translate-x-1/2 ring-4 ring-white"></div>
            
            {/* Content card */}
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

     {/* Projects Section */}
     <section id="projects" className="py-20">
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

      {/* Research Section */}
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
      </section>

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
                        // Fallback to placeholder if image fails to load
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
                      // Fallback if image doesn't load
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

          {/* Woodworking... change to more relevant section
          <div>
            <div className="flex items-center justify-center mb-8">
              <Hammer className="text-orange-400 mr-4" size={32} />
              <h3 className="text-3xl font-bold">Woodworking</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {woodworking.map((project, index) => (
                <div key={index} className="relative group overflow-hidden rounded-xl">
                  <div className="w-full h-48 bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                    <Hammer size={48} className="text-orange-400 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div> */}
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
            {/* Security Message */}
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

            {/* Contact Form */}
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
  );
}


return (
    <div className="min-h-screen relative overflow-hidden">
        {/* Background Video */}
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

        {/* Video Intro Frame */}
        <div className="relative min-h-screen flex items-center justify-center p-4">
          <div className="backdrop-blur-2xl bg-white/10 border shadow-2xl p-8 w-9/10 h-9/10" style={{width: '90%', height: '90vh'}}>
            <div className="text-center mb-6">
              <h1 className="text-6xl font-bold text-gray-800 mb-4">Hello Friend</h1>
              <p className="text-gray-600 text-2xl mb-6">
                Welcome to my portfolio
              </p>
            </div>

            {/* Video Container */}
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
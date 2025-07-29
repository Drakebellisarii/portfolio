import React, { useState, useRef, useEffect } from 'react';
import { 
  Mail, 
  ExternalLink, 
  Camera, 
  Hammer, 
  BookOpen, 
  Code, 
  Search
} from 'lucide-react';

export default function Portfolio() {
  const [gameStarted, setGameStarted] = useState(true);
  const [ballPosition, setBallPosition] = useState({ x: 165, y: 300 });
  const [ballVelocity, setBallVelocity] = useState({ x: 0, y: 0 });
  const [ballInHole, setBallInHole] = useState(false);
  const [showWebsite, setShowWebsite] = useState(false);
  const [ballFalling, setBallFalling] = useState(false);
  const [fallProgress, setFallProgress] = useState(0);
  
  // New swipe-based aiming system
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragCurrent, setDragCurrent] = useState({ x: 0, y: 0 });
  const [showAimLine, setShowAimLine] = useState(false);
  
  const animationRef = useRef(null);
  const physicsRef = useRef(null);
  const gameRef = useRef(null);

  const holePosition = { x: 650, y: 350 };
  const ballRadius = 8;
  const holeRadius = 25;
  const maxPower = 150; // Maximum drag distance for full power
  const friction = 0.75; // Much lower friction for straight movement
  const bounceDamping = 0.8; // Higher bounce retention

  const projects = [
    {
      title: 'AI-Powered Movie Selector',
      description: 'Designed a cloud native movie selection platform to minimize the time it takes to select a title for movie night. Make an account or browse as a guest if you would like to check out my work',
      tech: ['Javascript', 'Python', 'SQL', 'HTML/CSS', 'API Integration', 'Credential Managment'],
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Central Point Partners',
      description: 'Developed a professional website for my mom who needed to filter her clients through one place providing an ease of communication to allow for seamless scheduling integrated directly with her calendar',
      tech: ['Python', 'TensorFlow', 'Matplotlib'],
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Garden Reading tracker',
      description: 'Created an application where garden lovers can track their reading progress through an interactive garden',
      tech: ['React', 'Javascript', 'Web3'],
      image: '/api/placeholder/400/250',
    },
    {
      title: 'Cloud native realesate predictor',
      description: 'Designed a realestate prediction service that utilizes Zillows Api to predict realestate prices in the 500 most populous cities around the world',
      tech: ['Docker', 'AWS', 'Kubernetes'],
      image: '/api/placeholder/400/250',
    },
  ];

  const books = [
    'A Mans Search For Meaning - Robert Martin',
    'Outliers - Malcolm Gladwell',
    'Tuesdays With Morrie - Mitch Albom',
    'Flowers For Algernon - James Clear',
    'My Brilliant Friend - Elena Ferrante',
    'The Life of a Hermit - ',
    'The Great Alone - Kristin Hannah',
    'Remarkably Bright Creatures - ',
    'The Sun Also Rises - Ernst Hemmingway',
    'The Tattoist of Auschwitz - ',
    'Tommorow and Tommorow and Tommorow - ',
    'Just Kids - Patti Smith',
  ];

  const photography = new Array(6).fill('/api/placeholder/300/200');
  const woodworking = new Array(4).fill('/api/placeholder/300/200');

  // Check if ball is in hole
const checkBallInHole = (ballPos) => {
    const distance = Math.sqrt(
      Math.pow(ballPos.x - holePosition.x, 2) + 
      Math.pow(ballPos.y - holePosition.y+45, 2)
    );
    return distance < holeRadius;
  };
  
    // Physics update loop
    useEffect(() => {
      if (ballInHole || ballFalling) return;
      
      const updatePhysics = () => {
        // Apply friction to velocity first
        setBallVelocity(prev => ({
          x: prev.x * friction,
          y: prev.y * friction
        }));
        
        setBallPosition(prevPos => {
          // Calculate next position
          let newX = prevPos.x + ballVelocity.x;
          let newY = prevPos.y + ballVelocity.y;
          
          // Handle wall collisions
          if (newX - ballRadius <= 0) {
            newX = ballRadius;
            setBallVelocity(v => ({ ...v, x: Math.abs(v.x) * bounceDamping }));
          } else if (newX + ballRadius >= 750) {
            newX = 750 - ballRadius;
            setBallVelocity(v => ({ ...v, x: -Math.abs(v.x) * bounceDamping }));
          }
          
          if (newY - ballRadius <= 0) {
            newY = ballRadius;
            setBallVelocity(v => ({ ...v, y: Math.abs(v.y) * bounceDamping }));
          } else if (newY + ballRadius >= 500) {
            newY = 500 - ballRadius;
            setBallVelocity(v => ({ ...v, y: -Math.abs(v.y) * bounceDamping }));
          }
          
          const newPos = { x: newX, y: newY };
          
          // Check if ball is in hole
          if (checkBallInHole(newPos)) {
            setBallInHole(true);
            setBallFalling(true);
            startFallingAnimation();
          }
          
          // Stop ball when very slow
          if (Math.abs(ballVelocity.x) < 0.5 && Math.abs(ballVelocity.y) < 0.5) {
            setBallVelocity({ x: 0, y: 0 });
          }
          
          return newPos;
        });
      };
      
      physicsRef.current = setInterval(updatePhysics, 16); // ~60fps
      
      return () => {
        if (physicsRef.current) {
          clearInterval(physicsRef.current);
        }
      };
    }, [ballInHole, ballFalling, ballVelocity.x, ballVelocity.y]);
  

    const getPosition = (e) => {
      const rect = gameRef.current.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      return {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
    };
  
    // Calculate drag distance and power
    const calculatePower = (start, current) => {
      const dx = current.x - start.x;
      const dy = current.y - start.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return Math.min(distance / maxPower, 1); // Normalize to 0-1
    };
  
    // Handle drag start
    const handleDragStart = (e) => {
      if (ballInHole || ballFalling) return;
      
      const pos = getPosition(e);
      // Check if clicking/touching near the ball
      const ballDistance = Math.sqrt(
        Math.pow(pos.x - ballPosition.x, 2) + 
        Math.pow(pos.y - ballPosition.y, 2)
      );
      
      if (ballDistance < 30) { // 30px radius around ball for easier interaction
        setIsDragging(true);
        setDragStart(pos);
        setDragCurrent(pos);
        setShowAimLine(true);
        e.preventDefault();
      }
    };
  
    // Handle drag move
    const handleDragMove = (e) => {
      if (!isDragging) return;
      
      const pos = getPosition(e);
      setDragCurrent(pos);
      e.preventDefault();
    };
  
    // Handle drag end
    const handleDragEnd = (e) => {
      if (!isDragging) return;
      
      setIsDragging(false);
      setShowAimLine(false);
      
      const power = calculatePower(dragStart, dragCurrent);
      if (power > 0.1) { // Minimum power threshold
        hitBall(dragStart, dragCurrent, power);
      }
      
      e.preventDefault();
    };
  
    // Hit the ball with swipe direction and power
    const hitBall = (start, end, power) => {
      // Calculate direction (inverted because we drag away from target)
      const dx = start.x - end.x;
      const dy = start.y - end.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 5) return; // Too small movement
      
      // Normalize direction and apply power - much higher multiplier for proper movement
      const velocity = {
        x: (dx / distance) * power * 40, // Increased from 20 to 40
        y: (dy / distance) * power * 40
      };
      
      setBallVelocity(velocity);
    };
  
    // Start falling animation
    const startFallingAnimation = () => {
      let progress = 0;
      const animate = () => {
        progress += 0.8;
        setFallProgress(progress);
        
        if (progress >= 100) {
          setTimeout(() => {
            setShowWebsite(true);
          }, 1000);
        } else {
          animationRef.current = requestAnimationFrame(animate);
        }
      };
      animate();
    };
  
    // Calculate aim line properties
    const getAimLineProps = () => {
      if (!showAimLine) return null;
      
      const dx = dragCurrent.x - dragStart.x;
      const dy = dragCurrent.y - dragStart.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 5) return null;
      
      const power = calculatePower(dragStart, dragCurrent);
      const lineLength = Math.min(distance, maxPower);
      
      // Calculate line end point (opposite direction of drag)
      const lineEndX = ballPosition.x - (dx / distance) * lineLength;
      const lineEndY = ballPosition.y - (dy / distance) * lineLength;
      
      return {
        x1: ballPosition.x,
        y1: ballPosition.y,
        x2: lineEndX,
        y2: lineEndY,
        power: power
      };
    };
  
    const aimLineProps = getAimLineProps();
  
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
            @keyframes bounceHorizontal {
              0% {
                transform: translateX(100vw) translateY(-10px);
                animation-timing-function: ease-in;
              }
              15% {
              
                            }
              30% {
                transform: translateX(50vw) translateY(-15px);
                animation-timing-function: ease-in;
              }
              45% {
                transform: translateX(15vw) translateY(0px);
                animation-timing-function: ease-out;
              }
              60% {
                transform: translateX(10vw) translateY(-12px);
                animation-timing-function: ease-in;
              }
              75% {
                transform: translateX(-5vw) translateY(0px);
                animation-timing-function: ease-out;
              }
              85% {
                transform: translateX(5vw) translateY(-8px);
                animation-timing-function: ease-in;
              }
              95% {
                transform: translateX(-2vw) translateY(0px);
                animation-timing-function: ease-out;
              }
              100% {
                transform: translateX(0vw) translateY(0px);
              }
            }
            
            .animate-bounce-horizontal {
              animation: bounceHorizontal 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }

            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(-20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            
            .animate-fade-in {
              animation: fadeIn 1s ease-out;
            }
          `}</style>

          <div className="relative z-10 h-full flex items-center justify-start px-6 lg:px-16">
            <div className="backdrop-blur-20xl bg-white/10 border border-white/20 rounded-3xl p-8 lg:p-12 max-w-2xl shadow-2xl animate-bounce-horizontal">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8">
                <div className="flex-shrink-0">
                  <div className="w-88 h-60 lg:w-40 lg:h-52 rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl">
                    <img
                      src="/Headshot.png"
                      alt="Drake Bellisari"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700"
                    />
                  </div>
                </div>

                <div className="flex-1 text-white">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Drake Bellisari
                  </h1>
                  <h2 className="text-xl lg:text-2xl font-light mb-6 text-blue-100">
                    B.S. Computer Science - Trinity College 
                  </h2>
                  <p className="text-base lg:text-lg leading-relaxed text-white/90 mb-6">
                    I'm a 21-year-old computer science major at Trinity College in Hartford, Connecticut. 
                    I am deeply passionate about evolving technology and eager to gain hands-on experience 
                    wherever I can make an impact. All of the images/videos are property of myself if you would like to purchase any please let me know.
                    I value the importance of maintaining the intersection of art and technology through software development and I try to reflect this importance in all of my projects and would appreciate any feedback you want to provide.
                  </p>
                  <p className="text-base lg:text-lg leading-relaxed text-white/90 mb-8">
                    With experience in Java, Python, Kotlin, React, Assembly, JavaScript, and C, 
                    I enjoy blending logic and creativity in my work.
                  </p>
                  
                  <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg">
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
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">React</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Web Design</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Production</span>
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
                className="group bg-gray-800/50 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105"
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {books.map((book, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg rounded-lg p-4 border border-gray-700 hover:border-pink-500 transition-all duration-300 hover:scale-105"
                >
                  <p className="text-gray-300 text-sm text-center">{book}</p>
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
                  <div className="w-full h-48 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <Camera size={48} className="text-blue-400 opacity-50" />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Woodworking */}
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
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">Let's build something amazing together</p>
          <div className="flex justify-center space-x-6">
            <a className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <Mail size={24} />
            </a>
          </div>
          <p className="text-gray-500 text-sm mt-6">© 2025 Your Name. All rights reserved.</p>
        </div>
      </footer>
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
          {/* Fallback for browsers that don't support video */}
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />


    {/* ADD THIS CENTERING WRAPPER */}
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <div className="backdrop-blur-2xl bg-white/10 border shadow-2xl p-8 max-w-4xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Hello Friend</h1>
          <p className="text-gray-600 text-lg mb-6">
            Sink this put to view my portfolio...No pressure
          </p>
          {!gameStarted && (
            <button
              onClick={() => setGameStarted(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Game
            </button>
          )}
        </div>

        {gameStarted && (
          <div className="relative">
            <div
              ref={gameRef}
              className="relative w-full h-96 bg-gradient-to-b from-green-300 to-green-500 rounded-lg overflow-hidden cursor-crosshair"
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Golf course elements */}
              <div className="absolute inset-0">
                <div className="absolute top-4 right-4 text-white font-bold">
                  Drag the ball to aim!
                </div>
              </div>

              {/* Hole */}
              <div
                className="absolute w-6 h-6 bg-black rounded-full border-4 border-gray-800 flex items-center justify-center"
                style={{
                  left: `${holePosition.x - holeRadius}px`,
                  top: `${holePosition.y - holeRadius-51}px`,
                }}
              >
                <div className="w-6 h-6 bg-gray-900 rounded-full"></div>
              </div>

             {/* Aim line */}
            {aimLineProps && (
              <svg
                className="absolute inset-0 pointer-events-none"
                style={{ width: '750px', height: '500px' }}
              >
                <line
                  x1={aimLineProps.x1}
                  y1={aimLineProps.y1}
                  x2={aimLineProps.x2}
                  y2={aimLineProps.y2}
                  stroke="white"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  opacity={0.8}
                />
                <line
                  x1={aimLineProps.x1}
                  y1={aimLineProps.y1}
                  x2={aimLineProps.x2}
                  y2={aimLineProps.y2}
                  stroke={`rgba(255, ${255 - aimLineProps.power * 255}, 0, 0.8)`}
                  strokeWidth="4"
                  strokeDasharray="5,5"
                  opacity={0.4}
                />
              </svg>
            )}

              {/* Ball */}
              <div
                className={`absolute w-4 h-4 bg-white rounded-full border-2 border-gray-300 shadow-lg transition-all duration-300 ${
                  isDragging ? 'scale-110 shadow-xl' : ''
                } ${ballFalling ? 'animate-pulse' : ''}`}
                style={{
                  left: `${ballPosition.x - ballRadius}px`,
                  top: `${ballPosition.y - ballRadius}px`,
                  transform: ballFalling ? `translateY(${fallProgress * 2}px) scale(${1 - fallProgress / 200})` : 'none',
                }}
              >
                <div className="absolute inset-0.5 bg-gradient-to-br from-white to-gray-200 rounded-full"></div>
              </div>

              {/* Power indicator */}
              {isDragging && (
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full">
                  Power: {Math.round(calculatePower(dragStart, dragCurrent) * 100)}%
                </div>
              )}

              {/* Success message */}
              {ballInHole && !ballFalling && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-2xl animate-bounce">
                    🎉 Hole in One! 🎉
                  </div>
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
</div>
  );
}
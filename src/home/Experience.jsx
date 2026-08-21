import React from 'react';

export default function Experience() {
  return (
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
        <h2 className="display-heading display-heading-outline text-4xl sm:text-5xl text-center text-gray-800 mb-8 sm:mb-12">
          Work Experience
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Enhanced Timeline Design */}
            <div className="hidden sm:block absolute left-8 top-0 bottom-0 w-1 rounded-none" style={{
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
              background: 'linear-gradient(to bottom, #3b82f6, #2563eb)'
            }}></div>

            <div className="space-y-8 sm:space-y-12">
              <div className="relative flex items-start">
                {/* Enhanced Timeline Dot */}
                <div className="hidden sm:block absolute left-8 w-5 h-5 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2 shadow-md" style={{ boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(59, 130, 246, 0.4)' }}></div>

                <div
                  className="sm:ml-14 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 w-full relative overflow-hidden group"
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
                      <p className="text-xs text-gray-500 mt-0.5">Jan 2026 - Present &middot; 9 mos</p>
                    </div>

                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">
                      Sole developer on a channel sales partner portal built with Next.js, TypeScript, and Tailwind, featuring Microsoft Entra ID B2B guest authentication, per-partner document storage via SharePoint and the Microsoft Graph API, and database-backed tracking of partner onboarding progress and deal registration, with full ownership of the authentication flow and repository architecture. Also built and maintained a secure, password protected, responsive investor portal using Next.js, React, and Node.js, with an emphasis on performance, modular architecture, and cross device reliability, implementing protected navigation flows, reusable component systems, analytics, and domain level configuration to support deployment and ongoing iteration.
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
                <div className="hidden sm:block absolute left-8 w-5 h-5 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2 shadow-md" style={{ boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(59, 130, 246, 0.4)' }}></div>


                <div
                  className="sm:ml-14 bg-white rounded-lg shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 w-full relative overflow-hidden group"
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
  );
}

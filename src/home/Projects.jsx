import React from 'react';
import { ExternalLink, Smartphone } from 'lucide-react';

export default function Projects({ projects, onProjectClick }) {
  return (
    <section id="projects" className="py-12 sm:py-20 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-left text-gray-800">
          Featured Projects
        </h2>

        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => onProjectClick(project)}
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
                      {project.modal
                        ? <Smartphone size={16} className="mr-2 text-blue-500" />
                        : <ExternalLink size={16} className="mr-2 text-blue-500" />}
                      <span className="truncate">{project.modal ? 'Click to view description' : 'Click to view project'}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-300">
                      {project.modal
                        ? <Smartphone size={16} className="sm:w-5 sm:h-5 text-blue-600" />
                        : <ExternalLink size={16} className="sm:w-5 sm:h-5 text-blue-600" />}
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
              <div className="h-1 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>

        {/* GitHub link */}
        <a
          href="https://github.com/DrakeBellisarii"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-8 sm:mt-12 inline-flex items-center gap-2.5 text-gray-700 hover:text-blue-600 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
          </svg>
          <span className="font-medium">More on GitHub</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </a>
      </div>
    </section>
  );
}

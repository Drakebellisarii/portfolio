import React from 'react';
import { ExternalLink, Smartphone, Lock, Play, Compass } from 'lucide-react';

function getDomain(link) {
  try {
    return new URL(link).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

function ProjectVisual({ project }) {
  // Mobile app — device mockup with a play affordance for the demo video
  if (project.modal) {
    return (
      <div className="relative rounded-t-lg overflow-hidden border border-b-0 border-gray-800 bg-[#0d1117]">
        <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#161b22] border-b border-gray-800">
          <Smartphone size={12} className="text-gray-500" />
          <span className="text-[10.5px] text-gray-400 font-mono tracking-wide">iOS &middot; SwiftUI</span>
        </div>

        <div className="relative aspect-[2/1] overflow-hidden bg-gradient-to-br from-blue-950 via-[#0d1117] to-[#0d1117] flex items-center justify-center">
          <div className="relative w-[100px] sm:w-[116px] aspect-[9/19] rounded-[20px] border-[3px] border-gray-700/80 bg-black shadow-2xl overflow-hidden transition-transform duration-500 group-hover:scale-[1.05]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-9 h-2.5 bg-gray-900 rounded-b-lg z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/30 via-gray-900 to-gray-950 flex items-center justify-center">
              <Compass size={22} className="text-blue-300/60" strokeWidth={1.5} />
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/25 transition-colors duration-300">
            <span className="w-10 h-10 rounded-full bg-white/95 flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
              <Play size={14} className="text-gray-900 ml-0.5" fill="currentColor" />
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Live website — browser chrome mockup
  const domain = getDomain(project.link);
  return (
    <div className="relative rounded-t-lg overflow-hidden border border-b-0 border-gray-800 bg-[#0d1117]">
      <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#161b22] border-b border-gray-800">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <div className="flex-1 flex justify-center min-w-0">
          <div className="flex items-center gap-1.5 bg-black/30 rounded-full px-3 py-[3px] text-[10.5px] text-gray-400 font-mono max-w-[70%]">
            <Lock size={9} className="text-gray-500 flex-shrink-0" />
            <span className="truncate">{domain}</span>
          </div>
        </div>
      </div>

      <div className="relative aspect-[2/1] overflow-hidden bg-[#0d1117]">
        {project.video ? (
          <video
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={project.video} type="video/mp4" />
          </video>
        ) : project.image ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 to-[#0d1117] px-6">
            <span
              className="font-black uppercase tracking-tight text-transparent select-none text-center leading-tight"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.16)', fontSize: 'clamp(18px, 3vw, 28px)' }}
            >
              {project.title}
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 bg-white text-gray-900 text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            Visit site <ExternalLink size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects, onProjectClick }) {
  return (
    <section id="projects" className="py-12 sm:py-20 bg-gray-50">
      <div className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <h2 className="display-heading display-heading-outline text-3xl sm:text-4xl lg:text-5xl mb-8 sm:mb-12 text-left text-gray-800">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              onClick={() => onProjectClick(project)}
              className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-200 hover:border-blue-300 overflow-hidden flex flex-col"
            >
              <ProjectVisual project={project} />

              <div className="p-4 sm:p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {project.title}
                  </h3>
                  {project.modal
                    ? <Play size={13} className="text-gray-400 flex-shrink-0" />
                    : <ExternalLink size={13} className="text-gray-400 flex-shrink-0" />}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1 line-clamp-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-[11px] border border-gray-200 group-hover:border-blue-200 transition-colors duration-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
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

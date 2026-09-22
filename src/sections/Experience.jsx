import React from 'react';
import Picture from '../components/Picture';
import Reveal from '../components/Reveal';
import { experience } from '../data/experience';

const Tag = ({ children }) => (
  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{children}</span>
);

function Role({ role, primary }) {
  return (
    <>
      <div className={primary ? 'mb-3' : 'border-t border-gray-100 pt-4 mt-4 mb-3'}>
        <h3 className={primary ? 'text-xl sm:text-2xl font-semibold text-gray-800' : 'text-lg sm:text-xl font-semibold text-gray-700'}>
          {role.title}
        </h3>
        <p className={primary ? 'text-blue-600 font-medium' : 'text-sm text-blue-600 font-medium'}>{role.company}</p>
        <p className="text-xs text-gray-500 mt-0.5">{role.meta}</p>
      </div>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4">{role.body}</p>
      <div className="flex flex-wrap gap-2">
        {role.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </>
  );
}

function EmployerCard({ entry }) {
  return (
    <div
      className="xp-card sm:ml-14 bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full relative overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
      style={{
        '--logo-hover-opacity': entry.logoHover.opacity,
        '--logo-hover-grayscale': entry.logoHover.grayscale,
      }}
    >
      <div
        className="xp-card__logo absolute top-0 right-4 -translate-y-[10%] pointer-events-none w-[120px] h-[80px] sm:w-[180px] sm:h-[120px]"
        style={{
          backgroundImage: `url('${entry.logo}')`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: 5,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {entry.roles.map((role, i) => (
          <Role key={role.title} role={{ ...role, company: entry.company }} primary={i === 0} />
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-12 sm:py-20 relative overflow-hidden bg-white">
      {/* Topography, pre-blurred at build time so no CSS filter runs here */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
        <Picture
          webp="/media/backgrounds/topography.webp"
          src="/media/backgrounds/topography.jpg"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/80 to-gray-100/85 pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <Reveal>
          <h2 className="display-heading display-heading-outline text-4xl sm:text-5xl text-center text-gray-800 mb-8 sm:mb-12">
            Work Experience
          </h2>
        </Reveal>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div
              className="hidden sm:block absolute left-8 top-0 bottom-0 w-1"
              style={{
                boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
                background: 'linear-gradient(to bottom, #3b82f6, #2563eb)',
              }}
              aria-hidden="true"
            />

            <div className="space-y-8 sm:space-y-12">
              {experience.map((entry, i) => (
                <Reveal key={entry.id} delay={i * 120} className="relative flex items-start">
                  <div
                    className="hidden sm:block absolute left-8 w-5 h-5 bg-white border-2 border-blue-600 rounded-full -translate-x-1/2"
                    style={{ boxShadow: '0 0 0 4px rgba(255, 255, 255, 0.8), 0 0 8px rgba(59, 130, 246, 0.4)' }}
                    aria-hidden="true"
                  />
                  <EmployerCard entry={entry} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

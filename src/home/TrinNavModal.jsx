import React from 'react';
import { X } from 'lucide-react';

export default function TrinNavModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">TrinNav</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5 space-y-6 text-gray-700 text-sm leading-relaxed">

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Demo</h3>
            <a
              href="https://www.youtube.com/shorts/gOXVgUDcUaI"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              Watch demo on YouTube
            </a>
          </div>

          <p>
            TrinNav was my senior capstone project, I built a fully immersive iOS campus navigation app built for Trinity College. The app lets students navigate between buildings on campus using a custom-built map overlay, view 360° panoramic images at each location, and get walking time estimates between any two points. This was created given the lack of coverage that the large mapping softwares (Google Maps, Apple Maps, Google Earth) provided for the Trinity campus, and was designed to be a comprehensive solution for new students to get acquainted with the campus layout and find their way around.
          </p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Technologies</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="font-medium">Swift / SwiftUI</span> — primary language and declarative UI framework</li>
              <li><span className="font-medium">MapKit</span> — geo-registered campus map overlay and node annotations</li>
              <li><span className="font-medium">SceneKit</span> — 360° equirectangular panorama rendering per campus node</li>
              <li><span className="font-medium">CoreLocation</span> — live GPS positioning to anchor the user's location</li>
              <li><span className="font-medium">AVFoundation</span> — ambient audio playback on app launch</li>
              <li><span className="font-medium">Xcode</span> — iOS development platform</li>
              <li><span className="font-medium">PTGUI</span> — Software used to stitch together imaging and create equirectangular panoramas</li>
               <li><span className="font-medium">GoPro Fusion 360</span> — Camera used to capture campus imagery</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Algorithms & Patterns</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="font-medium">Graph traversal</span> — campus locations modeled as an adjacency list; routes resolved by traversing the node graph from source to destination</li>
              <li><span className="font-medium">Shortest path</span> — path finding across the node topology to determine the optimal walking route</li>
              <li><span className="font-medium">Walking speed estimation</span> — per-segment travel time calculated using base walk time values stored on each edge</li>
              <li><span className="font-medium">JSON decoding (Codable)</span> — campus node graph loaded from a structured JSON file at init time</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}

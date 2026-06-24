import React from 'react';
import { Mail } from 'lucide-react';

export default function ContactModal({ formData, onChange, onSubmit, onClose }) {
  return (
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
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl p-1 hover:bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center transition-colors"
            >
              ×
            </button>
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
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
                  onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
  );
}

// `image` is a static screenshot of the site's hero section; `video` is a looping
// hero clip (takes priority over `image` when both would apply). Both live in
// public/ and fall back to a plain title-card in the browser mockup when unset.
export const projects = [
  {
    title: 'AI-Powered Movie Selector',
    description: 'Designed a cloud native movie selection platform to minimize the time it takes to select a title for movie night. Make an account or browse as a guest if you would like to check out my work',
    tech: ['Javascript', 'Python', 'SQL', 'HTML/CSS', 'API Integration', 'Credential Managment'],
    link: 'https://www.flickfinda.com',
    image: '/Flick-Findy.png'
  },
  {
    title: 'TrinNav',
    description: 'Senior capstone iOS app — a graph-driven campus navigation system for Trinity College. Built with SwiftUI, MapKit, and SceneKit to deliver panoramic 360° views at each node, real-time route resolution across a custom JSON node topology, and CoreLocation-based positioning. Not publicly hosted; click to view the full project description.',
    tech: ['Swift', 'SwiftUI', 'MapKit', 'SceneKit', 'AVFoundation', 'CoreLocation', 'Xcode'],
    modal: true
  },
  {
    title: 'Central Florida Automation',
    description: 'Currently building this site for a Central Florida smart-home integration and security company serving the Orlando area. Designing a clean, high-end marketing site that highlights their automation, surveillance, lighting control, and AV services while reflecting the premium, invisible-technology feel of their luxury residential work. (Work in progress.)',
    tech: ['Next.js', 'React', 'Vercel'],
    link: 'https://central-florida-alarm.vercel.app',
    video: '/CFAS-Hero.mp4'
  },
  {
    title: 'Mandel Moving',
    description: 'Built and launched a professional marketing website end-to-end for Mandel Moving (NJ), handling everything from design system creation to production deployment. Focused on clean UI, fast load performance, and a conversion-first layout designed to drive service inquiries and establish credibility in a competitive local market.',
    tech: ['Next.js', 'React', 'SEO Optimization'],
    link: 'https://mandel-moving.vercel.app/',
    image: '/Mandel.png'
  },
  {
    title: 'Guided Peak Potential',
    description: 'Developed a professional website for my mom who needed to filter her clients through one place providing an ease of communication to allow for seamless scheduling and ease of purchase for her clients',
    tech: ['React', 'Javascript', 'HTML/CSS'],
    link: 'https://gpppartnersgroup.com/',
    video: '/Connie.mp4'
  },
  {
    title: 'Drake\'s Sites',
    description: 'Built my own web development business site to move beyond a general personal portfolio and speak directly to potential clients. Wanted something niche-focused, a site that leads with what I offer, who I build for, and why it matters, rather than an overview of me as a person.',
    tech: ['Next.js', 'React', 'Vercel', 'Tailwind CSS'],
    link: 'https://drakesites.dev',
    video: '/Drake.mp4'
  },
];

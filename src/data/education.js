import { Award, Trophy, Dumbbell } from 'lucide-react';

export const disciplines = [
  {
    label: 'Core CS',
    courses: [
      { id: 'ds-algos', name: 'Data Structures + Algorithms', detail: 'Fundamental algorithms and data structure implementations with run-time optimization and problem-solving strategies.' },
      { id: 'analysis', name: 'Analysis of Algorithms', detail: 'Formal complexity analysis using Big-O, Big-Θ, and Big-Ω notation. Divide-and-conquer, dynamic programming, greedy design, and NP-completeness.' },
      { id: 'systems', name: 'Computer Systems', detail: 'Computer architecture and system-level programming including memory management and process control.' },
      { id: 'python', name: 'Python Fundamentals', detail: 'Core Python syntax, object-oriented principles, data manipulation, and algorithmic implementations.' },
    ],
  },
  {
    label: 'Mathematics',
    courses: [
      { id: 'discrete', name: 'Discrete Mathematics', detail: 'Logic, set theory, proof techniques, combinatorics, and probability fundamentals.' },
      { id: 'calculus', name: 'Calculus 1 & 2', detail: 'Differential and integral calculus with real-world applications.' },
      { id: 'linear', name: 'Linear Algebra', detail: 'Vector spaces, matrices, linear transformations, eigenvalues, and applications in CS.' },
    ],
  },
  {
    label: 'Electives',
    courses: [
      { id: 'ai', name: 'Artificial Intelligence', detail: 'Search algorithms, constraint satisfaction, adversarial game trees, ML fundamentals, and Bayesian inference.' },
      { id: 'sensitive', name: 'Sensitive Information', detail: 'Privacy law, PII handling and classification, breach response, and regulatory compliance frameworks.' },
      { id: 'cloud', name: 'Cloud Native Development', detail: 'Microservices, containerization, cloud platform deployment, and scaling strategies.' },
      { id: 'swdesign', name: 'Software Design', detail: 'Design patterns, software architecture principles, and interface design methodologies.' },
      { id: 'security', name: 'Computer Security', detail: 'Cryptography, secure communication protocols, and vulnerability assessment.' },
    ],
  },
];

export const achievements = [
  { Icon: Award, label: 'Graduated with Honors' },
  { Icon: Trophy, label: 'Experiential Certificate in Cybersecurity' },
  { Icon: Dumbbell, label: '4 Year Varsity Athlete' },
];

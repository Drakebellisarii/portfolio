import { render, screen } from '@testing-library/react';
import App from './App';

test('renders every section of the portfolio', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /drake bellisari/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /work experience/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /featured projects/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /let's talk/i })).toBeInTheDocument();
});

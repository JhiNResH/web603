import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Weather App header', () => {
  render(<App />);
  const headerElement = screen.getByText(/React Weather App/i);
  expect(headerElement).toBeInTheDocument();
});

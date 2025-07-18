import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  expect(div).toBeTruthy();
  const app = createRoot(div);
  expect(app).toBeTruthy();
  app.render(<App />);
  app.unmount();
});

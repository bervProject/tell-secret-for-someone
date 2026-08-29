import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock react-admin to avoid complex setup
jest.mock('react-admin', () => ({
  Admin: ({ children, dashboard }: any) => (
    <div data-testid="admin-container">
      {children}
    </div>
  ),
  Resource: () => null,
}));

// Mock feathersClient
jest.mock('../feathersClient', () => ({
  __esModule: true,
  default: {
    authenticate: jest.fn(),
    reAuthenticate: jest.fn(),
  },
}));

// Mock ra-data-feathers
jest.mock('ra-data-feathers', () => ({
  restClient: jest.fn(() => ({})),
  authClient: jest.fn(() => ({})),
}));

// Mock services
jest.mock('../services/Users', () => ({
  UsersList: () => <div>Users List</div>,
}));

jest.mock('../services/Message', () => ({
  MessageList: () => <div>Message List</div>,
  MessageInsert: () => <div>Message Insert</div>,
  MessageShow: () => <div>Message Show</div>,
}));

import App from '../App';

describe('App Component', () => {
  it('renders the Admin component', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('admin-container')).toBeInTheDocument();
  });

  it('does not crash on render', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders with correct structure', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });
});

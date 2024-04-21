import React from 'react';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from '../src/views/login/Login';
import { MemoryRouter } from 'react-router-dom';
import axiosClient from '../src/axiosClient'; // Ensure this path matches the location of your axiosClient

// Properly mock axiosClient
vi.mock('../src/axiosClient', () => ({
  __esModule: true,
  default: {
    post: vi.fn()
  }
}));

describe('Login Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders login form inputs and button', () => {
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('submits the login form and navigates on successful login', async () => {
    const postMock = vi.mocked(axiosClient.post);
    postMock.mockResolvedValueOnce({ data: { message: 'Login successful' } });
  
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@tm.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
  
    await vi.waitFor(() => {
      expect(postMock).toHaveBeenCalledWith(
        '/users/login',
        { email: 'a@tm.com', password: 'password' },
        { withCredentials: true }  // Include this line to match your actual function call
      );
      // Optionally, assert navigation if you mock useNavigate
    });
  });

  it('shows an error message when login fails due to invalid credentials', async () => {
    const postMock = vi.mocked(axiosClient.post);
    postMock.mockRejectedValueOnce({
      response: { data: { message: 'Invalid credentials' } }
    });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await vi.waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  it('displays a validation error if the email field is empty', async () => {
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    await vi.waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    });
  });

  it('displays a validation error if the password field is empty', async () => {
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@tm.com' } });
    fireEvent.submit(screen.getByRole('button', { name: /login/i }));
    await vi.waitFor(() => {
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });
});

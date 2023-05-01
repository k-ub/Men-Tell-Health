import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import CreateEvent from '../pages/CreateEvent';

// Mock the axios library
jest.mock('axios');

// Mock the @refinedev/core module
jest.mock('@refinedev/core', () => ({
  useGetIdentity: () => ({
    data: {
      email: 'test@example.com',
    },
  }),
}));

describe('CreateEvent', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockImplementation(() =>
      Promise.resolve({
        data: {
          events: [
            {
              _id: '1',
              title: 'Test Event 1',
              description: 'Test description 1',
              date: '2022-01-01',
            },
            {
              _id: '2',
              title: 'Test Event 2',
              description: 'Test description 2',
              date: '2022-01-02',
            },
          ],
        },
      }),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders event form and event list correctly', async () => {
    render(<CreateEvent />);

    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/location/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create event/i })).toBeInTheDocument();

    // Wait for the events to be fetched and rendered
    await waitFor(() => screen.getByText(/Test Event 1/i));
    expect(screen.getByText(/Test Event 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Event 2/i)).toBeInTheDocument();
  });
});
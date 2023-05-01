import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import CreateArticle from '../pages/edit-article';

// Mock the @refinedev/core module
jest.mock('@refinedev/core', () => ({
  useGetIdentity: () => ({
    data: {
      email: 'test@example.com',
    },
  }),
}));

describe('CreateArticle', () => {
  test('renders form fields correctly', () => {
    render(<CreateArticle />);

    // Test that all form fields are rendered
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/article image/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /edit article/i })).toBeInTheDocument();
  });

  test('displays selected image', async () => {
    render(<CreateArticle />);
    const file = new File(['sample'], 'sample.png', { type: 'image/png' });

    // Trigger the input change event with the selected file
    fireEvent.change(screen.getByLabelText(/article image/i), {
      target: { files: [file] },
    });

    // Wait for the image to be displayed
    await waitFor(() => screen.getByAltText('Selected article image'));

    // Test that the image is rendered with the correct src
    expect(screen.getByAltText('Selected article image')).toHaveAttribute('src', expect.stringContaining('data:image/png;base64'));
  });
});

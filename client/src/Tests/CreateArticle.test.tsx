import { render, fireEvent, screen } from "@testing-library/react";
import CreateArticle from "../pages/create-article"; // Adjust the import path as necessary
// Import the hook you are using in CreateArticle, e.g. useForm from react-hook-form
import { useForm } from "react-hook-form"; // Adjust the import as necessary

// Mock the useForm hook or the hook you are using in your component
jest.mock("react-hook-form", () => ({
  useForm: jest.fn(),
}));

test("form submission with an image should call onFinish", async () => {
  const onFinish = jest.fn();
  (useForm as jest.Mock).mockReturnValueOnce({
    refineCore: { onFinish, formLoading: false },
    register: () => {},
    handleSubmit: (cb: any) => cb,
  });

  render(<CreateArticle />);

  // Mock the image upload
  const file = new File(["(⌐□_□)"], "test.png", { type: "image/png" });
  const uploadButton = screen.getByText(/upload/i);
  const fileInput = uploadButton.querySelector("input[type='file']");

  if (fileInput) {
    fireEvent.change(fileInput, { target: { files: [file] } });
  } else {
    throw new Error("File input not found");
  }

  const submitButton = screen.getByRole("button", { name: /submit/i });
  fireEvent.click(submitButton);

  await expect(onFinish).toHaveBeenCalled();
});

import { render, screen, fireEvent } from "@testing-library/react";
import AllArticles from "../pages/all-articles";

jest.mock("@refinedev/core", () => ({
  useTable: jest.fn(() => ({
    tableQueryResult: {
      data: { data: [{ _id: "1", title: "Article 1", price: 10 }] },
      isLoading: false,
      isError: false,
    },
    current: 1,
    setCurrent: jest.fn(),
    setPageSize: jest.fn(),
    pageCount: 1,
    sorter: [],
    setSorter: jest.fn(),
    filters: [],
    setFilters: jest.fn(),
  })),
}));

describe("AllArticles", () => {
  test("renders the correct title", () => {
    render(<AllArticles />);
    expect(screen.getByText("All Post")).toBeInTheDocument();
  });

  test("filters articles by title", () => {
    render(<AllArticles />);
    const searchInput = screen.getByPlaceholderText("Search by title") as HTMLInputElement;
    fireEvent.change(searchInput, { target: { value: "Article 1" } });
    expect(searchInput.value).toBe("Article 1");
  });

  test("filters articles by type", () => {
    render(<AllArticles />);
    const typeSelect = screen.getByLabelText("Without label") as HTMLSelectElement;
    fireEvent.change(typeSelect, { target: { value: "finance" } });
    expect(typeSelect.value).toBe("finance");
  });

  test("sorts articles by price", () => {
    render(<AllArticles />);
    const sortButton = screen.getByText("Sort rating ↓");
    fireEvent.click(sortButton);
    expect(sortButton.textContent).toBe("Sort rating ↑");
  });

  test("navigates to create article page", () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      useNavigate: () => mockNavigate,
    }));
    render(<AllArticles />);
    const addButton = screen.getByText("Add Post");
    fireEvent.click(addButton);
    expect(mockNavigate).toHaveBeenCalledWith("/articles/create");
  });
});

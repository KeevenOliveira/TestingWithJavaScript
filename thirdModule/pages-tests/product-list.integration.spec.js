import { screen, render, waitFor, fireEvent } from "@testing-library/react";
import Response from "miragejs";
import userEvent from "@testing-library/user-event";

import ProductList from "../pages";
import { makeServer } from "../miragejs/server";

const renderProductList = () => {
  render(<ProductList />);
};

describe("<ProductList/>", () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  it("should render a list of products", () => {
    renderProductList();

    expect(screen.getByTestId("product-list")).toBeInTheDocument();
  });

  it("should render the ProductCard component 10 times", async () => {
    server.createList("product", 10);

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(10);
    });
  });

  it('should render the "no products message"', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId("no-products")).toBeInTheDocument();
    });
  });

  it("should display error message when promise rejects", async () => {
    server.get("products", () => {
      return new Response(500, {}, {});
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByTestId("server-error")).toBeInTheDocument();
      expect(screen.getByText("Server is down")).toBeInTheDocument();
      expect(screen.queryByTestId("product-card")).not.toBeInTheDocument();
      expect(screen.queryByTestId("no-products")).not.toBeInTheDocument();
    });
  });

  it("should filter the product list when a search is performed", async () => {
    server.createList("product", 10);
    const search = "Relógio teste";

    server.create("product", {
      title: search,
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getAllByTestId("product-card")).toHaveLength(11);
    });

    const searchInput = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, search);
    await fireEvent.submit(searchInput);

    await waitFor(() => {
      expect(screen.getByTestId("product-card")).toBeInTheDocument();
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
    });
  });

  it("should display the total quantity of products", async () => {
    server.createList("product", 5);

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText("5 Products")).toBeInTheDocument();
    });
  });

  it("should display product singular when there is only 1 product", async () => {
    server.create("product");

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText("1 Product")).toBeInTheDocument();
      expect(screen.getAllByTestId("product-card")).toHaveLength(1);
    });
  });

  it("should display proper quantity when list is filtered", async () => {
    server.createList("product", 5);
    const search = "Relógio teste";

    server.create("product", {
      title: search,
    });

    renderProductList();

    await waitFor(() => {
      expect(screen.getByText("6 Products")).toBeInTheDocument();
    });

    const searchInput = screen.getByRole("form");
    const input = screen.getByRole("searchbox");

    await userEvent.type(input, search);
    await fireEvent.submit(searchInput);

    await waitFor(() => {
      expect(screen.getByText("1 Product")).toBeInTheDocument();
    });
  });
});

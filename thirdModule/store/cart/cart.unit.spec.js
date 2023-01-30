import { renderHook, act } from "@testing-library/react-hooks";
import { useCartStore } from "./";
import { makeServer } from "../../miragejs/server";

describe("Cart Store", () => {
  let server;
  let result;
  let add;
  let increase;
  let decrease;
  let toggle;
  let remove;
  let removeAll;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
    result = renderHook(() => useCartStore()).result;
    add = result.current.actions.add;
    increase = result.current.actions.increase;
    decrease = result.current.actions.decrease;
    toggle = result.current.actions.toggle;
    remove = result.current.actions.remove;
    removeAll = result.current.actions.removeAll;
  });

  afterEach(() => {
    server.shutdown();
    act(() => result.current.actions.reset());
  });

  it("should return open equals false on ititial state", () => {
    expect(result.current.state.open).toBe(false);
  });

  it("should return an empty array for products on initial state", () => {
    expect(Array.isArray(result.current.state.products)).toBe(true);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should add 2 products to the list and open the cart", () => {
    const products = server.createList("product", 2);
    for (const product of products) {
      act(() => add(product));
    }

    expect(result.current.state.products).toHaveLength(2);
    expect(result.current.state.open).toBe(true);
  });

  it("should assign 1 as initial quantity on product add() ", () => {
    const product = server.createList("product", 1);

    act(() => add(product));

    expect(result.current.state.products[0].quantity).toBe(1);
    expect(result.current.state.open).toBe(true);
    expect(result.current.state.products).toHaveLength(1);
  });

  it("should increase quantity", () => {
    const product = server.create("product");

    act(() => {
      add(product);
      increase(product);
    });
    expect(result.current.state.products[0].quantity).toBe(2);
  });

  it("should decrease quantity", () => {
    const product = server.create("product");

    act(() => {
      add(product);
      decrease(product);
    });

    expect(result.current.state.products[0].quantity).toBe(0);
  });

  it("should NOT decrease more than 0", () => {
    const product = server.create("product");

    act(() => {
      add(product);
      decrease(product);
      decrease(product);
    });

    expect(result.current.state.products[0].quantity).toBe(0);
  });

  it("should NOT add same product twice", () => {
    const product = server.create("product");

    act(() => {
      add(product);
      add(product);
    });

    expect(result.current.state.products).toHaveLength(1);
  });

  it("should toggle open state", () => {
    expect(result.current.state.open).toBe(false);

    act(() => toggle());

    expect(result.current.state.open).toBe(true);

    act(() => toggle());

    expect(result.current.state.open).toBe(false);
    expect(result.current.state.products).toHaveLength(0);
  });

  it("should remove a product from the store", () => {
    const [product1, product2] = server.createList("product", 2);

    act(() => {
      add(product1);
      add(product2);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => remove(product2));

    expect(result.current.state.products).toHaveLength(1);
    expect(result.current.state.products[0]).toEqual(product1);
  });

  it("should not remove a product does not exists", () => {
    const [product1, product2, product3] = server.createList("product", 3);

    act(() => {
      add(product1);
      add(product2);
    });

    expect(result.current.state.products).toHaveLength(2);

    act(() => remove(product3));

    expect(result.current.state.products).toHaveLength(2);
  });

  it("should clear cart", () => {
    const products = server.createList("product", 5);

    act(() => {
      for (const product of products) {
        add(product);
      }
    });

    expect(result.current.state.products).toHaveLength(5);

    act(() => removeAll());

    expect(result.current.state.products).toHaveLength(0);
  });
});

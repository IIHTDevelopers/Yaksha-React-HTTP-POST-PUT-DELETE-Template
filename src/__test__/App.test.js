import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "../App";
import useFetchProducts from "../hooks/useFetchProducts";
import useCart from "../hooks/useCart";
import '@testing-library/jest-dom';

jest.mock("../hooks/useFetchProducts");
jest.mock("../hooks/useCart");

describe("boundary", () => {
  it("AppComponent boundary renders ProductList and Cart components when data is loaded", async () => {
    const products = [{ id: 1, title: "Product 1", price: 100 }];
    const cart = [];
    useFetchProducts.mockReturnValue({ products, loading: false, error: null });
    useCart.mockReturnValue({ cart, addToCart: jest.fn(), removeFromCart: jest.fn(), updateQuantity: jest.fn() });

    render(<App />);

    await waitFor(() => expect(screen.getByText("Product Inventory")).toBeInTheDocument());
    expect(screen.getByText("Product 1")).toBeInTheDocument();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("AppComponent boundary adds product to cart", async () => {
    const products = [{ id: 1, title: "Product 1", price: 100 }];
    const cart = [];
    const addToCart = jest.fn();
    useFetchProducts.mockReturnValue({ products, loading: false, error: null });
    useCart.mockReturnValue({ cart, addToCart, removeFromCart: jest.fn(), updateQuantity: jest.fn() });

    render(<App />);

    const addButton = screen.getByText("Add to Cart");
    fireEvent.click(addButton);

    expect(addToCart).toHaveBeenCalledWith({ id: 1, title: "Product 1", price: 100 });
  });

  it("AppComponent boundary removes product from cart", async () => {
    const cart = [{ id: 1, title: "Product 1", price: 100 }];
    const removeFromCart = jest.fn();
    useFetchProducts.mockReturnValue({ products: [], loading: false, error: null });
    useCart.mockReturnValue({ cart, addToCart: jest.fn(), removeFromCart, updateQuantity: jest.fn() });

    render(<App />);

    const removeButton = screen.getByText((content, element) => element.tagName.toLowerCase() === 'button' && content === "Remove from Cart");
    fireEvent.click(removeButton);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("AppComponent boundary updates quantity in cart", async () => {
    const cart = [{ id: 1, title: "Product 1", price: 100, quantity: 1 }];
    const updateQuantity = jest.fn();
    useFetchProducts.mockReturnValue({ products: [], loading: false, error: null });
    useCart.mockReturnValue({ cart, addToCart: jest.fn(), removeFromCart: jest.fn(), updateQuantity });

    render(<App />);

    const increaseButton = screen.getByText("Increase Quantity");
    fireEvent.click(increaseButton);

    expect(updateQuantity).toHaveBeenCalledWith(1, 2);
  });
});

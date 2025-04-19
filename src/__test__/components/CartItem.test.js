import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "../../components/CartItem";
import '@testing-library/jest-dom';

describe("boundary", () => {
    const mockProduct = {
        id: 1,
        title: "Sample Product",
        price: 19.99,
        quantity: 2,
        image: "sample-image-url"
    };
    const mockRemoveFromCart = jest.fn();
    const mockUpdateQuantity = jest.fn();

    it("CartItemComponent boundary renders CartItem component", () => {
        render(<CartItem product={mockProduct} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        expect(screen.getByText("Sample Product")).toBeInTheDocument();
        expect(screen.getByText("$19.99")).toBeInTheDocument();
        expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    });

    it("CartItemComponent boundary displays product title, price, and quantity", () => {
        render(<CartItem product={mockProduct} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        expect(screen.getByText("Sample Product")).toBeInTheDocument();
        expect(screen.getByText("$19.99")).toBeInTheDocument();
        expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
        // expect(screen.getByAltText("Sample Product")).toHaveAttribute("src", "sample-image-url");
    });

    it("CartItemComponent boundary triggers `removeFromCart` function on button click", () => {
        render(<CartItem product={mockProduct} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        const removeButton = screen.getByText("Remove from Cart");
        fireEvent.click(removeButton);
        expect(mockRemoveFromCart).toHaveBeenCalledWith(mockProduct.id);
    });

    it("CartItemComponent boundary triggers `updateQuantity` function on increase button click", () => {
        render(<CartItem product={mockProduct} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        const increaseButton = screen.getByText("Increase Quantity");
        fireEvent.click(increaseButton);
        expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, mockProduct.quantity + 1);
    });

    it("CartItemComponent boundary triggers `updateQuantity` function on decrease button click", () => {
        render(<CartItem product={mockProduct} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        const decreaseButton = screen.getByText("Decrease Quantity");
        fireEvent.click(decreaseButton);
        expect(mockUpdateQuantity).toHaveBeenCalledWith(mockProduct.id, mockProduct.quantity - 1);
    });
});

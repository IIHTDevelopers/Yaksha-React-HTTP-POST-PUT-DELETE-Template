import React from "react";
import { render, screen } from "@testing-library/react";
import Cart from "../../components/Cart";
import CartItem from "../../components/CartItem";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

jest.mock("../../components/CartItem", () => ({ product, removeFromCart, updateQuantity }) => (
    <div data-testid={`cart-item-${product.id}`}>
        <h3>{product.title}</h3>
        <p>${product.price}</p>
        <p>Quantity: {product.quantity}</p>
        <button onClick={() => updateQuantity(product.id, product.quantity + 1)}>Increase Quantity</button>
        <button onClick={() => updateQuantity(product.id, product.quantity - 1)}>Decrease Quantity</button>
        <button onClick={() => removeFromCart(product.id)}>Remove from Cart</button>
    </div>
));

describe("boundary", () => {
    const mockCart = [
        { id: 1, title: "Product 1", price: 29.99, quantity: 2 },
        { id: 2, title: "Product 2", price: 39.99, quantity: 1 },
    ];
    const mockRemoveFromCart = jest.fn();
    const mockUpdateQuantity = jest.fn();

    it("CartComponent boundary renders Cart component", () => {
        render(<Cart cart={mockCart} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        expect(screen.getByText("Your Cart")).toBeInTheDocument();
    });

    it('CartComponent boundary displays "Your cart is empty." message when the cart is empty', () => {
        render(<Cart cart={[]} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        expect(screen.getByText("Your cart is empty.")).toBeInTheDocument();
    });

    it("CartComponent boundary displays multiple CartItem components when the cart is not empty", () => {
        render(<Cart cart={mockCart} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);
        expect(screen.getByTestId("cart-item-1")).toBeInTheDocument();
        expect(screen.getByTestId("cart-item-2")).toBeInTheDocument();
    });

    it("CartComponent boundary passes correct props to CartItem components", () => {
        render(<Cart cart={mockCart} removeFromCart={mockRemoveFromCart} updateQuantity={mockUpdateQuantity} />);

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("$29.99")).toBeInTheDocument();
        expect(screen.getByText("Quantity: 2")).toBeInTheDocument();

        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getByText("$39.99")).toBeInTheDocument();
        expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    });
});

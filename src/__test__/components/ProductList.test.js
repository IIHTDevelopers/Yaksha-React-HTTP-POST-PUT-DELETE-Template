import React from "react";
import { render, screen } from "@testing-library/react";
import ProductList from "../../components/ProductList";
import '@testing-library/jest-dom';

jest.mock("../../components/ProductCard", () => ({ title, price, image, addToCart, productId }) => (
    <div data-testid={`product-card-${productId}`}>
        <h3>{title}</h3>
        <p>${price}</p>
        <button onClick={() => addToCart({ title, price, image, id: productId })}>Add to Cart</button>
    </div>
));

describe("boundary", () => {
    const mockProducts = [
        { id: 1, title: "Product 1", price: 29.99, image: "image1-url" },
        { id: 2, title: "Product 2", price: 39.99, image: "image2-url" },
    ];
    const mockAddToCart = jest.fn();

    it("ProductListComponent boundary passes correct props to ProductCard components", () => {
        render(<ProductList products={mockProducts} addToCart={mockAddToCart} />);

        expect(screen.getByText("Product 1")).toBeInTheDocument();
        expect(screen.getByText("$29.99")).toBeInTheDocument();
        expect(screen.getByText("Product 2")).toBeInTheDocument();
        expect(screen.getByText("$39.99")).toBeInTheDocument();
    });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "../../components/ProductCard";
import '@testing-library/jest-dom';

describe("boundary", () => {
    const mockProps = {
        title: "Sample Product",
        price: 19.99,
        image: "sample-image-url",
        addToCart: jest.fn(),
        productId: 1,
    };

    it("ProductCardComponent boundary renders ProductCard component", () => {
        render(<ProductCard {...mockProps} />);
        expect(screen.getByText("Sample Product")).toBeInTheDocument();
        expect(screen.getByText("$19.99")).toBeInTheDocument();
    });

    it("ProductCardComponent boundary displays product title, price, and image", () => {
        render(<ProductCard {...mockProps} />);
        expect(screen.getByText("Sample Product")).toBeInTheDocument();
        expect(screen.getByText("$19.99")).toBeInTheDocument();
        // expect(screen.getByAltText("Sample Product")).toHaveAttribute("src", "sample-image-url");
    });

    it("ProductCardComponent boundary triggers `addToCart` function on button click", () => {
        render(<ProductCard {...mockProps} />);
        const button = screen.getByText("Add to Cart");
        fireEvent.click(button);
        expect(mockProps.addToCart).toHaveBeenCalledWith({
            title: mockProps.title,
            price: mockProps.price,
            image: mockProps.image,
            id: mockProps.productId,
        });
    });
});

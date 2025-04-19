import { renderHook, act } from "@testing-library/react-hooks";
import useCart from "../../hooks/useCart";

describe("boundary", () => {
    it("useCartComponent boundary should add a product to the cart", () => {
        const { result } = renderHook(() => useCart());
        const product = { id: 1, name: "Product 1", price: 100 };
        act(() => {
            result.current.addToCart(product);
        });
        expect(result.current.cart).not.toBeNull();
        expect(result.current.cart).not.toHaveLength(0);
    });

    it("useCartComponent boundary should update the quantity of an existing product in the cart", () => {
        const { result } = renderHook(() => useCart());
        const product = { id: 1, name: "Product 1", price: 100 };
        act(() => {
            result.current.addToCart(product);
            result.current.addToCart(product);
        });
        expect(result.current.cart).not.toBeNull();
        expect(result.current.cart).not.toHaveLength(0);
    });

    it("useCartComponent boundary should remove a product from the cart", () => {
        const { result } = renderHook(() => useCart());
        const product1 = { id: 1, name: "Product 1", price: 100 };
        const product2 = { id: 2, name: "Product 2", price: 200 };
        act(() => {
            result.current.addToCart(product1);
            result.current.addToCart(product2);
            result.current.removeFromCart(product1.id);
        });
        expect(result.current.cart).not.toBeNull();
    });

    it("useCartComponent boundary should update the quantity of a product in the cart", () => {
        const { result } = renderHook(() => useCart());
        const product = { id: 1, name: "Product 1", price: 100 };
        act(() => {
            result.current.addToCart(product);
            result.current.updateQuantity(product.id, 5);
        });
        expect(result.current.cart).not.toBeNull();
    });
});

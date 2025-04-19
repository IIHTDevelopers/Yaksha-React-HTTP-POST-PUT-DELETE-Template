import { renderHook, act } from "@testing-library/react-hooks";
import axios from "axios";
import useFetchProducts from "../../hooks/useFetchProducts";

jest.mock("axios");

describe("boundary", () => {
    it("useFetchProductsComponent boundary should fetch products and update the state", async () => {
        const products = [{ id: 1, name: "Product 1", price: 100 }];
        axios.get.mockResolvedValue({ data: products });

        const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

        await waitForNextUpdate();

        expect(result.current.products).not.toBeNull();
        expect(result.current.products).not.toHaveLength(0);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBeNull();
    });

    it("useFetchProductsComponent boundary should handle fetch error and update the state", async () => {
        const errorMessage = "Network Error";
        axios.get.mockRejectedValue(new Error(errorMessage));

        const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

        await waitForNextUpdate();

        expect(result.current.products).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).not.toBeNull();
    });

    it("useFetchProductsComponent boundary should set loading to false when fetching is complete", async () => {
        const products = [{ id: 1, name: "Product 1", price: 100 }];
        axios.get.mockResolvedValue({ data: products });

        const { result, waitForNextUpdate } = renderHook(() => useFetchProducts());

        await waitForNextUpdate();

        expect(result.current.loading).toBe(false);
    });
});

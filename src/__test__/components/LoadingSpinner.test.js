import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingSpinner from "../../components/LoadingSpinner";
import '@testing-library/jest-dom';

describe("boundary", () => {
    it("LoadingSpinnerComponent boundary renders LoadingSpinner component", () => {
        render(<LoadingSpinner />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});

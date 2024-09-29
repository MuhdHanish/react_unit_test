import { render, screen } from "@testing-library/react";
import Greet from "../../src/components/Greet";
import "@testing-library/jest-dom/vitest";

describe('Greet', () => {
    it('should render Hello with the name when name is provided', () => {
        render(<Greet name="Hanish" />);
        const heading = screen.getByRole("heading");
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveTextContent(/hanish/i);
    });
    it("should render login button when the provided name is empty", () => { 
        render(<Greet />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/login/i);
    });
});
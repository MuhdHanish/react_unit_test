import { render, screen } from "@testing-library/react";
import { User } from "../../src/entities";
import UserAccount from "../../src/components/UserAccount";

describe("UserAccount", () => {
    it("should render the user name", () => { 
        const user: User = {
            name: "Jhone Doe",
            id: 1,
        };
        render(<UserAccount user={user} />);
        expect(screen.getByText(user.name)).toBeInTheDocument();
    });
    it("should not render edit button if user not admin", () => {
        const user: User = {
            name: "Jhone Doe",
            id: 1,
        };
        render(<UserAccount user={user} />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
    it("should render the edit button if the user is admin and the button text is 'edit'", () => {
        const user: User = {
            name: "Jhone Doe",
            id: 1,
            isAdmin: true,
        };
        render(<UserAccount user={user} />);
        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent(/edit/i);
    });
});
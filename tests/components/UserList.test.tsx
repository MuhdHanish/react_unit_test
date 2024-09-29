import { render, screen } from "@testing-library/react";
import UserList from "../../src/components/UserList";
import { User } from "../../src/entities";

describe("UserList", () => {
    it("should render 'no user' if users array is empty", () => {
        render(<UserList users={[]} />);
        expect(screen.getByText(/no users/i)).toBeInTheDocument();
    });
    it("should not be render 'no user' if users array is not empty", () => {
        const users: User[] = [
            {
                name: "Jhone Doe",
                id: 1,
            },
            {
                name: "Jane Doe",
                id: 2,
            },
        ];
        render(<UserList users={users} />);
        expect(screen.queryByText(/no users/i)).not.toBeInTheDocument();
    });
    it("should not render the users list if the users array is empty", () => {
        render(<UserList users={[]} />);
        expect(screen.queryByRole("list")).not.toBeInTheDocument();
    });
    it("should render the users list if the users array is not empty", () => {
        const users: User[] = [
            {
                name: "Jhone Doe",
                id: 1,
            },
            {
                name: "Jane Doe",
                id: 2,
            },
        ];
        render(<UserList users={users} />);
        users.forEach(user => {
            const link = screen.getByRole("link", { name: user?.name });
            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute("href", `/users/${user?.id}`);
        })
    });
});
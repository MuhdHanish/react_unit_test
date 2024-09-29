import { render, screen } from "@testing-library/react";
import ExpandableText from "../../src/components/ExpandableText";
import userEvent from "@testing-library/user-event";

describe("ExpandableText", () => {
    const limit = 255;
    const text = 'a'.repeat(limit + 1);
    const trucatedText = text.substring(0, limit) + '...';
    it("should render the text as same if the length of text is less than or equal to limit", () => {
        render(
            <ExpandableText
                text={"Short Text"}
                limit={limit}
            />
        );
        expect(screen.getByText("Short Text")).toBeInTheDocument();
    });
    it("should truncate text if longer than limit", () => {
        render(
            <ExpandableText
                text={text}
                limit={limit}
            />
        );
        expect(screen.getByText(trucatedText)).toBeInTheDocument();
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent(/more/i);
    });
    it("should expand the text when the Show More button is clicked", async () => {
        render(
            <ExpandableText
                text={text}
                limit={limit}
            />
        );
        const button = screen.getByRole('button');
        const event = userEvent.setup();

        await event.click(button);
        
        expect(screen.queryByText(text)).toBeInTheDocument();
        expect(button).toHaveTextContent(/less/i);
    });
    it("should collapse the text when the Show Less button is clicked", async () => {
        render(
            <ExpandableText
                text={text}
                limit={limit}
            />
        );
        const showMoreButton = screen.getByRole('button', {name: /more/i });
        const event = userEvent.setup();
        await event.click(showMoreButton);

        const showLessButton = screen.getByRole('button', { name: /less/i });
        await event.click(showLessButton);

        expect(screen.queryByText(trucatedText)).toBeInTheDocument();
        expect(showMoreButton).toHaveTextContent(/more/i);
    });
});

import { render, screen } from "@testing-library/react";
import ProductImageGallery from "../../src/components/ProductImageGallery";

describe("ProductImageGallery", () => {
    it("should not render anything if no imageUrls are provided", () => {
        const { container } = render(<ProductImageGallery imageUrls={[]} />);
        expect(container).toBeEmptyDOMElement();
    });
    it("should display images when imageUrls are provided", () => {
        const urls = [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/300",
        ];
        render(
            <ProductImageGallery
                imageUrls={urls}
            />
        );
        const images = screen.getAllByRole("img");
        expect(images).toHaveLength(urls.length);
        urls.forEach((url, index) => {
            expect(images[index]).toHaveAttribute('src', url);
        });
    });
});

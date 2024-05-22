import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";
import { describe, expect, test } from "vitest";

describe("<BlogForm />", () => {
    test("create blog with right details recieved", async () => {
        // Make a test for the new blog form. The test should check, 
        // that the form calls the event handler it received as props with the right details when a new blog is created.
    
        const createBlog = vi.fn();
        const user = userEvent.setup();
    
        render(<BlogForm handleCreateNewBlog={createBlog} />);
        
        const titleInput = screen.getByPlaceholderText('title-input');
        const authorInput = screen.getByPlaceholderText('author-input');
        const urlInput = screen.getByPlaceholderText('url-input');

        const createButton = screen.getByText('create')

        await user.type(titleInput, 'testing title input');
        await user.type(authorInput, 'testing author input');
        await user.type(urlInput, 'testing url input');

        await user.click(createButton);

        expect(createBlog.mock.calls).toHaveLength(1);
        expect(createBlog.mock.calls[0][0].title).toBe('testing title input');
        expect(createBlog.mock.calls[0][0].author).toBe('testing author input');
        expect(createBlog.mock.calls[0][0].url).toBe('testing url input');
      })
})
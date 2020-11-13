import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";

import App from "./App";

test("search works right", () => {
    render(<App />);
    const searchInput = screen.getByRole("textbox");
    expect(screen.getByText(/surname one/i)).toBeInTheDocument();
    expect(screen.getByText(/surname two/i)).toBeInTheDocument();
    userEvent.type(searchInput, "surname one");
    expect(screen.getByText(/surname one/i)).toBeInTheDocument();
    expect(screen.queryByText(/surname two/i)).not.toBeInTheDocument();
});

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

import TableRowActions, { IProps } from "../tableRowActions";

const defaultProps: IProps = {
    isEditing: false,
    isDeleted: false,
    onEdit: jest.fn(),
    onSave: jest.fn(),
    onDelete: jest.fn(),
    onRestore: jest.fn(),
};

describe("Renders edit and save buttons", () => {
    test("renders edit button", () => {
        render(<TableRowActions {...defaultProps} />);
        const button = screen.getByText(/edit/i);
        expect(button).toBeInTheDocument();
    });

    test("renders edit button", () => {
        render(<TableRowActions {...defaultProps} isEditing isDeleted />);
        const button = screen.getByText(/edit/i);
        expect(button).toBeInTheDocument();
    });

    test("renders save button", () => {
        render(<TableRowActions {...defaultProps} isEditing />);
        const button = screen.getByText(/save/i);
        expect(button).toBeInTheDocument();
    });
});

describe("Renders delete and restore buttons", () => {
    test("renders delete button", () => {
        render(<TableRowActions {...defaultProps} />);
        const button = screen.getByText(/delete/i);
        expect(button).toBeInTheDocument();
    });

    test("renders restore button", () => {
        render(<TableRowActions {...defaultProps} isDeleted />);
        const button = screen.getByText(/restore/i);
        expect(button).toBeInTheDocument();
    });
});

import { screen } from "@testing-library/dom";
import { render } from "@testing-library/react";
import React from "react";

import TableCell, { IProps } from "../tableCell";

const defaultProps: IProps = {
    isEditing: false,
    value: "test",
    name: "name",
    errors: [],
    onChange: jest.fn(),
};

describe("Input", () => {
    test("renders input when cell is editing", () => {
        render(<TableCell {...defaultProps} isEditing />);
        const input = screen.getByTestId(/input/i);
        expect(input).toBeInTheDocument();
    });
});

describe("Text", () => {
    test("renders text when cell is not editing", () => {
        render(<TableCell {...defaultProps} />);
        const text = screen.getByText(/test/i);
        expect(text).toBeInTheDocument();
    });
    test("renders text when id cell is editing", () => {
        render(<TableCell {...defaultProps} isEditing name="id" />);
        const text = screen.getByText(/test/i);
        expect(text).toBeInTheDocument();
    });
});

describe("Error", () => {
    test("renders error when cell is editing", () => {
        render(<TableCell {...defaultProps} isEditing errors={["name"]} />);
        const text = screen.getByText(/invalid format/i);
        expect(text).toBeInTheDocument();
    });
    test("does not render error when errors array does not include cell name", () => {
        render(<TableCell {...defaultProps} isEditing errors={["name"]} name="surname" />);
        const text = screen.queryByText(/invalid format/i);
        expect(text).not.toBeInTheDocument();
    });
    test("does not render error when errors array is empty", () => {
        render(<TableCell {...defaultProps} isEditing />);
        const text = screen.queryByText(/invalid format/i);
        expect(text).not.toBeInTheDocument();
    });
    test("renders required error when value is empty", () => {
        render(<TableCell {...defaultProps} isEditing errors={["name"]} value="" />);
        const text = screen.getByText(/is mandatory/i);
        expect(text).toBeInTheDocument();
    });
});

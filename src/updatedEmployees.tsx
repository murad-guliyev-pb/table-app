import Box from "@material-ui/core/Box";
import React from "react";

// eslint-disable-next-line
import { IEmployee } from "./helpers/models";

interface IProps {
    deletedEmployees: IEmployee[];
    editedEmployees: IEmployee[];
}

const UpdatedEmployees: React.FC<IProps> = ({ deletedEmployees, editedEmployees }) => {
    return (
        <>
            <Box>Updated: {JSON.stringify(editedEmployees)}</Box>
            <Box marginTop={2}>Deleted: {JSON.stringify(deletedEmployees)}</Box>
        </>
    );
};

export default UpdatedEmployees;

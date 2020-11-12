import { TableRow } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableHeadComponent from "@material-ui/core/TableHead";
import Typography from "@material-ui/core/Typography";
import React from "react";

const TableHead: React.FC = (): JSX.Element => {
    const renderCell = (value: string, width?: number) => (
        <TableCell style={{ width }}>
            <Typography style={{ fontWeight: 500 }} variant="subtitle1" component="p">
                {value}
            </Typography>
        </TableCell>
    );

    return (
        <TableHeadComponent>
            <TableRow>
                {renderCell("ID")}
                {renderCell("Name")}
                {renderCell("Surname")}
                {renderCell("Date of birth")}
                {renderCell("Position")}
                {renderCell("Phone number")}
                {renderCell("Actions", 200)}
            </TableRow>
        </TableHeadComponent>
    );
};

export default TableHead;

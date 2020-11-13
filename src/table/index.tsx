import Paper from "@material-ui/core/Paper";
import TableComponent from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import React, { useState } from "react";

import { IEmployee } from "../helpers/models";
import TableHead from "./tableHead";
import Row from "./tableRow";

interface IProps {
    employees: IEmployee[];
    deletedEmployees: IEmployee[];
    onEmployeeChange: (employee: IEmployee) => void;
    onEmployeeDelete: (employeeId: string) => void;
    onEmployeeRestore: (employeeId: string) => void;
}

const Table: React.FC<IProps> = ({
    employees,
    deletedEmployees,
    onEmployeeChange,
    onEmployeeDelete,
    onEmployeeRestore,
}): JSX.Element => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [editingEmployeeId, setEditingEmployeeId] = useState<string>("");

    const handleEditingEmployee = (employeeId: string) => {
        setEditingEmployeeId(employeeId);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getEmployees = () => {
        if (rowsPerPage > 0) {
            return employees.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
        }

        return employees;
    };

    return (
        <TableContainer component={Paper} elevation={2} variant="outlined">
            <TableComponent>
                <TableHead />
                <TableBody>
                    {getEmployees().map((employee) => (
                        <Row
                            key={employee.id}
                            employeeData={employee}
                            deletedEmployees={deletedEmployees}
                            isEditing={employee.id === editingEmployeeId}
                            setIsEditing={handleEditingEmployee}
                            onEmployeeChange={onEmployeeChange}
                            onEmployeeDelete={onEmployeeDelete}
                            onEmployeeRestore={onEmployeeRestore}
                        />
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, { label: "All", value: -1 }]}
                            colSpan={2}
                            count={employees.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </TableRow>
                </TableFooter>
            </TableComponent>
        </TableContainer>
    );
};

export default Table;

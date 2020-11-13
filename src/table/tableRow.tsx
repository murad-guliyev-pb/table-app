import TableCellComponent from "@material-ui/core/TableCell";
import TableRowComponent from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";

import { IEmployee } from "../helpers/models";
import {
    validateDateOfBirth,
    validateName,
    validatePhoneNumber,
    validatePosition,
    validateSurname,
} from "../helpers/utils";
import TableCell from "./tableCell";
import TableRowActions from "./tableRowActions";

export interface IProps {
    employeeData: IEmployee;
    deletedEmployees: IEmployee[];
    isEditing: boolean;
    setIsEditing: (employeeId: string) => void;
    onEmployeeChange: (employee: IEmployee) => void;
    onEmployeeDelete: (employeeId: string) => void;
    onEmployeeRestore: (employeeId: string) => void;
}

const TableRow: React.FC<IProps> = ({
    employeeData,
    deletedEmployees,
    isEditing,
    setIsEditing,
    onEmployeeChange,
    onEmployeeDelete,
    onEmployeeRestore,
}): JSX.Element => {
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [employee, setEmployee] = useState<IEmployee>(employeeData);
    const [errors, setErrors] = useState<Array<keyof IEmployee>>([]);
    const keys = Object.keys(employee) as (keyof IEmployee)[];

    useEffect(() => {
        setEmployee(employeeData);
    }, [employeeData, isEditing]);

    useEffect(() => {
        const isEmployeeInDeletedEmployeesList = deletedEmployees.some((item) => item.id === employee.id);
        setIsDeleted(isEmployeeInDeletedEmployeesList);
    }, [deletedEmployees]);

    const validateEmployee = (employee: IEmployee) => {
        const { name, surname, dateOfBirth, position, phoneNumber } = employee;
        const _errors: (keyof IEmployee)[] = [];

        if (name === "" || !validateName(name)) {
            _errors.push("name");
        }

        if (surname === "" || !validateSurname(surname)) {
            _errors.push("surname");
        }

        if (dateOfBirth === "" || !validateDateOfBirth(dateOfBirth)) {
            _errors.push("dateOfBirth");
        }

        if (position === "" || !validatePosition(position)) {
            _errors.push("position");
        }

        if (phoneNumber === "" || !validatePhoneNumber(phoneNumber)) {
            _errors.push("phoneNumber");
        }

        setErrors(_errors);
        return _errors.length === 0;
    };

    const handleCellChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value },
        } = event;

        for (const key in employee) {
            if (key === name) {
                const _employee: IEmployee = { ...employee };
                _employee[key as keyof IEmployee] = value;
                setEmployee(_employee);
            }
        }
    };

    const handleEdit = () => {
        setErrors([]);
        setIsEditing(employee.id);
    };

    const handleSave = () => {
        if (validateEmployee(employee)) {
            onEmployeeChange(employee);
            setIsEditing("");
        }
    };

    const handleDelete = () => {
        onEmployeeDelete(employee.id);
        setIsEditing("");
    };

    const handleRestore = () => {
        onEmployeeRestore(employee.id);
    };

    return (
        <TableRowComponent style={{ backgroundColor: isDeleted ? "rgba(220, 0, 78, 0.08)" : "inherit" }}>
            {keys.map((key) => (
                <TableCellComponent key={key}>
                    <TableCell
                        errors={errors}
                        name={key}
                        isEditing={isEditing}
                        value={employee[key]}
                        onChange={handleCellChange}
                    />
                </TableCellComponent>
            ))}
            <TableCellComponent>
                <TableRowActions
                    isEditing={isEditing}
                    isDeleted={isDeleted}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    onDelete={handleDelete}
                    onRestore={handleRestore}
                />
            </TableCellComponent>
        </TableRowComponent>
    );
};

export default TableRow;

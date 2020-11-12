import { Button, Container, Grid, TextField, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import { isEqual } from "lodash";
import React, { useState } from "react";

// eslint-disable-next-line
import { IEmployee } from "./helpers/models";
import { employeesList } from "./MockEmployees";
import Table from "./table";
import UpdatedEmployees from "./updatedEmployees";

const App = (): JSX.Element => {
    const [deletedEmployees, setDeletedEmployees] = useState<IEmployee[]>([]);
    const [editedEmployees, setEditedEmployees] = useState<IEmployee[]>([]);
    const [employees, setEmployees] = useState<IEmployee[]>(employeesList);
    const [isSubmited, setIsSubmited] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");

    // Helpers

    const isEmployeeEqualToInitial = (employee: IEmployee) => {
        const initialEmployee = employeesList.find((item) => item.id === employee.id);
        return isEqual(employee, initialEmployee);
    };

    const existsInEditedEmployees = (employeeId: string) => {
        return editedEmployees.some((item) => item.id === employeeId);
    };

    const removeEmployeeFromEditedEmployees = (employeeId: string) => {
        if (existsInEditedEmployees(employeeId)) {
            const filtered = editedEmployees.filter((item) => item.id !== employeeId);
            setEditedEmployees(filtered);
        }
    };

    const addEmployeeToEditedEmployees = (employee: IEmployee) => {
        if (!existsInEditedEmployees(employee.id)) {
            setEditedEmployees([...editedEmployees, employee]);
        }
    };

    const replaceEmployeeInEditedEmployees = (employee: IEmployee) => {
        const updatedEmployees = editedEmployees.map((item) => (item.id === employee.id ? employee : item));
        setEditedEmployees(updatedEmployees);
    };

    const addRestoredEmployeeToEditedEmployees = (employeeId: string) => {
        const restoredEmployee = employees.find((item) => item.id === employeeId);
        if (restoredEmployee && !isEmployeeEqualToInitial(restoredEmployee)) {
            addEmployeeToEditedEmployees(restoredEmployee);
        }
    };

    // Handlers

    const handleEmployeeChange = (employee: IEmployee) => {
        if (isEmployeeEqualToInitial(employee)) {
            removeEmployeeFromEditedEmployees(employee.id);
        } else {
            if (existsInEditedEmployees(employee.id)) {
                replaceEmployeeInEditedEmployees(employee);
            } else {
                addEmployeeToEditedEmployees(employee);
            }
        }

        const updatedEmployees = employees.map((item) => (item.id === employee.id ? employee : item));
        setEmployees(updatedEmployees);
    };

    const handleEmployeeDelete = (employeeId: string) => {
        const deletedEmployee = employees.find((item) => item.id === employeeId);
        if (deletedEmployee) {
            setDeletedEmployees([...deletedEmployees, deletedEmployee]);
        }

        removeEmployeeFromEditedEmployees(employeeId);
    };

    const handleEmployeeRestore = (employeeId: string) => {
        const filtered = deletedEmployees.filter((item) => item.id !== employeeId);
        setDeletedEmployees(filtered);

        addRestoredEmployeeToEditedEmployees(employeeId);
    };

    const resetToInitial = () => {
        setIsSubmited(false);
        setEmployees(employeesList);
        setEditedEmployees([]);
        setDeletedEmployees([]);
    };

    const getEmployees = () => {
        const filtered = employees.filter((item) => {
            const values = Object.values(item);
            for (const val of values) {
                if (val.toLowerCase().includes(searchValue.toLocaleLowerCase())) {
                    return item;
                }
            }
        });
        return filtered;
    };

    return (
        <>
            <Box style={{ backgroundColor: "#1976d2", color: "white", padding: "12px 0" }}>
                <Grid container direction="row" justify="center">
                    <Typography variant="h4" component="h4">
                        Table Application
                    </Typography>
                </Grid>
            </Box>
            <Container maxWidth={"lg"}>
                <Box marginY={5}>
                    <Box marginBottom={2}>
                        <Grid container direction="row" justify="flex-end" alignItems="flex-end">
                            <Box marginRight={1}>
                                <Typography variant="subtitle1" component="p">
                                    Search:
                                </Typography>
                            </Box>
                            <TextField value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
                        </Grid>
                    </Box>
                    {employees.length > 0 && (
                        <Table
                            employees={getEmployees()}
                            deletedEmployees={deletedEmployees}
                            onEmployeeChange={handleEmployeeChange}
                            onEmployeeDelete={handleEmployeeDelete}
                            onEmployeeRestore={handleEmployeeRestore}
                        />
                    )}
                    <Box marginTop={2}>
                        <Grid container direction="row" justify="flex-end" alignItems="baseline">
                            <Box marginRight={1}>
                                <Button
                                    style={{ backgroundColor: "#1976d2" }}
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setIsSubmited(true)}
                                >
                                    Submit
                                </Button>
                            </Box>
                            <Button variant="contained" color="secondary" onClick={resetToInitial}>
                                Reset to initial
                            </Button>
                        </Grid>
                    </Box>
                    {isSubmited && (
                        <Box marginTop={5}>
                            <UpdatedEmployees deletedEmployees={deletedEmployees} editedEmployees={editedEmployees} />
                        </Box>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default App;

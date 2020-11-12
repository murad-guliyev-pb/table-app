import Button from "@material-ui/core/Button";
import React from "react";

export interface IProps {
    isEditing: boolean;
    isDeleted: boolean;
    onEdit: () => void;
    onSave: () => void;
    onDelete: () => void;
    onRestore: () => void;
}

const TableRowActions: React.FC<IProps> = ({
    isEditing,
    isDeleted,
    onEdit,
    onSave,
    onDelete,
    onRestore,
}): JSX.Element => {
    const renderEditButton = () => (
        <Button style={{ color: "#1976d2" }} disabled={isDeleted} onClick={onEdit}>
            Edit
        </Button>
    );

    const renderSaveButton = () => (
        <Button style={{ color: "#1976d2" }} onClick={onSave}>
            Save
        </Button>
    );

    const renderDeleteButton = () => (
        <Button color="secondary" onClick={onDelete}>
            Delete
        </Button>
    );

    const renderRestoreButton = () => (
        <Button color="secondary" onClick={onRestore}>
            Restore
        </Button>
    );

    return (
        <>
            {isEditing && !isDeleted ? renderSaveButton() : renderEditButton()}
            {isDeleted ? renderRestoreButton() : renderDeleteButton()}
        </>
    );
};

export default TableRowActions;

import React from "react";
import { useDeleteRow } from "../../Hooks/useDeleteRow";
import { useUpdateData } from "../../Hooks/useUpdateData";
import { TrashCan, Edit, Checkmark, Close } from "@carbon/icons-react";
import {
   Table,
   TableHead,
   TableRow,
   TableHeader,
   TableBody,
   TableCell,
   Modal,
   Stack,
} from "@carbon/react";

const headers = [
   "Ingredient",
   "Category",
   "Calories",
   "Fat",
   "Protein",
   "Carbs",
   "Actions",
];

const MyTable = ({ data }) => {
   const { mutate } = useDeleteRow();
   const { mutate: update } = useUpdateData();
   const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
   const [deleteRowId, setDeleteRowId] = React.useState(null);
   const [editRowId, setEditRowId] = React.useState(null);
   const [editedRow, setEditedRow] = React.useState(null);

   const handleDeleteRow = (rowId) => {
      setDeleteRowId(rowId);
      setIsConfirmationOpen(true);
   };

   const handleDelete = () => {
      mutate(deleteRowId);
      setIsConfirmationOpen(false);
      setDeleteRowId(null);
   };

   const handleEdit = (rowId) => {
      setEditRowId(rowId);
      const editedRowData = data.find((row) => row.id === rowId);
      setEditedRow(editedRowData);
   };

   const handleSave = () => {
      update(editedRow);
      setEditRowId(null);
      setEditedRow(null);
   };

   const handleCancel = () => {
      setEditRowId(null);
      setEditedRow(null);
      setIsConfirmationOpen(false);
      setDeleteRowId(null);
   };

   return (
      <>
         <Table size="lg" useZebraStyles={false}>
            <TableHead>
               <TableRow>
                  {headers.map((header) => (
                     <TableHeader id={header.key} key={header}>
                        {header}
                     </TableHeader>
                  ))}
               </TableRow>
            </TableHead>
            <TableBody>
               {data.map((row) => (
                  <TableRow key={row.id}>
                     {Object.keys(row)
                        .filter((key) => key !== "id")
                        .map((key) => (
                           <TableCell key={key}>
                              {editRowId === row.id ? (
                                 <input
                                    type="text"
                                    value={editedRow[key]}
                                    onChange={(e) =>
                                       setEditedRow({
                                          ...editedRow,
                                          [key]: e.target.value,
                                       })
                                    }
                                 />
                              ) : (
                                 row[key]
                              )}
                           </TableCell>
                        ))}
                     <TableCell>
                        {editRowId === row.id ? (
                           <>
                              <Stack gap={4} orientation="horizontal">
                                 <Checkmark onClick={handleSave} />
                                 <Close onClick={handleCancel} />
                              </Stack>
                           </>
                        ) : (
                           <>
                              <Stack gap={4} orientation="horizontal">
                                 <Edit onClick={() => handleEdit(row.id)} />
                                 <TrashCan
                                    onClick={() => handleDeleteRow(row.id)}
                                 />
                              </Stack>
                           </>
                        )}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
         <Modal
            open={isConfirmationOpen}
            danger
            modalHeading="Are you sure you want to delete this row?"
            primaryButtonText="Delete"
            secondaryButtonText="Cancel"
            onRequestSubmit={handleDelete}
            onRequestClose={handleCancel}
         />
      </>
   );
};

export default MyTable;

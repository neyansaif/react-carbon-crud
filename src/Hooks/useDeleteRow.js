import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteRow = () => {
   const queryClient = useQueryClient();

   const deleteRow = async (id) => {
      try {
         await axios.delete(`http://localhost:8000/ingredients/${id}`);
      } catch (error) {
         throw new Error("An error occurred while deleting a todo");
      }
   };

   const mutation = useMutation(deleteRow, {
      onSuccess: () => {
         queryClient.invalidateQueries("ingredients");
      },
   });

   return mutation;
};

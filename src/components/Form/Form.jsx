import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import usePostData from "../../Hooks/usePostData";
import {
   Modal,
   Stack,
   TextInput,
   Button,
   Select,
   SelectItem,
} from "@carbon/react";

const validationSchema = Yup.object().shape({
   ingredient: Yup.string()
      .required("Ingredients are required")
      .matches(/^[a-zA-Z ]*$/, "Ingredients must contain only letters"),
   calories: Yup.number().required("Calories are required"),
   fat: Yup.number().required("Fat is required"),
   protein: Yup.number().required("Protein is required"),
   carbs: Yup.number().required("Carbs are required"),
});

const initialValues = {
   ingredient: "",
   category: "",
   calories: "",
   fat: "",
   protein: "",
   carbs: "",
};

const FormModel = ({ toggleForm, isFormOpen }) => {
   const { mutate, isLoading: isPosting, isError: postError } = usePostData();

   const handleSubmit = (values) => {
      mutate(values);
      toggleForm();
   };

   return (
      <Modal
         open={isFormOpen}
         onRequestClose={toggleForm}
         modalHeading="Add Taco"
         passiveModal
         shouldSubmitOnEnter={false}
         danger={false}
      >
         <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         >
            {({ values, handleChange, handleSubmit }) => (
               <Form onSubmit={handleSubmit}>
                  <Stack gap={4}>
                     <TextInput
                        id="ingredient"
                        name="ingredient"
                        value={values.ingredient}
                        onChange={handleChange}
                        labelText="Ingredient"
                     />
                     <ErrorMessage
                        name="ingredient"
                        component="div"
                        className="error-message"
                     />
                     <Select
                        id="category"
                        labelText="Category"
                        value={values.category}
                        onChange={handleChange}
                     >
                        <SelectItem text="" value="" />
                        <SelectItem text="Protein" value="protein" />
                        <SelectItem text="Fat" value="fat" />
                        <SelectItem text="Carbs" value="carbs" />
                     </Select>
                     <ErrorMessage
                        name="category"
                        component="div"
                        className="error-message"
                     />
                     <TextInput
                        id="calories"
                        labelText="Calories"
                        name="calories"
                        value={values.calories}
                        onChange={handleChange}
                     />
                     <ErrorMessage
                        name="calories"
                        component="div"
                        className="error-message"
                     />
                     <TextInput
                        id="fat"
                        labelText="Fat"
                        name="fat"
                        value={values.fat}
                        onChange={handleChange}
                     />
                     <ErrorMessage
                        name="fat"
                        component="div"
                        className="error-message"
                     />
                     <TextInput
                        id="protein"
                        labelText="Protein"
                        name="protein"
                        value={values.protein}
                        onChange={handleChange}
                     />
                     <ErrorMessage
                        name="protein"
                        component="div"
                        className="error-message"
                     />
                     <TextInput
                        id="carbs"
                        labelText="Carbs"
                        name="carbs"
                        value={values.carbs}
                        onChange={handleChange}
                     />
                     <ErrorMessage
                        name="carbs"
                        component="div"
                        className="error-message"
                     />
                     <Button type="submit">Submit</Button>
                  </Stack>
                  {isPosting && <p>Adding Todo...</p>}
                  {postError && <p>Error: {postError.message}</p>}
               </Form>
            )}
         </Formik>
      </Modal>
   );
};

export default FormModel;

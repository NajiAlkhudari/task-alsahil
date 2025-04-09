import * as Yup from "yup";

const taskSchema = Yup.object().shape({
  taskName: Yup.string().required("Task name is required"),
  description: Yup.string().required("Description is required"),
  notes: Yup.string(),
});

export default taskSchema;

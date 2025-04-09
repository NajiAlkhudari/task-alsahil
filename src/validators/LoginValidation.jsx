import * as Yup from 'yup';

const loginSchema = Yup.object({
    email : Yup.string().email().required("email is Required"),
    password : Yup.string().required("Password is Required")
});


export default loginSchema ;


import * as Yup from 'yup';

const userSchema = Yup.object({
    name : Yup.string().required("Name is Required"),
    email : Yup.string().email().required("email is Required"),
    password : Yup.string().required("Password is Required"),
    role: Yup.number().required("Role is Required"),
    
});


export default userSchema ;
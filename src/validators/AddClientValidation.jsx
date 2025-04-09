

import * as Yup from 'yup';

const clientSchema = Yup.object({
    name : Yup.string().required("Name is Required"),
    companyName : Yup.string().required("companyName is Required"),
    address : Yup.string().required("Address is Required"),
    phone : Yup.string().required("Phone is Required"),
    notes : Yup.string(),
    
});


export default clientSchema ;
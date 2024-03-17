import * as yup from "yup";
import React, { useRef, useState } from "react";
import { Field, Formik } from "formik";
import PreviewImg from "./PreviewImg";
import KErrorMessage from "./components/KErrorMessage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const initialValues = {
  title: "GP Consultation",
  price: "24",
  details:
    "How many times have you called the doctor’s surgery, only to find that you can’t get an appointment for weeks? When you’re feeling ill, this is beyond irritating.",
  btnText: "Book Now",
  file: null,
};

const validationSchema = yup.object({
  title: yup
    .string()
    .min(3, "too small!")
    .max(500, "Too Long String")
    .required("Required"),
  details: yup
    .string()
    .min(5, "too small!")
    .max(500, "Too Long String")
    .required("Required"),
  price: yup
    .number()
    .min(0, "Not Valid")
    .max(9999999999, "Not Valid")
    .required("Price is Required!"),
  btnText: yup
    .string()
    .min(3, "too small!")
    .max(30, "Too Long String")
    .required("Required"),
  file: yup
    .mixed()
    .required("Image is required")
    .test(
      "fileType",
      "Invalid file type. Only image files are allowed.",
      (value) => {
        return value && ["image/jpeg", "image/png"].includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size too large. Maximum size allowed is 5MB.",
      (value) => {
        return value && value.size <= 5242880; // 5MB in bytes
      }
    ),
});

const showToastMessage = () => {
  toast.success("Updated!", {
    position: "top-center",
  });
};

const App = () => {
  const fileRef = useRef(null);
  const [inputValue, setInputValue] = useState('')
  return (
    <div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
          showToastMessage();
        }}
      >
        {({ values, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit} style={{ marginTop: "110px" }}>
            <h1>Expert One</h1>
            <h1>
              From Only ${" "}
              <Field
                type="text"
                name="price"
                placeholder="Enter Price"
                style={{ border: "none" }}
              />
            </h1>
            <KErrorMessage name="price" />
            <p>
              <Field
                type="text"
                name="details"
                size="100"
                // height="100px"
                placeholder="Enter Details"
                style={{ border: "none" }}
              />
              <KErrorMessage name="details" />
            </p>
            <Field
              type="text"
              name="title"
              placeholder="Enter Title"
              style={{ border: "none" }}
            />
            <KErrorMessage name="title" />
            <input
              hidden
              ref={fileRef}
              type="file"
              name="file"
              accept="image/*"
              onChange={(event) => {
                setFieldValue("file", event.target.files[0]);
              }}
            />
            <KErrorMessage name="file" />
            <PreviewImg file={values.file} refz={fileRef} />

            <button type="button">
              <Field
                type="text"
                size="10"
                name="btnText"
                style={{ border: "none" }}
                placeholder="Enter Text"
              />
            </button>
            <KErrorMessage name="btnText" />

            <div style={{ marginTop: "10px" }}>
              <button type="submit">Submit</button>
            </div>
          </form>
        )}
      </Formik>

      <div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;

// import React from "react";
// import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
// import * as yup from "yup";
// import KErrorMessage from "./components/KErrorMessage";

// const validationSchema = yup.object({
//   name: yup.string().required("Name is Required!"),
//   phone: yup
//     .number()
//     .min(1000000000, "Not Valid Phone Number!")
//     .max(9999999999, "Not Valid Phone Number!")
//     .required("Phone is Required!"),
//   password: yup
//     .string()
//     .matches(
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//       "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
//     )
//     .required("Password is Required!"),
//   gender: yup.string().required("Gender is Required!"),
//   date: yup.date().required("Date of Birth is required"),
//   income: yup.string().required("Required"),
//   about: yup
//     .string()
//     .min(5, "too small!")
//     .max(500, "Too Long String")
//     .required("Required"),
//   social: yup
//     .array()
//     .of(
//       yup
//         .string("String is Required!")
//         .min(4, "Too Short")
//         .max(20, "Too Long")
//         .required("Required")
//     )
//     .min(1, "Atleast One Social Media is Required!")
//     .required("Required"),
//   hobbies: yup
//     .array()
//     .of(
//       yup
//         .string("String is Required!")
//         .min(4, "Too Short")
//         .max(20, "Too Long")
//         .required("Required")
//     )
//     .min(1, "Atleast One Hobbies is Required!")
//     .required("Required"),
// });
// const App = () => {
//   return (
//     <div>
//       <Formik
//         validationSchema={validationSchema}
//         initialValues={{
//           name: "",
//           phone: "",
//           password: "",
//           gender: "",
//           date: "",
//           income: "",
//           about: "",
//           social: [],
//           hobbies: [],
//         }}
//         onSubmit={(values) => {
//           console.log(values);
//         }}
//       >
//         {({ values }) => (
//           <Form>
//             <label>Name:</label>
//             <Field name="name" type="text" />
//             <KErrorMessage name="name" />
//             <br /> <br />
//             <label>Phone:</label>
//             <Field name="phone" type="number" />
//             <KErrorMessage name="phone" />
//             <br /> <br />
//             <label>Password:</label>
//             <Field name="password" type="password" />
//             <KErrorMessage name="password" />
//             <br /> <br />
//             <label>Gender:</label>
//             <br /> <br />
//             <label>Male:</label>
//             <Field name="gender" value="male" type="radio" />
//             <label>Female:</label>
//             <Field name="gender" value="female" type="radio" />
//             <KErrorMessage name="gender" />
//             <br /> <br />
//             <label>Date:</label>
//             <Field name="date" type="date" />
//             <KErrorMessage name="date" />
//             <br /> <br />
//             <label>Income:</label>
//             <Field name="income" as="select">
//               <option value="0">rs 0</option>
//               <option value="1000">rs 1000</option>
//               <option value="10000">rs 10000</option>
//             </Field>
//             <KErrorMessage name="income" />
//             <br /> <br />
//             <label>About:</label>
//             <Field name="about" as="textarea" />
//             <KErrorMessage name="about" />
//             <br /> <br />
//             <label>Social:</label>
//             <KErrorMessage name="social" />
//             <br /> <br />
//             <label>Facebook:</label>
//             <Field name="social[0]" type="text" />
//             <KErrorMessage name="social.0" />
//             <br /> <br />
//             <label>Twitter:</label>
//             <Field name="social[1]" type="text" />
//             <KErrorMessage name="social.1" />
//             <br /> <br />
//             <FieldArray
//               name="hobbies"
//               render={(arrayHelpers) => (
//                 <div>
//                   {values.hobbies && values.hobbies.length > 0 ? (
//                     values.hobbies.map((hobby, index) => (
//                       <div key={index}>
//                         <Field name={`hobbies.${index}`} />
//                         <KErrorMessage name={`hobbies.${index}`} />
//                         <button
//                           type="button"
//                           onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
//                         >
//                           -
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
//                         >
//                           +
//                         </button>
//                       </div>
//                     ))
//                   ) : (
//                     <button type="button" onClick={() => arrayHelpers.push("")}>
//                       {/* show this when user has removed all hobbies from the list */}
//                       Add a Hobbies
//                     </button>
//                   )}
//                 </div>
//               )}
//             />
//             <KErrorMessage name={`hobbies`} />
//             <button type="submit">Submit</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default App;

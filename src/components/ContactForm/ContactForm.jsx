import s from "./ContactForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const INITIAL_STATE = {
    name: "",
    number: "",
};

const ContactForm = ({ adder }) => {
    const handleSubmit = (value, actions) => {
        adder(value);
        actions.resetForm();
        console.log("Submit!!!");
    };

    const validSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
        number: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Required"),
    });

    return (
        <div className={s.formWrapper}>
            <Formik
                onSubmit={handleSubmit}
                initialValues={INITIAL_STATE}
                validationSchema={validSchema}
            >
                <Form className={s.form}>
                    <label className={s.label}>
                        <span>Name:</span>
                        <Field className={s.input} type="text" name="name" />
                        <ErrorMessage name="name" />
                    </label>

                    <label className={s.label}>
                        <span>Number:</span>
                        <Field className={s.input} type="text" name="number" />
                        <ErrorMessage name="number" />
                    </label>

                    <button className={s.button} type="submit">
                        Add Contact
                    </button>
                </Form>
            </Formik>
        </div>
    );
};
export default ContactForm;

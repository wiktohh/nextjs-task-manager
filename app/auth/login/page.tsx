"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

const LoginPage = () => {
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Nieprawidłowy adres e-mail")
      .required("Wymagane"),
    password: Yup.string()
      .min(6, "Hasło musi mieć minimum 6 znaków")
      .required("Wymagane"),
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="mt-4 p-8 rounded shadow">
        <h1 className="text-2xl text-black font-bold text-center">
          Zaloguj się!
        </h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            console.log({ values, actions });
            console.log(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm font-semibold">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                className="px-4 py-2 border rounded mt-1 text-black"
              />
              <div className="text-red-500">
                <ErrorMessage name="email" component="div" />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold">
                Hasło
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Hasło"
                className="px-4 py-2 border rounded mt-1 text-black"
              />
              <div className="text-red-500">
                <ErrorMessage name="password" component="div" />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800  w-full"
            >
              Zaloguj się
            </button>
            <p>
              Nie masz konta? <Link href="register">Zarejestruj się</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginPage;

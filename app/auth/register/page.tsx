"use client";
import { _registerUser } from "@/app/lib/data";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";
import * as Yup from "yup";

const RegisterPage = () => {
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Wymagane"),
    lastName: Yup.string().required("Wymagane"),
    email: Yup.string()
      .email("Nieprawidłowy adres e-mail")
      .required("Wymagane"),
    password: Yup.string()
      .min(6, "Hasło powinno mieć minimum 6 znaków")
      .required("Wymagane"),
    secondPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Hasła muszą być takie same")
      .required("Wymagane"),
  });

  const router = useRouter();

  const { mutate, isLoading } = useMutation(_registerUser, {
    onSuccess: () => {
      router.push("/auth/login");
    },
  });

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="mt-4 p-8 rounded shadow">
        <h1 className="text-2xl text-black font-bold text-center">
          Zarejestruj się!
        </h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            secondPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={mutate}
        >
          <Form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-sm font-semibold">
                Imię
              </label>
              <Field
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Imię"
                className="px-4 py-2 border rounded mt-1 text-black"
              />
              <div className="text-red-500">
                <ErrorMessage name="firstName" component="div" />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="surname" className="text-sm font-semibold">
                Nazwisko
              </label>
              <Field
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Nazwisko"
                className="px-4 py-2 border rounded mt-1 text-black"
              />
              <div className="text-red-500">
                <ErrorMessage name="surname" component="div" />
              </div>
            </div>
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
            <div className="flex flex-col">
              <label htmlFor="password" className="text-sm font-semibold">
                Powtórz hasło
              </label>
              <Field
                type="password"
                id="secondPassword"
                name="secondPassword"
                placeholder="Powtórz hasło"
                className="px-4 py-2 border rounded mt-1 text-black"
              />
              <div className="text-red-500">
                <ErrorMessage name="secondPassword" component="div" />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 w-full"
            >
              Zarejestruj się
            </button>
            <p>
              Masz juz konto? <Link href="login">Zaloguj się</Link>
            </p>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default RegisterPage;

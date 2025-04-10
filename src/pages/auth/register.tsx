// src/pages/auth/register.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import authImage from '../../assets/authbg.svg';
import logo from '../../assets/logo.svg';
import Collateralized from '../../assets/icons/collateralized.svg';
import Licensed from '../../assets/icons/licensed.svg';
import Secured from '../../assets/icons/secured.svg';
import google from '../../assets/icons/signinwithgoogle.svg';
import apple from '../../assets/icons/signinwithapple.svg';
import TextInput from '../../components/Forms/TextInput';
import { RegisterRequest } from '../types';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  terms: Yup.boolean().oneOf([true], 'You must agree to the terms'),
});

const Register: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-screen h-screen flex">
      {/* Left Section */}
      <section className="md:w-[30%] border-4 bg-[#0C110D] md:p-16 md:relative md:flex md:flex-col md:justify-end md:items-start md:gap-4">
        <img
          src={authImage}
          className="w-full h-full absolute top-0 left-0"
          alt=""
        />
        <img src={logo} alt="" />
        <h1 className="text-white font-semibold md:text-[30px]">
          Unlock High Returns with Collateralized Equity Asset
        </h1>
        <ul className="mt-6 flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <img src={Collateralized} alt="Collateralized" />
            <p className="font-light md:text-sm text-white">Collateralized</p>
          </li>
          <li className="flex items-center gap-2">
            <img src={Secured} alt="Secured" />
            <p className="font-light md:text-sm text-white">Secured</p>
          </li>
          <li className="flex items-center gap-2">
            <img src={Licensed} alt="Licensed" />
            <p className="font-light md:text-sm text-white">
              Licensed & Regulated
            </p>
          </li>
        </ul>
      </section>

      {/* Right Section */}
      <section className="md:w-[70%] md:px-28 my-28">
        <div className="max-w-[450px] flex flex-col gap-4">
          <h1 className="font-semibold text-4xl text-[#0D0D0C]">
            Create an account
          </h1>
          <h3 className="text-[#474D66]">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </h3>

          {/* Error Message */}
          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

          {/* Form with Formik */}
          <Formik
            initialValues={{ name: '', email: '', password: '', terms: false }}
            validationSchema={RegisterSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              setLoading(true);
              try {
                const registerData: RegisterRequest = {
                  name: values.name,
                  email: values.email,
                  password: values.password,
                };
                console.log('Register data being sent:', registerData); // Log the data
                await register(registerData);
                navigate('/dashboard/wallet');
              } catch (err: any) {
                console.error('Registration error:', err); // Log the full error
                setError(err.response?.data?.message || 'Registration failed. Please try again.');
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-5">
                <div>
                  <Field
                    name="name"
                    component={TextInput}
                    label="Full name"
                    placeholder="Enter full name"
                    type="text"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="email"
                    component={TextInput}
                    label="Email address"
                    placeholder="Enter email address"
                    type="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    component={TextInput}
                    label="Password"
                    placeholder="Enter password"
                    type="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="terms"
                    id="terms"
                    className="h-4 w-4"
                  />
                  <label htmlFor="terms" className="text-sm">
                    I agree to BeamMarkets{' '}
                    <span className="underline text-blue-500">
                      Terms of Service
                    </span>{' '}
                    and{' '}
                    <span className="underline text-blue-500">
                      Privacy Policy
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <button
                  type="submit"
                  className="cursor-pointer bg-[#0D0D0C] p-3 rounded-[100px] text-white font-bold mt-5 w-full"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex gap-4 items-center my-4">
            <div className="h-[1px] flex-1 bg-[#D5D5D5]"></div>
            <span className="text-[#474D66] text-sm">OR SIGNIN WITH</span>
            <div className="h-[1px] flex-1 bg-[#D5D5D5]"></div>
          </div>
          <div className="flex justify-center items-center gap-4">
            <img src={google} alt="google" />
            <img src={apple} alt="apple" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
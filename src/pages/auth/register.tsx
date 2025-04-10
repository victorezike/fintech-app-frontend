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
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      <section className="relative w-full md:w-[40%] bg-[#0C110D] p-6 md:p-16 flex flex-col justify-end gap-6 text-white">
        <img
          src={authImage}
          className="absolute inset-0 object-cover w-full h-full opacity-20"
          alt=""
        />
        <img src={logo} alt="Beam Logo" className="w-28 z-10" />
        <h1 className="z-10 font-semibold text-2xl md:text-[30px] leading-tight">
          Unlock High Returns with Collateralized Equity Asset
        </h1>
        <ul className="z-10 flex flex-col gap-4">
          <li className="flex items-center gap-2">
            <img src={Collateralized} alt="Collateralized" />
            <p className="text-sm">Collateralized</p>
          </li>
          <li className="flex items-center gap-2">
            <img src={Secured} alt="Secured" />
            <p className="text-sm">Secured</p>
          </li>
          <li className="flex items-center gap-2">
            <img src={Licensed} alt="Licensed" />
            <p className="text-sm">Licensed & Regulated</p>
          </li>
        </ul>
      </section>

      <section className="w-full md:w-[60%] px-6 md:px-28 py-12 md:py-28 flex items-center">
        <div className="w-full max-w-[450px] mx-auto flex flex-col gap-4">
          <h1 className="font-semibold text-2xl md:text-4xl text-[#0D0D0C]">Create an account</h1>
          <h3 className="text-[#474D66] text-sm md:text-base">
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </h3>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

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
                await register(registerData);
                navigate('/dashboard/wallet');
              } catch (err: any) {
                setError(
                  err.response?.data?.message ||
                    'Registration failed. Please try again.'
                );
              } finally {
                setLoading(false);
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-5 flex flex-col gap-4">
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
                <div className="flex items-center gap-2 text-sm">
                  <Field type="checkbox" name="terms" id="terms" className="h-4 w-4" />
                  <label htmlFor="terms">
                    I agree to BeamMarkets{' '}
                    <span className="underline text-blue-500">Terms of Service</span> and{' '}
                    <span className="underline text-blue-500">Privacy Policy</span>
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />

                <button
                  type="submit"
                  className="bg-[#0D0D0C] p-3 rounded-full text-white font-bold mt-2 w-full"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </Form>
            )}
          </Formik>

          <div className="flex gap-4 items-center my-4">
            <div className="h-[1px] flex-1 bg-[#D5D5D5]"></div>
            <span className="text-[#474D66] text-sm">OR SIGN IN WITH</span>
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

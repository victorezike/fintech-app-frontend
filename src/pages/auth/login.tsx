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
import TextInput from '../../components/Forms/TextInput';
import { LoginRequest } from '../types';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

const Login: React.FC = () => {
  const auth = useAuth();
  const { login, token } = auth;
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col md:flex-row w-full h-full min-h-screen">
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
            <img src={Licensed} alt="Licensed & Regulated" />
            <p className="text-sm">Licensed & Regulated</p>
          </li>
        </ul>
      </section>

      <section className="w-full md:w-[60%] px-6 md:px-28 py-12 md:py-28">
        <div className="max-w-[450px] mx-auto flex flex-col gap-4">
          <h1 className="font-semibold text-2xl md:text-4xl text-[#0D0D0C]">
            Sign in to Beam.
          </h1>
          <p className="text-[#474D66] text-sm md:text-base">
            Please sign in with your assigned login details
          </p>

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setError(null);
              setLoading(true);
              try {
                const loginData: LoginRequest = {
                  email: values.email,
                  password: values.password,
                };
                if (typeof login !== 'function') {
                  throw new Error('Login function is not available in AuthContext');
                }

                const response = await login(loginData);

                if (response?.access_token) {
                  navigate('/dashboard/wallet', { replace: true });
                } else {
                  throw new Error('No access token received');
                }
              } catch (err: any) {
                setError(
                  err.response?.data?.message ||
                    err.message ||
                    'Login failed. Please check your credentials and try again.'
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
                <div className="flex justify-end text-sm text-[#595957]">
                  <span className="cursor-pointer hover:underline">Forgot password?</span>
                </div>

                <button
                  type="submit"
                  className="bg-[#0D0D0C] p-3 rounded-full text-white font-bold mt-2 w-full"
                  disabled={isSubmitting || loading}
                >
                  {loading ? 'Logging in...' : 'Log in'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </div>
  );
};

export default Login;

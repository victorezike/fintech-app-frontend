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
    <div className="w-screen h-screen flex">
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

      <section className="md:w-[70%] md:px-28 my-28">
        <div className="max-w-[450px] flex flex-col gap-4">
          <h1 className="font-semibold text-4xl text-[#0D0D0C]">
            Sign in to Beam.
          </h1>
          <h3 className="text-[#474D66]">
            Please sign in with your assigned login details
          </h3>

          {error && (
            <div className="text-red-500 text-sm mt-2">{error}</div>
          )}

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
                console.log('Login data being sent:', loginData);
                if (typeof login !== 'function') {
                  throw new Error('Login function is not available in AuthContext');
                }
                // await login(loginData);
                // console.log(await login(loginData));
                // const token = await login(loginData);
                // if (token.access_token) {
                //   navigate('/dashboard/wallet');
                // }
                 // Call login once and store the result
                const response = await login(loginData);
                
                // Check if we got a valid token
                if (response?.access_token) {
                  navigate('/dashboard/wallet', { replace: true });
                } else {
                  throw new Error('No access token received');
                }

                // navigate("/login")

              } catch (err: any) {
                console.error('Login error:', err);
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
              <Form className="mt-5">
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
                <div className="w-full flex justify-end relative">
                  <h3 className="text-[#595957] text-sm absolute -top-3.5 cursor-pointer">
                    Forgot password?
                  </h3>
                </div>

                <button
                  type="submit"
                  className="cursor-pointer bg-[#0D0D0C] p-3 rounded-[100px] text-white font-bold mt-5 w-full"
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
import React from 'react';
import { Link } from 'react-router-dom';

interface LoginProps {
  name: string,
}
const Login = (props: LoginProps) => (
  <div>
    <div>Login Page ({props.name})</div>
    <Link to="/">/authorized</Link>
  </div>
);

export const loadPageData = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });
  return {name: 'Egor'};
}

export default Login;

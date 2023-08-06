import { API } from './client';
import { SIGNUP_API, LOGIN_API } from './config';

interface UserData {
  email: string;
  password: string;
}

const signUpAPI = async (userData: UserData) => {
  return API.post(SIGNUP_API, { userData });
};

const signInAPI = async (userData: UserData) => {
  return API.post(LOGIN_API, { userData });
};

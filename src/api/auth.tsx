import { API } from './client';
import { SIGNUP_API, LOGIN_API } from './config';

interface UserData {
  email: string;
  password: string;
}

export const signUpAPI = async (userData: UserData) => {
  console.log(userData);
  return API.post(SIGNUP_API, userData);
};

export const signInAPI = async (userData: UserData) => {
  return API.post(LOGIN_API, userData);
};

import { axiosInstance } from "./axios";

export const signup = async (signUpData) => {
  const res = await axiosInstance.post('/auth/signup', signUpData);
  return res.data;
}

export const login = async (loginData) => {
  const res = await axiosInstance.post('/auth/login', loginData);
  return res.data;
}

export const logout = async () => {
  const res = await axiosInstance.post('/auth/logout');
  return res.data;
}

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
  }
  catch (error) {
    return null;
  }
}

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post('/auth/onboarding', userData);
  return res.data;
}

export async function getUserFriends() {
  const res = await axiosInstance.get('/users/friends');
  return res.data?.friends || [];
}

export async function getRecommendedUsers() {
  const res = await axiosInstance.get('/users');
  return res.data?.recommendedUsers || [];
}

export async function getOutgoingFriendRequests() {
  const res = await axiosInstance.get('/users/outgoing-friend-requests');
  return res.data?.outgoingRequests || [];
}

export async function sendFriendRequest(userId) {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
}

export default {
  signup,
  getAuthUser
};
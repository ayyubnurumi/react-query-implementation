import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUsers = async () => {
  try {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res;
  } catch (error) {
    throw console.error(error);
  }
};

const getUser = async (id) => {
  try {
    const res = await axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
    return res;
  } catch (error) {
    throw console.error(error);
  }
};

const getUserPaginate = async (filter) => {
  try {
    const resp = await axios.get(
      `https://jsonplaceholder.typicode.com/users?_page=${filter.page}&_limit=${filter.limit}`
    );
    return resp;
  } catch (error) {
    console.error(error);
  }
};

const postUser = async (payload) => {
  try {
    const response = await axios.post(
      `https://jsonplaceholder.typicode.com/users`,
      payload,
      {
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    );
    return response;
  } catch (error) {
    throw console.error(error);
  }
};

// react query
export const useGetUsers = () =>
  useQuery({
    queryKey: ["getUsers"], // identifier query name for caching data
    queryFn: async () => await getUsers(),
    retry: 3,
  });

export const useGetUser = (id) =>
  useQuery({
    queryKey: ["getUsers", id],
    queryFn: async () => await getUser(id),
    enabled: id > 0,
    refetchOnWindowFocus: false,
  });

export const useGetUserPaginate = (filter) =>
  useQuery({
    queryKey: ["getUserPaginate", filter],
    queryFn: async () => await getUserPaginate(filter),
    enabled: !!filter,
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

export const usePostUser = (onSuccess) =>
  useMutation({
    mutationKey: ["postUser"],
    mutationFn: async (payload) => await postUser(payload),
    onSuccess: onSuccess,
  });

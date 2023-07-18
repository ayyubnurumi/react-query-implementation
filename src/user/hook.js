import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { useGetUser, useGetUserPaginate, useGetUsers, usePostUser } from "../fetcher";

const useCostum = () => {
  const queryClient = useQueryClient();
  // state
  const [selectedId, setSelectedId] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
  });
  const [filter, setFilter] = useState({ page: 1, limit: 2 });

  const onSuccessPost = async () => {
    console.log("run");
    await queryClient.invalidateQueries({ queryKey: ["getUsers"] });
  };

  // queries
  const {
    data: dataList,
    isLoading: isLoadingList,
    error: errorList,
  } = useGetUsers();

  const {
    data: dataDetail,
    isLoading: isLoadingDetail,
    error: errorDetail,
  } = useGetUser(selectedId);

  const {
    data: dataPaginate,
    isLoading: isLoadingPaginate,
    error: errorPaginate,
    isPreviousData,
    isFetching,
  } = useGetUserPaginate(filter);

  // mutation
  const { mutate, isSuccess } = usePostUser(onSuccessPost);

  // callbacks
  const onClickUser = useCallback((id) => {
    setSelectedId(id);
  }, []);

  const handleChange = useCallback((e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      mutate(formData);
      setFormData({
        name: "",
        username: "",
        email: "",
      });
    },
    [formData, mutate]
  );

  const onClickPaginate = useCallback((page) => {
    if (page > 0) {
      setFilter((prev) => {
        return {
          ...prev,
          page,
        };
      });
    }
  }, []);
  return {
    data: {
      selectedId,
      dataList,
      dataDetail,
      errorList,
      errorDetail,
      isLoadingList,
      isLoadingDetail,
      formData,
      isSuccess,
      dataPaginate,
      isLoadingPaginate,
      errorPaginate,
      filter,
      isPreviousData,
      isFetching,
    },
    methods: {
      onClickUser,
      handleSubmit,
      handleChange,
      onClickPaginate,
    },
  };
};

export default useCostum;
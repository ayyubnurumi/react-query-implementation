import useCustom from "./hook";

const Users = () => {
  const {
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
      isPreviousData,
      filter,
      isFetching,
    },
    methods: { onClickUser, handleChange, handleSubmit, onClickPaginate },
  } = useCustom();

  if (isLoadingList) return <div>Loading...</div>;

  if (errorList) return <div>{errorList?.message}</div>;

  return (
    <div className="flex flex-col gap-2 items-center">
      <div>
        <h1 className="text-2xl font-bold">List User</h1>
        <ol>
          {dataList?.data.map((item, index) => (
            <li
              key={index}
              onClick={() => onClickUser(item.id)}
              className="cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ol>
      </div>
      <div>
        {isLoadingPaginate && <>Loading...</>}
        {errorPaginate && <>{errorPaginate?.message}</>}
        <h1 className="text-2xl font-bold">List User Paginate</h1>
        <ol>
          {dataPaginate?.data.map((item, index) => (
            <li
              key={index}
              onClick={() => onClickUser(item.id)}
              className="cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ol>
        {isFetching && <>Fetching...</>}
        <div className="flex gap-5">
          <button
            onClick={() => onClickPaginate(filter.page - 1)}
            disabled={filter.page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => onClickPaginate(filter.page + 1)}
            disabled={isPreviousData}
          >
            Next
          </button>
        </div>
      </div>

      {isSuccess && (
        <>
          <h1 className="text-3xl font-bold text-green-500">
            Success Create User
          </h1>
        </>
      )}

      {/* Create */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="flex gap-1">
          <label htmlFor="name">Name:</label>
          <input
            className="border rounded-sm px-1"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="username">Username:</label>
          <input
            className="border rounded-sm px-1"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="email">Email:</label>
          <input
            className="border rounded-sm px-1"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>

      {/* DETAIL */}
      {selectedId != 0 && isLoadingDetail && <div>Loading...</div>}
      {errorDetail && <div>{errorDetail?.message}</div>}
      {dataDetail && (
        <div className="flex flex-col gap-1">
          <h1 className="font-bold text-xl">
            Detail User - {dataDetail?.data?.id}
          </h1>
          <ul>
            <li>Name: {dataDetail?.data?.name}</li>
            <li>Username: {dataDetail?.data?.username}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
import APIServices from "../../services";
console.log("APISERVICE>>>", APIServices);
export async function customerOrderListApi(
  limit,
  offset,
  setOrderData,
  searchVal,
  count,
  setOrderLoader,
  setCount,
  status,
  setFiltredData
) {
  let loggedInUser = localStorage.getItem("spurtUser");
  if (loggedInUser) {
    let userPrased = JSON.parse(loggedInUser);

    const customerId = userPrased.id;
    const result = await APIServices.getAll(
      "order/customer/orderlist?customerId=" +
        customerId +
        "&limit=" +
        limit +
        "&offset=" +
        offset +
        "&keyword=" +
        searchVal +
        "&count=0" +
        "&status=" +
        status
    );

    if (
      result &&
      result.data &&
      result.data.status === 1 &&
      result.data.message !== "Successfully get Count. "
    ) {
      setOrderData(result.data.data);
      setFiltredData(result.data.data);
      setOrderLoader(false);
    }
    if (
      result &&
      result.data &&
      result.data.message === "Successfully get Count. "
    ) {
      setCount(result.data.data);
    }
  }
}

export async function synchUserOrderApi(uid) {
  await APIServices.get("unicommerce/sync-user-orders?uid=" + uid);
}

export async function orderStatusApi(setOrderData) {
  let result = await APIServices.get("order-status/order-status-list");
  setOrderData(result.data.data);
}

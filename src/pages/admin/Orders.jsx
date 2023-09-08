import { useRef } from "react";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { BASE_API_URL } from "../../common/constant";
import orderService from "../../service/order.service";
import c from "./../../img/c.png";
import { ViewOrder } from "./ViewOrder";

const Orders = () => {
  const [orderList, setOrderList] = useState([]);
  const orderComponet = useRef();
  const [selectedOrder, setSelectedOrder] = useState({
    id: "",
    user: "",
    book: "",
    quantity: "",
    paymentType: "",
    orderNumber: "",
    date: "",
    status: "",
  });

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    orderService
      .getAllOrder()
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewOrderDetails = (ord) => {
    setSelectedOrder(Object.assign({}, ord));
    orderComponet.current?.showOrderModal();
  };

  const updateSt = (msg) => {
    init();
    toast.success(msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  return (
    <div class="card paint-card cardx">
      <div class="card-body">
        <h4 class="form-signin-heading text-center">Order Details</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">Image</th>

              <th scope="col">Order Id</th>

              <th scope="col">Order Date</th>

              <th scope="col">Book Details</th>

              <th scope="col">Status</th>
              <th scope="col">Full Details</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((item, ind) => (
              <tr>
                <th scope="row">
                  <img
                    src={BASE_API_URL + "/" + item.book.img}
                    width="70px"
                    height="70px"
                  />
                </th>

                <th scope="row">{item.orderNumber}</th>
                <td>{item.date}</td>

                <td>{item.book.bookName}</td>

                <td>{item.status}</td>
                <td>
                  <td>
                    <button
                      onClick={() => viewOrderDetails(item)}
                      className="btn btn-sm btn-success"
                    >
                      View
                    </button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ViewOrder
        ref={orderComponet}
        orders={selectedOrder}
        onUpdate={() => updateSt("Order Status Updated")}
      />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export { Orders };

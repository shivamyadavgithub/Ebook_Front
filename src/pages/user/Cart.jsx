import { useRef, useState } from "react";
import { useEffect } from "react";
import cartService from "../../service/cart.service";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API_URL } from "../../common/constant";
import { Link, useNavigate } from "react-router-dom";
import orderService from "../../service/order.service";
import { useSelector } from "react-redux";

const Cart = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    mobNo: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const loginUser = useSelector((u) => u.user);

  user.id = loginUser.id;
  user.name = loginUser.name;
  user.email = loginUser.email;
  user.mobNo = loginUser.mobNo;
  user.address = loginUser.address;
  user.city = loginUser.city;
  user.state = loginUser.state;
  user.pincode = loginUser.pincode;

  const [cartList, setCartList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [pymtType, setPymtType] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    let cart = await cartService.getCart();
    setCartList(cart.data);
    setTotalPrice(cart.data[cart.data.length - 1].totalPrice);
  };

  const plusCart = (id, qu) => {
    qu = qu + 1;

    if (qu > 1) {
      cartService
        .updateCart(id, qu)
        .then((res) => {
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const minusCart = (id, qu) => {
    qu = qu - 1;
    if (qu < 1) {
      cartService
        .deleteCart(id)
        .then((res) => {
          init();
          notify();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      cartService
        .updateCart(id, qu)
        .then((res) => {
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleType = (e) => {
    setPymtType(e.target.value);
  };

  const orderPage = (e) => {
    e.preventDefault();

    if (pymtType === "COD") {
      orderService
        .createOrder(pymtType)
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/orderSucc");
    } else {
      navigate("/cardPayment/" + totalPrice);
    }
  };

  const notify = () =>
    toast.success("Item Removed", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div className="container-fluid p-5">
      <div className="row">
        <div className="col-md-8">
          <table className="table ">
            <thead className="text-center bg-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {cartList.map((item, ind) => (
                <tr key={item.id}>
                  <th scope="row">
                    <img
                      src={BASE_API_URL + "/" + item.book.img}
                      width="70px"
                      height="70px"
                    />
                  </th>
                  <td>{item.book.bookName}</td>
                  <td>{item.book.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.book.price}</td>
                  <td className="text-center">
                    <a
                      onClick={() => plusCart(item.id, item.quantity)}
                      className="text-dark"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </a>
                    <button className="btn btn-sm btn-dark ms-2 me-2">
                      {item.quantity}{" "}
                    </button>
                    <a
                      onClick={() => minusCart(item.id, item.quantity)}
                      className="text-dark ms-1"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </a>
                  </td>
                </tr>
              ))}

              {/* <tr>
                <td colSpan={4}>Total Price</td>
                <td>{totalPrice}</td>
                <td></td>
              </tr> */}
            </tbody>
          </table>
        </div>

        <div className="col-md-4">
          <div className="col-md-12">
            <div className="card paint-card">
              <div className="card-body">
                <p className="fs-6 text-Secondary text-center">
                  Delivery Address
                </p>

                <p style={{ color: "black" }}>
                  {user.name} <br />
                  {user.address} <br />
                  {user.city},{user.state},{user.pincode} <br />
                  Mobile No: {user.mobNo}
                </p>
                 <Link
                  className="fs-5 text-decoration-none"
                  to="/editProfile"
                >
                  Change Address
                </Link> 
              </div>
            </div>
          </div>

          <div className="col-md-12">
            <div className="card paint-card">
              <div className="card-body">
                <p className="fs-6 text-Secondary text-center">Payment</p>
                <p className="fw-bold" style={{ color: "black" }}>
                  Amount: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i className="fas fa-rupee-sign"></i> {totalPrice}
                  <br /> Shipping Charge:&nbsp; &nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <i className="fas fa-rupee-sign"></i> 60 <br /> Tax :&nbsp;
                  &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp;
                  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                  <i className="fas fa-rupee-sign"></i> 30
                </p>
                <hr />
                <p className="fw-bold">
                  Total Amount:&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
                  <i className="fas fa-rupee-sign"></i> {totalPrice + 30 + 60}
                  <br />
                </p>

                <form
                  className="row g-3"
                  onSubmit={(e) => orderPage(e)}
                  method="post"
                >
                  <div className="form-group">
                    <label className="form-label">Payment Mode</label>
                    <select
                      name="type"
                      className="form-control form-control-sm"
                      onChange={(e) => handleType(e)}
                    >
                      <option>--select--</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="COD">Cash On Delivary</option>
                    </select>
                  </div>
                  {/* <input type="hidden" name="amt" value="690" />
                  <input type="hidden" value="43" name="uid" /> */}

                  {cartList.length !== 0 && (
                    <button className="btn btn-success col-md-12 text-white">
                      Place Order
                    </button>
                  )}

                  {cartList.length === 0 && (
                    <button
                      className="btn btn-success col-md-12 text-white"
                      disabled
                    >
                      Place Order
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
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

export { Cart };

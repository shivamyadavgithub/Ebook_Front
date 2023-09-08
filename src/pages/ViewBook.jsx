import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Book from "../model/Book";
import bookService from "../service/book.service";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../service/cart.service";
import { ToastContainer, toast } from "react-toastify";
import { BASE_API_URL } from "../common/constant";

const ViewBook = () => {
  const [cart, setCart] = useState({
    book: "",
    user: "",
    quantity: "",
  });

  const [book, setBook] = useState(
    new Book("", "", "", "", "", "", "", "", "", "", "")
  );

  const [cartStatus, setCartStatus] = useState(false);

  const { id } = useParams();
  const user = useSelector((st) => st.user);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      let bk = await bookService.getBookById(id);
      setBook(bk.data);

      cart.book = bk.data;
      cart.user = user;

      let st = await cartService.checkCart(cart);
      // console.log(st.data);
      setCartStatus(st.data);
    } catch (error) {
      console.log(error);
    }
  };

  const notify = () =>
    toast.success("Added to Cart", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const addToCart = (b) => {
    if (!user) {
      navigate("/login");
    } else {
      cart.book = b;
      cart.user = user;
      cart.quantity = 1;

      cartService
        .addCart(cart)
        .then((res) => {
          notify();
          init();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container p-3">
      <div className="row">
        <p className="fs-3 text-center">Book Details</p>
        <div className="col-md-12 paint-card p-5">
          <div className="row">
            <div className="col-md-6 text-end">
              <img
                alt=""
                src={BASE_API_URL + "/" + book.img}
                width="330px"
                height="400px"
              />
            </div>

            <div className="col-md-6">
              <p className="fs-3">{book.bookName}</p>
              <p>
                <span className="fw-bold">Description : </span>
                <br />
                {book.description}
              </p>
              <p>
                <span className="fw-bold"> Book Deatils: </span> <br />
                ISBN NO : {book.isbnNo} <br /> Author : {book.author} <br />
                Category : {book.category.categoryName}
              </p>
              <p className="fs-5 fw-bold">
                Price :&nbsp; &nbsp; &nbsp;
                <i className="fas fa-rupee-sign"></i>
                &nbsp; {book.price}
              </p>

              <div className="row">
                <div className="col-md-4 text-danger text-center p-2">
                  <i className="fas fa-money-bill-wave fa-2x"></i>
                  <p>Cash On Delivery</p>
                </div>
                <div className="col-md-4 text-danger text-center p-2">
                  <i className="fas fa-undo-alt fa-2x"></i>
                  <p>Return Available</p>
                </div>
                <div className="col-md-4 text-danger text-center p-2">
                  <i className="fas fa-truck-moving fa-2x"></i>
                  <p>Free Shipping</p>
                </div>
              </div>

              {!cartStatus && (
                <a
                  onClick={() => addToCart(book)}
                  className="btn btn-danger col-md-12"
                >
                  Add To Cart
                </a>
              )}

              {cartStatus && (
                <a className="btn btn-danger col-md-12 disabled">
                  Added To Cart
                </a>
              )}
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

export { ViewBook };

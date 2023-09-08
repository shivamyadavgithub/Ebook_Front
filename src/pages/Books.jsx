import java from "../img/java.jpg";
import c from "../img/c.png";
import ml from "../img/ml.png";
import story from "../img/story.jpg";
import { Link } from "react-router-dom";
import { Footer } from "../component/footer/Footer";
import { useEffect } from "react";
import bookService from "../service/book.service";
import { useState } from "react";
import { BASE_API_URL } from "../common/constant";
import { toast, ToastContainer } from "react-toastify";

const Books = () => {
  const [book, setBook] = useState([]);

  useEffect(() => {
    init();
  }, []);

  const init = () => {
    bookService
      .getAllBookByPag()
      .then((res) => {
        //console.log(res.data);
        setBook(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [ch, setCh] = useState();

  const handleSearch = (e) => {
    setCh(e.target.value);
  };

  const search = (e) => {
    e.preventDefault();

    if (!ch) {
      init();
    } else {
      bookService
        .searchBook(ch)
        .then((res) => {

          if (res.data.length > 0) {
            setBook(res.data);
          } else {
            notify();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const notify = () => {
    toast.error("Not Available", {
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
    <>
      <div
        className="container-fluid  p-3 bg-light "
        style={{ backgroundColor: "#f0f1f2" }}
      >
        <div className="row ">
          <div className="col-md-8 offset-md-2">
            <form onSubmit={(e) => search(e)} method="post">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  name="ch"
                  onChange={(e) => handleSearch(e)}
                />
                <button className="btn bg-primary ms-2 text-white">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="cotainer mt-2">
        <div className="row">
          <div className="col-md-12">
            <div className="card paint-card bg-image hover-overlay hover-zoom hover-shadow ripple">
              <div className="card-body">
                <p className="fs-3 text-center">All Books</p>
                <div className="row p-3">
                  {book.map((b, num) => (
                    <div className="col-md-3" key={b.id}>
                      <div className="card paint-card">
                        <div className="card-body text-center">
                          <img
                            src={BASE_API_URL + "/" + b.img}
                            height="200px"
                            width="60%"
                          ></img>
                          <p className="fs-5">{b.bookName}</p>
                          <Link
                            to={"/viewBook/" + b.id}
                            className="btn btn-sm btn-primary"
                          >
                            View Details
                          </Link>
                          <Link to="/" className="btn btn-sm btn-danger ms-2">
                            &#8377; {b.price}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="row mt-3">
              <div className="col-md-4 offset-md-4">
                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Previous
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div> */}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export { Books };

import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../../common/constant";
import { DeleteAlert } from "../../component/Category/DeleteAlert";
import Book from "../../model/Book";
import bookService from "../../service/book.service";
import { ToastContainer, toast } from "react-toastify";

const ViewBook = () => {
  const [book, setBook] = useState(
    new Book("", "", "", "", "", "", "", "", "")
  );
  const [id, setId] = useState("");
  const [bookList, setBookList] = useState([]);
  const editComponent = useRef();
  const deleComponent = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    init();
  }, []);

  //console.log(bookList);

  const init = () => {
    bookService
      .getAllBook()
      .then((response) => {
        setBookList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const EditBookRequest = (b) => {
    setBook(b);
    //console.log(b);
    editComponent.current?.showDeleteModel();
  };

  const EditBook = () => {
    navigate("/admin/editBook/" + book.id);
  };

  const deleteBook = (b) => {
    setId(b.id);
    deleComponent.current?.showDeleteModel();
  };

  const DeleteBookRequest = () => {
    bookService
      .deleteBook(id)
      .then((res) => {
        init();
        notify();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const notify = () =>
    toast.success("Book Delete Sucesfully", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div class="card paint-card cardx">
      <div class="card-body">
        <h4 class="form-signin-heading text-center">Book Details</h4>

        <table class="table">
          <thead>
            <tr>
              <th scope="col">SL No</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Author</th>
              <th scope="col">Category</th>

              <th scope="col">ISBN</th>
              <th scope="col">Price</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookList.map((b, num) => (
              <tr key={b.id}>
                <th scope="row">{num+1}</th>
                <td>
                  <img
                    src={BASE_API_URL + "/" + b.img}
                    width="50px"
                    height="50px"
                  />
                </td>
                <td>{b.bookName}</td>
                <td>{b.author}</td>
                <td>{b.category.categoryName}</td>

                <td>{b.isbnNo}</td>
                <td>{b.price}</td>

                <td>
                  <button
                    onClick={() => EditBookRequest(b)}
                    class="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteBook(b)}
                    class="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <DeleteAlert
        // ref call child component
        ref={editComponent}
        message={"Edit"}
        onConfirmed={() => EditBook()}
      />
      <DeleteAlert
        ref={deleComponent}
        message={"Delete"}
        onConfirmed={() => DeleteBookRequest()}
      />
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
    </div>
  );
};

export { ViewBook };

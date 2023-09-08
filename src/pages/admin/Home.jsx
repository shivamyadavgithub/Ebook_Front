import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import bookService from "../../service/book.service";

const Home = () => {
  const [count, setCount] = useState({
    book: "",
    category: "",
    order: "",
  });

  useEffect(() => {
    init();
  }, []); 

  const init = async () => {
   let c = await bookService.countDetails();
   
  };

  return (
    <div className="row cardx">
      <p class="text-center fs-1">Admin Dashboard</p>

      <div class="col-md-4">
        <a class="text-decoration-none bg-custom">
          <div class="card paint-card">
            <div class="card-body text-center">
              <i class="bi bi-card-checklist fa-2x"></i>
              <br />
              <p class="fs-3 text-dark">Category</p>
              <p class="fs-3 text-dark">{count.category}</p>
            </div>
          </div>
        </a>
      </div>
      <div class="col-md-4">
        <a class="text-decoration-none bg-custom">
          <div class="card paint-card">
            <div class="card-body text-center">
              <i class="bi bi-journal-check fa-2x"></i>
              <br />
              <p class="fs-3 text-dark"> Books</p>
              <p class="fs-3 text-dark">{count.book}</p>
            </div>
          </div>
        </a>
      </div>
      <div class="col-md-4">
        <a class="text-decoration-none bg-custom">
          <div class="card paint-card">
            <div class="card-body text-center">
              <i class="bi bi-minecart fa-2x"></i>
              <br />
              <p class="fs-3 text-dark">Order</p>
              <p class="fs-3 text-dark">{count.order}</p>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;

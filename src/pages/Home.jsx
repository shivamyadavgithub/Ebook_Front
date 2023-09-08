import book1 from "../img/book1.jpg";
import book2 from "../img/book2.jpg";
import book3 from "../img/book3.jpeg";
import java from "../img/java.jpg";
import c from "../img/c.png";
import ml from "../img/ml.png";
import story from "../img/story.jpg";
import { Link } from "react-router-dom";
import { Footer } from "../component/footer/Footer";
const Home = () => {
  return (
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={book2} class="d-block w-100" height="350px" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={book3} class="d-block w-100" height="350px" alt="..." />
          </div>
          <div class="carousel-item">
            <img src={book1} class="d-block w-100" height="350px" alt="..." />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div className="container">
      <p className="fs-3 text-center"> Book</p> 
        <div className="row">
          <div className="col-md-3">
            <div className="card paint-card">
              <div className="card-body text-center">
                <img src={java} height="300px" width="90%"></img>
               
                {/* 
                 <p className="fs-5">Java</p>
                <Link to="/" className="btn btn-sm btn-primary">
                  View Details
                </Link>
                <Link to="/" className="btn btn-sm btn-danger ms-2">
                  &#8377; 300
                </Link> */}
              </div>
            </div>
          </div>

          {/* start extra book */}

          <div className="col-md-3">
            <div className="card paint-card">
              <div className="card-body text-center">
                <img src={story} height="300px" width="90%"></img>
                
                {/* 
                 <p className="fs-5">Java</p>
                <Link to="/" className="btn btn-sm btn-primary">
                  View Details
                </Link>
                <Link to="/" className="btn btn-sm btn-danger ms-2">
                  &#8377; 300
                </Link> */}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card paint-card">
              <div className="card-body text-center">
                <img src={c} height="300px" width="90%"></img>
               
                {/* 
                 <p className="fs-5">Java</p>
                <Link to="/" className="btn btn-sm btn-primary">
                  View Details
                </Link>
                <Link to="/" className="btn btn-sm btn-danger ms-2">
                  &#8377; 300
                </Link> */}
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card paint-card">
              <div className="card-body text-center">
                <img src={ml} height="300px" width="90%"></img>
                
                {/* 
                 <p className="fs-5">Java</p>
                <Link to="/" className="btn btn-sm btn-primary">
                  View Details
                </Link>
                <Link to="/" className="btn btn-sm btn-danger ms-2">
                  &#8377; 300
                </Link> */}
              </div>
            </div>
          </div>

          {/* end extra book */}
        </div>
        {/* <div className="text-center mt-4">
          <Link to="" className="btn btn-danger btn-sm">
            view all
          </Link>
        </div> */}
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
};

export { Home };

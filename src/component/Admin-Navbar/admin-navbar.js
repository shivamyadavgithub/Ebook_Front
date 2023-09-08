import './assets/css/style.css';
import './assets/vendor/bootstrap/css/bootstrap.min.css';
import './assets/vendor/bootstrap-icons/bootstrap-icons.css';
import './assets/img/apple-touch-icon.png';
import { Link } from 'react-router-dom';
import React from 'react';


const AdminNavbar = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg header fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-primary fw-bold"><i className="fa-solid fa-book"></i> Ebook Store</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">


            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <li className="nav-item dropdown pe-3">

                <a className="nav-link nav-profile d-flex align-items-center pe-0 text-dark" href="#" data-bs-toggle="dropdown">
                  <i className="bi bi-person-circle"></i>
                  <span className="d-none d-md-block dropdown-toggle ps-2">Admin</span>
                </a>

                {/* <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                  <li className="dropdown-header">
                    <h6>Kevin Anderson</h6>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                      <i className="bi bi-person"></i>
                      <span>My Profile</span>
                    </a>
                  </li>


                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="users-profile.html">
                      <i className="bi bi-gear"></i>
                      <span>Account Settings</span>
                    </a>
                  </li>



                  <li>
                    <a className="dropdown-item d-flex align-items-center" href="#">
                      <i className="bi bi-box-arrow-right"></i>
                      <span>Sign Out</span>
                    </a>
                  </li>

                </ul> */}
              </li>


            </ul>
          </div>
        </div>
      </nav>

    </React.Fragment>
  );
}

export { AdminNavbar };
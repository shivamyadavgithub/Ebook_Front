import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import back from "../img/back2.jpg";
import User from "../model/User";
import userService from "../service/user.service";
import { setCurrentUser } from "../store/action/user.action";
const Login = () => {
  const [user, setUser] = useState(
    new User("", "", "", "", "", "", "", "", "", "", "")
  );

  const [message, setMessage] = useState("");
  const [logMessage, setLogMessage] = useState("");

  const [login, userLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginUser = useSelector((u) => u.user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    userLogin((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    if (loginUser?.id) {
      navigate("/");
    }
  }, []);

  const loginSubmit = (e) => {
    e.preventDefault();
    userService
      .login(login)
      .then((res) => {
        //setUser(res.data);

        dispatch(setCurrentUser(res.data));

        //  console.log(res.data.role);

        if (res.data.role[0].id === 101) {
          navigate("/admin/home");
        } else {
          navigate("/");
        }
      })
      .catch((error) => {
        setMessage("invalid email and password");

        console.log(error);
      });
  };

  return (
    <div
      className="container-fluid p-5 bg-img"
      style={{
        backgroundImage: `url(${back})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="row">
        <div className="col-md-5 offset-md-3">
          <div className="card paint-card">
            <div className="card-header ">
              <h4 className="text-dark text-center">Login</h4>
              {message && (
                <p className="text-center text-danger fs-5">{message}</p>
              )}

              {logMessage && (
                <p className="text-center text-danger fs-5">{logMessage}</p>
              )}
            </div>
            <div className="card-body">
              <form onSubmit={(e) => loginSubmit(e)}>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    name="email"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                    name="password"
                  />
                </div>

                <button type="submit" className="btn btn-primary col-md-12">
                  Login
                </button>

                {/* <div className="text-center p-3">
                  <a href="loadforgotPassword" className="text-decoration-none">
                    Forgot Password
                  </a>
                </div> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Login };

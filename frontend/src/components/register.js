import React, {useState} from "react";
import RestaurantDataService from "../services/restaurant";

const Register = props => {

  const initialUserState = {
    name: "",
    email: "",
    password:""
  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    RestaurantDataService.registeruser(user)
    props.login(user)
    props.history.push('/');

  }

  return (
    <div className="submit-form">
      
        <div className="form-group">
          <label htmlFor="user">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            required
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            required
            value={user.password}
            onChange={handleInputChange}
            name="password"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Register
        </button>
      
    </div>
  );
};

export default Register;
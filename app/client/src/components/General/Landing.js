import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>Landing Page</h1>
      <br />
      <Link to="/user/login">Login</Link>
    </div>
  );
}

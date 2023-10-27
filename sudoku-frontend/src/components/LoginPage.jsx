import React from "react";
import { Link } from "react-router-dom";

function LoginPage() {
  return(
    <>
      <div>
      <h2>Login Page</h2>
      <div>
        <Link to="https://localhost:8080/oauth2/authorization/google">Login with Google</Link>
      </div>
      <div>
        <Link to="https://localhost:8080/oauth2/authorization/github">Login with GitHub</Link>
      </div>
    </div>
    </>
  )
}

export default LoginPage;
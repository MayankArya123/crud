import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useHistory } from "react-router-dom"

import { AppStateContext } from "../AppContext/AppContext"

function Navigation() {
  const { LoggedInUser, setLoggedInUser } = useContext(AppStateContext)

  const history = useHistory()

  useEffect(() => {
    axios
      .get("user/LoggingCheck")
      .then((succs) => {
        if (succs) {
          console.log("succs", succs)
          setLoggedInUser(succs.data)
        }
      })
      .catch((err) => {
        console.log("error ", err)
      })
  }, [])

  const logout = () => {
    axios
      .delete("/user/logout")
      .then((succs) => {
        if (succs) {
          console.log("user logout successfully", succs)

          alert("user logout successfully")

          history.push("/")

          window.location.reload()
        }
      })
      .catch((err) => {
        console.log("error", err)
      })
  }

  console.log("logged in user", LoggedInUser)

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            {" "}
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <Link class="nav-item" to="/create/user">
                {" "}
                create user{" "}
              </Link>
            </ul>
            <ul class="navbar-nav">
              <Link class="nav-item" to="/">
                {" "}
                home{" "}
              </Link>
            </ul>

            {LoggedInUser && LoggedInUser.username ? (
              <ul class="navbar-nav">
                <a class="nav-item" onClick={() => logout()}>
                  {" "}
                  logout{" "}
                </a>
              </ul>
            ) : (
              <ul class="navbar-nav">
                <Link class="nav-item" to="/user/login">
                  {" "}
                  login{" "}
                </Link>
              </ul>
            )}
          </div>

          {LoggedInUser && LoggedInUser.username ? (
            <h6> welcome {LoggedInUser.username} </h6>
          ) : (
            ""
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navigation

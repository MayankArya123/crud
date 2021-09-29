import React, { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router"

function Login() {
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ErrorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  const Login = (e) => {
    e.preventDefault()

    if (!Name || !Password) {
      setErrorMessage("please enter all the fields")
    } else {
      axios
        .post("/user/login", {
          username: Name.toUpperCase().replace(/ /g, ""),
          password: Password,
        })
        .then((succs) => {
          console.log("user logged in succesfully", succs)

          if (succs.status === 202) {
            setErrorMessage(succs.data.msg)
          } else {
            console.log("user logged in successfully")
            alert("user loggedIn successfully")
            setErrorMessage("")

            history.push("/")

            window.location.reload()
          }
        })
        .catch((err) => {
          console.log("error", err)
        })
    }
  }

  return (
    <div>
      <div>
        <form>
          {ErrorMessage && <p> {ErrorMessage} </p>}

          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">
              {" "}
              enter your name
            </label>
            <input
              type="name"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">
              {" "}
              enter your password
            </label>
            <input
              type="name"
              class="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            onClick={(e) => Login(e)}
            class="btn btn-primary"
          >
            login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login

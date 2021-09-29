import React, { useState } from "react"
import axios from "axios"

function CreateUser() {
  const [Name, setName] = useState("")
  const [Password, setPassword] = useState("")
  const [ErrorMessage, setErrorMessage] = useState("")
  const [SuccsMessage, setSuccsMessage] = useState("")

  const submit = (e) => {
    e.preventDefault()

    if (!Name || !Password) {
      setErrorMessage("please enter all the fields")
    } else {
      const UserData = {
        username: Name.toUpperCase().replace(/ /g, ""),
        password: Password,
      }

      axios
        .post("/user/create", UserData)
        .then((succs) => {
          if (succs) {
            console.log("user source created", succs)
            setErrorMessage("")
            setSuccsMessage("user created successfully")
          }
        })
        .catch((err) => {
          console.log("error", err)
        })
    }
  }

  return (
    <div>
      <form>
        <div class="mb-3">
          <h6> {ErrorMessage} </h6>

          <h6> {SuccsMessage} </h6>

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
          onClick={(e) => submit(e)}
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default CreateUser

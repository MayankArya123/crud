import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import axios from "axios"

function EditUser() {
  const { param } = useParams()

  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")

  const history = useHistory()

  const UserUpdate = (e) => {
    e.preventDefault()

    axios
      .put("/update", {
        username: Username,
        password: Password,
        param,
      })
      .then((succs) => {
        console.log("user information updated successfully", succs)

        alert(
          "user details updated please go to home page to see the updated information"
        )
      })
      .catch((err) => {
        console.log("error", err)

        alert(
          "your loggedin time is expired or might some error in database please login again"
        )
        history.push("/user/login")
        window.location.reload()
      })
  }

  useEffect(() => {
    axios
      .post("/EditUserInformation", { param })
      .then((succs) => {
        console.log("got the data of selected user")

        // setUserData(succs.data)

        setUsername(succs.data[0].username)
        setPassword(succs.data[0].password)
      })
      .catch((err) => {
        console.log("error", err)
      })
  }, [])

  console.log("param", param)

  return (
    <div>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            change username
          </label>
          <input
            type="name"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            {" "}
            change Password
          </label>
          <input
            type="name"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            class="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button onClick={(e) => UserUpdate(e)} class="btn btn-primary">
          save
        </button>
      </form>
    </div>
  )
}

export default EditUser

import React,{useEffect,useState,useContext} from 'react'
import axios from 'axios'
import {Link}  from 'react-router-dom'
import { AppStateContext } from '../AppContext/AppContext'


function Homepage() {

 const [Users,setUsers] = useState([])
 const [DeleteCount,setDeleteCount] = useState(0)

 const {LoggedInUser}  = useContext(AppStateContext)

useEffect(() => {
  
axios.get('getAllUsers').then((succs)=>{

if(succs){

console.log('got all the users',succs)
setUsers(succs.data)

}

}).catch((err)=>{

    console.log('error')

})


    }, [DeleteCount])


    const DeleteUser=(e,id)=>{


        console.log('id',id)

        axios.delete(`/deleteTheUser` ,{
            data: { id: id }
        } ).then((succs)=>{

if(succs){
    console.log('user has been deleted')
    setDeleteCount(DeleteCount + 1)
}
        }).catch((err)=>{

         console.log('error',err)
         alert('your loggedin time is expired or might some error in database please login again')

        })


    }

    return (


      <div className="">

      <div className="h6"> all users  registered to this app are here </div>
      <div className="h6"> please login to delete and update the user  </div>
      <div className="cards row"> 
         
      { Users && Users.length > 0 && Users.map((EU)=>{

          return (


              <div className="col-lg-4 col-md-6 col-12 col-sm-12" key={EU._id} >
              
              <div className="card">
              
                             
              <h2>  {EU.username} </h2>
               
              { 
               LoggedInUser && LoggedInUser.username ?

                   <div className="my-card-footer">
               <Link to={`/edit/${EU._id}`}>  <button className="btn btn-primary">Edit </button>  </Link> 
              <button  onClick={(e)=> DeleteUser(e,EU._id)} className="btn btn-warning">delete </button>  
              </div>

              : ''

              }

              </div>

              </div>

          )

      }) }

  </div>
      
      </div>  
      
    )
}

export default Homepage

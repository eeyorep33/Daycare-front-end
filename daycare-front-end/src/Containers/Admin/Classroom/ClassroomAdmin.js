import React, { Component } from 'react';
import Auth from '../../../Containers/Login/Auth';
import Input from '../../../Components/Form/Input';
import Button from '../../../Components/Button/Button';

class ClassroomAdmin extends Component {
    state={
        classrooms: null
       
    }

    componentDidMount() {   
        this.getclassrooms()
    }
 

    getclassrooms() {
        
fetch('http://localhost:8080/classrooms',
{headers: {
    Authorization: 'Bearer ' + this.props.token
}})
.then(resData => resData.json())
.then(resJson => {
  this.setState(prevState => {       
    return {...prevState,  classrooms: resJson.classrooms
    }
 
});   
}) 
    }

    addClassroom(event) {
        event.preventDefault(); console.log(event.target.addClass.value)
        fetch('http://localhost:8080/classroom', 
        {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + this.props.token,
              uid: localStorage.getItem('userId')
            },
            body:JSON.stringify({
                classroomName:event.target.addClass.value,
                facilityId: event.target.facilityId.value
            })
        }
        )
    }
    render() {
      let classMap = null;
    if(this.state.classrooms) {
      classMap = (
        <Auth>
          {this.state.classrooms.map(classroom => {
            return (
              <div>
                <h5>{classroom.name}</h5>
                <Button>Update</Button>
                <Button>Delete</Button>
              </div>
            )
          })}
        </Auth>
      )
    }
      
          
        return(
          <Auth formType={'sign-form'}>
          <form
            onSubmit={(e) =>
              this.addClassroom(e)
            }
          >
            <Input
              id="classroomName"
              label="Classroom Name"
              type="text"
              control="inputNoChange"
              name="addClass"
            />
             <Input
              id="facilityId"         
              type="hidden"
              control="inputNoChange"
              name="facilityId"
              value= {localStorage.getItem('facilityId')}
            />
  
            <Button design="raised" type="submit">
             Add Classroom
            </Button>
          </form>
          <hr/>
          {classMap}
          </Auth>
        )
    }
} 

export default ClassroomAdmin;

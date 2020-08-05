import React, { Component } from 'react'
import hands from '../../images/hands.jpg'
import Auth from '../Login/Auth'
import  './Announcements.css';



class Announcements extends Component {
 state= {
     announcements: null
 }
    componentDidMount() {    
        let facility = this.props.facility  
        if(facility ==null) {
            facility = localStorage.getItem('facilityId')
        }
        fetch('http://localhost:8080/announcement/' + facility, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
          .then(res => {
            if (res.status !== 200) {
              throw new Error('Failed to fetch status');
            }
            return res.json();
          })
          .then(resData => {
            
            this.setState(prevState => {       
                return {...prevState,  announcements: resData.announcements
                }
             
            });       
          })
          .catch(err => {
            console.log(err);
          });
    }

    

    render() {      
       
      
       let announce = null
        if(this.state.announcements) {
            announce =  (<Auth formType={"announcements"}>
            <img className="hands" src={hands} alt="hands"/>
           <div>           
              <h1 className = "title">Announcements</h1>             
              {this.state.announcements.map(announcement => {
              let date = new Date (announcement.createdAt)            
              const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
              const mo = new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
              let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
              if(da.substring(0,1) === "0") {
              da = da.substring(1,2)
              }
              let append = "";
              switch(da) {
                  case "1": append= "st";
                  break;
                  case "2": append = "nd";
                  break;
                  case "3": append = "rd";
                  break;
                  default: append = "th"
              }
              da = da + append;
              date = `${mo} ${da}, ${ye}`
              
           return (
               <div className = {"content"}key={announcement.id}>
                   <p>{date}</p>
                   <p>{announcement.content}</p>
               </div>
           )
              })}
           </div>
               </Auth>)
        } else {         
            
            announce = (<Auth formType={"announcements"}>
            <img className="hands" src={hands} alt="hands"/>
   <div>    
      <h1 className = "title">Announcements</h1>
      </div>
      </Auth>)
        }
        return (
            <Auth>              
                
  {announce}
            </Auth>
          
        )
        
};
}

export default Announcements;
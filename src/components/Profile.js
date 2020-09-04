import React, { Component } from 'react';
import Navbar from './Navbar';
import { get_user } from '../apis';
import AddProfile from './AddProfile';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import './App.css';

export default class Profile extends Component {

    state={
        userData:{},
        loading:true
    }

    async fetchUserData(address){
        
     
        let x = await get_user(address);
        console.log(x.status);
        if(x.status=="Success"){
            this.setState({userData:x.data});
            this.setState({loading:false});
            // if(!(this.state.userData.name==""||this.state.userData.image==""||this.state.userData.email==""||this.state.userData.tagline=="")){
            //     localStorage.setItem('userData', userData);
            // }
        }
        else{
            //Navigate to Home
        }
    }

    componentDidMount(){
        let address=localStorage.getItem('address');
        console.log('Local Address =',address)
        this.fetchUserData(address);
    }

    render(){
        return(
            <div>
               
                <Navbar account={''} />

                {!this.state.loading?
                    <div style={{width:'100%'}}>
                        
                    {this.state.userData.name==""||this.state.userData.image==""||this.state.userData.email==""||this.state.userData.tagline==""?
                        <AddProfile userData={this.state.userData} />
                        :
                        <div className="text-center mt-5">   
                            
  

                                <h3>Welcome!</h3>
                                <div style={{flexDirection:'row'}}>
                                        <Card style={{ width: '20%' }} id="ViewProfileCard">
                                        <img src={this.state.userData.image} />
                                        <Card.Body>
                                            <Card.Title>{this.state.userData.name}</Card.Title>
                                            <Card.Text>
                                            {this.state.userData.tagline}
                                            </Card.Text>
                                            <Card.Text>
                                            {this.state.userData.email}
                                            </Card.Text>
                                            
                                        </Card.Body>
                                        </Card>
                                </div>
                        </div>
                    }
                    
                    </div>
                :<div id="loader" className="text-center mt-5"><p>Loading...</p></div>}

            </div>
        );
    }
}
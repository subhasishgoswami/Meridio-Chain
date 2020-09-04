import React, { Component } from 'react';
import { update_user } from '../apis';
import Card from 'react-bootstrap/Card'


export default class AddProfile extends Component {

    state={
        userData:{},
        loading:true,
        file:{},
        base64:''
    }

    async updateUser(obj){
        this.setState({loading:true})
        console.log(obj)
        let address=this.state.userData.address;
        obj.address=address;
        let x = await update_user(obj);
        console.log(x);
        if(x.status=="Success"){
            localStorage.setItem('email', obj.email);
            window.location.reload(); 
        }
    }

    handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          this.setState({
            file: file,
            base64: reader.result
          });
          
        };
      }



    componentDidMount(){
      this.setState({userData:this.props.userData});
      this.setState({loading:false});
    }

    render(){
        return(
            <div>
               
                {!this.state.loading?
                    <div style={{width:'100%'}}>
                        
                        

                        <Card className="row" id="AddProfileCard" style={{width:'60%'}}>
                            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
                                <div className="content mr-auto ml-auto">
                                <p>&nbsp;</p>
                                    <form onSubmit={(event) => {
                                    event.preventDefault()
                                    const name = this.name.value
                                    const image = this.state.base64
                                    const email = this.postEmail.value
                                    const tagline =this.tagline.value
                                    this.updateUser({name,image,email,tagline})
                                    }}>
                                    <div className="form-group mr-sm-2" id="add_profile_form">
                                    <h4 style={{color:'#ddd'}}>Complete Your Profile</h4>
                                    <input
                                        id="name"
                                        type="text"
                                        ref={(input) => { this.name = input }}
                                        className="form-control"
                                        placeholder="Enter Name"
                                        required />
                                        <input
                                        id="image"
                                        type="file"
                                        // ref={(input) => { this.image = input }}
                                        accept="image/*"
                                        onChange={(e)=>this.handleImageChange(e)}
                                        className="form-control"
                                        placeholder="Enter Image"
                                        required />
                                        <input
                                        id="email"
                                        type="email"
                                        ref={(input) => { this.postEmail = input }}
                                        className="form-control"
                                        placeholder="Enter email"
                                        required />
                                        <input
                                        id="tagline"
                                        type="tagline"
                                        ref={(input) => { this.tagline = input }}
                                        className="form-control"
                                        placeholder="Enter Tagline"
                                        required />
                                    
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-block">Add</button>
                                </form>
                              
                                </div>

                            </main>
                            </Card>


                    </div>
                :<div id="loader" className="text-center mt-5"><p>Loading...</p></div>}

            </div>
        );
    }
}
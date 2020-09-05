import React, { Component } from 'react';
import { update_user } from '../apis';
import Card from 'react-bootstrap/Card'
import Loader from 'react-loader-spinner';

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
        if(x.status==="Success"){
            localStorage.setItem('email', obj.email);
            window.location.reload(); 
        }
    }

     resizeBase64Img(base64, width, height) {
        //  console.log(base64)
        return(base64)
        // var canvas = document.createElement("canvas");
        // canvas.width = width;
        // canvas.height = height;
        // var context = canvas.getContext("2d");
        // var deferred = $.Deferred();
        // $("<img/>").attr("src", "data:image/jpg;base64," + base64).on('load',function() {
        //     context.scale(width/this.width,  height/this.height);
        //     context.drawImage(this, 0, 0); 
        //     deferred.resolve($("<img/>").attr("src", canvas.toDataURL()));               
        // });
        // console.log(deferred.promise())
        // return deferred.promise();    
    }

    handleImageChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
        //   this.resizeBase64Img(reader.result, 100, 100).then(function(newImg){
            
        //     this.setState({
        //         file: file,
        //         base64: reader.result
        //       });
        //   });
          
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
                                    <h4 style={{color:'black'}}>Complete Your Profile</h4>
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
                :
                <div style={{width:'100%'}} className="align-middle text-center mt-5" id="reactLoader">
                    <Loader
                        type="Grid"
                        color="#29487D"
                        height={80}
                        width={80}
                    />
                </div>
                }

            </div>
        );
    }
}
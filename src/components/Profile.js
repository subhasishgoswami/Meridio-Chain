import React, { Component } from 'react';
import Navbar from './Navbar';
import { get_user } from '../apis';
import AddProfile from './AddProfile';
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json';
import Web3 from 'web3';
import Loader from 'react-loader-spinner';

export default class Profile extends Component {

    state={
        userData:{},
        loading:true,
        socialNetwork:{},
        postCount:0,
        posts:[]
    }   

    async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        
        // Network ID
        const networkId = await web3.eth.net.getId()
        const networkData = SocialNetwork.networks[networkId]
        if(networkData) {
          const socialNetwork = web3.eth.Contract(SocialNetwork.abi, networkData.address)
          this.setState({ socialNetwork })
          const postCount = await socialNetwork.methods.postCount().call()
          this.setState({ postCount })
    
    
          // Load Posts
          for (let i = 1; i <= postCount; i++) {
            const post = await socialNetwork.methods.posts(i).call()
            this.setState({
              posts: [...this.state.posts, post]
            })
    
            
          }
    
      }
    }
          

    getUserPosts(){
        let address=this.state.userData.address;
        let posts=this.state.posts;
        let data=[];
        posts.map(item=>{
            if(item.author==address){
                data.push(item);
            }
        });
        this.setState({posts:data});
    }


    async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }


    async fetchUserData(address){
        
     
        let x = await get_user(address);
        console.log(x.status);
        if(x.status=="Success"){
            this.setState({userData:x.data});
            this.setState({loading:false});

            if(!(this.state.userData.name==""||this.state.userData.image==""||this.state.userData.email==""||this.state.userData.tagline=="")){
                  await this.loadWeb3()
                  await this.loadBlockchainData();
                  this.getUserPosts();
                
            }

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
                        <div className="text-center mt-5 container">   
                            
  

                                <h3>Welcome!</h3>
                                <div className="row">



                                        <Card id="ViewProfileCard" className="float-left col-sm-3 mx-5">
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

                                    <div className="col-md">
                                        <div className="row">
                                            {!this.state.loading?
                                            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{}}>
                                                <div className="content mr-auto ml-auto">
                                                <p>&nbsp;</p>
                                                { this.state.posts.map((post, key) => {
                                                    return(
                                                    <div className="card mb-4" key={key} style={{backgroundColor:'#292929'}}>
                                                        <div className="card-header">
                                                       
                                                        <small className="text-muted float-center" id="userPostHeading">{post.heading}</small>
                                                        </div>
                                                        <ul id="postList" className="list-group list-group-flush">
                                                       
                                                        <li className="list-group-item">
                                                            <p>{post.content}</p>
                                                        </li>
                                                       
                                                        <li key={key} className="list-group-item py-2">
                                                            <small className="float-right mt-1 text-muted">
                                                            TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                                                            </small>
                                                            
                                                        </li>
                                                        </ul>
                                                    </div>
                                                    )
                                                })}
                                                </div>
                                            </main>
                                            :
                                            null}

                                            </div>
                                        </div>
                                </div>
                        </div>
                    }
                    
                    </div>
                :

                <div style={{width:'100%'}} className="align-middle text-center mt-5" id="reactLoader">
                <Loader
                    type="Grid"
                    color="#00BFFF"
                    height={80}
                    width={80}
                />
                </div>
                 }

            </div>
        );
    }
}
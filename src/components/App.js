import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import SocialNetwork from '../abis/SocialNetwork.json'
import Navbar from './Navbar'
import Main from './Main';
import { add_user,get_all_users,get_user } from '../apis';

class App extends Component {

  state={
    account: '',
    socialNetwork: null,
    postCount: 0,
    posts: [],
    loading: true,
    status : true,
    allUserData:[]
  }

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
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

  async saveUser(address_user){
      let name = '',
      image = '',
      email = '',
      address = address_user,
      tagline = '';
      localStorage.setItem('address', address_user);
      localStorage.setItem('email', email);
      let x = await add_user({name,image,email,address,tagline});
      console.log(x);
      if(typeof(x.data)=="string")
          console.log("Address already in the server");
      else{
          console.log(x.status);
      }

  }


  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] });
    this.saveUser(accounts[0]);
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
      // Sort posts. Show highest tipped posts first
      this.setState({
        posts: this.state.posts.sort((a,b) => b.tipAmount - a.tipAmount )
      })
      let x =await  get_all_users();
      console.log(x)
      this.setState({ loading: false,allUserData:x.data});
    } else {
      window.alert('Meridio Chain contract not deployed to detected network.')
    }
  }

  async checkCompleteProfile(){
      let address=this.state.account;
      let x = await get_user(address);
      if(x.status=="Success"){
        let data=x.data;
        if(data.name==""||data.email==""||data.image==""||data.tagline==""){
            window.location.href="/profile"
        }
    }
    else{
        window.location.reload();
    }
    
  } 
 
  createPost(heading, content) {
    
    this.setState({ loading: true });
    
    
    this.state.socialNetwork.methods.createPost(heading, content).send({ from: this.state.account })
    .then(function (result) {
      
      alert("Post Created")
      this.setState({ loading: false })
    }).catch(function (err) {
      alert(err);
    });

    }

  tipPost(id, tipAmount) {
    this.setState({ loading: true })
    this.state.socialNetwork.methods.tipPost(id).send({ from: this.state.account, value: tipAmount })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  constructor(props) {
    super(props)
   
    this.createPost = this.createPost.bind(this)
    this.tipPost = this.tipPost.bind(this)
    this.checkCompleteProfile=this.checkCompleteProfile.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
              tipPost={this.tipPost}
              allUserData={this.state.allUserData}
              checkCompleteProfile={this.checkCompleteProfile}
            />
        }
      </div>
    );
  }
}

export default App;

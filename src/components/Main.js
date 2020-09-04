import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Modal,Button, Form} from 'react-bootstrap'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Post
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={(event) => {
                  event.preventDefault()
                  const heading = document.getElementById("postHeading").value
                  const content = document.getElementById("postContent").value
                  
                  let x = props.createPost(heading, content)
                  props.onHide();
                }}>
      <Modal.Body>
        <Form.Group controlId="formBasicText">
          <Form.Control id="postHeading" type="text" className="form-control" placeholder="Title of your project?" required />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Control id="postContent" type="text" className="form-control" placeholder="What's on your mind?" required />
        </Form.Group>
        {/* <Form.Group controlId="formBasicEmail">
          <Form.Control id="email" type="email" className="form-control" placeholder="Enter your email " required />
        </Form.Group> */}
        
      
      </Modal.Body>
      <Modal.Footer>
      <Button variant="primary" type="submit">
          Post
        </Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
}


class Main extends Component {

  state={
    modalShow:false,
    userData:[],
    loading:true,
    posts:[]
  }

  setModalShow(flag){
    this.setState({modalShow:flag});
  }

  matchedAddress(address,data){
    let flag=false;
    data.map(item=>{
      if(item.address==address){
        console.log("True!",item)
        flag=item;
      }
    });
    return(flag);
  }
  componentDidMount(){
    let data=this.props.allUserData;
    let posts=this.props.posts;
    this.setState({userData:data});
    posts.map(item=>{
      let obj=this.matchedAddress(item.author,data);
      console.log("Returned Object",obj);
      if(obj!=false){
          item.email=obj.email;
          item.name=obj.name;
          item.image=obj.image;
          item.tagline=obj.tagline;
      }else{
          item.email='';
          item.name='';
          item.image='';
          item.tagline='';
      }
    });
    console.log(posts)
    this.setState({posts:posts,loading:false});
  }
  
  render() {
    return (
      <div className="container-fluid mt-5">

        <Button variant="primary" id="addPostButton" onClick={() => {
          this.props.checkCompleteProfile();
          this.setModalShow(true);
          }}>
      What's in your mind?
      </Button>

      <MyVerticallyCenteredModal
        show={this.state.modalShow}
        onHide={() => this.setModalShow(false)}
        createPost={this.props.createPost}
        email={this.props.email}
      />
       <div className="row">
         {!this.state.loading?
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px'}}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              { this.state.posts.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} style={{backgroundColor:'#232627'}}>
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={post.image}
                      />
                      <small className="text-muted float-right">{post.name}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                    <li className="list-group-item">
                        <p>{post.heading}</p>
                      </li>
                      <li className="list-group-item">
                        <p>{post.content}</p>
                      </li>
                      <li className="list-group-item">
                      <p>{post.email}</p>
                      </li> 
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          TIPS: {window.web3.utils.fromWei(post.tipAmount.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={post.id}
                          onClick={(event) => {
                            let tipAmount = window.web3.utils.toWei('0.1', 'Ether')
                            console.log(event.target.name, tipAmount)
                            this.props.tipPost(event.target.name, tipAmount)
                          }}
                        >
                          TIP 0.1 ETH
                        </button>
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
    );
  }
}

export default Main;

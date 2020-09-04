import React, { Component } from 'react';
import Navbar from './Navbar';

export default class Github extends Component {

    state={
        account:''
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <Navbar account={this.state.account} />
        
                <div className="text-center mt-5">
                    Github Profile
                </div>

            </div>
        );
    }
}
import React, { Component } from "react";


import Like from "./Polltypes/Like";
import Classic from "./Polltypes/Classic";
import Thumb from "./Polltypes/Thumb";

export default class Vote extends Component {

    constructor(props){
        super(props);
    }
    
    render() {
        
        switch(this.props.poll.polltype) {

            //Clean Post
            case 0:
                return null;    

            //Like
            case 10:
                return <Like poll={this.props.poll}/>;

            //Thumb
            case 11:
                return <Thumb poll={this.props.poll} />;

            //Classic
            case 20:
                return <Classic poll={this.props.poll} />;
            default: return null;



        }


    }

}
import React, { Component } from 'react'
import axios from "axios";


export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            poll: props.poll
        }
    }

    handleVote(){

        const options = {
            url: "https://api.dashpoll.net/vote",
            method: this.state.poll.vote.hasVoted ? "delete" : "post",
            withCredentials: true,   
            data: {
                pollid: this.state.poll._id,
                choice: 1
            }
        }

        let pollState = this.state.poll;
            pollState.vote.hasVoted = !pollState.vote.hasVoted;
            pollState.vote.totalVotes = pollState.vote.hasVoted ? pollState.vote.totalVotes + 1 : pollState.vote.totalVotes - 1;

        this.setState({ poll: pollState });

        axios.request(options)
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err));
        
    }

    render(){
        
        return <div onClick={() => this.handleVote()} className="polltype heart">
            <span className="percent">{this.state.poll.vote.totalVotes}x</span>
            <img src={this.state.poll.vote.hasVoted ? require("../../data/polltypes/like/like_on.png") : require("../../data/polltypes/like/like_off.png")}/>
        </div>
    }
}

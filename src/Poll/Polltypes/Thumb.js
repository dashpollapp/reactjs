import React, { Component } from 'react'
import axios from "axios";


export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            poll: props.poll
        }
    }

    vote(choice){

        let method = "";
        if(typeof this.state.poll.vote.hasVoted === typeof 1){
            if(this.state.poll.vote.hasVoted === choice){
                method = "delete";
            } else {
                method = "post";
            }
        } else {
            method = "post";
        }

        const options = {
            url: "https://api.dashpoll.net/vote",
            method,
            withCredentials: true,   
            data: {
                pollid: this.state.poll._id,
                choice
            }
        }

        let pollState = this.state.poll;

        if(method === "post"){
            if(typeof this.state.poll.vote.hasVoted === typeof 1){
                //Update
                if(this.state.poll.vote.hasVoted === 1){
                    pollState.vote.dislikes++;
                    pollState.vote.likes--;
                } else {
                    pollState.vote.likes++;
                    pollState.vote.dislikes--;
                }
                pollState.vote.hasVoted = choice;
            } else {
                //Erster vote
                pollState.vote.hasVoted = choice;
                if(choice === 1){
                    pollState.vote.likes++;
                } else {
                    pollState.vote.dislikes++;
                }
            }
        } else {
            pollState.vote.hasVoted = false;
            if(choice === 1){
                pollState.vote.likes--;
            } else {
                pollState.vote.dislikes--;
            }
        }

        this.setState({ poll: pollState });

        axios.request(options)
        .then(response => {
            console.log(response);
        })
        .catch(err => console.log(err));
        
    }

    render(){

        const totalVotes = (this.state.poll.vote.dislikes + this.state.poll.vote.likes);
        const likePercent = Math.round(this.state.poll.vote.likes / totalVotes * 100),
           dislikePercent = Math.round(this.state.poll.vote.dislikes / totalVotes * 100);
        
        return <div className="polltype thumbs">
        <div className="vote">
         <div onClick={() => this.vote(1)} className="like">
          <img src={(this.state.poll.vote.hasVoted === 1) ? require("../../data/polltypes/thumb/like_on.png") : require("../../data/polltypes/thumb/like.png")}/>
          <span className="percent">{likePercent}%</span>
         </div>
         <div onClick={() => this.vote(0)} className="dislike">
          <span className="percent">{dislikePercent}%</span>
          <img src={(this.state.poll.vote.hasVoted === 0) ? require("../../data/polltypes/thumb/like_on.png") : require("../../data/polltypes/thumb/like.png")}/>
         </div>
        </div>
        <div className="bar">
         <div className="inner" style={{"width": likePercent + "%" }}>
         </div>
        </div>
       </div>

             
    }
}

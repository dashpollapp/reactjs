import React, { Component } from 'react'
import axios from "axios";


export default class extends Component{
    constructor(props){
        super(props);
        this.state = {
            poll: props.poll
        }
    }
    

    render(){
        
        return <div className="polltype classic">
                    <Answer poll={this.state.poll} />
                </div>
    }
}

class Answer extends Component{
    constructor(props){
        super(props);
        this.state = {
            poll: props.poll
        }
    }

    vote(choice){

        let method = "";
        if(!this.state.poll.vote.hasVoted) {
            method = "post";
        } else {
            if(this.state.poll.vote.hasVoted.includes(choice)) { method = "delete" } else { method = "post" }
        }

        let pollState = this.state.poll;

        if(method === "post"){
            if(pollState.maxVotes === 1) {
                //Logik für Umfragen mit einer Stimme
                if(typeof pollState.vote.hasVoted === typeof [] && pollState.vote.hasVoted.length === 1) {
                    //Stimme ändern
                    pollState.vote.votes[this.state.poll.vote.hasVoted[0]]--;
                    pollState.vote.hasVoted = [choice];
                    pollState.vote.votes[choice]++;
                } else {
                    //Erste Stimme
                    pollState.vote.hasVoted = [choice];
                    pollState.vote.totalVoter++;
                    pollState.vote.totalVotes++;
                    pollState.vote.votes[choice]++;
                }
            } else {
                //Logik für Umfragen mit mehreren Stimmen
                if(pollState.vote.hasVoted) {
                    pollState.vote.hasVoted = [...pollState.vote.hasVoted, choice]
                } else {
                    pollState.vote.hasVoted = [choice];
                    pollState.vote.totalVoter++;
                }
                pollState.vote.totalVotes++;
                pollState.vote.votes[choice]++;
            }
        } else {
            pollState.vote.hasVoted = pollState.vote.hasVoted.filter(c => c !== choice);
            if(typeof pollState.vote.hasVoted === typeof [] && pollState.vote.hasVoted.length === 0 ){
                pollState.vote.hasVoted = false;
                pollState.vote.totalVoter--;
            }
            pollState.vote.totalVotes--;
            pollState.vote.votes[choice]--;
        }

        this.setState({ poll: pollState });

        axios.request({
            url: "https://api.dashpoll.net/vote",
            method,
            withCredentials: true,
            data: {
                pollid: this.state.poll._id,
                choice
            }
        })
        .then(response => {
            

            console.log("STATE UPDATE");

        })
        .catch(err => {
            console.log(err);
        })


    }


    renderAnswers(){
        let renderedAnswers = [];
        const { poll } = this.state;

        //Für jede Antwotmöglichkeit
        poll.answers.forEach(answer => {

            let votedForThisAnswer = false;
            if(poll.vote.hasVoted){
                if(poll.vote.hasVoted.includes(answer.id)) votedForThisAnswer = true;
            }
            let percent;
            if(poll.maxVotes === 1){
                
                //Anhand der Votes gehen
                percent = poll.vote.votes[answer.id] / poll.vote.totalVotes * 100;
            } else {
                //Anhand der Voter gehen
                percent = poll.vote.votes[answer.id] / poll.vote.totalVoter * 100;
            }
            if(isNaN(percent)) percent = 0;

            let css = { width: percent + "%" }

            renderedAnswers.push(
                <div onClick={() => this.vote(answer.id)} key={"answer_" + answer.id } className={"answer" + (votedForThisAnswer ? " on" : "")}>
                        <h4>{answer.text}</h4>
                        <div className="bar">
                            <div className="inner" style={css}>
                            </div>
                            <span className="percent">{Math.round(percent)}%</span>
                        </div>
                </div>
            )          
        });

        return renderedAnswers;
    }

    render(){

        return(
            <div>
                {this.renderAnswers()}
            </div>
        )
    }







}

import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import Media from "./Media";
import Loader from "./Loader";
import Logo from "../data/logo.png";
import Vote from "./Vote";

const convertDate = date => new Date(date).toLocaleString();

export default class extends Component {
	
	constructor(props) {
		super(props)
		//State
		this.state = {
			poll: {},
			isLoaded: false,
		}		
		//Server-IP
		var server = "https://api.dashpoll.net/"
		//HTTP req to PollAPI
		axios.get(server + "polls/" + this.props.match.params.pollid, {withCredentials: true})		
			.then(res => {
				//hat geladen
				this.setState({ isLoaded: true, poll: res.data });
				//titel
				document.title = "Umfrage: " + res.data.heading + " | dashpoll";
			})
			.catch(err => {
				console.log(err)
			})
	}

  render() {
		if(!this.state.isLoaded) {
			return (
				<div>
					<Loader/>
				</div>
			)
		}
		//wenn du geladen hast:
		return (
			<div>
				<div className="container">
					{/*// login msg -->*/}
				
					<Link to="/">
					<div className="pleasLogin">
						<p>
						Willkommen bei Dashpoll. Dies ist eine der ersten Umfragen. Du kannst aktuell nur abstimmen. Weitere Features Folgen diese Woche 🙂
						</p>
					</div>
					</Link>

					{/*// author infos -->*/}
					<div className="author">
						<div className="inner">
							<h3>{this.state.poll.heading}</h3>
							<span className="name">
								{convertDate(this.state.poll.createdAt)} · von {this.state.poll.author.fullname} 

								{(this.state.poll.polltype === 20 && (this.state.poll.maxVotes)) ? (<div className="voteAmount"><span>{this.state.poll.maxVotes}</span></div>) : null} 

							</span>
						</div>
					</div>

					<p>{this.state.poll.text}</p>

					<Media poll={this.state.poll} />

					<Vote poll={this.state.poll}/>
			

				</div>
				<div className="byDashpoll">
					<span>Erstellt auf</span>
					<img src={Logo}/>
				</div>
			</div>
		);
  }
}


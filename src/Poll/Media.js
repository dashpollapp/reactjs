import React, { Component } from "react";

export default class Media extends Component {

    constructor(props){
        super(props);
    }
    
    render() {
        if(!this.props.poll.media) return null;
        const { type, uri } = this.props.poll.media;
        switch (type) {

            //Media: YouTube
            case "youtube":
                return(
                <div className="youtube media">
                    <iframe width="100%" src={"https://www.youtube-nocookie.com/embed/" + uri} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                    </iframe>
                </div>
                )

                break;

            //Media: Spotify
            case "spotify":
                return(<div className="spotify media">
                    <iframe src={"https://open.spotify.com/embed/track/" + uri } width="100%" height="80" frameBorder="0" allowTransparency="true" allow="encrypted-media">
                    </iframe>
                </div>)
                break;
        
            default:
                return <div></div>
        }
    }

}
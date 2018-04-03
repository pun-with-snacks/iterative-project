import React, { Component } from 'react';

class Entry extends Component {

    voteUp () {
				// fetch('/voteup')
				// .then(res => res.json())
				// .then(json => alert('you voted up'))
				alert('You Voted UP this snack - Functionality Coming soon...');
    }

    render () {
        return (
            <div className='entry'>
                <div>{ this.props.userPost.userName }</div>
                <img className='entryImg' src={ this.props.userPost.snackPhoto } />
                <div className="comment">{ this.props.userPost.comment }</div>
								<div className="votes">{ this.props.userPost.votes }</div>
                <button onClick={ this.voteUp }>Thumbs up!</button>
            </div>
        );
    }
}

export default Entry;

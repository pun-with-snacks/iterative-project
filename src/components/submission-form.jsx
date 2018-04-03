import React, { Component } from 'react';

class SubmissionForm extends Component {
	constructor (props){
		super(props)
		this.submitEntry = this.submitEntry.bind(this);
	}


	submitEntry (e) {
		const imageInput = document.getElementById('imageinput').value;
		const comment = document.getElementById('comment').value;
		fetch('/submission', {
			method: 'POST',
			credentials: 'same-origin',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				snackPhoto: imageInput,
				comment: comment,
				userName: this.props.userName,
			}),
		}).then(res => console.log(res))
			.catch(err => err);
		// location.reload();
	}


	render() {
		return (
			<div id='submissionForm'>
				<h1>Add your Snack!!!</h1>
				{/* add action and method!!!! */}
				Image: <input id="imageinput" type='text' name='image' /> <br />
				Comment: <input id="comment" type='text' name='comment' /> <br />
				<button type='submit' onClick={ (e) => { e.preventDefault(); this.submitEntry(e); } } > Add Snack </button>
			</div>
		);
	}
}

export default SubmissionForm;

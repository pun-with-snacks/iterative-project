import React, {Component} from 'react';
import Header from './header.jsx';
import SubmissionForm from './submission-form.jsx';
import Cart from './cart.jsx';
import Footer from './footer.jsx';

class App extends Component{

    constructor (props) {
        super(props)
        this.state = {};
    }

    componentDidMount () {
        console.log(`componentDidMount fired!!! `);
        fetch('/test', {credentials: "same-origin"})
        .then(response => response.json())
        .then(myJson => {
					// console.log(myJson);
					this.setState(myJson);
					console.log(this.state + "<==== this.state");
        })
				.catch(err => console.log(err));

				// fetch('/cart', {credentials: "same-origin"})
				// .then(res => res.json())
				// .then(myJson => {
				// 	console.log(myJson);
				// 	this.setState({cart: myJson});
				// 	console.log(this.state);
				// })
    }

    render () {
        return (
            <div>
                <Header id='header' userName={ this.state.userName }  avatar={ this.state.avatar } />
                <SubmissionForm userName={ this.state.userName } />
                <Cart cart={ this.state.cart } />
                <Footer />
            </div>
        );
    }
}

export default App;

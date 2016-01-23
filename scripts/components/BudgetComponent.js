'use strict';

var React = require('react');
var FinancesModel = require('../models/FinancesModel');
var financesQuery = new Parse.Query(FinancesModel);

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         entries: []
	    };
	},
	componentWillMount: function(){
		financesQuery.find().then((list)=> {
			this.setState({entries: list})
			}
		);
	},
	render: function() {
		console.log(this.state.entries);
		return(
			<div>
				<form onSubmit={this.entry} className="form">
					<h2>Date</h2>
					<input ref="date" type="date"/>
					<h2>For What?</h2>
					<select ref="kind">
						<option>Gas</option>
						<option>Groceries</option>
						<option>Going Out</option>
						<option>Other</option>
					</select>
					<h2>Amount</h2>
					<input ref="amount" type="number"/>
					<button>Enter</button>
				</form>
			</div>
		)
	},
	entry: function(e){
		e.preventDefault();
		console.log(this.refs.kind.value);
		console.log(this.refs.date.value);
		console.log(parseInt(this.refs.amount.value));
		var financesAdd= new FinancesModel();
		financesAdd.set('Date', this.refs.date.value);
		financesAdd.set('Type', this.refs.kind.value);
		financesAdd.set('Amount', parseInt(this.refs.amount.value));
		financesAdd.save({
			success: function(){
				console.log('saved');
			}
		});
	}
});
//comments here



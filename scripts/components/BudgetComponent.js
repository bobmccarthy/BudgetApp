'use strict';

var React = require('react');
var FinancesModel = require('../models/FinancesModel');
var financesQuery = new Parse.Query(FinancesModel);

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         entries: [],
	         newer: 0
	    };
	},
	componentWillMount: function(){
		financesQuery.find().then((list)=> {
			this.setState({entries: list})
			}
		);
	},
	render: function() {
		var total = 0;
		console.log(this.state.entries);
		var table = this.state.entries.map((entry)=>{
			total=total+entry.get('Amount');
			return (
				<div className="eachEntry" key={entry.id}>
					<div className="tRow">{entry.get('Date')}</div>
					<div className="tRow">${entry.get('Amount')}</div>
					<div className="tRow">{entry.get('Type')}</div>
				</div>
				)
		})
		return(
			<div>
				<form onSubmit={this.entry} className="form box-shadow--2dp">
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
				<h2 className="outsideText">Our Budget Table</h2>
				<div className="allTable box-shadow--2dp">
					{table}
				</div>
				<div className="totalAmt">
					<h2>Total: ${total}</h2>
				</div>
			</div>
		)
	},
	entry: function(e){
		// e.preventDefault();
		
		console.log(this.refs.kind.value);
		console.log(this.refs.date.value);
		console.log(parseInt(this.refs.amount.value));
		var financesAdd= new FinancesModel();
		financesAdd.set('Date', this.refs.date.value);
		financesAdd.set('Type', this.refs.kind.value);
		financesAdd.set('Amount', parseInt(this.refs.amount.value));
		financesAdd.save({
			
			success: ()=>{

			}
		});

	}
});
//comments here



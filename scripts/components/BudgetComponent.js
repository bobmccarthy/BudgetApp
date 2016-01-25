'use strict';

var React = require('react');
var $ = require('jquery');
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
		
		var otherTotal=0;
		var gasTotal=0;
		var groceryTotal=0;
		var goingOutTotal=0;
		console.log(this.state.entries);
		var table = this.state.entries.map((entry)=>{
			total=total+entry.get('Amount');
			if (entry.get('Description')){
				otherTotal=otherTotal+entry.get('Amount');
				var des = (<div className="tRow">{entry.get('Description')}</div>);
			}
			else{
				var des = (<div className="tRow">{entry.get('Type')}</div>);
			}
			if (entry.get('Type')=='Gas'){
				gasTotal=gasTotal+entry.get('Amount');
			}
			if (entry.get('Type')=='Groceries'){
				groceryTotal=groceryTotal+entry.get('Amount');
			}
			if (entry.get('Type')=='Going Out'){
				goingOutTotal=goingOutTotal+entry.get('Amount');
			}
			return (
				<div className="eachEntry" key={entry.id}>
					<div className="tRow">{entry.get('Date').substring(5,12)}</div>
					<div className="tRow">${entry.get('Amount')}</div>
					{des}
				</div>
				)
		})
		return(
			<div>
				<form onSubmit={this.entry} className="form box-shadow--2dp">
					<h2>Date</h2>
					<input className="date" ref="date" type="date"/>
					<h2>For What?</h2>
					<select onChange={this.descript} ref="kind">
						<option>Gas</option>
						<option>Groceries</option>
						<option>Going Out</option>
						<option>Other</option>
					</select>
					<input id="desc" ref="descr" placeholder="description"/>
					<h2>Amount</h2>
					<input className="amountC" ref="amount" type="number"/>
					<button>Enter</button>
				</form>
				<div className="floats">
					<div className="totalAmt box-shadow--4dp">
						<h3>Total: ${total}</h3>
						<h3>Gas Total: ${gasTotal}</h3>
						<h3>Groceries Total: ${groceryTotal}</h3>
						<h3>Going Out Total: ${goingOutTotal}</h3>
						<h3>Other Total: ${otherTotal}</h3>
					</div>
					<div className="totalLeft box-shadow--4dp">
						<h3>Total Left: ${700-total}</h3>
						<h3>Gas Total Left: ${200-gasTotal}</h3>
						<h3>Groceries Total Left: ${200-groceryTotal}</h3>
						<h3>Going Out Total Left: ${200-goingOutTotal}</h3>
						<h3>Other Total Left: ${100-otherTotal}</h3>
					</div>
				</div>
				<div className="outsideText">Expenditures</div>
				<div className="allTable box-shadow--2dp">
					{table}
				</div>

			</div>
		)
	},
	entry: function(e){
		e.preventDefault();
		console.log(this.refs.kind.value);
		console.log(this.refs.date.value);
		console.log(parseInt(this.refs.amount.value));
		var financesAdd= new FinancesModel();
		if (this.refs.descr.value){
			financesAdd.set('Description', this.refs.descr.value);
		}
		financesAdd.set('Date', this.refs.date.value);
		financesAdd.set('Type', this.refs.kind.value);
		financesAdd.set('Amount', parseInt(this.refs.amount.value));
		financesAdd.save({
			
			success: ()=>{
				$('.date').val('');
				$('.amountC').val('');
				financesQuery.find().then((list)=> {
					this.setState({entries: list})
				}
				);
			}
		});

	},
	descript: function(){
		
		
		if (this.refs.kind.value=='Other'){
			document.getElementById('desc').style.display = 'block';
		}
	}
});
//comments here




'use strict';
var ReactDOM = require('react-dom');
var React = require('react');

Parse.initialize('nVzrZSyHc9zZEKd3UGiztb7Z1m001ScibBLpA5o2', 'vyuHvAK922TMbdvvkXZb8oK89a2paFCRqzDTVEmh');


var BudgetComponent = require('./components/BudgetComponent');



ReactDOM.render(
	<BudgetComponent />,
	document.getElementById('main')
	)
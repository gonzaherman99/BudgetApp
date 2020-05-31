const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.use(express.static('public'));

const object = {
	income: '',
	incomeperiod: '',
	cashflow: [],
	alert1: '',
	alert2: ''
};

const objectE = {
	Utilities: [],
	Groceries: [],
	Entertainment: [],
	Household: [],
	Other: []
};

const objectT = {
	totalUti: '',
	totalGro: '',
	totalEnt: '',
	totalHou: '',
	totalOth: ''
};

app.get('/', function(req, res) {



function reduceE(param, param2, param3) {


	if (param === 0) {
	
		console.log('nel');

	} else {
   		
   		if (Object.keys(objectT)[0] === param3) {

   			objectT.totalUti = param2.reduce((x, y) => (x + y));

   		}

   		if (Object.keys(objectT)[1] === param3) {

   			objectT.totalGro = param2.reduce((x, y) => (x + y));

   		}

   		if (Object.keys(objectT)[2] === param3) {

   			objectT.totalEnt = param2.reduce((x, y) => (x + y));

   		}

   		if (Object.keys(objectT)[3] === param3) {

   			objectT.totalHou = param2.reduce((x, y) => (x + y));

   		}

   		if (Object.keys(objectT)[4] === param3) {

   			objectT.totalOth = param2.reduce((x, y) => (x + y));

   		}
		
	}
}

 	reduceE(Object.keys(objectE.Utilities).length, objectE.Utilities, 'totalUti');

  	reduceE(Object.keys(objectE.Groceries).length, objectE.Groceries,	'totalGro');

 	reduceE(Object.keys(objectE.Entertainment).length, objectE.Entertainment,	'totalEnt');

	reduceE(Object.keys( objectE.Household).length, objectE.Household,	'totalHou');

	reduceE(Object.keys(objectE.Other).length, objectE.Other,	'totalOth');


	var total = object.income - Object.keys(objectT).reduce((x, key)=> x + parseFloat(objectT[key]||0), 0);


	res.render('index', {incomeAmount: object.income, period: object.incomeperiod, 
		UtilitiesE: objectE.Utilities, GroceriesE: objectE.Groceries, EntertainmentE: objectE.Entertainment, HouseholdE: objectE.Household,
		OtherE: objectE.Other, totalU: objectT.totalUti, 
		totalG: objectT.totalGro, totalE: objectT.totalEnt, totalH: objectT.totalHou, totalO: objectT.totalOth, cashflow: total
	});
	
});

app.post('/', function(req, res) {
	if (object.income === '' && req.body.income !== '') {	

		object.income = req.body.income;
		object.incomeperiod = req.body.periods;

	} else if (req.body.income === '') {

		object.alert1 = 'No Income Enter';

	} else {

		object.income === object.income;

	}

	function checkL(param, param2, param3) {
	if (req.body.etype === param2)		{
		if (param !== 5) {
			param3.push(Number(req.body.expenses));
		} 
	  }
	}

	if (req.body.expenses !== '') {

			checkL(Object.keys(objectE.Utilities).length, 'Utilities', objectE.Utilities);

			checkL(Object.keys(objectE.Groceries).length, 'Groceries', objectE.Groceries);

			checkL(Object.keys(objectE.Entertainment).length, 'Entertainment', objectE.Entertainment);

			checkL(Object.keys( objectE.Household).length, 'Household', objectE.Household);

			checkL( Object.keys(objectE.Other).length, 'Other', objectE.Other);

	}
	
	res.redirect('/');
});

app.listen(3000, function(req, res) {
	console.log('Server listening in port 3000');
});
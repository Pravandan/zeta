import React, {Component} from 'react';

export function RequestTransaction(mobile,amount){
	const baseUrl = "52.187.64.222:3000/transaction/initiate?mobile="+mobile+"&amount="+amount;
	var reqObj = {};
	var responseObj = {"success":false};
	let url = "http://52.187.64.222:3000/transaction/initiate?mobile="+mobile+"&amount="+amount;
	return fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			responseObj.success = true;
			console.log(data.token);
			return data;
		})
		.catch(function (error) {
			responseObj.success = false;
			console.log(error)
		})
}

export function NewTransaction(userId){
	const baseUrl = "52.187.64.222:3000/transaction/fetch?mobile=8750507753";
	var reqObj = {};
	var responseObj = {"success":false};
	let url = 'http://52.187.64.222:3000/transaction/fetch?mobile=8750507753';
	return fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			responseObj.success = true;
			console.log(data.token);
			return data;
		})
		.catch(function (error) {
			responseObj.success = false;
			console.log(error)
		})
}

export function ConfirmTransaction(token){
	const baseUrl = "52.187.64.222:3000/transaction/complete?token="+token;
	var reqObj = {};
	var responseObj = {"success":false};
	let url = 'http://52.187.64.222:3000/transaction/complete?token='+token;
	return fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			responseObj.success = true;
			console.log(data.token);
			return data;
		})
		.catch(function (error) {
			responseObj.success = false;
			console.log(error)
		})
}

export function TransactionStatus(token){
	const baseUrl = "52.187.64.222:3000/transaction/status?token="+token;
	console.log('called');
	var reqObj = {};
	var responseObj = {"success":false};
	let url = 'http://52.187.64.222:3000/transaction/status?token='+token;
	return fetch(url)
		.then((resp) => resp.json())
		.then(function (data) {
			responseObj.success = true;
			console.log(data.token);
			return data;
		})
		.catch(function (error) {
			responseObj.success = false;
			console.log(error)
		})
}
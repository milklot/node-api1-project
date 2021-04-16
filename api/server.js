// BUILD YOUR SERVER HERE

const express = require('express');
const db = require('./users/model');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
	res.status(200).json({message: "Hello Eli"});
})

server.get("/api/users", (req, res) => {
	db.find()
		.then(users => {
			console.log(users);
			res.status(200).json(users)
		})
		.catch(err => {
			res.status(500).json({
				message: err.message
			})
		})
})

server.get("/api/users/:id", (req, res) => {
	
	db.findById(req.params.id)
		.then(specUser => {
			if (!specUser){
				res.status(404).json({
					message: "User with this id not found"
				})
			}
			else {
				console.log(specUser);
				res.status(200).json(specUser);
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: err.message
			})
		})
})

server.post("/api/users", (req, res) => {
	if (!req.body.name  || !req.body.bio) {
		res.status(404).json({
			message: "name or bio must be entered"
		})
	}
	else {
		db.insert(req.body)
			.then(newUser => {
				console.log("new user successfuly created");
				res.status(201).json(newUser)
			})
			.catch(() => {
				res.status(500).json({
					message: "cannot add new user"
				})
			})
	}
})

server.delete("/api/users/:id", async (req, res) => {
	const { id } = req.params

	db.remove(id)
		.then(user => {
			console.log("user successfuly deleted");
			res.status(200).json(user)
		})
		.catch(() => {
			res.status(404).json({
				message: "cannot delete this user"})
		})
})

server.put("/api/users/:id", (req, res) => {
	const { id } = req.params;

	if (!req.body.name || !req.body.bio) {
		res.status(400).json({
			message: "name or/and bio was not provided"
		})
	}
	else {
		db.update(id, req.body)
			.then(user => {
				console.log('user updated successfuly');
				res.status(200).json(user);
			})
			.catch(() => {
				console.log("there's an error with updating this user")
				res.status(500).json({
					message: "there's an error with updating this user"
				})
			})
	}
})

module.exports = server; 
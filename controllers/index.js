var r = require("rethinkdb");

exports.create = async (req, res) => {
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error");
	}

	r.db("domi")
		.table("users")
		.insert(req.body)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.inserted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.update = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error update");
	}
	r.db("domi")
		.table("users")
		.filter({ id: id })
		.update(req.body)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.replaced !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.findById = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error findById");
	}
	r.db("domi")
		.table("users")
		.filter({ id: id })
		.run(connection, function (err, cursor) {
			if (err) throw err;
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
		});
};

exports.createRequest = async (req, res) => {
	var datos = {
		id: req.body.id,
		nombres: req.body.nombres,
		imagenurl: req.body.imagenurl,
		from: req.body.from,
		to: req.body.to,
		precio: req.body.precio,
		comentario: req.body.comentario,
		locationTo: r.point(
			req.body.locationTo.longitude,
			req.body.locationTo.latitude
		),
		locationFrom: r.point(
			req.body.locationFrom.longitude,
			req.body.locationFrom.latitude
		),
	};
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error createRequest");
	}
	// // console.logdatos);
	r.db("domi")
		.table("request")
		.insert(datos)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.inserted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.updateRequest = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updateRequest");
	}
	r.db("domi")
		.table("request")
		.filter({ id: id })
		.update(req.body)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.replaced !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.findByIdPrev = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error findByIdPrev");
	}
	r.db("domi")
		.table("prevcheck")
		.filter({ id: id })
		.run(connection, function (err, cursor) {
			if (err) throw err;
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
		});
};

exports.deleteRequest = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error deleteRequest");
	}
	r.db("domi")
		.table("request")
		.filter({ id: id })
		.delete()
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.deleted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.createDriverLocation = async (req, res) => {
	var datos = {
		id: req.body.id,
		location: r.point(
			req.body.driverCurrentLocation.longitude,
			req.body.driverCurrentLocation.latitude
		),
	};
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error createDriverLocation");
	}
	// // console.logdatos);
	r.db("domi")
		.table("driverLocation")
		.insert(datos)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.inserted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.updateDriverLocation = async (req, res) => {
	var id = req.params.id;
	var datos = {
		location: r.point(
			req.body.driverCurrentLocation.longitude,
			req.body.driverCurrentLocation.latitude
		),
	};
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updateDriverLocation");
	}
	r.db("domi")
		.table("driverLocation")
		.filter({ id: id })
		.update(datos)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.replaced !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.findByIdDriverLocation = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
		r.db("domi")
			.table("driverLocation")
			.filter({ id: id })
			.run(connection, function (err, cursor) {
				if (err) throw err;
				cursor.toArray((err, result) => {
					if (err) throw err;
					res.send(result);
				});
			});
	} catch (error) {
		console.log("error findByIdDriverLocation");
	}
};

exports.deleteDriverLocation = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error deleteDriverLocation");
	}
	r.db("domi")
		.table("driverLocation")
		.filter({ id: id })
		.delete()
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.deleted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.findByIdRequest = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error findByIdRequest");
	}
	r.db("domi")
		.table("request")
		.filter({ id: id })
		.run(connection, function (err, cursor) {
			if (err) throw err;
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
		});
};

exports.findRequest = async (req, res) => {
	// console.logreq.body);
	var lat = req.body.driverCurrentLocation.latitude;
	var lon = req.body.driverCurrentLocation.longitude;
	var circulo = r.circle([lon, lat], 2700);
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error findRequest");
	}
	r.db("domi")
		.table("request")
		.getIntersecting(circulo, { index: "locationFrom" })
		.run(connection, function (err, cursor) {
			if (err) throw err;
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
		});
};

exports.deletePrev = async (req, res) => {
	var id = req.params.id;
	// console.log(req.body);
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error deletePrev");
	}
	r.db("domi")
		.table("prevcheck")
		.get(id)
		.update({
			conductores: r
				.row("conductores")
				.filter((it) => it("idConductor").ne(req.body.id)),
		})
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.deleted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.updatePrev = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updatePrev");
	}
	r.db("domi")
		.table("prevcheck")
		.get(id)
		.update({ conductores: r.row("conductores").append(req.body.conductores) })
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.deleted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.createPrev = async (req, res) => {
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error createPrev");
	}
	r.db("domi")
		.table("prevcheck")
		.insert(req.body)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.deleted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.updateAceptadoPrev = async (req, res) => {
	var id = req.params.id;
	// console.log(req.body);
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updatePrev");
	}
	r.db("domi")
		.table("prevcheck")
		.get(id)
		.update({
			conductores: r.row("conductores").map((elem) => {
				return r.branch(
					elem("idConductor").eq(req.body.id),
					elem.merge({
						aceptado: "si",
						idHistorial: req.body.idHistorial,
					}),
					elem
				);
			}),
		})
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.replaced !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.createHistorial = async (req, res) => {
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error createPrev");
	}
	r.db("domi")
		.table("historial")
		.insert(req.body)
		.run(connection, function (err, result) {
			if (err) throw err;
			// console.log(result);
			if (result.inserted !== 0) {
				res.send(result.generated_keys[0]);
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.findPreviobyId = async (req, res) => {
	var id = req.query.id;
	// console.log(req.query);
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updatePrev");
	}
	r.db("domi")
		.table("prevcheck")
		.filter({ id: id })
		.pluck("conductores")("conductores")
		.map((item) => {
			return item.filter((service) => {
				return service("idConductor").match(req.query.idConductor);
			});
		})
		.run(connection, function (err, cursor) {
			if (err) throw err;
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
		});
};

exports.deleteAceptacionPrevia = async (req, res) => {
	var id = req.params.id;
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error deleteDriverLocation");
	}
	r.db("domi")
		.table("prevcheck")
		.filter({ id: id })
		.delete()
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.deleted !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.findHistorial = async (req, res) => {
	console.log(req.query);
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updatePrev");
	}
	r.db("domi")
		.table("historial")
		.filter(req.query)
		.run(connection, function (err, cursor) {
			if (err) throw err;
			cursor.toArray((err, result) => {
				if (err) throw err;
				res.send(result);
			});
		});
};

exports.updateHistorial = async (req, res) => {
	var busqueda = {
		idConductor: req.body.idConductor,
		fecha: req.body.fecha,
		horaInicio: req.body.hora,
	};
	var actualizar = {
		estado: req.body.estado,
	};
	try {
		var connection = await r.connect({
			host: "161.97.90.157",
			port: 49154,
		});
	} catch (error) {
		console.log("error updatePrev");
	}
	r.db("domi")
		.table("historial")
		.filter(busqueda)
		.update(actualizar)
		.run(connection, function (err, result) {
			if (err) throw err;
			if (result.replaced !== 0) {
				res.send("Exito");
			} else {
				res.send("Intenta de Nuevo");
			}
		});
};

exports.Hora = async (req, res) => {
	function addZero(i) {
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	let date = new Date();
	let day = addZero(date.getDate());
	let month = addZero(date.getMonth() + 1);
	let year = date.getFullYear();

	let h = addZero(date.getHours());
	let m = addZero(date.getMinutes());
	let hora = h + ":" + m;
	let fecha = `${day}-${month}-${year}`;

	let entrega = {
		hora,
		fecha,
	};
	res.send(entrega);
};

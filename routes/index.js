module.exports = (app) => {
	const domi = require("../controllers/index.js");

	//Crear usuario
	app.post("/user", domi.create);

	//Devuelve usuario por Id
	app.get("/user/:id", domi.findById);

	//Actualizar usuario por Id
	app.put("/user/:id", domi.update);

	//Crear request
	app.post("/request", domi.createRequest);

	//Devuelve el requerimiento por Id de Cliente
	app.get("/request/:id", domi.findByIdRequest);

	//Devuelve el requerimiento por coordenadas del Conductor
	app.post("/requestbycoord", domi.findRequest);

	//Actualizar request
	app.put("/request/:id", domi.updateRequest);

	//Devuelve los conductores que aceptan un pedido por Id de Cliente
	app.get("/prev/:id", domi.findByIdPrev);

	//Elimina los conductores que aceptan un pedido con su Id
	app.delete("/prev/:id", domi.deletePrev);

	//Actualiza los conductores que aceptan un pedido con el Id Cliente
	app.put("/prev/:id", domi.updatePrev);

	//Actualiza el conductores aceptado por Id Cliente
	app.put("/aceptadoprevio/:id", domi.updateAceptadoPrev);

	//Crea los conductores que aceptan un pedido
	app.post("/prev", domi.createPrev);

	// Borrar un requerimiento por Id de Cliente
	app.delete("/request/:id", domi.deleteRequest);

	//Crear driverLocation
	app.post("/driverLocation", domi.createDriverLocation);

	//Actualizar driverLocation
	app.put("/driverLocation/:id", domi.updateDriverLocation);

	//Devuelve las ubicaciones de los conductores Id
	app.get("/driverLocation/:id", domi.findByIdDriverLocation);

	// Borrar una localizacion Id de Conductor
	app.delete("/driverLocation/:id", domi.deleteDriverLocation);

	// Delete a Note with noteId
	// app.delete('/notes/:noteId', domi.delete);

	//Crea el historial
	app.post("/historial", domi.createHistorial);

	//Modificar el historial
	app.put("/historial", domi.updateHistorial);

	//Obtener el conductor que fue aceptado por id Cliente
	app.get("/previo", domi.findPreviobyId);

	// Borrar una aceptacion previa por Id de Cliente
	app.delete("/previo/:id", domi.deleteAceptacionPrevia);

	//Devuelve historial segun parametros
	app.get("/historial", domi.findHistorial);

	//Devuelve la hora
	app.get("/hora", domi.Hora);
};

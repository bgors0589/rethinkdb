const http = require("http");
const express = require("express");
const app = express();
const socketIO = require("socket.io");
var r = require("rethinkdb");

const cors = require("cors");

const server = http.Server(app);
const io = socketIO(server);

app.use(cors({ origin: true, credentials: true }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Definicion de una ruta simple
app.get("/", (req, res) => {
	res.json({
		message:
			"Bienvenido a la Aplicacion. Aqui se organiza todo lo de la App de Alianzas de Domiciliarios.",
	});
});

require("./routes/index.js")(app);

const port = process.env.PORT || 3050;

async function inicial() {
	var connection = await r.connect({
		host: "161.97.90.157",
		port: 49154,
	});
	// database selection
	const db = r.db("domi");
	// table selection
	const requestTable = db.table("request");
	const driverLocationTable = db.table("driverLocation");
	const prevcheckTable = db.table("prevcheck");
	const usersTable = db.table("users");
	const historialTable = db.table("historial");
	const contactoTable = db.table("contacto");
	// onchange event
	const cursor = await requestTable.changes().run(connection);
	const cursorDL = await driverLocationTable.changes().run(connection);
	const cursorP = await prevcheckTable.changes().run(connection);
	const cursorU = await usersTable.changes().run(connection);
	const cursorH = await historialTable.changes().run(connection);
	const cursorC = await contactoTable.changes().run(connection);

	cursor.each(async (err, data) => {
		// data.new_val -> new value
		// data.old_val -> old value
		io.sockets.emit("request", "requestBRYAN");
	});

	cursorDL.each(async (err, data) => {
		// data.new_val -> new value
		// data.old_val -> old value
		io.sockets.emit("UbicacionConductor", "requestBRYANDriver");
	});

	cursorP.each(async (err, data) => {
		// data.new_val -> new value
		// data.old_val -> old value
		io.sockets.emit("AceptacionPrevia", "requestACEPREVBryan");
	});

	cursorU.each(async (err, data) => {
		// data.new_val -> new value
		// data.old_val -> old value
		io.sockets.emit("nuevoUsuario", "requestNewUserBryan");
	});

	cursorH.each(async (err, data) => {
		// data.new_val -> new value
		// data.old_val -> old value
		io.sockets.emit("historial", "requestHistorialBryan");
	});

	cursorC.each(async (err, data) => {
		// data.new_val -> new value
		// data.old_val -> old value
		io.sockets.emit("contacto", "requestContactoBryan");
	});

	io.on("connection", async (client) => {
		console.log(`un usuaario se conecto ${client.id}`);
		client.on("disconnect", () => {
			console.log(`se desconecto ${client.id}`);
		});
	});
}

inicial();

io.listen(
	app.listen(port, () => {
		console.log(`El servidor está inicializado en el puerto ${port}`);
	})
);

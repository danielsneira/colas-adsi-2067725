import {tickets, turnos, escritorios, ticketNum} from '../app.js'

const socketController = (socket) => {

	console.log("cliente conectado", socket.id);
	
  socket.on("disconnect", () => {
		console.log("cliente desconectado", socket.id);
	});

	socket.on("nuevo-ticket", (data) => {
		tickets.push(data);
		ticketNum.number = data + 1;
    const payload = {tickets: tickets, ticketNum: ticketNum.number}
		socket.broadcast.emit("tickets-servidor", payload);
	});

  socket.on('get-tickets', (payload, callback) => {
    const data = {ticketNum: ticketNum.number, tickets: tickets}
    callback(data)
  })

	socket.on("nuevo-escritorio", (data, callback) => {
		escritorios.push(data.escritorios);
    callback(escritorios)
		socket.broadcast.emit("escritorios-servidor", data);
	});

  socket.on("nuevo-turno", (data, callback) => {
    let ticket = tickets.shift()
    const turno = {ticket, escritorio: data}
		turnos.unshift(turno);
    callback(turnos)
    const payload = {
      turnos, tickets
    }
		socket.broadcast.emit("turnos-servidor", payload);
	});

};

export { socketController };

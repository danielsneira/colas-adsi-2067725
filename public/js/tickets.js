const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		tickets: [],
		escritorios: [],
		turnos: [],
		ticketNum: 1,
		isDisabled: false,
		vista: "nuevo-ticket",
	},
	created() {

    this.getTickets();

		socket.on("tickets-servidor", (data) => {
			this.tickets = data.tickets;
			this.ticketNum = data.ticketNum;
		});

		socket.on("escritorios-servidor", (data) => {
			this.escritorios = data.escritorios;
		});

		socket.on("turnos-servidor", (data) => {
			this.turnos = data.turnos
			this.tickets = data.tickets
		});
	},
	computed: {
		totalTurnos() {
			return this.tickets.length;
		},
		w() {
			if (this.turnos.length > 0) {
				return this.turnos[0];
			}
			return { ticket: "cargando...", escritorio: "cargando..." };
		},
		x() {
			if (this.turnos) {
				if (this.turnos[1]) return this.turnos[1];
			}
			return { ticket: "cargando...", escritorio: "cargando..." };
		},
		y() {
			if (this.turnos) {
				if (this.turnos[2]) {
					return this.turnos[2];
				}
			}
			return { ticket: "cargando...", escritorio: "cargando..." };
		},
		z() {
			if (this.turnos) {
				if (this.turnos[3]) {
					return this.turnos[3];
				}
			}
			return { ticket: "cargando...", escritorio: "cargando..." };
		},
	},

	methods: {
		nuevoTicket() {
      this.isDisabled = true;
			const payload = this.ticketNum;
			socket.emit("nuevo-ticket", payload)
      this.getTickets()
		},
    getTickets(){
      const payload = ''
      socket.emit('get-tickets', payload, data => {
        this.ticketNum = data.ticketNum
        this.tickets = data.tickets
      })
    }
	},
});

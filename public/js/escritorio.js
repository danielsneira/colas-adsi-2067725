const socket = io();

const app = new Vue({
	el: "#app",
	data: {
		tickets: [],
		escritorios: [],
		turnos: [{}],
		turno: {},
		ticketNum: 1,
		nombreEscritorio: "",
		atender: false,
		isDisabled: false,
	},
	created() {
		socket.on("tickets-servidor", (data) => {
			this.tickets = data.tickets;
			this.ticketNum = data.ticketNum;
		});

		socket.on("turnos-servidor", (data) => {
			this.turnos = data.turnos;
			this.tickets = data.tickets;
		});

		this.nuevoEscritorio();
    this.getTickets();
	},

	computed: {
		totalTurnos() {
			this.tickets.length == 0 ? (this.isDisabled = true) : (this.isDisabled = false);
			return this.tickets.length;
		},
	},

	methods: {
		getEscritorios() {
			const payload = "";
			socket.emit("get-escritorios", payload, (data) => {
				this.escritorios = data;
			});
		},
		nuevoEscritorio() {
			const urlParams = new URLSearchParams(window.location.search);
			this.nombreEscritorio = urlParams.get("escritorio");
			const payload = {
				escritorios: this.nombreEscritorio,
			};
			socket.emit("nuevo-escritorio", payload, (data) => {
				this.escritorios = data;
			});
		},
		nuevoTurno() {
			let escritorio = this.nombreEscritorio;
      const payload = escritorio
      socket.emit('nuevo-turno', payload, (data) => {
        this.turnos = data;
      })
      this.getTickets()
		},
    getTickets(){
      const payload = ''
      socket.emit('get-tickets', payload, (data) => {
        this.ticketNum = data.ticketNum
        this.tickets = data.tickets
      })
    }
	},
});

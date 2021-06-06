import {} from "dotenv/config";
import { Server } from "./models/server.js";

const server = new Server();
const ticketNum = {number: 1};
const escritorios = [];
const tickets = [];
const turnos = [];

server.listen();

export {escritorios, tickets, turnos, ticketNum}
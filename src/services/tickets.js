import Ticket from '../models/Ticket';

const tickets = Symbol('tickets');

class TicketCollection {
    constructor() {
        this[tickets] = [];
    }

    /**
     * Create and save a new ticket
     * @param {string} username
     * @param {number} price
     * @return {Ticket}
     */
    create(username, price) {
        const ticket = new Ticket(username, price);
        this[tickets].push(ticket);
        return tickets;
    }

    /**
     * Create bulk tickets
     * @param {string} username
     * @param {number} price
     * @param {number} quantity
     * @return {Ticket[]}
     */
    createBulk(username, price, quantity) {
        const result = [];
        for (let i = 0; i < quantity; i++) {
            const ticket = new Ticket(username, price);
            result.push(ticket);
        }
        return result;
    }

    /**
     * Return all tickets from database
     * @return {Ticket[]}
     */
    find() {
        return this[tickets];
    }

    /**
     * Find single ticket by id
     * @param {string} id
     * @return {Ticket}
     */
    findById(id) {
        const ticket = this[tickets].find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === id
        );
        return ticket;
    }

    /**
     * Find tickets by username
     * @param {string} id
     * @return {Ticket[]}
     */
    findByUsername(username) {
        const tickets = this[tickets].find(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.username === username
        );
        return tickets;
    }

    /**
     * Update by ticket id
     * @param {string} ticketId
     * @param {{username: string, price: number}} ticketBody
     * @return {Ticket}
     */
    updateById(ticketId, ticketBody) {
        const ticket = this.findById(ticketId);
        ticket.username = ticketBody.username ?? ticket.username;
        ticket.price = ticketBody.price || ticket.price;
        return ticket;
    }

    /**
     * Bulk update by username
     * @param {string} username
     * @param {{username: string, price: number}} ticketBody
     * @return {Ticket[]}
     */
    updateBulk(username, ticketBody) {
        const userTickets = this.findByUsername(username);
        const updatedTickets = userTickets.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.updateById(ticket.id, ticketBody);
        );
        return updatedTickets;
    }

    /**
     * Delete by id
     * @param {string} ticketId
     * @return {boolean}
     */
    deleteById(ticketId) {
        const index = this[tickets].findIndex(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => ticket.id === ticketId
        );
        if (index !== -1) {
            this[tickets].splice(index, 1);
            return true
        }
        return false;
    }

    /**
     * Bulk delete by username
     * @param {string} username
     * @return {boolean[]}
     */
    deleteBulk(username) {
        const userTickets = this.findByUsername(username);
        const deletedResult = userTickets.map(
            /**
             * @param {Ticket} ticket
             */
            (ticket) => this.deleteById(ticket.id);
        );
        return deletedResult;
    }

    /**
     * Find winners
     * @param {number} winnerCount
     * @return {Ticket[]}
     */
    draw(winnerCount) {
        const winnerIndexes = new Array(winnerCount);
        let winnerIndex = 0;
        while(winnerIndex < winnerCount) {
            let ticketIndex = Math.floor(Math.random() * this[tickets].length);
            if (!winnerIndexes.includes(ticketIndex)) {
                winnerIndexes[winnerIndex++] = ticketIndex;
                continue;
            }
        }
        const winners = winnerIndexes.map(
            /**
             * @param {number} index
             */
            (index) => this[tickets][index]
        );
        return winners;
    }
}

const tickets = new TicketCollection();

export default tickets;

import ticketCollection from '../services/tickets';

export function sellSingleTicket(req, res) {
    const {username, price} = req.body;
    const ticket = ticketCollection.cre
}

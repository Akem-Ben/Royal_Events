"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userPays = void 0;
const uuid_1 = require("uuid");
const userModel_1 = __importDefault(require("../../models/userModel/userModel"));
const eventModel_1 = __importDefault(require("../../models/eventModel/eventModel"));
const payment_1 = __importDefault(require("../../models/orderModel/payment"));
const ticketModel_1 = __importDefault(require("../../models/ticketModel/ticketModel"));
const earningsModel_1 = __importDefault(require("../../models/earningsModel/earningsModel"));
const ticketGenerator_1 = require("../../helpers/ticketGenerator");
// import { generateBeautifulTicketPDF } from '../../helpers/ticketGenerator';
const userPays = async (request, response) => {
    try {
        const userId = request.user.id;
        const eventId = request.params.id;
        const user = await userModel_1.default.findOne({ where: { id: userId } });
        const event = await eventModel_1.default.findOne({ where: { id: eventId } });
        const event_owner = await userModel_1.default.findOne({ where: { id: event.owner_id } });
        if (!event) {
            return response.status(404).json({
                status: `error`,
                message: `Event not found`
            });
        }
        if (!user) {
            return response.status(404).json({
                status: `error`,
                message: `User does not exist`
            });
        }
        const { cart, totalAmount } = request.body;
        const newCart = JSON.parse(cart);
        const getOrders = await payment_1.default.findAll({});
        const newOrderNumber = 'DE10001000100';
        let mainOrderNumber = "";
        let orderNumArr = [];
        if (getOrders.length === 0) {
            mainOrderNumber = newOrderNumber;
        }
        else {
            for (let index = 0; index < getOrders.length; index++) {
                orderNumArr.push(getOrders[index].order_number);
            }
            for (let index = 0; index < orderNumArr.length; index++) {
                orderNumArr[index] = Number(orderNumArr[index].split("").splice(-11).join(""));
            }
            orderNumArr.sort((a, b) => a - b);
            let highest = orderNumArr[orderNumArr.length - 1];
            mainOrderNumber = `DE${highest + 1}`;
        }
        const newOrder = await payment_1.default.create({
            id: (0, uuid_1.v4)(),
            tickets: JSON.parse(cart),
            amount: totalAmount,
            owner_id: userId,
            order_number: mainOrderNumber,
            event_owner_id: event.owner_id,
            event_id: eventId,
            owner_email: user.email,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        const createdTickets = [];
        const userEarnings = [];
        for (let index = 0; index < newCart.length; index++) {
            const ticket = await ticketModel_1.default.create({
                id: (0, uuid_1.v4)(),
                owner_id: userId,
                event_id: eventId,
                owner_name: user.user_name,
                event_name: event.title,
                event_type: event.type,
                order_number: mainOrderNumber,
                ticket_type: newCart[index].ticket_type,
                ticket_amount: newCart[index].ticket_amount,
                quantity: newCart[index].quantity,
                total_cost: newCart[index].total_amount,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            const newEarning = await earningsModel_1.default.create({
                id: (0, uuid_1.v4)(),
                owner_id: event_owner.id,
                owner_name: event_owner.user_name,
                event_id: eventId,
                order_date: new Date(),
                event_name: event.title,
                order_number: mainOrderNumber,
                ticket_quantity: newCart[index].quantity,
                event_category: event.type,
                ticket_type: newCart[index].ticket_type,
                total_amount: newCart[index].total_amount,
                amount_earned: newCart[index].total_amount * 0.98,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            createdTickets.push(ticket);
            userEarnings.push(newEarning);
        }
        const registeredUser = {
            id_of_user: user.id,
            name_of_user: `${user.first_name} ${user.last_name}`,
            image_of_user: user.profile_picture,
            email_of_user: user.email,
            date_purchased: new Date(),
            no_of_tickets: createdTickets.length,
            total_amount_paid: totalAmount
        };
        let eventRegisteredUsers = [];
        eventRegisteredUsers = event.registered_users;
        eventRegisteredUsers.push(registeredUser);
        eventRegisteredUsers.sort((a, b) => a.date_purchased - b.date_purchased);
        const ticketsToBeMailed = [];
        for (let index = 0; index < createdTickets.length; index++) {
            ticketsToBeMailed.push({
                ticketId: createdTickets[index].id,
                eventName: createdTickets[index].event_name,
                ticketType: createdTickets[index].ticket_type,
                quantity: createdTickets[index].quantity,
                amount: createdTickets[index].total_cost
            });
        }
        for (let index = 0; index < ticketsToBeMailed.length; index++) {
            await (0, ticketGenerator_1.generateBeautifulTicketPDF)(ticketsToBeMailed[index], event.event_image);
        }
        const eventTickets = await ticketModel_1.default.findAll({ where: { event_id: eventId } });
        const update = await eventModel_1.default.update({ registered_users: eventRegisteredUsers, tickets_bought: eventTickets.length }, { where: { id: eventId } });
        if (newOrder && createdTickets.length !== 0 && userEarnings.length !== 0) {
            return response.status(200).json({
                status: `success`,
                message: `Payment Successful`,
                createdTickets,
                userEarnings
            });
        }
        return response.status(400).json({
            status: `error`,
            message: `Payment Unsuccessful`,
        });
    }
    catch (error) {
        console.log(error);
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        });
    }
};
exports.userPays = userPays;

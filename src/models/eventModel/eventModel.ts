import {DataTypes, Model} from 'sequelize';
import { database } from '../../configurations/index';


type ticketType = {
    ticket_type: string;
    ticket_amount: number;
    ticket_quantity: number;
    ticket_description: string;
    ticket_availability: boolean
}

type comment = {
    user_image: string;
    user_name: string;
    comment: string;
    comment_time: Date;
    comment_likes: number;
    comment_dislikes: number;
}

export type report = {
    name_of_reporter: string;
    email: string;
    report: string;
    phone_no: string;
}

type organizer = {
    id_of_organizer: string;
    name_of_organizer: string;
    image_of_organizer: string;
}

export enum eventType {
        CONFERENCE = "conference",
        WORKSHOP = "workshop",
        SEMINAR = "seminar",
        CONCERT = "concert",
        PARTY = "party",
        EXHIBITION = "exhibition",
        OTHER = "other"
}

type event_registered_users = {
    id_of_user: string;
    name_of_user: string;
    ticket_types: [];
    no_of_tickets: number;
    total_amount_paid: number;
}

export interface EventAttributes {
    [x: string]: any;
    id?: string;
    title?: string;
    type?: string;
    event_image: string;
    description?: string;
    event_start_date: Date;
    event_end_date: Date;
    location?: string;
    ticket_types: ticketType[]
    comments: comment[]
    no_of_attendees: string;
    owner_id: string;
    tickets_bought: number;
    organizers?: organizer[];
    likes: number;
    isBlocked: boolean;
    reports: report[]
    registered_users: event_registered_users[]
    dislikes: number;
    createdAt: Date,
    updatedAt: Date
}

export class Event extends Model<EventAttributes> {
    [x: string]: any;
}

Event.init({
     id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
},
title: {
    type: DataTypes.STRING,
    allowNull: false,
},
event_image: {
    type: DataTypes.STRING,
    allowNull: false,
},
type: {
    type: DataTypes.ENUM(...Object.values(eventType)),
    allowNull: false,
},
description: {
    type: DataTypes.STRING,
    allowNull: false,
},
event_start_date: {
  type: DataTypes.DATE    
},
event_end_date: {
    type: DataTypes.DATE  
},
ticket_types: {
    type: DataTypes.JSON,
    allowNull: false,
},
comments: {
    type: DataTypes.JSON
},
owner_id: {
    type: DataTypes.STRING,
    allowNull: false,
},
tickets_bought: {
    type: DataTypes.INTEGER,
},
likes: {
    type: DataTypes.INTEGER,
},
isBlocked: {
    type: DataTypes.BOOLEAN
},
reports: {
    type: DataTypes.JSON,
},
registered_users: {
    type: DataTypes.JSON,
},
dislikes: {
    type: DataTypes.INTEGER,
},
location:{
    type: DataTypes.STRING,
    allowNull: false
},
no_of_attendees:{
    type: DataTypes.INTEGER
},
organizers:{
    type: DataTypes.JSON
},
createdAt: {
    type: DataTypes.DATE    
},
updatedAt: {
    type: DataTypes.DATE    
}

},{
    sequelize: database,
    tableName: 'Event'
}
)

export default Event
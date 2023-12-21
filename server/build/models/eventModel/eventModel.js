"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../../configurations/index");
class Event extends sequelize_1.Model {
}
exports.Event = Event;
Event.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    event_start_date: {
        type: sequelize_1.DataTypes.DATE
    },
    event_end_date: {
        type: sequelize_1.DataTypes.DATE
    },
    ticket_types: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    comments: {
        type: sequelize_1.DataTypes.JSON
    },
    owner_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tickets_bought: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    isBlocked: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    reports: {
        type: sequelize_1.DataTypes.JSON,
    },
    registered_users: {
        type: sequelize_1.DataTypes.JSON,
    },
    dislikes: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    no_of_attendees: {
        type: sequelize_1.DataTypes.INTEGER
    },
    organizers: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE
    }
}, {
    sequelize: index_1.database,
    tableName: 'Event'
});
exports.default = Event;

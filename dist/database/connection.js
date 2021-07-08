"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
var colors = require('colors');
dotenv_1.default.config();
const db = new sequelize_1.Sequelize((_a = process.env.DB_NAME) !== null && _a !== void 0 ? _a : '', (_b = process.env.DB_USER) !== null && _b !== void 0 ? _b : '', process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: (str) => { console.log(colors.blue.inverse(str)); }
});
exports.default = db;
//# sourceMappingURL=connection.js.map
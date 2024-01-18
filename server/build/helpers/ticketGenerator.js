"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBeautifulTicketPDF = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const nodemailer = __importStar(require("nodemailer"));
const fs_1 = __importDefault(require("fs"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinaryConfig = ({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});
cloudinary_1.default.v2.config(cloudinaryConfig);
async function generateBeautifulTicketPDF(ticketData, eventImage) {
    const imageResponse = await cloudinary_1.default.v2.uploader.upload(eventImage, { format: 'png' });
    const eventImageBuffer = Buffer.from(imageResponse.secure_url, 'base64');
    const doc = new pdfkit_1.default();
    // Customize the PDF content and layout using pdfkit's features
    doc.pipe(fs_1.default.createWriteStream(`ticket_${ticketData.id}.pdf`));
    doc.image(eventImageBuffer);
    doc.font('Helvetica');
    doc.fontSize(20);
    doc.text(`Ticket ID: ${ticketData.id}`);
    // ... Add other ticket information using pdfkit's methods
    doc.end();
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: `${process.env.GMAIL_USER}`,
            pass: `${process.env.GMAIL_PASSWORD}`,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });
    const mailOptions = {
        from: 'yourEmail@example.com',
        to: ticketData.owner_email,
        subject: 'Your Tickets Are Here!',
        text: 'Enjoy the event!',
        attachments: [
            {
                filename: `ticket_${ticketData.id}.pdf`,
                path: `ticket_${ticketData.id}.pdf`, // Path to the generated PDF
            },
        ],
    };
    await transporter.sendMail(mailOptions);
}
exports.generateBeautifulTicketPDF = generateBeautifulTicketPDF;

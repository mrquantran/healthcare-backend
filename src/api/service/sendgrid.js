import sendGrid from '@sendgrid/mail'
// ???????? import emailTemplates


const setApiKey = process.env.SEND_GRID_EMAIL_KEY;
const emailSender = process.env.emailSender;
const subjectCreateBooking = process.env.subjectCreateBooking;
const subjectApprovedBooking = process.env.subjectApprovedBooking;
const subjectRejectedBooking = process.env.subjectRejectedBooking
const htmlCreateBooking = process.env.htmlCreateBooking;
const textAfterCreatedBooking = process.env.textAfterCreatedBooking;
const textAfterApprovedBooking= process.env.textAfterApprovedBooking;

sendGrid.setApiKey(setApiKey);



// send email after create booking
async function sendMailAfterCreateBooking(email) {
    try {
        const msg = {
            to: email,
            from: emailSender,
            subject: subjectCreateBooking,
            text: textAfterCreatedBooking,
            html: htmlCreateBooking,
        }    
        sendGrid.send(msg);
    }
        catch {
        console.log('Cannot send email after create booking');
    }    
}

// send email after approved booking
async function sendMailAfterApprovedBooking(email) {
    try {
        const msg = {
            to: email,
            from: emailSender,
            subject: subjectApprovedBooking,
            text: textAfterApprovedBooking,
            html: htmlCreateBooking,
        }
        sendGrid.send(msg);
    } catch {
        console.log('Cannot send email after approved booking');
    }    
}

// send email after reject booking
async function sendMailAfterRejectedBooking(email, description) {
    try {
        const msg = {
            to: email,
            from: emailSender,
            subject: subjectRejectedBooking,
            text: description,
            html: htmlCreateBooking,
        }
        sendGrid.send(msg);
    } catch {
        console.log('Cannot send email after rejected booking');
    }    
}

export const sendMail = {
    sendMailAfterCreateBooking,
    sendMailAfterApprovedBooking,
    sendMailAfterRejectedBooking
}

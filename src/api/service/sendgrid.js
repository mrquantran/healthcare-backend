import sendGrid from '@sendgrid/mail'

const setApiKey = process.env.SEND_GRID_EMAIL_KEY;
const emailSender = process.env.EMAIL_SENDER;
const subjectCreateBooking = 'Create booking susscessful';
const subjectApprovedBooking = 'Your booking is approved';
const subjectRejectedBooking = 'Your booking is rejected'
const htmlCreateBooking = '<strong>123</strong>';
const textAfterCreatedBooking = 'Your booking is created and pending for confirm.'
const textAfterApprovedBooking = 'Your booking is approved, pls check for the information on the website.'

sendGrid.setApiKey(setApiKey);


async function sendCreateAccount(email, data) {
    const { name } = data
    try {
        const msg = {
            to: email,
            from: emailSender,
            subject: subjectCreateBooking,
            // text: textAfterCreatedBooking,
            // html: htmlCreateBooking,
            templateId: 'd-fe12323f195243a39241213accb0e41b',
            dynamic_template_data: {
                name: name,
            },
        }
        sendGrid.send(msg);
    }
    catch {
        console.log('Cannot send email after create booking');
    }
}

// send email after create booking
async function sendMailAfterCreateBooking(email, data) {
    const { status, address, provider, bookingTime } = data
    try {
        const msg = {
            to: email,
            from: emailSender,
            subject: subjectCreateBooking,
            // text: textAfterCreatedBooking,
            // html: htmlCreateBooking,
            templateId: 'd-f1b33b0db25549eebe6bc77ea940c69a',
            dynamic_template_data: {
                email: email,
                status: status,
                address: address,
                provider: provider,
                bookingTime: bookingTime
            },
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
    sendMailAfterRejectedBooking,
    sendCreateAccount
}

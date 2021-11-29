import bookings from "./bookings.js"
import bookingStatus from "./bookingStatus.js"
import deleteBooking from "./deleteBooking.js"

const pathBookings = {
    '/bookings': {
        ...bookings,
    },
    '/bookings/{id}/status': {
        ...bookingStatus,
    },
    '/bookings/{id}': {
        ...deleteBooking,
    }
}

export default pathBookings
const messages = {
  booking: {
    received: "Booking details received",
    customerNameRequired: "Customer name is required",
    emailRequired: "Email is required",
    invalidEmail: "Please provide a valid email",
    phoneRequired: "Phone number is required",
    invalidPhone:
      "Phone must contain 7-15 digits, optionally starting with +",
    invalidGuestCount:
      "Guests must be a whole number between 1 and 30",
    invalidDestination: "Please select a valid destination",
    invalidExperience: "Please select a valid experience",
    invalidDateFormat: "Travel date must use YYYY-MM-DD format",
    invalidCalendarDate: "Please provide a valid calendar date",
    pastDate: "Travel date cannot be in the past",
    invalidMessage: "Message must be text with no more than 1000 characters",
  },
};

export default messages;
import express from "express";
import messages from "./utils/messages";

const app = express();

app.use(express.json());

app.get("/", (req, rea) => {
    rea.send("My first backend response!");

});
app.get("/api/health", (req,res) => {
    res.json({
        success: true,
        message: "Backend is running",
    })
})

app.post("/api/greet", (req,res) => {
    const name = req.body?.name;

    if (typeof name !== "string" || name.trim() === ""){
        res.status(400).json({
            success: false,
            message: messages.booking.invalidPhone,
        });
        return
    }

    res.json({
        success: true,

        message: `Hello, ${name.trim()}!`,
    });
});

app.post("/api/bookings" , (req,res) => {
    const customerName = req.body?.customerName;
    const email = req.body?.email;
    const guests = req.body?.guests;
    const guestCount = req.body?.guestCount;  
    const phone = req.body?.phone;
    const destination = req.body?.destination;
    const experience = req.body?.experience;
    const travelDate = req.body?.travelDate;
    const message = req.body?.message;

    if (typeof phone !== "string" || phone.trim() === "") {
    res.status(400).json({
        success: false,
        message: messages.booking.phoneRequired,
    });
    return;
    }
    
    const phonePattern = /^\+?[0-9]{7,15}$/;

if (!phonePattern.test(phone.trim())) {
  res.status(400).json({
    success: false,
    message: "Phone must contain 7–15 digits, optionally starting with +",
  });
  return;
}

    if (
    typeof guestCount !== "number" ||
    !Number.isInteger(guestCount) ||
    guestCount < 1 ||
    guestCount > 30
    ) {
    res.status(400).json({
    success: false,
    message: messages.booking.invalidGuestCount,
    });
    return;
    }

    if (
        typeof customerName !== "string" || customerName.trim() === ""
    ) {
        res.status(400).json({
            success : false,
            message: messages.booking.customerNameRequired,
        });
        return;
    }
    if (typeof email !== "string" || email.trim() === "") {
  res.status(400).json({
    success: false,
    message: messages.booking.emailRequired,
  });
  return;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailPattern.test(email.trim())) {
  res.status(400).json({
    success: false,
    message: messages.booking.invalidEmail,
  });
  return;
}

const allowedDestinations = [
  "Minneriya National Park",
  "Kaudulla National Park",
  "Hurulu Eco Park",
  "Gal Oya National Park",
  "Habarana",
  "Sigiriya",
  "Dambulla",
  "Polonnaruwa",
  "Ritigala",
];

if (
  typeof destination !== "string" ||
  !allowedDestinations.includes(destination.trim())
) {
  res.status(400).json({
    success: false,
    message: messages.booking.invalidDestination,
  });
  return;
}

const allowedExperiences = [
  "Jeep Safari",
  "Village Tour",
  "Cultural Tour",
];

if (
  typeof experience !== "string" ||
  !allowedExperiences.includes(experience.trim())
) {
  res.status(400).json({
    success: false,
    message: messages.booking.invalidExperience,
  });
  return;
}

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

if (
  typeof travelDate !== "string" ||
  !datePattern.test(travelDate)
) {
  res.status(400).json({
    success: false,
    message: messages.booking.invalidDateFormat,
  });
  return;
}

const parsedDate = new Date(`${travelDate}T00:00:00.000Z`);

if (
  Number.isNaN(parsedDate.getTime()) ||
  parsedDate.toISOString().slice(0, 10) !== travelDate
) {
  res.status(400).json({
    success: false,
    message: messages.booking.invalidCalendarDate,
  });
  return;
}

const todayParts = new Intl.DateTimeFormat("en-US", {
  timeZone: "Asia/Colombo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
}).formatToParts(new Date());

const year = todayParts.find((part) => part.type === "year")!.value;
const month = todayParts.find((part) => part.type === "month")!.value;
const day = todayParts.find((part) => part.type === "day")!.value;

const today = `${year}-${month}-${day}`;

if (travelDate < today) {
  res.status(400).json({
    success: false,
    message: messages.booking.pastDate,
  });
  return;
}

if (
  message !== undefined &&
  (typeof message !== "string" || message.trim().length > 1000)
) {
  res.status(400).json({
    success: false,
    message: messages.booking.invalidMessage,
  });
  return;
}
    const booking = {
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        guestCount: guestCount,
        destination: destination.trim(),
        experience: experience.trim(),
        travelDate: travelDate,
    };

    res.json({
        success: true,
        message:messages.booking.received,
        booking: booking,
    });
});

app.listen(5000, () => {
    console.log("Server running at http://localhost:5000");
});



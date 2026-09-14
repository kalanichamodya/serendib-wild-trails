const destinations = ["Minneriya National Park", "Kaudulla National Park", "Hurulu Eco Park", "Gal Oya National Park", "Habarana", "Sigiriya", "Dambulla", "Polonnaruwa", "Ritigala"];
const experiences = ["Jeep Safari", "Village Tour", "Cultural Tour"];
const todayInSriLanka = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

function validateBooking(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { error: "A booking object is required" };
  const result = {};
  for (const field of ["customerName", "email", "phone", "experience", "destination", "travelDate"]) {
    if (typeof body[field] !== "string" || !body[field].trim()) return { error: `${field} is required and must be text` };
    result[field] = body[field].trim();
  }
  if (result.customerName.length > 120) return { error: "Customer name cannot exceed 120 characters" };
  if (result.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.email)) return { error: "Please provide a valid email address" };
  result.email = result.email.toLowerCase();
  const digits = result.phone.replace(/\D/g, "");
  if (result.phone.length > 40 || !/^\+?[\d\s()-]+$/.test(result.phone) || digits.length < 9 || digits.length > 15) return { error: "Phone must contain 9 to 15 digits" };
  if (!experiences.includes(result.experience)) return { error: "Invalid experience" };
  if (!destinations.includes(result.destination)) return { error: "Invalid destination" };
  if (!Number.isInteger(body.guestCount) || body.guestCount < 1 || body.guestCount > 30) return { error: "Guest count must be an integer from 1 to 30" };
  result.guestCount = body.guestCount;
  const date = new Date(result.travelDate);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(result.travelDate) || Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== result.travelDate || result.travelDate < todayInSriLanka()) return { error: "Travel date must be a valid date today or later" };
  if (body.message !== undefined && (typeof body.message !== "string" || body.message.length > 1000)) return { error: "Message must be text up to 1000 characters" };
  result.message = (body.message || "").trim();
  return { value: result };
}

function bookingValidator(req, res, next) {
  const { value, error } = validateBooking(req.body);
  if (error) return res.status(400).json({ success: false, message: error });
  req.body = value;
  next();
}
module.exports = { bookingValidator, validateBooking, destinations, experiences };

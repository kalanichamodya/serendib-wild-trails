"use client";

import { apiUrl } from "../../lib/api";
import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { safaris } from "../../lib/content/safaris";
import { destinationCards } from "../../lib/content/destinations";
import styles from "./booking.module.css";

const initialForm = {
  customerName: "",
  email: "",
  phone: "",
  experience: "Jeep Safari",
  destination: "Minneriya National Park",
  travelDate: "",
  guestCount: 1,
  message: "",
};

const destinationOptions = [...safaris.map(safari => safari.location), ...destinationCards.map(destination => destination.name)];

function BookingForm() {
  const params = useSearchParams();
  const [form, setForm] = useState(() => ({
    ...initialForm,
    experience: ["Jeep Safari", "Village Tour", "Cultural Tour"].includes(params.get("experience") || "") ? params.get("experience")! : initialForm.experience,
    destination: destinationOptions.includes(params.get("destination") || "") ? params.get("destination")! : initialForm.destination,
  }));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: name === "guestCount" ? Number(value) : value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(
        apiUrl("/api/bookings"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Booking request could not be submitted"
        );
      }

      setSuccess(
        "Your booking request was submitted successfully. We will contact you soon."
      );

      setForm(initialForm);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Booking request could not be submitted"
      );
    } finally {
      setLoading(false);
    }
  };

  const minimumDate = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Colombo", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());

  return (
    <main className={styles.page}>
      <section className={styles.introduction}>
        <Link href="/" className={styles.backLink}>
          ← Back to website
        </Link>

        <div className={styles.introductionContent}>
          <p>PLAN YOUR ADVENTURE</p>
          <h1>Book your Sri Lankan safari.</h1>

          <span>
            Complete the form and our local safari team will contact
            you to confirm availability and journey details.
          </span>

          <div className={styles.features}>
            <div>
              <strong>✓ Local expertise</strong>
              <span>Experienced local safari guides</span>
            </div>

            <div>
              <strong>✓ Private journeys</strong>
              <span>Personalized safari experiences</span>
            </div>

            <div>
              <strong>✓ Quick confirmation</strong>
              <span>Our team will contact you directly</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.heading}>
            <p>BOOKING REQUEST</p>
            <h2>Tell us about your journey</h2>
            <span>Fields marked with * are required.</span>
          </div>

          {error && (
            <div className={styles.errorMessage} role="alert">{error}</div>
          )}

          {success && (
            <div className={styles.successMessage} role="status">{success}</div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="customerName">Full name *</label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
                  maxLength={120}
                  value={form.customerName}
                  onChange={updateField}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone number *</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  maxLength={40}
                  value={form.phone}
                  onChange={updateField}
                  placeholder="+94 77 123 4567"
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email address *</label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={254}
                value={form.email}
                onChange={updateField}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="experience">Experience *</label>
                <select
                  id="experience"
                  name="experience"
                  value={form.experience}
                  onChange={updateField}
                  required
                >
                  <option>Jeep Safari</option>
                  <option>Village Tour</option>
                  <option>Cultural Tour</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="destination">Destination *</label>
                <select
                  id="destination"
                  name="destination"
                  value={form.destination}
                  onChange={updateField}
                  required
                >
                  {destinationOptions.map(destination => <option key={destination}>{destination}</option>)}
                </select>
              </div>
            </div>

            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="travelDate">Travel date *</label>
                <input
                  id="travelDate"
                  name="travelDate"
                  type="date"
                  min={minimumDate}
                  value={form.travelDate}
                  onChange={updateField}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="guestCount">Number of guests *</label>
                <input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min="1"
                  max="30"
                  value={form.guestCount}
                  onChange={updateField}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message">
                Additional message
              </label>

              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                value={form.message}
                onChange={updateField}
                placeholder="Tell us about preferred time or special requirements"
              />
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              {loading
                ? "Submitting request..."
                : "Submit booking request →"}
            </button>
          </form>

          <div className={styles.contactOption}>
  <span>Need help before booking?</span>

  <Link
    href="/#contact"
  >
    Contact our team
  </Link>
</div>

          <p className={styles.note}>
            Submitting this form does not require online payment.
          </p>
        </div>
      </section>
    </main>
  );
}

export default function BookingPage() {
  return <Suspense fallback={<main style={{ padding: "3rem" }}>Loading booking form...</main>}><BookingForm /></Suspense>;
}

"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
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

export default function BookingPage() {
  const [form, setForm] = useState(initialForm);
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
        "http://localhost:5000/api/bookings",
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

  const minimumDate = new Date().toISOString().split("T")[0];

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
            <div className={styles.errorMessage}>{error}</div>
          )}

          {success && (
            <div className={styles.successMessage}>{success}</div>
          )}

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.twoColumns}>
              <div className={styles.formGroup}>
                <label htmlFor="customerName">Full name *</label>
                <input
                  id="customerName"
                  name="customerName"
                  type="text"
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
                  <option>Minneriya National Park</option>
                  <option>Kaudulla National Park</option>
                  <option>Hurulu Eco Park</option>
                  <option>Gal Oya National Park</option>
                  <option>Sigiriya</option>
                  <option>Polonnaruwa</option>
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

  <a
    href="https://wa.me/94762801972?text=Hello%2C%20I%20would%20like%20to%20ask%20about%20a%20safari%20booking."
    target="_blank"
    rel="noopener noreferrer"
  >
    Chat with us on WhatsApp
  </a>
</div>

          <p className={styles.note}>
            Submitting this form does not require online payment.
          </p>
        </div>
      </section>
    </main>
  );
}

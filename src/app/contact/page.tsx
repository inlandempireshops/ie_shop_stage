"use client"
import React, { JSX, useActionState, useState } from "react";
import { sendContactEmail } from "./FormActions";

export default function Contact(): JSX.Element {
  const [clientError, setClientError] = useState<string | null>(null)
  const [state, formAction, isPending] = useActionState(sendContactEmail, {
    success: false,
    error: null,
  });

  const checkFormSubmission = (event: React.SubmitEvent<HTMLFormElement>) => {
    setClientError(null);
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("contact-first-name") as string;
    const lastName = formData.get("contact-last-name") as string;
    const email = formData.get("contact-email") as string;
    const message = formData.get("contact-message") as string;

    if(!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      event.preventDefault();
      setClientError("Please fill out all form fields.");
      return;
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) {
      event.preventDefault();
      setClientError("Please enter a valid email address.");
      return;
    }
  }

  return(
    <div className="contact-container">
      <div className="contact-banner"></div>

      <section id="contact-form-container">
        <h2 className="contact-headline">Contact Us</h2>
        
        <form action={formAction} className="contact-form">
          <div className="name-container form-data-containers">
            <div className="first-name-container">
              <label htmlFor="contact-first-name">First Name</label>
              <input type="text" name="contact-first-name" id="contact-first-name"  placeholder="First Name" className="input"/>
            </div>
            <div className="last-name-container">
              <label htmlFor="contact-last-name">Last Name</label>
              <input type="text" name="contact-last-name" id="contact-last-name"  placeholder="Last Name" className="input"/>
            </div>
          </div>
          <div className="email-container form-data-containers">
            <label htmlFor="contact-email">Email</label>
            <input type="email" name="contact-email" id="contact-email"  placeholder="Email" className="input"/>
          </div>
          <div className="message-container form-data-containers">
            <label htmlFor="contact-message">Leave Message</label>
            <textarea name="contact-message" id="contact-message" placeholder="Message" ></textarea>
          </div>

          <button 
            id="contact-submit"
            type="submit"
            disabled={isPending || state.success}
          >
            {isPending ? "Sending Message..." : state.success ? "Message Sent!": "Send Message"}
          </button>
        </form>
      </section>
    </div>
  )
}
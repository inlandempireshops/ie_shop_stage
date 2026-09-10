"use server";

export async function sendContactEmail(prevState: any, formData: FormData) {
  const firstName = formData.get("contact-first-name") as string
  const lastName = formData.get("contact-last-name") as string
  const email = formData.get("contact-email") as string
  const message = formData.get("message") as string

  if(!firstName || !lastName || !email || !message) {
    return {
      success: false, 
      error: "All fields are required."
    }
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)) {
    return {
      success: false,
      error: "Please enter a valid email address."
    }
  }

  console.log(email);

  try {
    return {
      success: true,
      error: null
    }
  } catch(err) {
    console.error("Failed to send message:", err);
    return {
      success: false,
      error: "Error occurred please try again later."
    }
  }
}
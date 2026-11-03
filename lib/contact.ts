export const WHATSAPP_NUMBER = "918510801655"; // 91 + 8510801655
export const OWNER_EMAIL = "11pmsnacks@gmail.com";

export type ContactForm = {
  type: string;
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const buildMessage = (d: ContactForm) =>
  `Hi 11 PM Snacks! 👋\n\nInquiry: ${d.type}\nName: ${d.name}\nEmail: ${d.email}\nPhone: ${d.phone || "-"}\n\nMessage:\n${d.message}`;

export const validate = (d: ContactForm) => {
  const errors: Partial<Record<keyof ContactForm, string>> = {};
  if (!d.name.trim()) errors.name = "Please enter your name";
  if (!/^\S+@\S+\.\S+$/.test(d.email)) errors.email = "Enter a valid email";
  if (d.phone && !/^(\+91)?[\s-]?[6-9]\d{9}$/.test(d.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit Indian number";
  if (!d.message.trim()) errors.message = "Please write your message";
  return errors;
};

// Call these directly inside the button's onClick (a user gesture), or popup blockers stop them.
export const openWhatsApp = (d: ContactForm) => {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(d))}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

export const openEmail = (d: ContactForm) => {
  const subject = encodeURIComponent(`[11 PM Snacks] ${d.type} inquiry from ${d.name}`);
  const body = encodeURIComponent(buildMessage(d));
  const isMobile = typeof navigator !== "undefined" && /Android|iPhone|iPad/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  } else {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${OWNER_EMAIL}&su=${subject}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
  }
};

export const copyMessage = (d: ContactForm) =>
  navigator.clipboard.writeText(buildMessage(d));

// Early Access Drop Alert Helpers
export const buildDropAlertMessage = (contact: string, channel: 'WhatsApp' | 'Email' = 'WhatsApp') =>
  `Hi 11 PM Snacks! 👋🍿\n\nPlease add me to the Batch 01 Early Access Drop List!\nPreferred Channel: ${channel}\nContact: ${contact}`;

export const openDropAlertWhatsApp = (contact: string) => {
  const message = buildDropAlertMessage(contact, 'WhatsApp');
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const openDropAlertEmail = (contact: string) => {
  const message = buildDropAlertMessage(contact, 'Email');
  const subject = encodeURIComponent(`[11 PM Snacks] Batch 01 Drop List Signup`);
  const body = encodeURIComponent(message);
  const isMobile = typeof navigator !== 'undefined' && /Android|iPhone|iPad/i.test(navigator.userAgent);
  if (isMobile) {
    window.location.href = `mailto:${OWNER_EMAIL}?subject=${subject}&body=${body}`;
  } else {
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${OWNER_EMAIL}&su=${subject}&body=${body}`,
      '_blank',
      'noopener,noreferrer'
    );
  }
};


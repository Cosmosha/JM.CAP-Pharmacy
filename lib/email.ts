import nodemailer from "nodemailer";
import { pharmacyConfig } from "@/lib/pharmacy-config";

type ContactEmailPayload = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

function requireEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

function createTransporter() {
  const host = requireEnv("SMTP_HOST");
  const port = Number(requireEnv("SMTP_PORT"));
  const user = requireEnv("SMTP_USER");
  const pass = requireEnv("SMTP_PASSWORD");

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const to = process.env.CONTACT_EMAIL || pharmacyConfig.email;

  if (!to) {
    throw new Error("Missing contact recipient email.");
  }

  const transporter = createTransporter();

  const text = `New JM.CAP Pharmacy Website Enquiry\n\nName: ${payload.name}\nPhone: ${payload.phone}\nEmail: ${payload.email}\n\nMessage:\n${payload.message}\n\nSubmitted from:\nJM.CAP Pharmacy Website`;

  await transporter.sendMail({
    from: `JM.CAP Website <${requireEnv("SMTP_USER")}>`,
    to,
    replyTo: payload.email,
    subject: "New Website Enquiry | JM.CAP Pharmacy",
    text,
  });
}

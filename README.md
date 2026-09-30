# JM.CAP Pharmacy Coming Soon Experience

Premium coming-soon and welcome experience for JM.CAP Pharmacy built with Next.js App Router, Tailwind CSS v4, Framer Motion, and a secure contact API route.

## Stack

- Next.js 16.3.7
- React 19.2.8
- Tailwind CSS v4
- Framer Motion
- Lucide React icons
- Nodemailer (server-side email)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Add environment variables by copying `.env.example` to `.env.local` and filling values:

```bash
CONTACT_EMAIL=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=
```

3. Run development server:

```bash
npm run dev
```

## Project Structure

- `app/page.tsx`: Page composition
- `app/layout.tsx`: Global metadata and layout
- `app/globals.css`: Design tokens and global styles
- `app/api/contact/route.ts`: Contact API with validation and rate limiting
- `components/*`: UI sections and reusable modules
- `lib/pharmacy-config.ts`: Centralized business/config data
- `lib/validation.ts`: Form and server validation helpers
- `lib/email.ts`: SMTP transport and email send helper

## Business Configuration

Update `lib/pharmacy-config.ts` with live values when available:

- name: JM.CAP Pharmacy
- phone
- whatsapp
- email
- address
- openingHours
- website/domain: https://jmcappharmacy.com
- logo

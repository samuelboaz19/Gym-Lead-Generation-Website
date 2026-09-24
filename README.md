# Gym Lead Generation Website-Low-cost architecture

<img width="500" height="400" alt="Screenshot1" src="https://github.com/user-attachments/assets/cd0f8752-9878-4b3e-aefa-c477ba50ffc0" />
<img width="500" height="400" alt="Screenshot3" src="https://github.com/user-attachments/assets/0db989ef-2d93-436a-aa19-5ac4855f92aa" />
<img width="500" height="400" alt="Screenshot 4" src="https://github.com/user-attachments/assets/da8db353-d96f-4f78-88ad-3be38aa2c8a5" />
<img width="500" height="400" alt="Screenshot2" src="https://github.com/user-attachments/assets/684671c9-b2f9-47bd-aec7-272fd274b5de" />


A lead-generation website built for a gym that allows potential customers to submit their details through a **Join Now** form.

Every submitted lead is automatically:

1. Saved as a new row in **Google Sheets**
2. Sent as an instant **WhatsApp notification**

This provides the gym with a simple, low-cost system for capturing and responding to new customer enquiries.

---

## Problem

A gym website can attract potential customers, but simply displaying information does not guarantee that the gym captures those potential customers as leads.

Without a structured lead-capture system:

* Website enquiries can be missed
* Customer information may need to be recorded manually
* Staff may not know immediately when a new enquiry arrives
* Following up with potential members becomes harder
* A small gym may not want to pay for an expensive CRM or lead-management platform

### Problem Statement

> **How can a local gym turn website visitors into actionable leads and notify the gym immediately when someone is interested?**

---

# Solution

The website combines **lead capture, Google Sheets, and WhatsApp notifications** into one simple workflow.

```text
                Website Visitor
                      ↓
                 Join Now
                      ↓
                  Lead Form
                      ↓
             ┌────────┴────────┐
             ↓                 ↓
      Google Sheets        WhatsApp
        Lead Record         Alert
             ↓                 ↓
       Lead Management     Immediate
                           Follow-up
```

Instead of requiring the gym to manually collect enquiries, each form submission automatically creates a structured lead record.

---

# Lead Capture Workflow

When a visitor submits the form, the following information is captured:

* Timestamp
* First Name
* Last Name
* Phone
* Email
* Source

The information is added to a Google Sheet.

Example:

| Timestamp  | First Name | Last Name | Phone           | Email                                         | Source  |
| ---------- | ---------- | --------- | --------------- | --------------------------------------------- | ------- |
| 07/03/2026 | Arjun      | Sharma    | +91 98765 43210 | [arjun@example.com](mailto:arjun@example.com) | Website |

---

# Instant WhatsApp Notification

After a lead is submitted, the gym owner can receive a WhatsApp notification through **CallMeBot**.

Example:

```text
🏋️ NEW GYM LEAD!

Name: Arjun Sharma
Phone: +91 98765 43210
Email: arjun@example.com
Time: 07/03/2026, 3:42:10 PM
```

This allows the gym to know about a new enquiry without constantly checking the Google Sheet.

---

# Business Workflow

The complete customer journey is:

```text
Potential Customer
        ↓
Visits Gym Website
        ↓
Interested in Joining
        ↓
Clicks "Join Now"
        ↓
Submits Details
        ↓
Google Sheet Updated
        ↓
WhatsApp Alert Sent
        ↓
Gym Contacts Lead
        ↓
Trial / Visit
        ↓
Potential Membership
```

The website therefore acts as more than an informational website.

It functions as a **basic lead-generation system for the gym**.

---

# Why Google Sheets?

Google Sheets provides a simple and accessible way for a small business to manage leads.

The gym does not need to purchase or maintain a dedicated CRM just to start collecting enquiries.

The owner can:

* View all leads
* Sort leads
* Filter leads
* Track incoming enquiries
* Share the sheet with authorized staff
* Use the information for follow-up

---

# Why WhatsApp Notifications?

Saving a lead is useful, but **speed of follow-up can also matter**.

The WhatsApp notification creates an immediate signal when a new lead arrives.

```text
Lead Submitted
      ↓
Google Sheet
      +
WhatsApp Alert
      ↓
Gym Staff
      ↓
Fast Follow-up
```

This reduces the need for staff to continuously monitor the spreadsheet.

---

# Cost-Conscious Design

The system was designed around the needs of a small/local business.

Instead of introducing an expensive CRM or complex infrastructure, the solution uses:

* Google account
* Google Sheets
* Google Apps Script
* WhatsApp
* CallMeBot

The objective is to provide useful lead-management functionality while keeping the operating cost extremely low.

> **The system demonstrates how simple, low-cost services can be combined to solve a real business problem.**

---

# Technology

### Frontend

* HTML
* CSS
* JavaScript

### Lead Storage

* Google Sheets

### Automation

* Google Apps Script

### Notifications

* WhatsApp
* CallMeBot

---

# Architecture

```text
┌───────────────────────────┐
│       Website Visitor     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│       Gym Website         │
│                           │
│       Join Now Form       │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│       JavaScript          │
│         join.js            │
└─────────────┬─────────────┘
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
┌────────────┐  ┌──────────────┐
│   Google   │  │  CallMeBot   │
│ Apps Script│  │  WhatsApp    │
└─────┬──────┘  └──────┬───────┘
      │                │
      ▼                ▼
┌────────────┐   ┌──────────────┐
│   Google   │   │     Gym      │
│   Sheets   │   │     Owner    │
└────────────┘   └──────────────┘
```

---

# Google Sheets Integration

Google Apps Script receives the submitted lead information and appends it as a new row.

The sheet structure is:

```text
A: Timestamp
B: First Name
C: Last Name
D: Phone
E: Email
F: Source
```

This creates a simple structured lead database using Google Sheets.

---

# Setup

The project requires:

### Google Sheets

Create a Google Sheet and add:

```text
Timestamp | First Name | Last Name | Phone | Email | Source
```

### Google Apps Script

The Apps Script is deployed as a Web App.

The generated Web App URL is configured in:

```text
js/join.js
```

Example:

```javascript
const SHEET_URL = 'YOUR_GOOGLE_SCRIPT_URL';
```

### WhatsApp

CallMeBot can be configured with:

```javascript
const WA_NUMBER = 'YOUR_WHATSAPP_NUMBER';
const WA_APIKEY = 'YOUR_API_KEY';
```

**API keys and private credentials should never be committed to GitHub.**

---

# Business Value

The project solves a simple but real business problem:

```text
Website Traffic
      ↓
Customer Interest
      ↓
Lead Capture
      ↓
Lead Storage
      ↓
Instant Notification
      ↓
Sales Follow-up
```

For a local gym, this creates a bridge between **online marketing and customer acquisition**.

The website is therefore not only a digital brochure; it becomes part of the gym's lead-generation process.

---

# Future Improvements

The current system can be expanded into a complete lightweight gym CRM.

Potential improvements include:

* Lead status tracking
* New / Contacted / Interested / Converted / Lost
* Automatic follow-up reminders
* WhatsApp follow-up messages
* Email notifications
* Lead conversion dashboard
* Membership tracking
* Trial-session scheduling
* Lead source analytics
* Google Analytics integration
* Admin dashboard
* Automated lead assignment to staff

Future architecture:

```text
Website
   ↓
Lead
   ↓
Lead Management
   ↓
Notification
   ↓
Follow-up
   ↓
Trial Session
   ↓
Membership
   ↓
Revenue
```

---

# Project Outcome

The project demonstrates how a simple website can be transformed into a practical **business lead-generation system** using existing cloud services.

### Core Idea

> **Capture every interested visitor, store the lead automatically, and notify the gym immediately so the business can follow up.**

---


A practical gym lead-generation solution combining:

* ✅ Responsive website
* ✅ Online lead form
* ✅ Automatic Google Sheets lead capture
* ✅ WhatsApp lead notifications
* ✅ Low-cost architecture
* ✅ Simple lead-management workflow

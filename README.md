# Gym Lead Generation Website

<img width="500" height="600" alt="Screenshot1" src="https://github.com/user-attachments/assets/cd0f8752-9878-4b3e-aefa-c477ba50ffc0" />
<img width="500" height="600" alt="Screenshot3" src="https://github.com/user-attachments/assets/0db989ef-2d93-436a-aa19-5ac4855f92aa" />
<img width="500" height="600" alt="Screenshot 4" src="https://github.com/user-attachments/assets/da8db353-d96f-4f78-88ad-3be38aa2c8a5" />
<img width="500" height="600" alt="Screenshot2" src="https://github.com/user-attachments/assets/684671c9-b2f9-47bd-aec7-272fd274b5de" />


A lead-generation website built for a gym to help convert website visitors into potential customers.

The website provides information about the gym and allows interested visitors to submit their details through a lead form. Submitted leads are automatically captured in a **Google Sheet**, giving the gym an easy way to manage and follow up with potential customers.

## Problem

Many local gyms depend on walk-ins, phone calls, social media, or manually collected customer information to generate new memberships.

This creates several problems:

* Website visitors may leave without contacting the gym
* Lead information can be lost
* Staff may need to manually record enquiries
* Following up with potential customers becomes difficult
* There may be no simple centralized place to track incoming leads

### Problem Statement

> **How can a local gym turn website visitors into structured leads and make it easier for staff to follow up with potential customers?**

## Solution

The website provides a simple digital lead-generation process.

A visitor can learn about the gym and submit their information through a lead form.

The submitted information is automatically sent to a **Google Sheet**, creating a simple lead-management workflow without requiring a complex CRM.

### Lead Flow

```text
Website Visitor
       ↓
   Gym Website
       ↓
    Lead Form
       ↓
  Form Submission
       ↓
   Google Sheet
       ↓
  Gym Staff Reviews Lead
       ↓
     Follow-up
       ↓
 Potential Membership
```

## Key Features

### Gym Information

The website can showcase:

* Gym facilities
* Training programs
* Membership information
* Trainers
* Opening hours
* Contact information
* Location

### Lead Generation Form

Interested visitors can submit details such as:

* Name
* Phone number
* Email
* Fitness goal
* Preferred program
* Other relevant information

### Automatic Lead Capture

After submitting the form, lead information is recorded in a Google Sheet.

Example:

| Name  | Phone      | Email                                         | Goal        | Date       |
| ----- | ---------- | --------------------------------------------- | ----------- | ---------- |
| Rahul | 9876543210 | [rahul@example.com](mailto:rahul@example.com) | Weight Loss | 2026-09-24 |
| Priya | 9876543211 | [priya@example.com](mailto:priya@example.com) | Strength    | 2026-09-24 |

This gives the gym staff a centralized list of potential customers.

## Business Value

The website is designed not just as an informational website, but as a **lead-generation system**.

```text
Website Traffic
      ↓
Interested Visitors
      ↓
Lead Form
      ↓
Structured Leads
      ↓
Follow-up
      ↓
Membership Opportunities
```

The Google Sheet provides a simple and low-cost way for a small gym to start managing leads without purchasing a dedicated CRM.

## Product Insight

The key product idea is:

> **A business website should not only provide information; it should help the business capture and act on customer interest.**

Instead of ending the customer journey at:

```text
Visitor → Website → Leave
```

the system creates:

```text
Visitor → Website → Lead Form → Google Sheet → Follow-up
```

## Technology

Depending on the implementation, the project can use:

* HTML
* CSS
* JavaScript
* Google Sheets
* Google Apps Script / Google Sheets integration

## Architecture

```text
┌─────────────────────┐
│     Website User    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Gym Website      │
│                     │
│   Lead Generation   │
│        Form         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ Form Submission     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Google Sheets    │
│                     │
│   Lead Database     │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│     Gym Staff       │
│                     │
│ Follow-up / Contact │
└─────────────────────┘
```

## Why Google Sheets?

For a small local business, Google Sheets provides a simple starting point for lead management.

It allows the gym to:

* View incoming leads
* Sort and filter leads
* Track follow-ups
* Share the lead list with staff
* Avoid maintaining a separate database initially

## Future Improvements

The system can be expanded into a complete gym lead-management platform.

Potential improvements:

* Lead status: New / Contacted / Converted / Lost
* Automatic WhatsApp notifications
* Email notifications
* Follow-up reminders
* Dashboard showing lead conversion
* Lead source tracking
* Membership conversion tracking
* Automated follow-up messages
* CRM integration
* Analytics for website visitors and leads

### Future Workflow

```text
Website
   ↓
Lead
   ↓
Google Sheets / CRM
   ↓
Automatic Notification
   ↓
Sales Follow-up
   ↓
Trial Session
   ↓
Membership
   ↓
Revenue
```

## Project Goal

The goal of this project was to build a practical website that solves a real business problem:

> **Help a local gym capture potential customers from its website and organize those enquiries in a simple, accessible system.**

The project demonstrates the connection between:

**Website → Lead Generation → Data Collection → Business Follow-up**

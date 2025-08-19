# HealthFlow-AI-Accelerator
Overview
HealthFlow AI Accelerator is a multi-role healthcare prototype demonstrating:
AI-powered intelligent patient scheduling
Agentic AI workflows for automation and decision-making
Edge-enabled real-time monitoring with anomaly detection
Cloud-first, low-code architecture aligned to enterprise delivery
Intelligent UX with accessibility and mobile responsiveness

This prototype is designed for rapid demonstration in enterprise contexts (e.g., Atos), focusing on usability, scalability, reuse, and delivery excellence.
Live Demo
Application (Patient/Provider/Admin): [Deployed Web App Link]
Note: Runs client-side as a demo. Data is simulated in-memory for prototype purposes.

Core Features
Patient Portal
Registration, symptom triage via conversational AI
Smart appointment booking with real-time UI updates
“Your Appointments” automatically updates after booking
Full health record modal (demographics, conditions, medications, allergies, vitals, labs)
Provider Dashboard
Patient queues with AI insights
John Miller’s chart rendered with Chart.js
Medication Interaction Alert with Review Details modal
Scheduling Optimization with “Apply Suggestion” (updates provider schedule in real-time)
Edge Monitoring (Provider/Admin)
Real-time vitals stream (HR, SpO2, BP) for multiple patients
1-second updates with start/stop controls
Anomaly detection (e.g., HR>120, SpO2<90) with toasts and alert logs
Admin Console
Operational metrics (uptime, response time, AI accuracy, automation rate)
Compliance and audit views (simulated)
System-wide status and alerts
Intelligent UX & Accessibility
High-contrast mode toggle
ARIA labels, keyboard navigation, ESC-to-close modals
Responsive layout; touch-friendly controls
What’s New in This Version
Default patient changed to Khushi Thakur ith updated photo
Appointment booking now updates “Your Appointments” immediately
Full Health Record modal implemented with complete details

Provider fixes:
John Miller’s chart renders reliably
Medication Interaction “Review Details” modal functional
Scheduling Optimization “Apply Suggestion” updates schedule and confirms
Edge Monitoring tab added with live vitals streaming and anomaly alerts
Reusable modal component, improved accessibility, and UI refinements
Updated demo metrics (aiAccuracy 97.4, automationRate 82)
Architecture (Prototype)
Multi-role client app (Patient/Provider/Admin)
Simulated data and AI agent decisions in-memory
Componentized UI with reusable modals and toasts
Real-time update loop (setInterval) for edge monitoring simulation
Charts via standard web charting library
Designed for future integration with:
Power Platform (Apps, Automate, BI, Dataverse)
Azure OpenAI/Azure Cognitive Services
FHIR-compliant APIs and EHR connectors

Getting Started (Local)
Clone/download the project files (index.html, style.css, app.js).
Open index.html in a modern browser (Chrome/Edge).
Use the role selector in the header to switch between Patient/Provider/Admin.

Demo Flow (Suggested)
Patient (Khushi Thakur)
Use chatbot for symptom guidance
Book an appointment
Verify that “Your Appointments” updates immediately
Open “View Full Record” for the health-summary modal
Provider (Dr. Michael Chen)
View John Miller’s chart (now functioning)
Open Medication Interaction → Review Details modal
Apply Scheduling Optimization → Confirm schedule update
Open Edge Monitoring → Start stream → Observe anomaly alerts
Admin
Review system metrics and alerts
Toggle high-contrast mode to demonstrate accessibility
Testing Notes
All interactions are client-side; no backend required
Data resets on refresh (demo intent)
Use the toggles/buttons to simulate real-time workflows and monitoring

Roadmap
Connect to Dataverse with FHIR-aligned schema
Integrate Azure OpenAI for live conversational AI
Add Power Automate flows for notifications and confirmations
Embed Power BI dashboards for real operational analytics
Expand agentic AI skills (care coordination, compliance automation)
Add multi-tenant controls and environment-based configuration

Team
Aryan Nair — Technical Lead & AI Architecture
Subham Dey — Platform Development & Integration
Khushi Thakur — UX/UI Design & Clinical Workflow

License
Prototype for demonstration purposes only. Not for clinical use.

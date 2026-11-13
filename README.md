# AgroAI – AI Crop Disease Diagnosis and Management Assistant

AgroAI is an AI-powered agricultural assistant designed to help farmers, agronomists, and researchers identify crop diseases, understand plant symptoms, and receive evidence-based integrated pest management (IPM) recommendations.

---

## Key Features

- **AI Disease Diagnosis Chatbot:** Conversational assistant that analyzes natural-language symptom descriptions and photo uploads (via Gemini Vision) to identify potential crop diseases.
- **Structured 5-Part Management Protocols:** Provides recommendations organized into Immediate Actions, Cultural Management, Biological Controls, Chemical Management (with safety label restrictions), and Prevention.
- **Comprehensive Crop Library:** Detailed guides for major crops (Rice, Wheat, Maize, Tomato, Potato, Cotton, Sugarcane, Groundnut, Chilli, Onion, Soybean, Mango, Banana, Brinjal) covering climate, soil, water requirements, and common diseases.
- **Multilingual Support:** Full query and response support in **English**, **Hindi (हिन्दी)**, and **Telugu (తెలుగు)** with accurate agricultural terminology.
- **Diagnosis History & PDF Reports:** Save and review past consultation sessions locally (`localStorage`) and export professional extension report PDFs.

---

## Technology Stack

- **Frontend:** React 19, Vite, Tailwind CSS v4, Lucide React icons, Motion
- **Backend:** Node.js, Express, TypeScript (`tsx`)
- **AI Integration:** Google Gen AI SDK (`@google/genai` utilizing Gemini flash models)

---

## How the Application Works

1. **Symptom Input & Vision Analysis:** Farmers describe symptoms (e.g., *"My tomato leaves have brown spots"* or upload a photograph of an affected leaf).
2. **Context-Aware Inference:** The server processes the query and image against a structured agricultural knowledge base and Gemini AI.
3. **Structured Recommendations:** AgroAI outputs a confidence rating, symptoms extracted, and structured 5-part management recommendations.
4. **Interactive Follow-Ups:** Farmers can ask contextual follow-up questions ("What should I do first?", "How do I prevent spreading?", "Can this affect nearby plants?").

---

## Installation & Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### 1. Clone the Repository
```bash
git clone https://github.com/rohanbandaru34/agroai.git
cd agroai
```

### 2. Install Dependencies
```bash
npm install
```

---

## Environment Variable Configuration

Create a `.env` file in the root directory based on `.env.example`:

```env
# GEMINI_API_KEY: Required for Gemini AI API calls.
GEMINI_API_KEY="your_gemini_api_key_here"

# PORT: Server port (defaults to 3000)
PORT=3000
```

---

## Running the Project Locally

Start the development server (runs both Express backend and Vite frontend via `tsx`):

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000`.

---

## Future Improvements

- Integration with real-time regional weather APIs for blight and spore forecasting.
- Farmer community forum for local pest outbreak alerts.
- Offline-first Progressive Web App (PWA) support for rural field usage with limited connectivity.

---

## Agricultural Disclaimer

*Disclaimer: AgroAI provides preliminary disease identification and management guidance based on visual symptom patterns and verified agricultural extension literature. AI-generated assessments are not a substitute for certified laboratory testing or professional agronomist consultation. Farmers should consult local agricultural extension officers and crop advisors prior to applying chemical treatments.*

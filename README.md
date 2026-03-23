<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/50380283-f1b3-4d34-9e0a-98e0b9f98677

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
AI Brand Builder App
An AI‑powered Brand Builder App that transforms a simple product description into a full visual advertising campaign. The app generates consistent Billboard, Newspaper, and Social Media Post assets using Google’s Gemini models, while enforcing strict product consistency and a no‑people policy.

This project demonstrates practical skills in AI app development, prompt engineering, model orchestration, and creative automation.

Overview
The Brand Builder App allows users to describe any product and instantly visualize it across multiple advertising mediums. The app uses a two‑stage pipeline:

Visual Identity Generation  
Gemini 3 Flash Preview expands the user’s product description into a detailed, cinematic visual identity.

Campaign Asset Generation  
Nano‑Banana / Gemini 2.5 Flash Image generates three photorealistic campaign assets based on that identity.

All images maintain consistent materials, lighting, colors, and style — with no humans included.

Key Features
1. Visual Identity Engine
Transforms a short product description into a rich, professional‑grade visual identity including:

- Materials

- Lighting

- Color palette

- Environment

- Technical rendering details

2. Multi‑Medium Asset Generation

- Creates three consistent campaign assets:

- Billboard — wide‑angle, high‑impact urban photography

- Newspaper — monochrome, editorial, high‑contrast

- Social Post — clean, vibrant, minimalist studio shot

3. Strict “No People” Policy

All prompts enforce:

- No humans

- No hands

- No reflections of people

- Product‑only focus

4. Modern UI

- Clean, responsive layout

- Tailwind CSS styling

- Smooth animations via Motion

How It Works
1. User Input
The user enters a product description, e.g.:

“Augmented Reality AI glasses”

2. Visual Identity Creation
The app generates a detailed visual identity describing:

Shape

Materials

Colors

Lighting

Environment

Technical rendering details

3. Campaign Asset Generation
The app uses the identity to produce:

Billboard asset

Newspaper asset

Social media asset

Each image is consistent and aligned with the identity.

Example Output

<img width="1344" height="768" alt="brand-billboard" src="https://github.com/user-attachments/assets/2f432070-e440-4377-8c32-1fd970c9ac6d" />

<img width="864" height="1184" alt="brand-newspaper" src="https://github.com/user-attachments/assets/31e2cf90-bf51-4e49-945e-9c1e0e19a218" />

<img width="1024" height="1024" alt="brand-social-post" src="https://github.com/user-attachments/assets/fcbf0d4e-3a48-481a-bb1b-5155260b62f5" />

Why I Built This
Building the Brand Builder App allowed me to explore how AI can automate creative workflows that traditionally require multiple tools and design skills. I wanted to create a system where a simple product description could instantly become a full visual campaign, demonstrating how AI can support branding, marketing, and product visualization. This project also helped me strengthen my skills in prompt engineering, model orchestration, and debugging AI‑generated applications.

Skills Demonstrated
- AI App Development using Google AI Studio

- Prompt Engineering for multi‑step pipelines

- Model Orchestration (Gemini 3 Flash Preview + Nano‑Banana)

- Debugging & Auto‑Fix Workflow

- Creative Automation for marketing assets

- UI/UX Thinking for simple, user‑friendly interfaces

- Documentation & Technical Communication

- Portfolio‑ready project structuring

Future Improvements
- Add selectable visual styles (cinematic, minimalist, retro, neon, corporate)

- Add a brand‑guidelines generator (fonts, colors, tone of voice)

- Add automatic copywriting for each campaign asset

- Add a “Download All Assets” bundle button

- Add color palette extraction from the generated images

- Add support for additional mediums (website hero banner, packaging mockup, product card)

- Add a history panel so users can compare multiple versions

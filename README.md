Purdue Is Loaded 🏋️‍♂️🚂
A powerlifting tool for lifters, by a lifter — built with Next.js.

Live Site
GitHub Repository (insert link here)

🏆 Why I Built This
Over the weekend, I competed at the USAPL Collegiate Nationals in Oklahoma City, proudly representing Purdue Powerlifting. It was an incredible experience — I hit new personal records and even set new Indiana state records!

That said, I realized how much I struggled converting pounds to kilograms and choosing attempts on the fly — especially under meet pressure. Everything's in kilos, and I didn’t want to waste mental energy doing math between lifts.

So I built Purdue Is Loaded — a simple, sleek app to help lifters and coaches plan better and lift smarter.

🎯 Features
🔩 KG-to-Bar Visualizer
Input any weight in kg, and the app shows:

A barbell visualization with the correct competition plate configuration.

The exact plate math (bar + plate breakdown).

The total weight in both KG and LB.

Color-coded plates with IPF competition standards and Purdue flair (gold 💛).

📈 Attempts Calculator
Input your third attempt goal, and get:

9 smart attempt suggestions (3 for each round).

Based on % of third attempt (1st: 90–92%, 2nd: 95–97%, 3rd: 99–102%).

Results in both KG and LB, with auto-conversion and rounding to the nearest legal plate (2.5kg).

🚀 Getting Started (Development)
This is a Next.js project bootstrapped with create-next-app.

🛠️ Local Setup
bash
Copy
Edit
# Install dependencies
npm install

# Run development server
npm run dev
Then open http://localhost:3000 in your browser.

🧠 Project Structure
app/page.tsx – Home screen: Load The Bar (visualizer).

app/attempts/page.tsx – Attempts calculator screen.

app/settings/page.tsx – Placeholder for future settings.

components/ – Shared React UI components.

public/ – Static assets like icons and favicon.

🌐 Tech Stack
Frontend: React + Next.js (App Router, Server Components)

Styling: Tailwind CSS

Icons: Font Awesome

Deployment: Vercel (instant CI/CD)

💡 Future Plans
✅ Add LB-to-KG reverse converter (toggle UI ready!)

⏳ Add meet day checklist & warmup calculator

📲 iOS/Android support via Expo (coming soon)

🔒 Auth support for saving attempt presets and tracking PRs

👋 Who It's For
Whether you’re:

A first-time competitor

A coach helping new lifters

Or just someone who hates doing last-minute math...

Purdue Is Loaded is designed to help you stay focused on what matters most: lifting big weight and having fun.

🙌 Shoutout
To the Purdue Powerlifting fam — thanks for the support and drive.
To my fellow competitors — Boiler Up, and I’ll see you on the platform again soon.
To every lifter trying to hit their next PR — this one’s for you.

📬 Contributing
Got a feature idea? Found a bug? Open an issue or pull request — all lifter-friendly improvements welcome.

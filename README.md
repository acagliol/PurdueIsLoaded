# 🏋️ Purdue Is Loaded 🚂  
**A powerlifting tool for lifters, by a lifter — built with Next.js.**

[🌐 Live Site](https://purdueisloaded.vercel.app)  
[📁 GitHub Repository](#) <!-- Replace with your actual repo link -->

---

## 🏆 Why I Built This

Over the weekend, I had the opportunity to compete at the **USAPL Collegiate Nationals** in Oklahoma City, representing **Purdue Powerlifting**. It was an incredible experience — I hit a few new personal records and set some new Indiana state records along the way!

While I didn’t quite meet the high expectations I set for myself, I’m proud of the performance and the progress I’ve made. As someone fairly new to powerlifting, I realized I was struggling with converting pounds to kilograms and choosing attempts during the meet (since everything is in kg).

That challenge inspired me to build **Purdue Is Loaded** — a simple app that helps lifters like myself.

---

## 🎯 Features

### 🏋️ KG-to-Bar Visualizer
- Input any weight in **kilograms**.
- Automatically rounds to the nearest **legal competition weight**.
- Displays a **barbell visualizer** with color-coded competition plates.
- Shows weight in **KG and LB**.
- Includes a full **plate math breakdown** and estimated total.

### 📊 Attempts Calculator
- Input your **third attempt target**.
- Get **9 calculated suggestions** across three attempts:
  - 1st Attempt: 90%, 91%, 92%
  - 2nd Attempt: 95%, 96%, 97%
  - 3rd Attempt: 99%, 100%, 102%
- Automatically converts between **KG and LB**.
- Rounds to the nearest 2.5kg to reflect actual comp standards.

---

## 🧠 Who This Is For

- 🆕 First-time meet lifters  
- 🧠 Coaches helping lifters strategize  
- 🤯 Lifters who don’t want to do math before a PR  
- 💪 Anyone who wants to lift smarter under pressure

---

## 🧱 Built With

- **Next.js** – Full-stack React framework  
- **Tailwind CSS** – Utility-first styling  
- **Font Awesome** – For clean, iconic visuals  
- **Vercel** – Deployment and hosting  

---

## 🚀 Getting Started (Development)

This project was bootstrapped with `create-next-app`.

### 🛠 Local Development

```bash
# Clone the repo
git clone https://github.com/yourusername/purdue-is-loaded.git
cd purdue-is-loaded

# Install dependencies
npm install

# Start the dev server
npm run dev

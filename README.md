# 🧠 Mnemo — Cyber Memory Engine

**Mnemo** is a cyberpunk-themed browser memory game built using the **Flask** framework and **Vanilla JavaScript**. It challenges your cognitive recall speed by flashing random terminology sequences, featuring a distracting "Mental Gate" to test your short-term memory before entering the recall phase.

---

## 🚀 Technical Features

* **⚡ Dynamic Generation Engine:** Uses the `Faker` library to generate continuous, changing terminology sequences for every stage.
* **🧠 Mental Gate Mechanism:** A sudden math equation breaks the player's focus right before the input phase, shifting cognitive load to test memory retention.
* **📈 Binary Leaderboard System:** An efficient, local object-oriented storage system (`.bin`) that tracks and saves the highest-scoring heroes.
* **📱 Responsive Cyberpunk UI:** A fully responsive dark terminal-style interface tailored to deliver an immersive experience on both mobile devices and desktops.

---

## 🛠️ Tech Stack

* **Back-End:** Python 3 + Flask Framework
* **Front-End:** HTML5 + CSS3 (Cyberpunk Neon Theme) + Vanilla JavaScript
* **Dependencies:** Faker (Data generation), Gunicorn (Production WSGI HTTP Server)
* **Deployment:** Hosted live on Render Cloud

---

## 📂 Project Structure

```text
├── static/
│   ├── style.css       # Neon cyberpunk styles and layouts
│   └── game.js         # Core game loop, timers, and DOM manipulation
├── templates/
│   └── index.html      # Main user interface template
├── app.py              # Flask server instance and route handling
├── engine.py           # Game logic, state machine, and OOP leaderboard core
├── requirements.txt    # Python external dependencies for cloud deployment
└── README.md           # Project documentation (This file)

💻 Local Setup Instructions
​To clone and run this project locally within a Terminal or Termux environment, execute the following commands:
Clone the repositorygit clone [https://github.com/ebrahimdev3/Mnemo.git](https://github.com/ebrahimdev3/Mnemo.git)
cd Mnemo
Install the required dependencies:
pip install -r requirements.txt
Fire up the local development server:
python app.py
Open your browser and navigate to http://127.0.0.1:5000 to start playing!
gunicorn app:app

📝 License
​This project is open-source and licensed under the MIT License. Feel free to fork, modify, distribute, or build your own modules on top of it.
​Created with 💻 via a Mobile Development Environment.
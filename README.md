# Mnemo 🧠

**Mnemo** is an interactive web application and programming challenge designed to test and stimulate short-term and long-term memory. The project is built using a clean software architecture that separates back-end logic from the front-end interface.

## 🚀 Key Features
- **Dynamic Flashing:** A word flashing system with a calculated rhythm that decreases dynamically as stages progress to increase the challenge.
- **Mental Gate:** A randomized mental math distractor that appears after the words vanish, disrupting immediate short-term recall and forcing the brain to transfer data into long-term memory.
- **Countdown System:** An exciting initialization and preparation countdown (3... 2... 1... GO!) before the challenge begins.
- **Case-Insensitive Input:** Smart input handling that ensures smooth gameplay regardless of whether words are entered in uppercase or lowercase.

## 🛠️ Technologies Used
- **Python / Flask:** Used for building the server and the application Controller.
- **Object-Oriented Programming (OOP):** Applied to program the game logic class and handle independent data management (`engine.py`).
- **JavaScript (Vanilla):** Controls UI timing, the countdown system, and drives asynchronous communication (Fetch API) with the server.
- **HTML5 / CSS3:** A fully responsive, cyberpunk-inspired dark theme user interface tailored for mobile screens.

## 📦 Local Setup and Running
1. Install the required libraries:
   ```bash
   pip install flask faker

---

# YouTube Video Sharing App

## 1. Introduction
A full-stack web application designed for sharing YouTube videos with a real-time notification system. Users can register, log in, and share their favorite content, while other online users receive instant alerts about new shares.

## 2. Key Features
*   **User Authentication**: Secure registration and login functionality.
*   **Video Sharing**: Share YouTube videos via URL with custom titles and descriptions.
*   **Home Feed**: A centralized list of all shared videos with integrated YouTube players.
*   **Real-time Notifications**: Instant pop-up alerts for newly shared videos using WebSockets (ActionCable) and Background Jobs.

## 3. Tech Stack
*   **Frontend**: React.js, Tailwind CSS, Vitest (Testing Library).
*   **Backend**: Ruby on Rails (API Mode), ActionCable, Redis.
*   **Database**: MySQL.
*   **DevOps**: Docker, Docker Compose.

## 4. Prerequisites
*   Docker and Docker Compose installed.
*   Git (to clone the repository).

## 5. Installation & Configuration (Dockerized)
The application is fully containerized for easy setup. Follow these steps to run it locally:

1.  **Clone the repository**:
```bash
git clone <your-repository-url>
cd YouTube
```
2.  **Build and Start Containers**:
```bash
docker-compose up --build
```
3.  **Setup the Database** (Run this once in a new terminal):
```bash
docker-compose exec api rails db:prepare
```
4.  **Access the Application**:
*   **Frontend**: [http://localhost:5173](http://localhost:5173)
*   **Backend API**: [http://localhost:3000](http://localhost:3000)

## 6. Running the Test Suite
Testing is integrated into both the Backend and Frontend to ensure reliability.

## Backend Tests (Minitest)
```bash
docker-compose exec api rails test

### Frontend Tests (Vitest & React Testing Library)
```bash
docker-compose exec frontend npm run test

## 7. How to Test Real-time Notifications
To verify the real-time notification system without needing two different computers, follow these steps:

1.  **Open the first session**: Open your standard browser (e.g., Chrome) and go to `http://localhost:5173`. Log in with **Account A**.
2.  **Open the second session**: Open an **Incognito/Private window** and go to `http://localhost:5173`. Log in with **Account B**.
3.  **Perform the share**:
    *   In **Account A**, click the "Share a movie" button, enter a YouTube URL, and submit.
    *   Switch to the **Account B** window immediately.
4.  **Observe the result**:
    *   You will see a **Toast Notification** appearing at the top-right corner of Account B's screen notifying you of the new video.
    *   The **Video List** in Account B will automatically prepend the new video to the top without needing a page refresh.

## 8. Troubleshooting
*   **Database Connection**: If the API container starts before MySQL is ready, restart the API with `docker-compose restart api`.
*   **WebSocket Connection**: Ensure Redis is active (check via `docker-compose ps`) to maintain the real-time notification stream.
*   **Port Conflicts**: Ensure ports `3000`, `3307`, `5173`, and `6379` are available on your host machine.

---

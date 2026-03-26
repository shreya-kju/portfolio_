# Shreya Mahato | Personal Portfolio

This repository contains my personal portfolio website, featuring my academic journey, skills, and projects.

## Tech Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js (Express)
- **Database**: MySQL / MongoDB (configured via `.env`)

---

## 🚀 CI/CD & Deployment

This project is equipped with automated CI/CD using **GitHub Actions**.

### Automated Checks
Every time you push to the `main` or `master` branch, GitHub Actions will:
1.  Set up the Node.js environment.
2.  Install all necessary dependencies.
3.  Perform basic syntax and build checks.

### Automated Deployment
To enable automated deployment (e.g., to [Render](https://render.com/) or [Railway](https://railway.app/)):

1.  **Set up your Hosting Provider**:
    - Connect your GitHub repository to your chosen platform.
    - Set the **Root Directory** to `./` (current directory).
    - Set the **Build Command** to `npm install`.
    - Set the **Start Command** to `npm start`.

2.  **Configure Environment Variables**:
    - In your hosting provider's dashboard, add the variables from your `.env` file (e.g., `DB_HOST`, `DB_USER`, etc.).

3.  **Optional: Deploy Webhook** (for GitHub Actions):
    - If your provider offers a deploy hook URL, add it to your GitHub Repository Secrets as `RENDER_DEPLOY_HOOK_URL`.
    - The workflow in `.github/workflows/deploy.yml` is already configured to use this secret.

---

## 🛠️ Local Setup

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file based on the provided template.
4.  Start the server:
    ```bash
    npm start
    ```
5.  Open `index.html` in your browser or via a local live server.

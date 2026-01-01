# Instructions to Push to GitHub

## Prerequisites
Make sure Git is installed on your system. If not, download it from: https://git-scm.com/download/win

## Steps to Push Your Repository

1. **Open Git Bash or PowerShell/Command Prompt in your project directory**

2. **Initialize Git repository (if not already initialized):**
   ```bash
   git init
   ```

3. **Add all files to staging:**
   ```bash
   git add .
   ```

4. **Create initial commit:**
   ```bash
   git commit -m "Initial commit: LinkGenie AI URL Shortener"
   ```

5. **Add your GitHub repository as remote:**
   ```bash
   git remote add origin https://github.com/edpsuresh-lgtm/url_shortner.git
   ```

6. **Rename branch to main:**
   ```bash
   git branch -M main
   ```

7. **Push to GitHub:**
   ```bash
   git push -u origin main
   ```

## Note
If you get authentication errors, you may need to:
- Use a Personal Access Token instead of password (GitHub no longer accepts passwords)
- Or configure SSH keys for authentication

## Creating a Personal Access Token (if needed):
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Use the token as your password when pushing


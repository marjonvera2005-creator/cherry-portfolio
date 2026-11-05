# Cherry Mae Atibula Portfolio

Personal portfolio website built with Next.js and React.

---

## 1. Requirements

### What you need to install

| Software | Version | Download | Why it is needed |
| --- | --- | --- | --- |
| **Node.js** | 20.9.0 or newer (LTS recommended) | https://nodejs.org | Runs the website. Next.js 16 will not start on older versions. |
| **npm** | Comes with Node.js (10 or newer) | Installed with Node.js | Installs the project packages. |
| **Git** | Any recent version | https://git-scm.com | Downloads the project from GitHub. |
| **Code editor** (optional) | Any | https://code.visualstudio.com | For editing the files. VS Code is recommended. |
| **Web browser** | Chrome, Edge, Firefox or Safari (latest) | — | For viewing the website. |

### Computer requirements

- **Operating system:** Windows 10/11, macOS 12 or newer, or Linux
- **RAM:** 4 GB minimum (8 GB recommended)
- **Free disk space:** about 500 MB (mostly for the `node_modules` folder)
- **Internet connection:** needed for `npm install`, and the first time you run or build the site (it downloads the Plus Jakarta Sans font from Google Fonts)

### Project packages

These are installed automatically by `npm install`. You do **not** need to install them by hand.

| Package | Version |
| --- | --- |
| next | 16.4.3 |
| react | 19.3.1 |
| react-dom | 19.3.1 |

No database, API keys or `.env` file are needed.

---

## 2. Check that everything is installed

Open a terminal (Command Prompt, PowerShell, or Terminal on Mac) and run:

```
node -v
npm -v
git --version
```

Each command should print a version number. `node -v` must show `v20.9.0` or higher. If a command says "not recognized" or "command not found", install that program from the table above and restart the terminal.

---

## 3. How to run it

1. **Download the project:**

   ```
   git clone https://github.com/marjonvera2005-creator/cherry-portfolio.git
   ```

   (Or on GitHub click **Code → Download ZIP** and unzip it.)

2. **Open the project folder:**

   ```
   cd cherry-portfolio
   ```

3. **Install the packages** (only needed the first time, or after `package.json` changes):

   ```
   npm install
   ```

4. **Start the website:**

   ```
   npm run dev
   ```

5. **Open http://localhost:3000 in your browser.**

   Changes you make to the files show up in the browser automatically.
   To stop the website, press `Ctrl + C` in the terminal.

---

## 4. Available commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs all packages into `node_modules` |
| `npm run dev` | Starts the site for development at http://localhost:3000 |
| `npm run build` | Builds the optimized production version |
| `npm run start` | Runs the production build (run `npm run build` first) |

---

## 5. Project structure

```
cherry-portfolio/
├── app/                 Main page, layout, global styles and site icon
│   ├── layout.js
│   ├── page.js
│   ├── globals.css
│   └── icon.svg
├── components/          Each section of the site (Hero, About, Skills,
│                        Portfolio, Certificates, Contact, Nav, Footer...)
├── lib/
│   └── content.js       The text content of the site (edit this to change wording)
├── public/assets/       Photo, resume PDF, certificates and project screenshots
├── package.json         Project name, commands and package list
└── package-lock.json    Exact package versions (do not edit by hand)
```

---

## 6. Common problems

**Windows: "running scripts is disabled on this system"**
Use `npm.cmd` instead of `npm`:

```
npm.cmd install
npm.cmd run dev
```

**"Port 3000 is already in use"**
Another program is using that port. Close it, or run on a different port:

```
npm run dev -- -p 3001
```

Then open http://localhost:3001.

**"You are using Node.js X. For Next.js, Node.js version >= 20.9.0 is required"**
Your Node.js is too old. Install the latest LTS version from https://nodejs.org.

**Font download error / site fails to start without internet**
The site loads a Google font. Connect to the internet and run the command again.

**Something is broken after updating**
Delete the `node_modules` folder and the `.next` folder, then run `npm install` again.

---

## 7. Deploying

The site is hosted on Vercel. Push to the main branch to update it:

```
git add .
git commit -m "Describe the change"
git push
```

Vercel builds and publishes the new version automatically within a minute or two.

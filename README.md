# Timeseries Vue.js App

This is a basic Vue.js project that displays 3 timeseries in a table and a line chart with dynamic editing for the prices displayed.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technologies Used](#technologies-used)
3. [Setup Instructions](#setup-instructions)
4. [Project Structure](#project-structure)

---

## Project Overview

The Timeseries Vue.js App is a dynamic web application built using Vue.js. It is designed to display three timeseries datasets in both a table and a line chart format. The application allows users to dynamically edit the prices displayed in the table, and these changes are reflected in real-time on the line chart. This project demonstrates the capabilities of Vue.js in handling dynamic data visualization and user interactions.

On the github project there are two branches. The first one is main which takes its data from a static json file and does not make any actual edits on it. The other branch is local which uses json-server to simulate actual real time edits that persist between reloads.

The app is hosted on [https://timeseries-vue-app.vercel.app/](https://timeseries-vue-app.vercel.app/). This is the main branch version.

---

## Technologies Used

- Vue.js (v[3.2.13])
- Vue Router (v[4.0.3])
- Node.js (v[22.13.0])
- NPM (v[10.9.2])
- vue-chartjs (v[3.8.3])
- vue-datepicker (v[11.0.1])

---

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (>= v22.13.0)
- NPM (>= v10.9.2)

### Clone the Repository
```bash
git clone https://github.com/zorpidis/timeseries-vue-app
cd timeseries-vue-app
```

### Install Dependencies

Using NPM:
```bash
npm install
```

### Run the Development Server

```bash
npm run serve
```

If you are running on local branch
```bash
npx json-server --watch data/db.json
```


### Build for Production

```bash
npm run build
```


## Project Structure

```plaintext
src/
  ├── assets/        # Static assets (images, styles)
  ├── components/    # Reusable Vue components
  ├── composables/   # Reusable Composables
  ├── router/        # Application routing
  ├── views/         # Page-level components
  ├── App.vue        # Main app component
  └── main.js        # Entry point
```
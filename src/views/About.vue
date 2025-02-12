<template>
  <div class="about-container">
    <h1>Timeseries Vue.js App</h1>
    <p>This is a basic Vue.js project that displays 3 timeseries in a table and a line chart with dynamic editing for the prices displayed.</p>

    <h2>Table of Contents</h2>
    <ol class="table-of-contents">
      <li><a href="#project-overview">Project Overview</a></li>
      <li><a href="#technologies-used">Technologies Used</a></li>
      <li><a href="#setup-instructions">Setup Instructions</a></li>
      <li><a href="#project-structure">Project Structure</a></li>
    </ol>

    <h2 id="project-overview">Project Overview</h2>
    <p>The Timeseries Vue.js App is a dynamic web application built using Vue.js. It is designed to display three timeseries datasets in both a table and a line chart format. The application allows users to dynamically edit the prices displayed in the table, and these changes are reflected in real-time on the line chart. This project demonstrates the capabilities of Vue.js in handling dynamic data visualization and user interactions. </p>
    <p>On the github project there are two branches. The first one is main which takes its data from a static json file and does not make any actual edits on it. The other branch is local which uses json-server to simulate actual real time edits that persist between reloads.</p>
    <p>The app is hosted on <a href="https://timeseries-vue-app.vercel.app/" target="_blank" class="external-link">https://timeseries-vue-app.vercel.app/</a>. This is the main branch version.</p>

    <h2 id="technologies-used">Technologies Used</h2>
    <ul>
      <li>Vue.js (v3.2.13)</li>
      <li>Vue Router (v4.0.3)</li>
      <li>Node.js (v22.13.0)</li>
      <li>NPM (v10.9.2)</li>
      <li>vue-chartjs (v3.8.3)</li>
      <li>vue-datepicker (v11.0.1)</li>
    </ul>

    <h2 id="setup-instructions">Setup Instructions</h2>
    <h3>Prerequisites</h3>
    <p>Ensure you have the following installed on your local machine:</p>
    <ul>
      <li>Node.js (>= v22.13.0)</li>
      <li>NPM (>= v10.9.2)</li>
    </ul>

    <h3>Clone the Repository</h3>
    <pre><code>git clone https://github.com/zorpidis/timeseries-vue-app
cd timeseries-vue-app</code></pre>

    <h3>Install Dependencies</h3>
    <p>Using NPM:</p>
    <pre><code>npm install</code></pre>

    <h3>Run the Development Server</h3>
    <pre><code>npm run serve</code></pre>

    <h4>If you are running on local branch</h4>
    <pre><code>npx json-server --watch data/db.json</code></pre>

    <h3>Build for Production</h3>
    <pre><code>npm run build</code></pre>

    <h2 id="project-structure">Project Structure</h2>
    <pre><code>src/
  ├── assets/        # Static assets (images, styles)
  ├── components/    # Reusable Vue components
  ├── composables/   # Reusable Composables
  ├── router/        # Application routing
  ├── views/         # Page-level components
  ├── App.vue        # Main app component
  └── main.js        # Entry point</code></pre>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style>
.about-container {
  padding: 20px;
  text-align: left;
  margin: 0 25%;
}

.about-container h1, .about-container h2, .about-container h3 {
  margin-top: 20px;
}

.about-container pre {
  background: var(--color-border);
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto;
}

.about-container code {
  font-family: 'Courier New', Courier, monospace;
}

.table-of-contents {
  list-style: none;
  padding: 0;
}

.table-of-contents li {
  margin-bottom: 8px;
}

.table-of-contents a {
  text-decoration: none;
  color: inherit;
}

@media screen and (max-width: 768px) {
  .about-container {
    margin: 0 10px;
  } 
}
</style>
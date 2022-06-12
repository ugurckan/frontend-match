import React from "react";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

// Views
import ReportsView from "./views/Reports/ReportsView";

function App() {
  return (
    <div id="app">
      <Sidebar />
      <div id="content">
        <Header />
        <main className="grow flex flex-col py-8 pl-3 pr-4 md:pr-24">
          <ReportsView />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;

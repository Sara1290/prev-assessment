import React from 'react';
import Footer from './Components/Footer';
import Header from './Components/Header'
import Legend from './Components/Legend';
import ReactColor from "./Components/ReactColor";



function App() {
  return (
    <div className="app">
      <Header />
      <ReactColor />
      <Legend />
      <Footer />
    </div>
  );
}

export default App;

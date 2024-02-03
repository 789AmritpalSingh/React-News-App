import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';
import './App.css';

const App = () => {
  const pageSize = 21
  const country = "in"
  // const apiKey = process.env.REACT_APP_NEWS_API
  const apiKey = "88ce08d135b94f5da02ccd52f871602e"
 
  const[progress,setProgress] = useState(0)
    return (
      <div>
        <BrowserRouter>
        <Navbar/>
        <LoadingBar
        height={3}
        color= 'blue'
        progress={progress}
        />
        <Routes>
          <Route exact path="/" element={<News setProgress={setProgress} apiKey = {apiKey} key="general" pageSize={pageSize} country={country} category="general"/>}/>
          <Route exact path="/general" element={<News setProgress={setProgress} apiKey = {apiKey} key="general" pageSize={pageSize} country={country} category="general"/>}/>
          <Route exact path="/science" element={<News setProgress={setProgress} apiKey = {apiKey} key="science" pageSize={pageSize} country={country} category="science"/>}/>
          <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey = {apiKey} key="entertainment" pageSize={pageSize} country={country} category="entertainment"/>}/>
          <Route exact path="/business" element={<News setProgress={setProgress} apiKey = {apiKey} key="business" pageSize={pageSize} country={country} category="business"/>}/>
          <Route exact path="/sports" element={<News setProgress={setProgress} apiKey = {apiKey} key="sports"pageSize={pageSize} country={country} category="sports"/>}/>
          <Route exact path="/technology" element={<News setProgress={setProgress} apiKey = {apiKey} key="technology"pageSize={pageSize} country={country} category="technology"/>}/>
          <Route exact path="/health" element={<News setProgress={setProgress} apiKey = {apiKey} key="health" pageSize={pageSize} country={country} category="health"/>}/>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }


export default App;

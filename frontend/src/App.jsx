import React from 'react'
import Home from './pages/home'
import UploadImage from './pages/upload_image'
import UploadVideo from './pages/upload_video'
import UploadAudio from './pages/upload_audio'
import { Route, Routes } from 'react-router-dom'

const App = () => {
  
  return (
      <div>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/upload-image" element={<UploadImage />} />
        <Route path="/upload-video" element={<UploadVideo />} />
        <Route path="/upload-audio" element={<UploadAudio />} />
      </Routes>
    </div>
  )




}

export default App

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ImportantLectures from './pages/ImportantLectures'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Announcements from './pages/Announcements'
import NotesPYQ from './pages/NotesPYQ'
import Faculty from './pages/Faculty'
import Blog from './pages/Blog'
import Syllabus from './pages/Syllabus'
import Placement from './pages/Placement'
import Roadmap from './pages/Roadmap'
import RoadmapDetail from './pages/RoadmapDetail'
import ImpTools from './pages/ImpTools'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="app-root">
     
      <Navbar />
      <main className="container">
       <Routes>

  {/* Login page */}
  <Route path="/login" element={<Login />} />

  {/* Protected pages */}
  <Route path="/" element={
    <ProtectedRoute><Home /></ProtectedRoute>
  } />

  <Route path="/syllabus" element={
    <ProtectedRoute><Syllabus /></ProtectedRoute>
  } />

  <Route path="/lectures" element={
    <ProtectedRoute><ImportantLectures /></ProtectedRoute>
  } />

  <Route path="/announcements" element={
    <ProtectedRoute><Announcements /></ProtectedRoute>
  } />

  <Route path="/notes" element={
    <ProtectedRoute><NotesPYQ initialTab="notes" /></ProtectedRoute>
  } />

  <Route path="/pyq" element={
    <ProtectedRoute><NotesPYQ initialTab="pyq" /></ProtectedRoute>
  } />

  <Route path="/placement" element={
    <ProtectedRoute><Placement /></ProtectedRoute>
  } />

  <Route path="/faculty" element={
    <ProtectedRoute><Faculty /></ProtectedRoute>
  } />

  <Route path="/blog" element={
    <ProtectedRoute><Blog /></ProtectedRoute>
  } />

  <Route path="/roadmap" element={
    <ProtectedRoute><Roadmap /></ProtectedRoute>
  } />

  <Route path="/roadmap/:id" element={
    <ProtectedRoute><RoadmapDetail /></ProtectedRoute>
  } />

  <Route path="/tools" element={
    <ProtectedRoute><ImpTools /></ProtectedRoute>
  } />

</Routes>
      </main>
      <Footer />
    </div>
  )
}

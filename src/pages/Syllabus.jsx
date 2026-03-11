import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

// Per-semester syllabus URLs — set to the links you provided
const SYLLABUS_LINKS = [
  '/oxford_syb.pdf',
  null,
]

const semesters = [
  'Complete Syllabus',
  'Final Year Projects',
]

export default function Syllabus() {
  const navigate = useNavigate()
  const [modal, setModal] = useState({ open: false, title: '', content: null })
  return (
    <div className="page syllabus-page light-page">
      <div className="light-panel">
        <div style={{textAlign:'center',marginTop:12}} className="syll-top">
          <h1 className="syll-title" style={{margin:0,fontSize:36}}>Syllabus</h1>
          <p className="syll-sub" style={{color:'var(--muted)',marginTop:8}}>Complete semester-wise syllabus for all subjects</p>
        </div>

          <div className="syll-grid-tiles" style={{marginTop:36}}>
            {semesters.map((s, i) => (
              <article key={s} className="syll-tile unique">
                <div className="tile-left">
                  <div className={`tile-badge variant-${i}`}>{i + 1}</div>
                </div>

                <div className="tile-main">
                  <h3>{s}</h3>
                  <p className="muted small">Oxford Hub</p>
                </div>

                <div className="tile-cta">
                  {SYLLABUS_LINKS[i] ? (
                    <a className="btn small" href={SYLLABUS_LINKS[i]} target="_blank" rel="noopener noreferrer">View</a>
                  ) : (
                    <button className="btn small" onClick={() => setModal({ open: true, title: s, content: 'Minor Project and Major Project' })}>View</button>
                  )}

                </div>
              </article>
            ))}
          </div>
          <Modal open={modal.open} title={modal.title} onClose={() => setModal({ open: false })}>
            <div style={{textAlign:'center',padding:12}}>
              <h3 style={{marginTop:0}}>{modal.content}</h3>
              <p className="muted" style={{marginTop:8}}>3rd Year is all about Minor and Major project.</p>
              <div style={{marginTop:14}}>
                <button className="btn primary" onClick={() => setModal({ open: false })}>OK</button>
              </div>
            </div>
          </Modal>
      </div>
    </div>
  )
}

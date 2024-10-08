import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactPlayer from 'react-player/lazy';

export default function ProjectModal({ url, title, date }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Helper function to format the URL
  const formatUrl = (url) => {
    // Check if it's a YouTube video ID (no domain included)
    if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
      return `https://www.youtube.com/watch?v=${url}`;
    }

    // Otherwise, return the URL as it is
    return url;
  };

  return (
    <div className='   '>
      <Button className=' ' variant="primary" onClick={handleShow}>
        Lire la vidéo
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-black">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-black text-xl mb-4">{date}</h2>
          <div className="player-wrapper">
            <ReactPlayer
              url={formatUrl(url)}
              controls
              width="100%" // Full width on mobile
               style={{ width: '100%', height: 'auto' }} // Ensure responsive sizing
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

"use client";
import { useState, useRef } from "react";
import styles from './App.module.css';

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [x, setX] = useState("");
  const jsonCardRef = useRef(null);

  const handleDownload = async () => {
  if (!jsonCardRef.current) return;

  try {
    const html2canvas = (await import('html2canvas')).default;
    
    const canvas = await html2canvas(jsonCardRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      onclone: (clonedDoc) => {
        const clonedCard = clonedDoc.querySelector(`.${styles.cardWrapper}`);
        if (clonedCard) {
          clonedCard.style.margin = '0';
          clonedCard.style.padding = '0';
          clonedCard.style.background = '#0f0f0f';
        }
      }
    });

    const croppedCanvas = document.createElement('canvas');
    const ctx = croppedCanvas.getContext('2d');
    
    croppedCanvas.width = 540 * 3;
    croppedCanvas.height = 340 * 3;
    
    ctx.drawImage(canvas, 0, 0, croppedCanvas.width, croppedCanvas.height);
    
    const image = croppedCanvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = `${name.replace(/\s+/g, '-').toLowerCase()}-business-card.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error generating image:', error);
    alert('Error generating image. Please try again.');
  }
};

  const getFileName = () => {
    if (!name.trim()) {
      return "Business Card.json";
    }
    return `${name}'s Business Card.json`;
  };

  const getFileTab = () => {
    if (!name.trim()) {
      return "Business Card.json";
    }
    return `${name}'s Business Card.json`;
  };

  return (
    <>
      <div className={styles.cyberGrid}></div>
      <div className={styles.floatingShapes}>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
        <div className={styles.shape}></div>
      </div>
      <div className={`${styles.neonGlow} ${styles.neon1}`}></div>
      <div className={`${styles.neonGlow} ${styles.neon2}`}></div>
      <div className={`${styles.neonGlow} ${styles.neon3}`}></div>

      <div className={styles.hero}>
        <div className={styles.right}>
          <div className={styles.main}>
            <h1 className={styles.header}>Your Business Card</h1>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="X"
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.left}>
          <div ref={jsonCardRef} className={`${styles.cardWrapper} ${styles.scrollbar}`}>
            <div className={styles.jsonHeader}>
              <div className={styles.dots}>
                <div className={`${styles.dot} ${styles.red}`}></div>
                <div className={`${styles.dot} ${styles.yellow}`}></div>
                <div className={`${styles.dot} ${styles.green}`}></div>
              </div>
              <div className={styles.fileName}>Business Card.json</div>
            </div>
            <div className={styles.fileTab}>{getFileTab()}</div>
            <div className={`${styles.content} ${styles.scrollbar}`}>
              <div className={styles.line}>
                <span className={styles.lineNumber}>1</span>
                <span className={styles.key}>"name"</span>
                <span className={styles.value}>:</span>
                <span className={styles.string}>"{name || "Your Name"}"</span>
              </div>
              <div className={styles.line}>
                <span className={styles.lineNumber}>2</span>
                <span className={styles.key}>"title"</span>
                <span className={styles.value}>:</span>
                <span className={styles.string}>"{title || "Your Title"}"</span>
              </div>
              <div className={styles.line}>
                <span className={styles.lineNumber}>3</span>
                <span className={styles.key}>"email"</span>
                <span className={styles.value}>:</span>
                <span className={styles.string}>"{email || "your.email@example.com"}"</span>
              </div>
              <div className={styles.line}>
                <span className={styles.lineNumber}>4</span>
                <span className={styles.key}>"x"</span>
                <span className={styles.value}>:</span>
                <span className={styles.string}>"{x || "yourusername"}"</span>
              </div>
            </div>
          </div>

          <div className={styles.desktopDownload}>
            <button onClick={handleDownload} className={styles.downloadBtn}>
              Download Card
            </button>
          </div>
        </div>

        <div className={styles.downloadSection}>
          <button onClick={handleDownload} className={styles.downloadBtn}>
            Download Card
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
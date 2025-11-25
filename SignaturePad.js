import React, { useRef, useEffect } from "react";

export default function SignaturePad({ width = 300, height = 80, onChange }) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = width * 2;
    canvas.height = height * 2;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    ctx.scale(2,2);
    ctx.lineWidth = 2.0;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#000";
    ctxRef.current = ctx;
    clear();
  }, [width,height]);

  function getPos(e) {
    const rect = canvasRef.current.getBoundingClientRect();
    if (e.touches) {
      return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    }
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function start(e) {
    drawing.current = true;
    const { x, y } = getPos(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    e.preventDefault();
  }
  function draw(e) {
    if (!drawing.current) return;
    const { x, y } = getPos(e);
    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
    e.preventDefault();
  }
  function end(e) {
    drawing.current = false;
    onChange && onChange(canvasRef.current.toDataURL("image/png"));
  }

  function clear() {
    const ctx = ctxRef.current;
    ctx && ctx.clearRect(0,0,canvasRef.current.width, canvasRef.current.height);
    onChange && onChange(null);
  }

  return (
    <div style={{display:"flex", flexDirection:"column", gap:8}}>
      <canvas
        ref={canvasRef}
        onMouseDown={start} onMouseMove={draw} onMouseUp={end} onMouseLeave={end}
        onTouchStart={start} onTouchMove={draw} onTouchEnd={end}
        style={{ border:"1px solid #e5e7eb", borderRadius:6, background:"#fff" }}
      />
      <div style={{display:"flex", gap:8}}>
        <button type="button" onClick={clear} className="secondary btn">Clear</button>
      </div>
    </div>
  );
}

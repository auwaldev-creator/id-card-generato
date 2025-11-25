import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import IDCardPreview from "./components/IDCardPreview";
import SignaturePad from "./components/SignaturePad";

export default function App() {
  const [data, setData] = useState({
    schoolName: "Taraba State University",
    fullName: "Auwal Bashar",
    matric: "TSU/FS/PL/24/1076",
    dept: "Political Science & International Relations",
    dob: "01/01/2004",
    blood: "O+",
    photoData: null,
    signatureData: null
  });

  const fileRef = useRef();

  function handleChange(e) {
    const { name, value } = e.target;
    setData(prev => ({...prev, [name]: value }));
  }

  function onPhoto(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData(prev => ({...prev, photoData: reader.result}));
    reader.readAsDataURL(file);
  }

  function onSign(dataUrl) {
    setData(prev => ({...prev, signatureData: dataUrl}));
  }

  async function downloadPDF(fullPage=false) {
    const element = document.getElementById("id-card-root");
    const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: null });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "pt",
      format: "a4"
    });
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width * 0.24;
    const imgHeight = (canvas.height * 0.24);
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    pdf.save(`${data.matric || "id-card"}.pdf`);
  }

  async function downloadPNG() {
    const element = document.getElementById("id-card-root");
    const canvas = await html2canvas(element, { scale: 3, useCORS: true, backgroundColor: null });
    const link = document.createElement("a");
    link.download = `${data.matric || "id"}-card.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="container">
      <div className="form">
        <h2>ID Card Generator</h2>

        <div className="field">
          <label className="label">Full name</label>
          <input className="input" name="fullName" value={data.fullName} onChange={handleChange} />
        </div>

        <div className="row">
          <div className="field small">
            <label className="label">Matric / ID</label>
            <input className="input" name="matric" value={data.matric} onChange={handleChange} />
          </div>
          <div className="field small">
            <label className="label">DOB</label>
            <input className="input" name="dob" value={data.dob} onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label className="label">Department</label>
          <input className="input" name="dept" value={data.dept} onChange={handleChange} />
        </div>

        <div className="row">
          <div className="field small">
            <label className="label">Blood Group</label>
            <input className="input" name="blood" value={data.blood} onChange={handleChange} />
          </div>
          <div className="field small">
            <label className="label">School name</label>
            <input className="input" name="schoolName" value={data.schoolName} onChange={handleChange} />
          </div>
        </div>

        <div className="field">
          <label className="label">Upload photo</label>
          <input ref={fileRef} type="file" accept="image/*" onChange={onPhoto} />
          <div className="note">Take a passport-style photo (use plain background) for best results.</div>
        </div>

        <div className="field">
          <label className="label">Signature (draw)</label>
          <SignaturePad width={260} height={80} onChange={onSign} />
          <div className="note">You can draw with finger on phone or mouse on desktop.</div>
        </div>

        <div className="controls">
          <button className="btn" onClick={() => downloadPDF()}>Download PDF (A4)</button>
          <button className="btn secondary" onClick={() => downloadPNG()}>Download PNG</button>
        </div>

        <div className="note">After downloading PDF, you can send to a print shop; for lamination ask them to print on PVC 640µ or 760µ and cut to size.</div>
      </div>

      <div className="preview-col">
        <div className="card-wrap">
          <IDCardPreview data={data} />
        </div>

        <div style={{width:440, textAlign:"center"}}>
          <div style={{fontSize:13, color:"#6b7280"}}>Preview — this is what will be printed (scaled). Use "Download PDF" to save high-quality copy.</div>
        </div>
      </div>
    </div>
  );
}

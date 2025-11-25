import React from "react";

export default function IDCardPreview({data}) {
  const {
    schoolName = "Taraba State University",
    fullName = "Full Name",
    matric = "TSU/xxx/xxx",
    dept = "Department",
    dob = "",
    blood = "",
    photoData,
    signatureData
  } = data;

  return (
    <div className="id-card" id="id-card-root">
      <div className="header">
        <div className="logo">TSU</div>
        <div>
          <div className="title">{schoolName}</div>
          <div style={{fontSize:12, color:"#e6eefc"}}>Student ID Card</div>
        </div>
      </div>

      <div className="body">
        <div className="photo">
          {photoData ? <img src={photoData} alt="photo" /> : <div style={{padding:8, textAlign:"center"}}>No photo</div>}
        </div>

        <div className="info">
          <div style={{fontWeight:700, fontSize:16}}>{fullName}</div>
          <div className="small-muted">Matric No: <strong>{matric}</strong></div>
          <div className="small-muted">Department: <strong>{dept}</strong></div>
          <div className="small-muted">DOB: <strong>{dob}</strong></div>
          <div className="small-muted">Blood Group: <strong>{blood}</strong></div>
        </div>
      </div>

      <div className="footer">
        <div className="footer-left">TSU • Student ID</div>
        <div style={{display:"flex", gap:8, alignItems:"center"}}>
          <div className="sign">
            {signatureData ? <img src={signatureData} alt="sign" style={{width:"100%",height:"100%",objectFit:"contain"}} /> : <div className="small-muted">Signature</div>}
          </div>
          <div style={{fontSize:11,color:"#6b7280"}}>Dept. Sign.</div>
        </div>
      </div>
    </div>
  );
}

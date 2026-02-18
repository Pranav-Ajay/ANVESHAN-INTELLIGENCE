function getCurrentDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes} hrs`;
}

function getDayName(dateString) {
    if (!dateString) return "";
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return days[new Date(dateString).getDay()];
}

function create() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    let e = [];
    for (let i = 1; i <= 21; i++) {
        e[i] = document.getElementById(i.toString())?.value || "";
    }

    doc.setFont("helvetica", "normal");

    doc.setFontSize(16);
    doc.text("FIRST INFORMATION REPORT", 105, 15, { align: "center" });

    doc.setFontSize(11);
    doc.text("(Under Section 154 Cr.P.C.)", 105, 22, { align: "center" });

    let y = 35;

    doc.text("1. District: SUNDARGARH", 14, y);
    doc.text("P.S.: RAIBOGA", 90, y);
    doc.text("Year: " + new Date().getFullYear(), 160, y);

    y += 8;
    doc.text("FIR No.: 0001", 14, y);
    doc.text("Date & Time of FIR: " + getCurrentDateTime(), 90, y);

    y += 12;
    doc.setFontSize(12);
    doc.text("2. Acts and Sections", 14, y);
    doc.setFontSize(11);

    y += 8;
    doc.text("Act: IPC 1860", 20, y);
    doc.text("Section: 279, 304-A", 120, y);

    y += 12;
    doc.setFontSize(12);
    doc.text("3. Occurrence of Offence", 14, y);
    doc.setFontSize(11);

    y += 8;
    doc.text("Day: " + getDayName(e[15]), 20, y);
    doc.text("Date: " + e[15], 80, y);

    y += 7;
    doc.text("Time From: " + e[16], 20, y);
    doc.text("Time To: " + e[17], 120, y);

    y += 7;
    doc.text("Information received at P.S.: " + getCurrentDateTime(), 20, y);

    y += 12;
    doc.setFontSize(12);
    doc.text("4. Type of Information: Written", 14, y);

    y += 12;
    doc.setFontSize(12);
    doc.text("5. Place of Occurrence", 14, y);
    doc.setFontSize(11);

    y += 8;
    doc.text("Address: " + e[8], 20, y);

    y += 12;
    doc.setFontSize(12);
    doc.text("6. Complainant / Informant", 14, y);
    doc.setFontSize(11);

    y += 8;
    doc.text("Name: " + e[1], 20, y);
    y += 7;
    doc.text("Father/Husband Name: " + e[2], 20, y);
    y += 7;
    doc.text("DOB: " + e[3], 20, y);
    doc.text("Nationality: " + e[4], 120, y);

    y += 20;
    doc.text("Signature of Complainant:", 20, y);

    let signatureImg = localStorage.getItem("signaturePic");
    if (signatureImg) {
        doc.addImage(signatureImg, "PNG", 20, y + 5, 50, 25);
    } else {
        doc.text("Not Available", 60, y);
    }

    const FIR=doc.output("datauristring");
    localStorage.removeItem("fir");
    localStorage.setItem("fir",FIR);
    let dataUri = localStorage.getItem("fir");

    let byteString = atob(dataUri.split(',')[1]);
    let mimeString = dataUri.split(',')[0].split(':')[1].split(';')[0];

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);

   for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
   }

   let blob = new Blob([ab], { type: mimeString });

   let a = document.createElement("a");
   a.href = URL.createObjectURL(blob);
   a.download = "FIR_Report_2026.pdf";  
   a.click();
   alert("pdf saved");
   localStorage.removeItem("fir");
   localStorage.setItem("fir",a.download);
  }

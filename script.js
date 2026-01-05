document.addEventListener("DOMContentLoaded", function () {

    const shibirNo = document.getElementById("shibirNo");
    const sthan = document.getElementById("sthan");
    const dinank = document.getElementById("dinank");
    const samay = document.getElementById("samay");
    const soujanya = document.getElementById("soujanya");

    const starText = document.getElementById("starText");
    const sthanText = document.getElementById("sthanText");
    const dinankText = document.getElementById("dinankText");
    const samayText = document.getElementById("samayText");
    const soujanyaText = document.getElementById("soujanyaText");


    function toHindi(text) {
    if (!window.Sanscript) return text;

    return Sanscript.t(
        text
            .toLowerCase()
            .replace(/,/g, "")   // remove commas
            .trim(),"itrans","devanagari"
    );
}


    function updatePoster() {
        starText.textContent = toHindi(shibirNo.value);
        sthanText.textContent = toHindi(sthan.value);
        dinankText.textContent = toHindi(dinank.value);
        samayText.textContent = toHindi(samay.value);
        soujanyaText.textContent = toHindi(soujanya.value);
    }

    shibirNo.addEventListener("input", updatePoster);
    sthan.addEventListener("input", updatePoster);
    dinank.addEventListener("input", updatePoster);
    samay.addEventListener("input", updatePoster);
    soujanya.addEventListener("input", updatePoster);

    updatePoster();
    
    document.getElementById("downloadBtn").addEventListener("click", function () {

    const poster = document.querySelector(".poster");

    html2canvas(poster, { scale: 2 }).then(canvas => {

        const imgData = canvas.toDataURL("image/png");

        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = 210;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("Yoga-Shibir-Poster.pdf");
    });
});

});

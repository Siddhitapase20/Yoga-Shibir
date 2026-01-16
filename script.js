document.addEventListener("DOMContentLoaded", function () {

    const shibirNo = document.getElementById("shibirNo");
    const sthan = document.getElementById("sthan");
    const startDate = document.getElementById("Start-Date");
    const endDate = document.getElementById("End-Date");
    const startTime = document.getElementById("Start-Time");
    const endTime = document.getElementById("End-Time");

    const soujanya1 = document.getElementById("soujanya1");
    const soujanya2 = document.getElementById("soujanya2");
    const soujanya3 = document.getElementById("soujanya3");


    const starText = document.getElementById("starText");
    const sthanText = document.getElementById("sthanText");
    const startDateText = document.getElementById("startDateText");
    const endDateText = document.getElementById("endDateText");
    const startTimeText = document.getElementById("startTimeText");
    const endTimeText = document.getElementById("endTimeText");
    const samayText = document.getElementById("samayText");
    const soujanya1Text = document.getElementById("soujanya1Text");
    const soujanya2Text = document.getElementById("soujanya2Text");
    const soujanya3Text = document.getElementById("soujanya3Text");


    // Transliterate using Google Input Tools API
    async function transliterateChunk(text, lang = "hi-t-i0-und") {
        const params = new URLSearchParams();
        params.append("text", text);
        params.append("itc", lang);
        params.append("num", "1");
        params.append("cp", "0");
        params.append("ie", "utf-8");
        params.append("oe", "utf-8");
        params.append("app", "demopage");

        const response = await fetch("https://inputtools.google.com/request", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: params.toString(),
        });

        const result = await response.json();
        if (result[0] === "SUCCESS") {
            return result[1][0][1][0];
        }
        return text; // fallback
    }

    async function transliterateFullText(text) {
        // Split by comma, transliterate each part
        const parts = text.split(",");
        const translatedParts = [];
        for (const part of parts) {
            const trimmed = part.trim();
            const translated = await transliterateChunk(trimmed);
            translatedParts.push(translated);
        }
        return translatedParts.join(", ");
    }

    function debounce(fn, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    async function updatePoster() {
    starText.textContent = shibirNo.value;

    sthanText.textContent = await transliterateFullText(sthan.value);

    startDateText.textContent = await transliterateFullText(startDate.value);
    endDateText.textContent = await transliterateFullText(endDate.value);

    startTimeText.textContent = await transliterateFullText(startTime.value);
    endTimeText.textContent = await transliterateFullText(endTime.value);
    soujanya1Text.textContent = "1) " + await transliterateFullText(soujanya1.value);
    soujanya2Text.textContent = "2) " + await transliterateFullText(soujanya2.value);
    soujanya3Text.textContent = "3) " + await transliterateFullText(soujanya3.value);

}

let timer;
function delayedUpdate() {
    clearTimeout(timer);
    timer = setTimeout(updatePoster, 500);
}

shibirNo.addEventListener("input", delayedUpdate);
sthan.addEventListener("input", delayedUpdate);
startDate.addEventListener("input", delayedUpdate);
endDate.addEventListener("input", delayedUpdate);
startTime.addEventListener("input", delayedUpdate);
endTime.addEventListener("input", delayedUpdate);
soujanya1.addEventListener("input", delayedUpdate);
soujanya2.addEventListener("input", delayedUpdate);
soujanya3.addEventListener("input", delayedUpdate);


    updatePoster();
});
const downloadBtn = document.getElementById("downloadBtn");

downloadBtn.addEventListener("click", async function () {
    const poster = document.querySelector(".poster");

    const canvas = await html2canvas(poster, {
        scale: 2
    });

    const imgData = canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("Yoga_Shibir_Poster.pdf");
});

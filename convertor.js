//Main Funvtion to transliterate text using Google Input Tools API
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
  // 🔹 Split by comma
  const parts = text.split(",");

  const translatedParts = [];
  for (const part of parts) {
    const trimmed = part.trim();
    const translated = await transliterateChunk(trimmed);
    translatedParts.push(translated);
  }

  return translatedParts.join(", ");
}

// Example usage
async function convert() {
  const input = "Satya, Dharma, Shanti, Prema, Ahimsa";
  const output = await transliterateFullText(input);
  console.log(output);
}

convert();

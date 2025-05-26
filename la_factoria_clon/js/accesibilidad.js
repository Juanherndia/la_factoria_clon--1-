let fontSize = 100;
const html = document.documentElement;

document.getElementById("aumentar-texto").onclick = function () {
  if (fontSize < 180) fontSize += 10;
  html.style.fontSize = fontSize + "%";
};

document.getElementById("disminuir-texto").onclick = function () {
  if (fontSize > 70) fontSize -= 10;
  html.style.fontSize = fontSize + "%";
};

document.getElementById("resetear-texto").onclick = function () {
  fontSize = 100;
  html.style.fontSize = "";
};

const paragraphs = document.getElementsByTagName("p");

if (paragraphs.lenght > 0) {
  const paragrahp = paragraphs[0];

  paragrahp.innerText = "Bienvenidos al bootcamp!";
}

if (paragraphs.length > 1) {
  const paragraph = paragraphs[1];
  const fecha = new Date();
  paragraph.innerText = "paragrafos en el documento: " + " (" + fecha + ")";
}

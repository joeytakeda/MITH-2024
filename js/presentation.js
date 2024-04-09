import Reveal from "./reveal/reveal.esm.js";
import Markdown from "./reveal/plugin/markdown/markdown.esm.js";
import Highlight from "./reveal/plugin/highlight/highlight.esm.js";

let infoDivs = document.querySelectorAll(
  "section[data-background-iframe] > div"
);

let slideySlides = document.querySelectorAll(
  "section[data-background-iframe], section[data-background-image]"
);

slideySlides.forEach((slide) => slide.setAttribute("data-transition", "slide"));
infoDivs.forEach((div) => {
  let closer = document.createElement("span");
  closer.classList.add("closer");
  closer.innerHTML = "&times;";
  div.appendChild(closer);
  closer.addEventListener("click", (e) => {
    closer.parentNode.classList.add("hidden");
  });
});

document.querySelectorAll("section a").forEach((a) => {
  a.setAttribute("target", "_blank");
  a.setAttribute("ref", "noopener noreferrer");
  a.innerHTML = formatUrl(a.textContent);
});

let open;
document.querySelectorAll(".big-list > p").forEach((p) => {
  p.addEventListener("click", (e) => {
    if (!p.classList.contains("open")) {
      if (open) {
        open.classList.remove("p");
      }
      p.classList.add("open");
      open = p;
    } else {
      p.classList.remove("open");
      open = null;
    }
  });
});

document.querySelectorAll(".fragmented > *").forEach((el) => {
  console.log(el);
  el.classList.add("fragment");
});

document.querySelectorAll(".animated").forEach((el) => {
  return (el.dataset.autoAnimate = 1);
});

let deck = new Reveal({
  plugins: [Highlight],
});

deck.initialize({
  hash: true,
  maxScale: 2,
  center: true,
  transition: "none",
});

/**
 * Insert line break opportunities into a URL
 */
function formatUrl(url) {
  // Split the URL into an array to distinguish double slashes from single slashes
  const doubleSlash = url.split("//");
  // Format the strings on either side of double slashes separately
  const formatted = doubleSlash
    .map(
      (str) =>
        // Insert a word break opportunity after a colon
        str
          .replace(/(:)/giu, "$1<wbr>")
          // Before a single slash, tilde, period, comma, hyphen, underline, question mark, number sign, or percent symbol
          .replace(/([/~.,\-_?#%])/giu, "<wbr>$1")
          // Before and after an equals sign or ampersand
          .replace(/([=&])/giu, "<wbr>$1<wbr>")
      // Reconnect the strings with word break opportunities after double slashes
    )
    .join("//<wbr>");

  return formatted;
}

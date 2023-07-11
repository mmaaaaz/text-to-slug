const input = document.querySelector("#rawText");
const output = document.querySelector("#sluggedText");
const copyToClipboard = document.querySelector("#copyToClipboard");

input.addEventListener("input", () => (output.value = slugify(input.value)));
copyToClipboard.addEventListener("click", copyOutputToClipboard);

function copyOutputToClipboard() {
  if (output.value.length === 0) return;
  if (input.value === output.value) return;

  copyToClipboard.innerHTML = "Copied to Clipboard!";

  navigator.clipboard.writeText(output.value).then(() => {
    setTimeout(() => {
      copyToClipboard.innerHTML = "Copy to Clipboard";
    }, 1000);
  });
}

const slugify = (text) =>
  replaceAccentedCharacters(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const replaceAccentedCharacters = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const getElement = (id) => document.querySelector(id);
const input = getElement("#rawText");
const output = getElement("#sluggedText");
const separator = getElement("#separator");
const clearInput = getElement("#clearInput");
const copyToClipboard = getElement("#copyToClipboard");

const updateOutput = () => (output.value = slugify(input.value));

const clearInputValues = () => {
  input.value = output.value = "";
  input.focus();
};

const replaceAccentedCharacters = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const slugify = (text) =>
  replaceAccentedCharacters(text)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, separator.value)
    .replace(/(^-|-$)+/g, "");

const copyTextToClipboard = () => {
  if (output.value.length === 0) return;

  copyToClipboard.innerHTML = "Copied to Clipboard!";
  copyToClipboard.disabled = true;

  navigator.clipboard.writeText(output.value);

  setTimeout(() => {
    copyToClipboard.innerHTML = "Copy to Clipboard";
    copyToClipboard.disabled = false;
  }, 400);
};

input.addEventListener("input", updateOutput);
separator.addEventListener("input", () => {
  updateOutput();
  input.focus();
});
clearInput.addEventListener("click", clearInputValues);
copyToClipboard.addEventListener("click", copyTextToClipboard);

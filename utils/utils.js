export function html(strings, ...variables) {
  let html = strings[0];
  for (let i = 1; i < strings.length; i++) {
    html += variables[i - 1];
    html += strings[i];
  }

  return html;
}

export function htmlEscape(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

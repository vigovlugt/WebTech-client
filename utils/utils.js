export function html(strings, ...variables) {
  let html = strings[0];
  for (let i = 1; i < strings.length; i++) {
    html += variables[i - 1];
    html += strings[i];
  }

  return html;
}

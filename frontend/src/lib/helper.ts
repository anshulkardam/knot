export function generateTitleFromUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    const domain = hostname.replace("www.", "");
    const name = domain.split(".")[0];

    return `${name.charAt(0).toUpperCase() + name.slice(1)} link`;
  } catch {
    return "Short link";
  }
}

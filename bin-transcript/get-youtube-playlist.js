(() => {
  const playlistId = new URL(location.href).searchParams.get("list");

  const nodes = [...document.querySelectorAll("ytd-playlist-panel-video-renderer")];
  const seen = new Set();
  const items = [];

  nodes.forEach((node) => {
    const a = node.querySelector("a.yt-simple-endpoint");
    if (!a) return;

    const url = a.href || new URL(a.getAttribute("href"), location.origin).href;
    if (!url.includes("watch?v=")) return;

    if (playlistId && new URL(url).searchParams.get("list") !== playlistId) return;

    const idxEl = node.querySelector("#index");
    const idx = Number((idxEl?.textContent || "").match(/\d+/)?.[0] || (items.length + 1));

    const key = url;
    if (seen.has(key)) return;
    seen.add(key);

    items.push({ index: idx, url });
  });

  items.sort((a, b) => a.index - b.index);

  console.log("count:", items.length);
  return items;
})();
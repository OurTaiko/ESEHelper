/**
 * 加载本地alias.json文件
 * @returns {Promise<Object>} alias配置对象
 */
export async function loadAlias() {
  const res = await fetch('./alias.json');
  if (!res.ok) throw new Error('Failed to load alias.json');
  return await res.json();
}

/**
 * 递归获取指定路径下的所有文件
 * @param {string} basePath 基础路径
 * @returns {Promise<Array>} 文件列表数组
 */
export async function getFilesFromPath(basePath) {
  const baseURL = 'https://ghproxy.vanillaaaa.org/https://ese.tjadataba.se/api/v1/repos/ese/ese/contents';
  const files = [];

  async function fetchDirectoryContents(path) {
    const url = `${baseURL}/${encodeURIComponent(path)}`;

    const res = await fetch(url, {
      headers: { 'accept': 'application/json' }
    });
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);

    const contents = await res.json();

    for (const item of contents) {
      if (item.type === 'file') {
        const relativePath = path === basePath ? item.name : `${path.substring(basePath.length + 1)}/${item.name}`;
        files.push({
          name: item.name,
          path: relativePath,
          fullPath: `${path}/${item.name}`
        });
      } else if (item.type === 'dir') {
        const subPath = `${path}/${item.name}`;
        await fetchDirectoryContents(subPath);
      }
    }
  }

  await fetchDirectoryContents(basePath);
  return files;
}

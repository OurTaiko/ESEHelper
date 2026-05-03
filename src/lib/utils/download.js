import JSZip from 'jszip';
import { getFilesFromPath } from './api.js';

/**
 * 通过alias动态获取文件并下载打包
 * @param {string} selectedKey 选中的键名
 * @param {Object} alias alias配置对象
 * @param {Function} updateStatus 状态更新回调
 * @param {Function} t 翻译函数
 * @param {Function} formatFilesPackaged 文件计数格式化函数
 */
export async function downloadFilesFromStructure(selectedKey, alias, updateStatus, t, formatFilesPackaged) {
  const zip = new JSZip();
  const ref = 'master';
  const basePath = alias[selectedKey].path;

  let files;
  try {
    updateStatus(t('fetchingFileList'));
    files = await getFilesFromPath(basePath);
  } catch (e) {
    throw new Error(`${t('fetchFileListFailed')} ${e.message}`);
  }

  if (!files || files.length === 0) {
    updateStatus(t('noResults') + ' (⊙_⊙)？');
    return;
  } else {
    updateStatus(t('fetchFilesSuccess'));
  }

  const baseURL = 'https://ghproxy.vanillaaaa.org/https://ese.tjadataba.se/ese/ese/raw/branch';

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileUrl = `${baseURL}/${ref}/${file.fullPath}`;
    try {
      updateStatus(`${t('downloading')} (${i + 1}/${files.length}): ${file.path} (◕‿◕)`);
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`${t('downloadError')}: ${res.status}`);
      const blob = await res.blob();
      zip.file(file.path, blob, { binary: true });
    } catch (e) {
      updateStatus(`${t('downloadError')} ${file.path}, ${t('errorLabel')} ${e.message} (；一_一)`);
      return;
    }
  }

  updateStatus(t('generatingZip'));
  const content = await zip.generateAsync({ type: 'blob' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(content);
  a.download = `${selectedKey}.zip`;
  a.click();

  updateStatus(`${t('downloadComplete')} ${formatFilesPackaged(files.length)} (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧`);
}

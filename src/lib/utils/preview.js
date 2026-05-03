import JSZip from 'jszip';
import { getFilesFromPath } from './api.js';

/**
 * 发送预览包到选中的预览工具
 * @param {string} selectedKey 选中的键名
 * @param {Object} alias alias配置对象
 * @param {Function} showChoice 显示选择对话框的函数
 * @param {Function} t 翻译函数
 * @param {Function} updateStatus 状态更新回调
 */
export async function sendPreview(selectedKey, alias, showChoice, t, updateStatus) {
  try {
    const choice = await showChoice({
      title: t('selectPreviewToolTitle'),
      message: t('selectPreviewToolMessage'),
      choices: [
        { text: 'TJA-Viewer', value: 'viewer' },
        { text: 'TJA-Tools', value: 'tools' }
      ],
      type: 'info'
    });

    if (!choice) {
      return;
    }

    updateStatus(t('startGeneratingPreviewZip'));

    const ref = 'master';
    const basePath = alias[selectedKey].path;
    const files = await getFilesFromPath(basePath);
    if (!files || files.length === 0) {
      updateStatus(t('noResults') + ' (⊙_⊙)？');
      return;
    }
    const baseURL = 'https://ghproxy.vanillaaaa.org/https://ese.tjadataba.se/ese/ese/raw/branch';
    const zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileUrl = `${baseURL}/${ref}/${file.fullPath}`;
      const res = await fetch(fileUrl);
      if (!res.ok) throw new Error(`${t('downloadError')}: ${res.status}`);
      const blob = await res.blob();
      zip.file(file.path, blob, { binary: true });
    }
    updateStatus('正在打包并发送...');
    const content = await zip.generateAsync({ type: 'blob' });

    let targetUrl;
    if (choice === 'viewer') {
      targetUrl = 'https://viewer.taiko.vanillaaaa.org';
    } else if (choice === 'tools') {
      targetUrl = 'https://tools.taiko.vanillaaaa.org/';
    }

    const win = window.open(targetUrl, '_blank');
    const sendZip = () => {
      win.postMessage({ type: 'zip', blob: content }, '*');
    };
    let tryCount = 0;
    const trySend = () => {
      if (win && win.postMessage) {
        sendZip();
      } else if (tryCount < 10) {
        tryCount++;
        setTimeout(trySend, 500);
      }
    };
    setTimeout(trySend, 1000);
    updateStatus('预览包已发送，切换到新标签页查看。');
  } catch (e) {
    updateStatus('预览失败: ' + e.message);
  }
}

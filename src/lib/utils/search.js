import { pinyin } from 'pinyin';
import * as wanakana from 'wanakana';

const searchCache = {
  pinyin: new Map(),
  romaji: new Map(),
  normalized: new Map()
};

/**
 * 标准化文本：去除空格、符号，转换为小写，并使用缓存
 */
export function normalizeText(text) {
  if (searchCache.normalized.has(text)) {
    return searchCache.normalized.get(text);
  }

  const result = text
    .toLowerCase()
    .replace(/[\s\-_./\\()[\]{}'"!@#$%^&*+=;:,<>?|~`]/g, '')
    .replace(/[ー]/g, '')
    .trim();

  searchCache.normalized.set(text, result);
  return result;
}

/**
 * 将中文转换为拼音，使用缓存提高性能
 */
export function toPinyin(text) {
  if (searchCache.pinyin.has(text)) {
    return searchCache.pinyin.get(text);
  }

  try {
    const result = pinyin(text, {
      style: 'NORMAL',
      segment: true
    }).flat().join('').toLowerCase();

    searchCache.pinyin.set(text, result);
    return result;
  } catch (_e) {
    searchCache.pinyin.set(text, '');
    return '';
  }
}

/**
 * 将日文转换为罗马音，使用缓存提高性能
 */
export function toRomaji(text) {
  if (searchCache.romaji.has(text)) {
    return searchCache.romaji.get(text);
  }

  try {
    const result = wanakana.toRomaji(text);
    const normalized = normalizeText(result);
    searchCache.romaji.set(text, normalized);
    return normalized;
  } catch (_e) {
    searchCache.romaji.set(text, '');
    return '';
  }
}

/**
 * 将日文平假名转换为片假名，或片假名转换为平假名
 */
export function convertKana(text) {
  const toKatakana = text.replace(/[\u3041-\u3096]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
  const toHiragana = text.replace(/[\u30a1-\u30f6]/g, function (match) {
    return String.fromCharCode(match.charCodeAt(0) - 0x60);
  });
  return { toKatakana, toHiragana };
}

/**
 * 生成文本的所有可能搜索词（标准化、拼音、罗马音、假名转换）
 */
export function generateSearchTerms(text) {
  const terms = new Set();

  const normalized = normalizeText(text);
  if (normalized) terms.add(normalized);

  const pinyinText = toPinyin(text);
  if (pinyinText) terms.add(pinyinText);

  const romajiText = toRomaji(text);
  if (romajiText) terms.add(romajiText);

  const kanaConversions = convertKana(text);
  const normalizedKatakana = normalizeText(kanaConversions.toKatakana);
  const normalizedHiragana = normalizeText(kanaConversions.toHiragana);
  if (normalizedKatakana) terms.add(normalizedKatakana);
  if (normalizedHiragana) terms.add(normalizedHiragana);

  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(text)) {
    const katakanaRomaji = toRomaji(kanaConversions.toKatakana);
    const hiraganaRomaji = toRomaji(kanaConversions.toHiragana);
    if (katakanaRomaji) terms.add(katakanaRomaji);
    if (hiraganaRomaji) terms.add(hiraganaRomaji);
  }

  return Array.from(terms).filter(term => term.length > 0);
}

/**
 * 智能匹配函数，支持多语言搜索
 */
export function smartMatch(query, target, alias) {
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return false;

  const queryTerms = generateSearchTerms(query);

  const allTargets = [target, ...alias];
  const allTargetTerms = allTargets.map(t => generateSearchTerms(t)).flat();

  for (const queryTerm of queryTerms) {
    for (const targetTerm of allTargetTerms) {
      if (targetTerm.includes(queryTerm)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * 根据查询字符串过滤匹配的键名
 */
export function filterKeys(query, alias) {
  const q = query.trim();
  if (!q) return [];

  const entries = Object.entries(alias);

  const matchedKeys = [];
  for (const [key, val] of entries) {
    if (smartMatch(q, key, val.alias)) {
      matchedKeys.push(key);
    }
  }

  return matchedKeys;
}

// 多语言配置
const translations = {
  'zh-CN': {
    // 页面标题和元信息
    title: 'ESEHelper',

    // 页面头部
    githubTitle: '查看项目源码',
    headerTitle: 'ESEHelper',

    // 主要内容
    searchPlaceholder: '输入搜索关键字',
    startDownload: '开始下载',
    previewBtn: '预览谱面',
    startGeneratingPreviewZip: '正在生成预览包……',

    // 状态信息
    greeting: '你好~ (*・ω・)ﾉ',
    loadingAlias: '加载 alias.json 失败啦 (；´д｀)ゞ',
    searching: '搜索中...',
    downloading: '下载中...',
    downloadComplete: '下载完成！',
    downloadError: '下载失败！',
    noResults: '没有找到相关结果，请重试',
    fetchFilesSuccess: '获取文件列表成功！',

    // 初始化和加载相关
    loadingJSZip: '加载压缩库 JSZip 中...... (。-`ω´-)',
    jsZipInitFailed: '初始化失败：无法加载压缩库 JSZip。请检查网络或刷新页面。 (；へ：)',
    loadingDataFiles: '加载数据文件中...... (。-`ω´-)',
    loadDataFilesFailed: '加载数据文件失败:',
    loadingCompleted: '加载完成！ (＾▽＾)',

    // 文件操作相关
    fetchingFileList: '正在获取文件列表...',
    fetchFileListFailed: '获取文件列表失败:',
    generatingZip: '正在生成压缩包... (￣ω￣;)',
    filesPackaged: '个文件打包',
    filesPackagedPrefix: '共',
    errorLabel: '错误:',

    // 页脚
    footerText: '非官方项目，仅供学习交流。',

    // Discord 社区
    discordCommunityTitle: '加入我们的 Discord 社区',
    discordCommunityDesc: '与其他玩家交流讨论，获取最新资讯，分享游戏心得',
    discordCommunityBtn: 'Discord 社区',

    // 语言切换
    languageSwitch: '切换语言',

    // 主题切换
    toggleTheme: '切换主题',
    autoTheme: '自动',
    themeSettings: '主题设置',
    currentTheme: '当前主题',
    lightTheme: '浅色模式',
    darkTheme: '深色模式',
    autoThemeDay: '自动选择 (白天)',
    autoThemeNight: '自动选择 (夜晚)',

    // 对话框
    selectPreviewToolTitle: '选择预览工具',
    selectPreviewToolMessage: '请选择使用哪个工具来预览谱面：',
    deleteConfirmTitle: '删除确认',
    deleteConfirmMessage: '确定要删除这个API配置吗？',
    confirmText: '确认',
    cancelText: '取消',

    // 设置
    settingsTitle: '设置'
  },

  'en': {
    // 页面标题和元信息
    title: 'ESEHelper',

    // 页面头部
    githubTitle: 'View source code',
    headerTitle: 'ESEHelper',

    // 主要内容
    searchPlaceholder: 'Enter search keywords',
    startDownload: 'Start Download',
    previewBtn: 'Preview Chart',
    startGeneratingPreviewZip: 'Start Generating Preview Zip',

    // 状态信息
    greeting: 'Hello~ (*・ω・)ﾉ',
    loadingAlias: 'Failed to load alias.json (；´д｀)ゞ',
    searching: 'Searching...',
    downloading: 'Downloading...',
    downloadComplete: 'Download completed!',
    downloadError: 'Download failed!',
    noResults: 'No results found, please try again',
    fetchFilesSuccess: 'File list fetched successfully!',

    // 初始化和加载相关
    loadingJSZip: 'Loading JSZip library... (。-`ω´-)',
    jsZipInitFailed: 'Initialization failed: Unable to load JSZip library. Please check your network or refresh the page. (；へ：)',
    loadingDataFiles: 'Loading data files... (。-`ω´-)',
    loadDataFilesFailed: 'Failed to load data files:',
    loadingCompleted: 'Loading completed! (＾▽＾)',

    // 文件操作相关
    fetchingFileList: 'Fetching file list...',
    fetchFileListFailed: 'Failed to fetch file list:',
    generatingZip: 'Generating zip file... (￣ω￣;)',
    filesPackaged: 'files packaged',
    filesPackagedPrefix: '',
    errorLabel: 'Error:',

    // 页脚
    footerText: 'Unofficial project, for learning and communication only.',

    // Discord 社区
    discordCommunityTitle: 'Join Our Discord Community',
    discordCommunityDesc: 'Chat with other players, get latest updates, and share your gaming experiences',
    discordCommunityBtn: 'Discord Community',

    // 语言切换
    languageSwitch: 'Switch Language',

    // 主题切换
    toggleTheme: 'Toggle Theme',
    autoTheme: 'Auto',
    themeSettings: 'Theme Settings',
    currentTheme: 'Current Theme',
    lightTheme: 'Light Mode',
    darkTheme: 'Dark Mode',
    autoThemeDay: 'Auto (Day)',
    autoThemeNight: 'Auto (Night)',

    // 对话框
    selectPreviewToolTitle: 'Select Preview Tool',
    selectPreviewToolMessage: 'Please select which tool to use for previewing the chart:',
    deleteConfirmTitle: 'Delete Confirmation',
    deleteConfirmMessage: 'Are you sure you want to delete this API configuration?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',

    // 设置
    settingsTitle: 'Settings'
  },

  'ja': {
    // 页面标题和元信息
    title: 'ESEHelper',

    // 页面头部
    githubTitle: 'ソースコードを見る',
    headerTitle: 'ESEHelper',

    // 主要内容
    searchPlaceholder: '検索キーワードを入力',
    startDownload: 'ダウンロード開始',
    previewBtn: '譜面プレビュー',
    startGeneratingPreviewZip: 'プレビューZIPを生成中……',

    // 状态信息
    greeting: 'こんにちは~ (*・ω・)ﾉ',
    loadingAlias: 'alias.jsonの読み込みに失敗しました (；´д｀)ゞ',
    searching: '検索中...',
    downloading: 'ダウンロード中...',
    downloadComplete: 'ダウンロード完了！',
    downloadError: 'ダウンロード失敗！',
    noResults: '関連する結果が見つかりません。もう一度お試しください',
    fetchFilesSuccess: 'ファイルリストの取得に成功しました！',

    // 初始化和加载相关
    loadingJSZip: '圧縮ライブラリJSZipを読み込み中... (。-`ω´-)',
    jsZipInitFailed: '初期化に失敗：圧縮ライブラリJSZipを読み込めませんでした。ネットワークを確認するかページを更新してください。 (；へ：)',
    loadingDataFiles: 'データファイルを読み込み中... (。-`ω´-)',
    loadDataFilesFailed: 'データファイルの読み込みに失敗：',
    loadingCompleted: '読み込み完了！ (＾▽＾)',

    // 文件操作相关
    fetchingFileList: 'ファイルリストを取得中...',
    fetchFileListFailed: 'ファイルリストの取得に失敗：',
    generatingZip: 'ZIPファイルを生成中... (￣ω￣;)',
    filesPackaged: 'ファイルをパッケージ化',
    filesPackagedPrefix: '合計',
    errorLabel: 'エラー：',

    // 页脚
    footerText: '非公式プロジェクトです。学習・交流目的のみ。',

    // Discord 社区
    discordCommunityTitle: 'Discordコミュニティに参加',
    discordCommunityDesc: '他のプレイヤーと交流し、最新情報を入手し、ゲーム体験を共有しましょう',
    discordCommunityBtn: 'Discordコミュニティ',

    // 语言切换
    languageSwitch: '言語切り替え',

    // 主题切换
    toggleTheme: 'テーマ切り替え',
    autoTheme: '自動',
    themeSettings: 'テーマ設定',
    currentTheme: '現在のテーマ',
    lightTheme: 'ライトモード',
    darkTheme: 'ダークモード',
    autoThemeDay: '自動選択（昼間）',
    autoThemeNight: '自動選択（夜間）',

    // 对话框
    selectPreviewToolTitle: 'プレビューツールを選択',
    selectPreviewToolMessage: '譜面をプレビューするツールを選択してください：',
    deleteConfirmTitle: '削除確認',
    deleteConfirmMessage: 'このAPI設定を削除してもよろしいですか？',
    confirmText: '確認',
    cancelText: 'キャンセル',

    // 设置
    settingsTitle: '設定'
  }
};

export default translations;

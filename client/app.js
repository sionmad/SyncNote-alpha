const notesInput = document.getElementById('notesInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const output = document.getElementById('output');
const summaryText = document.getElementById('summaryText');
const actionItems = document.getElementById('actionItems');
const emailDraft = document.getElementById('emailDraft');
const statusEl = document.getElementById('status');
const languageSelect = document.getElementById('languageSelect');

const subtitle = document.getElementById('subtitle');
const languageLabel = document.getElementById('languageLabel');
const notesLabel = document.getElementById('notesLabel');
const summaryTitle = document.getElementById('summaryTitle');
const actionItemsTitle = document.getElementById('actionItemsTitle');
const emailDraftTitle = document.getElementById('emailDraftTitle');

const UI_TEXT = {
  en: {
    direction: 'ltr',
    subtitle: 'Turn meeting notes into summaries, action items, and email drafts.',
    languageLabel: 'Output Language',
    notesLabel: 'Meeting Notes',
    notesPlaceholder: 'Paste your meeting notes here...',
    analyzeButton: 'Analyze Notes',
    analyzingButton: 'Analyzing...',
    summaryTitle: 'Summary',
    actionItemsTitle: 'Action Items',
    emailDraftTitle: 'Email Draft',
    statusEmpty: 'Please enter meeting notes before analyzing.',
    statusErrorPrefix: 'Error',
    noActionItems: 'No action items found.',
  },
  ja: {
    direction: 'ltr',
    subtitle: '会議メモを要約、アクション項目、メール下書きに変換します。',
    languageLabel: '出力言語',
    notesLabel: '会議メモ',
    notesPlaceholder: '会議メモをここに貼り付けてください...',
    analyzeButton: 'メモを解析',
    analyzingButton: '解析中...',
    summaryTitle: '要約',
    actionItemsTitle: 'アクション項目',
    emailDraftTitle: 'メール下書き',
    statusEmpty: '解析する前に会議メモを入力してください。',
    statusErrorPrefix: 'エラー',
    noActionItems: 'アクション項目は見つかりませんでした。',
  },
  zh: {
    direction: 'ltr',
    subtitle: '将会议记录转换为摘要、行动项和邮件草稿。',
    languageLabel: '输出语言',
    notesLabel: '会议记录',
    notesPlaceholder: '请在这里粘贴会议记录...',
    analyzeButton: '开始分析',
    analyzingButton: '分析中...',
    summaryTitle: '摘要',
    actionItemsTitle: '行动项',
    emailDraftTitle: '邮件草稿',
    statusEmpty: '请先输入会议记录再进行分析。',
    statusErrorPrefix: '错误',
    noActionItems: '未找到行动项。',
  },
  ko: {
    direction: 'ltr',
    subtitle: '회의 노트를 요약, 실행 항목, 이메일 초안으로 변환합니다.',
    languageLabel: '출력 언어',
    notesLabel: '회의 노트',
    notesPlaceholder: '회의 노트를 여기에 붙여 넣으세요...',
    analyzeButton: '노트 분석',
    analyzingButton: '분석 중...',
    summaryTitle: '요약',
    actionItemsTitle: '실행 항목',
    emailDraftTitle: '이메일 초안',
    statusEmpty: '분석 전에 회의 노트를 입력해 주세요.',
    statusErrorPrefix: '오류',
    noActionItems: '실행 항목이 없습니다.',
  },
  es: {
    direction: 'ltr',
    subtitle: 'Convierte notas de reunión en resumen, acciones y borrador de correo.',
    languageLabel: 'Idioma de salida',
    notesLabel: 'Notas de la reunión',
    notesPlaceholder: 'Pega aquí tus notas de la reunión...',
    analyzeButton: 'Analizar notas',
    analyzingButton: 'Analizando...',
    summaryTitle: 'Resumen',
    actionItemsTitle: 'Acciones',
    emailDraftTitle: 'Borrador de correo',
    statusEmpty: 'Ingresa notas de reunión antes de analizar.',
    statusErrorPrefix: 'Error',
    noActionItems: 'No se encontraron acciones.',
  },
  fr: {
    direction: 'ltr',
    subtitle: 'Transforme des notes de réunion en résumé, actions et brouillon d’email.',
    languageLabel: 'Langue de sortie',
    notesLabel: 'Notes de réunion',
    notesPlaceholder: 'Collez vos notes de réunion ici...',
    analyzeButton: 'Analyser les notes',
    analyzingButton: 'Analyse en cours...',
    summaryTitle: 'Résumé',
    actionItemsTitle: 'Actions',
    emailDraftTitle: 'Brouillon d’email',
    statusEmpty: 'Veuillez saisir des notes avant de lancer l’analyse.',
    statusErrorPrefix: 'Erreur',
    noActionItems: 'Aucune action trouvée.',
  },
  ar: {
    direction: 'rtl',
    subtitle: 'حوّل ملاحظات الاجتماع إلى ملخص وبنود عمل ومسودة بريد إلكتروني.',
    languageLabel: 'لغة المخرجات',
    notesLabel: 'ملاحظات الاجتماع',
    notesPlaceholder: 'الصق ملاحظات الاجتماع هنا...',
    analyzeButton: 'تحليل الملاحظات',
    analyzingButton: 'جارٍ التحليل...',
    summaryTitle: 'الملخص',
    actionItemsTitle: 'بنود العمل',
    emailDraftTitle: 'مسودة البريد',
    statusEmpty: 'يرجى إدخال ملاحظات الاجتماع قبل التحليل.',
    statusErrorPrefix: 'خطأ',
    noActionItems: 'لم يتم العثور على بنود عمل.',
  },
  hi: {
    direction: 'ltr',
    subtitle: 'मीटिंग नोट्स को सारांश, कार्य बिंदु और ईमेल ड्राफ्ट में बदलें।',
    languageLabel: 'आउटपुट भाषा',
    notesLabel: 'मीटिंग नोट्स',
    notesPlaceholder: 'अपने मीटिंग नोट्स यहां पेस्ट करें...',
    analyzeButton: 'नोट्स विश्लेषित करें',
    analyzingButton: 'विश्लेषण हो रहा है...',
    summaryTitle: 'सारांश',
    actionItemsTitle: 'कार्य बिंदु',
    emailDraftTitle: 'ईमेल ड्राफ्ट',
    statusEmpty: 'विश्लेषण से पहले मीटिंग नोट्स दर्ज करें।',
    statusErrorPrefix: 'त्रुटि',
    noActionItems: 'कोई कार्य बिंदु नहीं मिला।',
  },
  ru: {
    direction: 'ltr',
    subtitle: 'Преобразует заметки встречи в краткое резюме, действия и черновик письма.',
    languageLabel: 'Язык вывода',
    notesLabel: 'Заметки встречи',
    notesPlaceholder: 'Вставьте заметки встречи сюда...',
    analyzeButton: 'Анализировать',
    analyzingButton: 'Анализ...',
    summaryTitle: 'Кратко',
    actionItemsTitle: 'Пункты действий',
    emailDraftTitle: 'Черновик письма',
    statusEmpty: 'Введите заметки встречи перед анализом.',
    statusErrorPrefix: 'Ошибка',
    noActionItems: 'Пункты действий не найдены.',
  },
};

let currentLanguage = languageSelect.value || 'en';
let isAnalyzing = false;

function getUiText() {
  return UI_TEXT[currentLanguage] || UI_TEXT.en;
}

function applyLanguage(language) {
  if (!Object.prototype.hasOwnProperty.call(UI_TEXT, language)) {
    currentLanguage = 'en';
  } else {
    currentLanguage = language;
  }
  languageSelect.value = currentLanguage;

  const t = getUiText();
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = t.direction;

  subtitle.textContent = t.subtitle;
  languageLabel.textContent = t.languageLabel;
  notesLabel.textContent = t.notesLabel;
  notesInput.placeholder = t.notesPlaceholder;
  summaryTitle.textContent = t.summaryTitle;
  actionItemsTitle.textContent = t.actionItemsTitle;
  emailDraftTitle.textContent = t.emailDraftTitle;

  analyzeBtn.textContent = isAnalyzing ? t.analyzingButton : t.analyzeButton;
}

async function analyzeNotes() {
  const t = getUiText();
  const text = notesInput.value.trim();

  if (!text) {
    statusEl.textContent = t.statusEmpty;
    output.classList.add('hidden');
    return;
  }

  isAnalyzing = true;
  analyzeBtn.disabled = true;
  analyzeBtn.textContent = t.analyzingButton;
  statusEl.textContent = '';

  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language: currentLanguage,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Unknown server error.');
    }

    summaryText.textContent = data.summary || '';
    emailDraft.textContent = data.emailDraft || '';

    actionItems.innerHTML = '';
    if (Array.isArray(data.actionItems) && data.actionItems.length > 0) {
      data.actionItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        actionItems.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = t.noActionItems;
      actionItems.appendChild(li);
    }

    output.classList.remove('hidden');
  } catch (error) {
    statusEl.textContent = `${t.statusErrorPrefix}: ${error.message}`;
    output.classList.add('hidden');
  } finally {
    isAnalyzing = false;
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = getUiText().analyzeButton;
  }
}

languageSelect.addEventListener('change', (event) => {
  applyLanguage(event.target.value);
});

analyzeBtn.addEventListener('click', analyzeNotes);

applyLanguage(currentLanguage);

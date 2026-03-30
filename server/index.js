const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, '..', 'client')));

const LANGUAGE_CONFIGS = {
  en: {
    missingText: 'Please provide non-empty meeting notes in `text`.',
    noSummary: 'No summary could be generated from the provided notes.',
    defaultActionItems: [
      'Review the meeting notes and identify owners for each task.',
      'Set deadlines for the key follow-up items.',
      'Share updates with stakeholders before the next check-in.',
    ],
    email: {
      subject: 'Subject: Meeting Follow-up',
      greeting: 'Hi team,',
      intro: 'Thanks for the meeting. Here is a quick recap.',
      summaryLabel: 'Summary:',
      actionLabel: 'Action items:',
      closing: 'Please reply if anything should be adjusted.',
      signoff: 'Best,',
    },
  },
  ja: {
    missingText: '`text` に空でない会議メモを入力してください。',
    noSummary: '入力された会議メモから要約を作成できませんでした。',
    defaultActionItems: [
      '会議メモを見直し、各タスクの担当者を決めてください。',
      '重要なフォローアップ項目の期限を設定してください。',
      '次回の確認までに関係者へ進捗を共有してください。',
    ],
    email: {
      subject: '件名: 会議フォローアップ',
      greeting: 'チームのみなさん',
      intro: '会議への参加ありがとうございました。以下に要点をまとめます。',
      summaryLabel: '要約:',
      actionLabel: 'アクション項目:',
      closing: '修正が必要な点があれば返信してください。',
      signoff: 'よろしくお願いします。',
    },
  },
  zh: {
    missingText: '请在 `text` 中提供非空的会议记录。',
    noSummary: '无法从提供的会议记录中生成摘要。',
    defaultActionItems: [
      '回顾会议记录，并为每项任务明确负责人。',
      '为关键跟进行动设定截止日期。',
      '在下次同步前向相关方分享进展。',
    ],
    email: {
      subject: '主题：会议跟进',
      greeting: '各位好，',
      intro: '感谢参加会议。以下是简要回顾。',
      summaryLabel: '摘要：',
      actionLabel: '行动项：',
      closing: '如需调整，请直接回复。',
      signoff: '此致',
    },
  },
  ko: {
    missingText: '`text` 필드에 비어 있지 않은 회의 노트를 입력해 주세요.',
    noSummary: '입력된 회의 노트에서 요약을 생성할 수 없습니다.',
    defaultActionItems: [
      '회의 노트를 검토하고 각 작업의 담당자를 지정합니다.',
      '핵심 후속 작업의 마감일을 설정합니다.',
      '다음 체크인 전에 이해관계자에게 진행 상황을 공유합니다.',
    ],
    email: {
      subject: '제목: 회의 후속 정리',
      greeting: '안녕하세요, 팀 여러분.',
      intro: '회의에 참여해 주셔서 감사합니다. 아래에 간단히 정리했습니다.',
      summaryLabel: '요약:',
      actionLabel: '실행 항목:',
      closing: '수정이 필요하면 회신 부탁드립니다.',
      signoff: '감사합니다.',
    },
  },
  es: {
    missingText: 'Proporciona notas de reunión no vacías en `text`.',
    noSummary: 'No se pudo generar un resumen a partir de las notas proporcionadas.',
    defaultActionItems: [
      'Revisar las notas y asignar responsables para cada tarea.',
      'Definir fechas límite para los seguimientos clave.',
      'Compartir avances con las partes interesadas antes de la próxima revisión.',
    ],
    email: {
      subject: 'Asunto: Seguimiento de la reunión',
      greeting: 'Hola equipo,',
      intro: 'Gracias por la reunión. Aquí tienen un breve resumen.',
      summaryLabel: 'Resumen:',
      actionLabel: 'Acciones:',
      closing: 'Respondan si algo debe ajustarse.',
      signoff: 'Saludos,',
    },
  },
  fr: {
    missingText: 'Veuillez fournir des notes de réunion non vides dans `text`.',
    noSummary: 'Aucun résumé n’a pu être généré à partir des notes fournies.',
    defaultActionItems: [
      'Relire les notes et identifier un responsable pour chaque tâche.',
      'Définir des échéances pour les suivis prioritaires.',
      'Partager les avancées avec les parties prenantes avant le prochain point.',
    ],
    email: {
      subject: 'Objet : Suivi de réunion',
      greeting: 'Bonjour à toute l’équipe,',
      intro: 'Merci pour la réunion. Voici un bref récapitulatif.',
      summaryLabel: 'Résumé :',
      actionLabel: 'Actions :',
      closing: 'N’hésitez pas à répondre si quelque chose doit être ajusté.',
      signoff: 'Cordialement,',
    },
  },
  ar: {
    missingText: 'يرجى إدخال ملاحظات اجتماع غير فارغة في `text`.',
    noSummary: 'تعذر إنشاء ملخص من الملاحظات المقدمة.',
    defaultActionItems: [
      'مراجعة ملاحظات الاجتماع وتحديد المسؤول عن كل مهمة.',
      'تحديد مواعيد نهائية لبنود المتابعة المهمة.',
      'مشاركة التحديثات مع أصحاب المصلحة قبل الاجتماع القادم.',
    ],
    email: {
      subject: 'الموضوع: متابعة الاجتماع',
      greeting: 'مرحباً بالفريق،',
      intro: 'شكراً على الاجتماع. فيما يلي ملخص سريع.',
      summaryLabel: 'الملخص:',
      actionLabel: 'بنود العمل:',
      closing: 'يرجى الرد إذا كان هناك أي تعديل مطلوب.',
      signoff: 'مع التحية،',
    },
  },
  hi: {
    missingText: '`text` में खाली नहीं होने वाले मीटिंग नोट्स दें।',
    noSummary: 'दिए गए नोट्स से सारांश नहीं बनाया जा सका।',
    defaultActionItems: [
      'मीटिंग नोट्स की समीक्षा करें और हर कार्य का मालिक तय करें।',
      'मुख्य फॉलो-अप कार्यों की समय-सीमा निर्धारित करें।',
      'अगली समीक्षा से पहले हितधारकों के साथ अपडेट साझा करें।',
    ],
    email: {
      subject: 'विषय: मीटिंग फॉलो-अप',
      greeting: 'नमस्ते टीम,',
      intro: 'मीटिंग के लिए धन्यवाद। नीचे संक्षिप्त सारांश है।',
      summaryLabel: 'सारांश:',
      actionLabel: 'कार्य बिंदु:',
      closing: 'यदि किसी बदलाव की आवश्यकता हो तो कृपया जवाब दें।',
      signoff: 'सादर,',
    },
  },
  ru: {
    missingText: 'Передайте непустые заметки встречи в поле `text`.',
    noSummary: 'Не удалось сформировать краткое резюме по переданным заметкам.',
    defaultActionItems: [
      'Просмотреть заметки встречи и назначить ответственных по задачам.',
      'Определить сроки для ключевых пунктов follow-up.',
      'Поделиться обновлениями со стейкхолдерами до следующей встречи.',
    ],
    email: {
      subject: 'Тема: Итоги встречи',
      greeting: 'Здравствуйте, команда.',
      intro: 'Спасибо за встречу. Ниже краткое резюме.',
      summaryLabel: 'Кратко:',
      actionLabel: 'Пункты действий:',
      closing: 'Ответьте, если нужно что-то скорректировать.',
      signoff: 'С уважением,',
    },
  },
};

function getLanguage(inputLanguage) {
  if (typeof inputLanguage !== 'string') return 'en';
  const code = inputLanguage.trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(LANGUAGE_CONFIGS, code) ? code : 'en';
}

function normalizeWhitespace(text) {
  return text
    .replace(/\r/g, '\n')
    .replace(/\t/g, ' ')
    .replace(/[ ]{2,}/g, ' ')
    .trim();
}

function splitIntoLines(text) {
  return text
    .replace(/\r/g, '\n')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function splitIntoSentences(text) {
  const normalized = normalizeWhitespace(text).replace(/\n+/g, ' ');
  if (!normalized) return [];

  return normalized
    .split(/(?<=[.!?\u3002\uff01\uff1f])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function buildSummary(text, lines, languageConfig) {
  const sentences = splitIntoSentences(text);
  const source = sentences.length > 0 ? sentences.slice(0, 2).join(' ') : lines.slice(0, 2).join(' ');

  if (!source) return languageConfig.noSummary;
  if (source.length <= 420) return source;
  return `${source.slice(0, 417)}...`;
}

function extractActionItems(lines, languageConfig) {
  const actionHints = [
    /(?:^|\b)(will|should|need to|todo|to-do|action|follow up|follow-up|next step|assign|owner|deadline|due)\b/i,
    /(?:\u5bfe\u5fdc|\u62c5\u5f53|\u671f\u9650|\u307e\u3067\u306b|\u6b21\u56de|\u30d5\u30a9\u30ed\u30fc)/u,
    /(?:\u5e94\u8be5|\u9700\u8981|\u622a\u6b62|\u8d1f\u8d23|\u8ddf\u8fdb|\u884c\u52a8\u9879)/u,
    /(?:\ud544\uc694|\ub2f4\ub2f9|\uae30\ud55c|\ucd94\uc801|\uc870\uce58)/u,
    /(?:\u062a\u0627\u0628\u0639|\u0645\u0633\u0624\u0648\u0644|\u0645\u0647\u0644\u0629|\u0625\u062c\u0631\u0627\u0621)/u,
    /(?:\u0915\u093e\u0930\u094d\u092f|\u0915\u093e\u0930\u094d\u092f\u0935\u093e\u0939\u0940|\u0905\u0902\u0924\u093f\u092e \u0924\u093f\u0925\u093f|\u091c\u093f\u092e\u094d\u092e\u0947\u0926\u093e\u0930)/u,
    /(?:\u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435|\u0437\u0430\u0434\u0430\u0447\u0430|\u0441\u0440\u043e\u043a|\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d)/u,
    /\b(review|prepare|send|share|finalize|confirm|update|create|draft|schedule|check)\b/i,
  ];

  const collected = [];
  const units = [];

  for (const line of lines) {
    const lineSentences = splitIntoSentences(line);
    if (lineSentences.length > 1) {
      units.push(...lineSentences);
    } else {
      units.push(line);
    }
  }

  for (const original of units) {
    const trimmed = original.trim();
    if (!trimmed) continue;

    let unit = trimmed.replace(/^\[(?: |x|X)\]\s+/, '').trim();
    const withoutBullet = unit.replace(/^(?:[-*•]|\d+[.)])\s+/, '').trim();
    const hadBullet = withoutBullet !== unit;
    unit = withoutBullet;

    if (!unit) continue;

    const hinted = actionHints.some((pattern) => pattern.test(unit));
    if (hadBullet || hinted) {
      collected.push(unit.replace(/\s+/g, ' '));
    }
  }

  const unique = [];
  const seen = new Set();
  for (const item of collected) {
    const key = item.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }

  if (unique.length > 0) return unique.slice(0, 5);
  return languageConfig.defaultActionItems;
}

function buildEmailDraft(summary, actionItems, languageConfig) {
  const numbered = actionItems.map((item, index) => `${index + 1}. ${item}`).join('\n');

  return `${languageConfig.email.subject}

${languageConfig.email.greeting}

${languageConfig.email.intro}

${languageConfig.email.summaryLabel}
${summary}

${languageConfig.email.actionLabel}
${numbered}

${languageConfig.email.closing}

${languageConfig.email.signoff}`;
}

/**
 * POST /analyze
 * Accepts a request body like: { text: "meeting notes...", language: "en" }
 * Returns: { language, summary, actionItems, emailDraft }
 */
app.post('/analyze', async (req, res) => {
  try {
    const language = getLanguage(req.body?.language);
    const languageConfig = LANGUAGE_CONFIGS[language];
    const { text } = req.body || {};

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: languageConfig.missingText });
    }

    const lines = splitIntoLines(text);
    const summary = buildSummary(text, lines, languageConfig);
    const actionItems = extractActionItems(lines, languageConfig);
    const emailDraft = buildEmailDraft(summary, actionItems, languageConfig);

    return res.json({
      language,
      summary,
      actionItems,
      emailDraft,
    });
  } catch (error) {
    console.error('Error in /analyze:', error);
    return res.status(500).json({ error: 'Failed to analyze notes. Please try again.' });
  }
});

// Serve the frontend entry point.
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Syncnote-alpha server running at http://localhost:${PORT}`);
});

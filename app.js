const STORAGE_KEY = 'math-assessments-v2';
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

const competencyText = {
  problem: [
    '주어진 조건과 정보를 분석하여 적절한 해결 전략을 탐색하고, 풀이 과정을 점검하며 타당한 결과를 도출하는 문제해결 역량이 돋보임',
    '수학의 개념과 원리를 문제 상황에 적절히 활용하고, 해결 방법을 끈기 있게 탐색하는 문제해결 역량을 보임'
  ],
  reasoning: [
    '관찰한 사실을 바탕으로 수학적 관계를 추측하고 논리적 근거를 들어 정당화하는 추론 역량이 돋보임',
    '개념과 원리를 체계적으로 연결하여 절차를 수행하고, 수학적 증거를 바탕으로 결론의 타당성을 판단함'
  ],
  communication: [
    '수학 용어와 기호, 식, 표, 그래프를 정확히 사용하여 자신의 아이디어와 해결 과정을 명료하게 설명함',
    '상황에 적절한 수학적 표현을 선택하고 표현 간 변환을 활용하여 풀이 과정과 결과를 효과적으로 전달함'
  ],
  connection: [
    '수학 개념 사이의 관련성을 파악하고 이를 실생활 및 다른 영역의 경험과 연결하여 해석하는 역량이 돋보임',
    '여러 수학적 개념과 원리를 연계해 새로운 관점으로 문제를 바라보고 수학의 유용성을 인식함'
  ],
  information: [
    '자료와 정보를 목적에 맞게 수집·변환·정리하고, 수학적 근거를 바탕으로 합리적인 결론을 도출함',
    '공학 도구를 적절히 활용하여 자료를 분석하고 결과의 의미를 정확하게 해석하는 정보처리 역량을 보임'
  ]
};

const levelText = {
  excellent: [
    '핵심 개념을 깊이 이해하고 새로운 상황에 확장하여 적용하는 탁월한 성취를 보임',
    '개념적 이해와 수행의 완성도가 매우 높으며 스스로 탐구를 확장하는 태도가 인상적임'
  ],
  good: [
    '핵심 개념을 정확히 이해하고 과제에 안정적으로 적용하여 우수한 성취를 보임',
    '학습한 원리를 충실히 활용하고 논리적인 과정을 통해 완성도 높은 결과를 도출함'
  ],
  steady: [
    '기본 개념을 바탕으로 주어진 과제를 성실히 수행하고 자신의 해결 과정을 표현함',
    '학습한 내용을 과제에 적절히 적용하며 안정적인 수행 능력을 보임'
  ],
  growth: [
    '피드백을 적극적으로 반영해 오류를 수정하고 수행의 완성도를 높이는 성장 과정을 보임',
    '어려운 부분을 꾸준히 보완하며 수학적 이해와 문제 해결 능력을 발전시킴'
  ]
};

const veteranCompetencyText = {
  problem: [
    '주어진 조건에서 핵심 정보를 가려내고 여러 해결 전략을 비교한 뒤 타당한 방법을 선택하여 결론을 도출하는 문제해결능력이 돋보임',
    '도전 과제에 끈기 있게 몰입하며 풀이 절차를 점검하고 오류를 수정하여 합리적인 해결 방안을 구체화함'
  ],
  reasoning: [
    '관찰한 규칙을 수학적으로 추론하고 추측의 근거를 논리적으로 입증하는 과정에서 사고의 깊이가 뚜렷하게 드러남',
    '개념과 원리의 관계를 체계적으로 조직하고 수학적 증거를 바탕으로 결론을 타당화하는 추론 역량이 우수함'
  ],
  communication: [
    '수학 용어와 기호, 식, 표, 그래프를 정확하게 사용하여 해결 과정과 결과를 구체적으로 설명하는 의사소통능력이 돋보임',
    '복잡한 수학적 아이디어를 이해하기 쉬운 표현으로 재구성하고 질문에 논리적으로 답하여 타인과의 소통을 이끌어냄'
  ],
  connection: [
    '서로 다른 수학 개념을 관계 짓고 수행 주제를 실생활 및 진로 맥락과 연결하여 해석하는 융합적 사고가 두드러짐',
    '교과에서 학습한 원리를 새로운 상황에 응용하여 수학의 활용 가능성을 구체적으로 보여주는 연결 역량이 돋보임'
  ],
  information: [
    '자료에서 중요 정보를 추출하고 목적에 맞게 분류·변환·도식화하여 타당한 결론을 도출하는 정보처리 역량이 우수함',
    '공학 도구를 적절히 활용해 자료를 분석하고 결과의 의미와 한계를 수학적 근거에 따라 해석함'
  ]
};

const veteranLevelText = {
  excellent: [
    '개념을 새로운 조건에 정확하게 응용하고 대안을 제시하는 모습에서 탁월한 수학적 통찰력과 성장잠재력이 드러남',
    '과제 수행 전반에서 논리적 사고와 자기주도성이 매우 두드러지며 결과의 완성도 또한 더할 나위 없이 우수함'
  ],
  good: [
    '핵심 개념을 정확하게 적용하고 풀이의 타당성을 점검하는 모습에서 우수한 성취 수준과 성실성이 뚜렷하게 드러남',
    '주어진 과제를 책임감 있게 수행하며 수학적 근거를 바탕으로 완성도 높은 결과를 도출함'
  ],
  steady: [
    '기본 개념을 과제에 적절히 적용하고 해결 과정을 단계적으로 작성하는 등 안정적인 성취 수준을 보임',
    '수업에서 다룬 원리와 절차를 충실히 활용하여 맡은 과제를 성실하게 수행함'
  ],
  growth: [
    '피드백을 수용하여 오류를 수정하고 해결 과정을 재정리하는 모습에서 뚜렷한 발전가능성과 끈기가 드러남',
    '어려운 부분을 질문과 재시도를 통해 보완하며 과제 수행의 정확성과 완성도를 꾸준히 높여가는 모습을 보임'
  ]
};

let assessments = loadAssessments();
let variant = 0;

function loadAssessments() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

function saveAssessments() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(assessments));
}

function exportAssessmentBackup() {
  if (!assessments.length) return showToast('내보낼 수행평가가 없습니다.');
  const backup = {
    app: '수학 수행평가 세특 메이커',
    version: 1,
    exportedAt: new Date().toISOString(),
    assessments
  };
  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const date = new Date().toLocaleDateString('sv-SE');
  link.href = url;
  link.download = `세특메이커_수행평가백업_${date}.json`;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast(`${assessments.length}개의 수행평가를 백업했습니다.`);
}

function normalizeImportedAssessment(item) {
  if (!item || typeof item !== 'object') return null;
  const name = typeof item.name === 'string' ? clean(item.name) : '';
  const subject = typeof item.subject === 'string' ? item.subject : '';
  const activity = typeof item.activity === 'string' ? clean(item.activity) : '';
  const validCodes = new Set((ACHIEVEMENT_STANDARDS[subject] || []).map(standard => standard.code));
  const standards = Array.isArray(item.standards)
    ? [...new Set(item.standards.filter(code => typeof code === 'string' && validCodes.has(code)))]
    : [];
  if (!name || !activity || !ACHIEVEMENT_STANDARDS[subject] || !standards.length) return null;
  return {
    id: typeof item.id === 'string' && item.id ? item.id : makeId(),
    name,
    subject,
    activity,
    standards,
    updatedAt: typeof item.updatedAt === 'string' ? item.updatedAt : new Date().toISOString()
  };
}

async function importAssessmentBackup(file) {
  if (!file) return;
  if (file.size > 2 * 1024 * 1024) return showToast('백업 파일은 2MB 이하만 불러올 수 있습니다.');
  try {
    const parsed = JSON.parse(await file.text());
    const source = Array.isArray(parsed) ? parsed : parsed?.assessments;
    if (!Array.isArray(source)) throw new Error('invalid-format');
    const imported = source.map(normalizeImportedAssessment).filter(Boolean);
    if (!imported.length) throw new Error('empty-backup');

    const merged = new Map(assessments.map(item => [item.id, item]));
    imported.forEach(item => merged.set(item.id, item));
    assessments = [...merged.values()].sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));
    saveAssessments();
    resetAssessmentForm();
    renderAssessmentList();
    renderAssessmentSelect(imported[0].id);
    showToast(`${imported.length}개의 수행평가를 불러왔습니다.`);
  } catch {
    showToast('올바른 수행평가 백업 파일이 아닙니다.');
  } finally {
    $('#backupFileInput').value = '';
  }
}

function makeId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function clean(text) {
  return text.trim().replace(/\s+/g, ' ').replace(/[.!?。]+$/, '');
}

function pick(list, offset = 0) {
  return list[(variant + offset) % list.length];
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
}

function switchView(name) {
  $$('.view').forEach(view => view.classList.toggle('active', view.id === `${name}View`));
  $$('.flow-step').forEach(step => step.classList.toggle('active', step.dataset.view === name));
  if (name === 'generate') renderAssessmentSelect();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

$$('.flow-step').forEach(button => button.addEventListener('click', () => switchView(button.dataset.view)));
$('#backToRegister').addEventListener('click', () => switchView('register'));

function renderStandards(subject, selectedCodes = []) {
  const list = $('#standardsList');
  list.replaceChildren();
  const standards = ACHIEVEMENT_STANDARDS[subject] || [];
  $('#standardsGuide').classList.toggle('hidden', standards.length > 0);
  $('#standardToolbar').classList.toggle('hidden', standards.length === 0);

  standards.forEach(standard => {
    const label = document.createElement('label');
    label.className = 'standard-item';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.value = standard.code;
    input.checked = selectedCodes.includes(standard.code);
    input.addEventListener('change', updateSelectedStandardCount);
    const text = document.createElement('span');
    const code = document.createElement('strong');
    code.textContent = `[${standard.code}] `;
    text.append(code, document.createTextNode(standard.text));
    label.append(input, text);
    list.append(label);
  });
  updateSelectedStandardCount();
}

function updateSelectedStandardCount() {
  const count = $$('#standardsList input:checked').length;
  $('#selectedStandardCount').textContent = `${count}개 선택`;
}

$('#assessmentSubject').addEventListener('change', event => renderStandards(event.target.value));
$('#selectAllStandards').addEventListener('click', () => {
  $$('#standardsList input').forEach(input => { input.checked = true; });
  updateSelectedStandardCount();
});
$('#clearStandards').addEventListener('click', () => {
  $$('#standardsList input').forEach(input => { input.checked = false; });
  updateSelectedStandardCount();
});

$('#assessmentForm').addEventListener('submit', event => {
  event.preventDefault();
  const standards = $$('#standardsList input:checked').map(input => input.value);
  if (!standards.length) return showToast('관련 성취기준을 하나 이상 선택해 주세요.');

  const data = {
    id: $('#editingId').value || makeId(),
    name: clean($('#assessmentName').value),
    subject: $('#assessmentSubject').value,
    activity: clean($('#assessmentActivity').value),
    standards,
    updatedAt: new Date().toISOString()
  };

  const index = assessments.findIndex(item => item.id === data.id);
  if (index >= 0) assessments[index] = data;
  else assessments.unshift(data);
  saveAssessments();
  resetAssessmentForm();
  renderAssessmentList();
  renderAssessmentSelect(data.id);
  showToast(index >= 0 ? '수행평가를 수정했습니다.' : '수행평가를 등록했습니다.');
});

function resetAssessmentForm() {
  $('#assessmentForm').reset();
  $('#editingId').value = '';
  $('#formTitle').textContent = '새 수행평가';
  $('#saveButtonText').textContent = '수행평가 등록하기';
  $('#cancelEdit').classList.add('hidden');
  renderStandards('');
}

$('#cancelEdit').addEventListener('click', resetAssessmentForm);
$('#exportAssessments').addEventListener('click', exportAssessmentBackup);
$('#importAssessments').addEventListener('click', () => $('#backupFileInput').click());
$('#backupFileInput').addEventListener('change', event => importAssessmentBackup(event.target.files[0]));

function editAssessment(id) {
  const item = assessments.find(assessment => assessment.id === id);
  if (!item) return;
  $('#editingId').value = item.id;
  $('#assessmentName').value = item.name;
  $('#assessmentSubject').value = item.subject;
  $('#assessmentActivity').value = item.activity;
  $('#formTitle').textContent = '수행평가 수정';
  $('#saveButtonText').textContent = '수정 내용 저장하기';
  $('#cancelEdit').classList.remove('hidden');
  renderStandards(item.subject, item.standards);
  window.scrollTo({ top: $('#assessmentForm').offsetTop - 20, behavior: 'smooth' });
}

function deleteAssessment(id) {
  const item = assessments.find(assessment => assessment.id === id);
  if (!item || !confirm(`‘${item.name}’ 수행평가를 삭제할까요?`)) return;
  assessments = assessments.filter(assessment => assessment.id !== id);
  saveAssessments();
  renderAssessmentList();
  renderAssessmentSelect();
  showToast('수행평가를 삭제했습니다.');
}

function renderAssessmentList() {
  const container = $('#assessmentList');
  container.replaceChildren();
  $('#assessmentCount').textContent = `등록 ${assessments.length}개`;
  if (!assessments.length) {
    const empty = document.createElement('div');
    empty.className = 'list-empty';
    empty.innerHTML = '<div>∅</div><p>아직 등록된 수행평가가 없습니다.<br>왼쪽 양식을 작성해 첫 평가를 등록해 보세요.</p>';
    container.append(empty);
    return;
  }

  assessments.forEach(item => {
    const card = document.createElement('article');
    card.className = 'assessment-card';
    const top = document.createElement('div');
    top.className = 'assessment-top';
    const info = document.createElement('div');
    const tag = document.createElement('span'); tag.className = 'subject-tag'; tag.textContent = item.subject;
    const title = document.createElement('h4'); title.textContent = item.name;
    info.append(tag, title);
    const menu = document.createElement('div'); menu.className = 'card-menu';
    const edit = document.createElement('button'); edit.type = 'button'; edit.title = '수정'; edit.textContent = '✎'; edit.addEventListener('click', () => editAssessment(item.id));
    const remove = document.createElement('button'); remove.type = 'button'; remove.title = '삭제'; remove.className = 'delete'; remove.textContent = '×'; remove.addEventListener('click', () => deleteAssessment(item.id));
    menu.append(edit, remove); top.append(info, menu);
    const activity = document.createElement('p'); activity.textContent = item.activity;
    const meta = document.createElement('span'); meta.className = 'assessment-meta'; meta.textContent = `성취기준 ${item.standards.length}개 연결`;
    const use = document.createElement('button'); use.type = 'button'; use.className = 'use-button'; use.textContent = '이 평가로 세특 만들기 →';
    use.addEventListener('click', () => { switchView('generate'); renderAssessmentSelect(item.id); });
    card.append(top, activity, meta, use);
    container.append(card);
  });
}

function renderAssessmentSelect(selectedId = '') {
  const select = $('#assessmentSelect');
  const previous = selectedId || select.value;
  select.replaceChildren(new Option('등록한 수행평가를 선택하세요', ''));
  assessments.forEach(item => select.add(new Option(`[${item.subject}] ${item.name}`, item.id)));
  if (assessments.some(item => item.id === previous)) select.value = previous;
  renderSelectedAssessment();
}

function renderSelectedAssessment() {
  const item = assessments.find(assessment => assessment.id === $('#assessmentSelect').value);
  const box = $('#selectedAssessment');
  const promptButton = $('#copyAssessmentPrompt');
  box.replaceChildren();
  box.classList.toggle('hidden', !item);
  promptButton.disabled = !item;
  if (!item) return;
  const title = document.createElement('strong'); title.textContent = `${item.subject} · ${item.name}`;
  const desc = document.createElement('p'); desc.textContent = `${item.activity}  |  성취기준 ${item.standards.length}개`;
  box.append(title, desc);
}

$('#assessmentSelect').addEventListener('change', renderSelectedAssessment);

function removeSubjectWords(text) {
  return text
    .replace(/성실한 학생임/g, '성실성이 돋보임')
    .replace(/학생임/g, '태도가 돋보임')
    .replace(/학생(?:은|는|이|가|의|을|를|에게)\s*/g, '')
    .replace(/학생\s+/g, '')
    .replace(/(?:그는|그가|그의)\s*/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function replaceInnerLanguage(text) {
  return text
    .replace(/([^.!?]+?[을를])\s*(?:깨닫게\s*됨|깨달았음|깨달음)/g, '$1 자신의 언어로 구체적으로 설명함')
    .replace(/([^.!?]+?[을를])\s*(?:알게\s*됨|알았음)/g, '$1 구체적으로 확인하여 기록함')
    .replace(/([^.!?]+?)에\s*관심을\s*갖게\s*됨/g, '$1에 관한 자료를 자발적으로 탐색함')
    .replace(/([^.!?]+?)(?:라고|다고)\s*(?:생각함|생각했음)/g, '$1라는 견해를 수학적 근거와 함께 표현함')
    .replace(/(?:깨닫게\s*됨|깨달았음|깨달음)/g, '관련 내용을 자신의 언어로 설명함')
    .replace(/(?:알게\s*됨|알았음)/g, '관련 내용을 구체적으로 확인하여 기록함')
    .replace(/(?:관심을\s*갖게\s*됨)/g, '관련 자료를 자발적으로 탐색하는 태도를 보임')
    .replace(/(?:느낀\s*점|느낌)/g, '관찰한 내용에 대한 견해')
    .replace(/(?:다짐함|다짐했음)/g, '실천 의지를 구체적으로 표현함')
    .replace(/(?:생각함|생각했음)/g, '자신의 견해를 수학적 근거와 함께 표현함')
    .replace(/이해함함/g, '이해력을 보임')
    .replace(/이해하게\s*됨/g, '관련 개념을 적용하는 모습을 보임')
    .replace(/이해함/g, '이해력을 보임');
}

function observableEnding(text) {
  let sentence = clean(replaceInnerLanguage(removeSubjectWords(text)));
  if (!sentence) return '';
  sentence = sentence
    .replace(/\b(?:그리고|또한)\s+(?=(?:그리고|또한)\s+)/g, '')
    .replace(/하였으며/g, '하며').replace(/했으며/g, '하며').replace(/하였고/g, '하고').replace(/했고/g, '하고')
    .replace(/할\s*수\s*있었음$/g, '하는 능력을 보임').replace(/하는\s*것을\s*볼\s*수\s*있었음$/g, '하는 모습을 보임')
    .replace(/하였음$/g, '함').replace(/했음$/g, '함').replace(/하였음$/g, '함')
    .replace(/하였다$/g, '함').replace(/했다$/g, '함').replace(/한다$/g, '함')
    .replace(/보였다$/g, '보임').replace(/보였음$/g, '보임').replace(/보인다$/g, '보임')
    .replace(/되었다$/g, '됨').replace(/되었음$/g, '됨').replace(/된다$/g, '됨')
    .replace(/이었다$/g, '임').replace(/이다$/g, '임').replace(/있다$/g, '있음')
    .replace(/뛰어나다$/g, '뛰어남').replace(/우수하다$/g, '우수함').replace(/탁월하다$/g, '탁월함')
    .replace(/돋보인다$/g, '돋보임').replace(/두드러진다$/g, '두드러짐').replace(/드러난다$/g, '드러남');
  sentence = sentence.replace(/(분석|비교|설명|발표|작성|기록|계산|도출|제시|활용|검증|해석|탐구|정리|수정|시각화|분류|변환|설계|추론|입증|평가|제출|구체화)$/g, '$1함');
  if (!/(?:함|임|음|됨|보임|드러남|두드러짐|뛰어남|우수함|탁월함)$/u.test(sentence)) {
    sentence = /(?:을|를)$/u.test(sentence)
      ? `${sentence} 구체적으로 작성함`
      : `${sentence}에 관한 수행 내용을 구체적으로 기록함`;
  }
  return `${sentence}.`;
}

function observationSentences(raw, limit) {
  const parts = raw
    .split(/(?:\r?\n|[.!?。]+)\s*/)
    .map(part => clean(part)
      .replace(/^(?:그리고|또한|그래서)\s*/g, '')
      .replace(/\s*(?:하는 편임|인 것 같음)$/g, '하는 모습을 보임'))
    .filter(Boolean);
  const combined = [];
  parts.forEach(part => {
    if (combined.length && part.length < 12) combined[combined.length - 1] += `, ${part}`;
    else combined.push(part);
  });
  return combined.slice(0, limit).map(observableEnding).filter(Boolean);
}

function evidenceExpansion(raw, maximum = 1) {
  const candidates = [];
  const add = (pattern, sentence) => { if (pattern.test(raw) && !candidates.includes(sentence)) candidates.push(sentence); };
  add(/그래프|좌표|도형|곡선/, '식과 그래프 또는 도형 사이의 관계를 비교하여 변화 양상과 수학적 의미를 구체적으로 설명함.');
  add(/자료|데이터|통계|도표|표(?:를|로|와|에|의|가|는|에서|\s)|엑셀|지오지브라|공학\s*도구/, '자료에서 중요 정보를 가려내어 목적에 맞게 정리하고, 분석 결과를 수학적 근거와 함께 해석함.');
  add(/발표|설명|질문|답변|토론/, '핵심 개념과 해결 절차를 수학 용어와 기호를 사용해 명료하게 표현하고, 제기된 질문에 근거를 들어 답함.');
  add(/오류|수정|피드백|검토|재시도/, '오류가 발생한 지점을 찾아 원인을 분석하고, 피드백을 반영하여 풀이와 결과물을 정확하게 수정함.');
  add(/여러|다양|다른\s*풀이|대안|비교/, '하나의 방법에 머무르지 않고 여러 접근을 비교하여 조건에 적합한 해결 전략을 선택함.');
  add(/실생활|진로|경제|건축|인공지능|감염병/, '교과에서 학습한 수학 개념을 실제 맥락과 관계 짓고 그 활용 가능성을 구체적으로 제시함.');
  add(/모둠|팀|친구|동료|협업|조율/, '모둠 구성원의 의견을 경청하고 역할을 충실히 수행하며 공동의 해결책을 도출하는 데 기여함.');
  return candidates.slice(0, maximum);
}

function assessmentIntro(item) {
  let activity = clean(removeSubjectWords(item.activity))
    .replace(/(?:하는\s*)?(?:수행평가|평가\s*활동)$/u, '')
    .replace(/틀린\s*문제나\s*모르는\s*문제에\s*대해/g, '틀렸거나 해결하지 못한 문제의')
    .replace(/관련\s*개념을\s*정리하고\s*다양한\s*방법으로\s*풀어보는/g, '관련 개념을 정리한 뒤 다양한 해결 방법을 탐색하는')
    .replace(/풀어\s*보는/g, '해결 방법을 탐색하는')
    .replace(/해\s*보는/g, '시도하는')
    .trim();
  activity = activity
    .replace(/(작성|분석|비교|설명|발표|계산|탐구|제출)$/u, '$1함')
    .replace(/하는$/u, '함');
  return `‘${item.name}’ 수행평가에서 ${activity}.`;
}

function contextualizeObservations(sentences, item) {
  const activity = item.activity;
  return sentences.map(sentence => {
    if (/전\s*단원.*(?:제출|작성)/u.test(sentence) && /배움\s*노트|성찰\s*노트/u.test(activity)) {
      return '전 단원의 배움노트와 성찰노트를 빠짐없이 성실하게 작성하여 제출함.';
    }
    if (/성실히\s*제출함/u.test(sentence)) return sentence.replace(/성실히\s*제출함/u, '빠짐없이 성실하게 작성하여 제출함');
    return sentence;
  });
}

function contextualCompetencySentence(key, context) {
  const hasWriting = /노트|보고서|활동지|작성|기록|서술/u.test(context);
  const hasSpeaking = /발표|설명|질문|답변|토론/u.test(context);
  const hasCorrection = /틀린|모르는|오류|수정|피드백|검토|재시도/u.test(context);
  const hasAlternatives = /다양한\s*방법|여러\s*방법|다른\s*풀이|대안|비교/u.test(context);
  const hasData = /자료|데이터|통계|도표|엑셀|지오지브라|공학\s*도구/u.test(context);
  const hasRealWorld = /실생활|진로|경제|건축|인공지능|감염병/u.test(context);

  if (key === 'communication' && hasWriting) return '관련 개념과 풀이 과정을 배움노트와 성찰노트에 순서 있게 정리하여 수학적 사고를 글로 표현하는 능력이 돋보임.';
  if (key === 'communication' && hasSpeaking) return '핵심 개념과 해결 과정을 수학 용어로 명료하게 설명하고 질문에 근거를 들어 답하는 의사소통능력이 돋보임.';
  if (key === 'problem' && hasCorrection) return '해결하지 못한 문제를 그대로 두지 않고 오류의 원인을 찾아 관련 개념을 재정리한 뒤 다시 해결하는 문제해결능력이 돋보임.';
  if (key === 'problem' && hasAlternatives) return '하나의 풀이에 머무르지 않고 여러 해결 방법을 비교하여 적절한 전략을 선택하는 문제해결능력이 돋보임.';
  if (key === 'reasoning' && hasWriting) return '풀이의 각 단계를 순서 있게 기록하고 사용한 개념과 근거를 분명히 밝혀 논리적 사고 과정을 구체적으로 드러냄.';
  if (key === 'connection' && hasAlternatives) return '문제에 적용할 수 있는 여러 개념과 풀이 방법의 관계를 살펴보고 이를 새로운 해결 과정으로 연결함.';
  if (key === 'connection' && hasRealWorld) return '교과에서 학습한 수학 개념을 실제 상황과 관계 짓고 그 활용 가능성을 구체적으로 제시함.';
  if (key === 'information' && hasData) return '자료에서 중요 정보를 추출하여 목적에 맞게 정리하고 분석 결과를 수학적 근거에 따라 해석함.';
  if (key === 'information' && hasWriting) return '단원별 학습 내용과 문제 해결 기록을 체계적으로 분류하고 재정리하는 정보처리 역량이 돋보임.';
  return pick(veteranCompetencyText[key], 0);
}

function isUninformativeEvaluation(text) {
  return /^(?:평범함|보통임|특이\s*사항\s*없음|없음|무난함)[.!?。\s]*$/u.test(text.trim());
}

function restrainedLevelSentence(achievement) {
  const sentences = {
    excellent: '관찰된 과제 수행 과정에서 맡은 활동을 꾸준히 이어가고 결과물을 책임감 있게 완성하는 자기관리능력이 돋보임.',
    good: '주어진 활동을 성실하게 수행하고 정해진 절차에 따라 결과물을 충실히 완성함.',
    steady: '수업에서 안내한 절차를 따라 과제를 꾸준히 수행하고 결과물을 기한에 맞추어 제출함.',
    growth: '피드백과 재시도를 통해 부족한 부분을 보완하며 과제 수행의 완성도를 높여가는 모습을 보임.'
  };
  return sentences[achievement];
}

function polishRecord(sentences) {
  const seen = new Set();
  return sentences
    .filter(Boolean)
    .map(sentence => observableEnding(sentence))
    .filter(sentence => {
      const key = sentence.replace(/\s/g, '');
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .join(' ')
    .replace(/\s{2,}/g, ' ')
    .replace(/\.\s*\./g, '.')
    .trim();
}

function generateRecord() {
  const item = assessments.find(assessment => assessment.id === $('#assessmentSelect').value);
  if (!item) return showToast('등록한 수행평가를 선택해 주세요.');
  const evidence = $('#studentEvidence').value.trim();
  if (!evidence) return showToast('학생 관찰 근거를 입력해 주세요.');
  const competencies = $$('#competencyChoices input:checked').map(input => input.value);
  if (!competencies.length) return showToast('강조할 수학 역량을 하나 이상 선택해 주세요.');

  const achievement = $('input[name="achievement"]:checked').value;
  const length = $('input[name="length"]:checked').value;
  const career = clean($('#careerTrack').value);
  const teacherEvaluation = $('#teacherEvaluation').value.trim();
  const observationLimit = length === 'short' ? 2 : length === 'medium' ? 4 : 7;
  const observations = contextualizeObservations(observationSentences(evidence, observationLimit), item);
  const teacherIsMeaningful = teacherEvaluation && !isUninformativeEvaluation(teacherEvaluation);
  const teacherObservations = teacherIsMeaningful ? observationSentences(teacherEvaluation, length === 'long' ? 3 : 2) : [];
  const careerLabel = career && !career.endsWith('계열') && career !== '진로 탐색 중' ? `${career} 계열` : career;
  const careerSentence = !career ? '' : career === '진로 탐색 중'
    ? '수행 주제와 연관된 다양한 진로 자료를 찾아 수학의 활용 장면을 구체적으로 정리함.'
    : `${careerLabel} 진로와 수행 주제의 연관성을 자료와 수학적 근거를 바탕으로 구체화함.`;
  const intro = assessmentIntro(item);
  const competencyContext = `${item.activity} ${evidence}`;
  const competenceSentences = competencies.map(key => contextualCompetencySentence(key, competencyContext));
  const levelSentence = teacherIsMeaningful ? '' : evidence.length < 100
    ? restrainedLevelSentence(achievement)
    : pick(veteranLevelText[achievement], 1);
  const expansionCount = length === 'long' && evidence.length < 520 ? 2 : length === 'medium' && evidence.length < 320 ? 1 : 0;
  const expansions = evidenceExpansion(evidence, expansionCount);
  let sentences = [intro, ...observations];

  if (length === 'short') {
    sentences.push(competenceSentences[0], ...teacherObservations, levelSentence);
  } else if (length === 'medium') {
    sentences.push(...expansions, ...competenceSentences.slice(0, 2), careerSentence, ...teacherObservations, levelSentence);
  } else {
    sentences.push(
      ...expansions,
      ...competenceSentences,
      careerSentence,
      '풀이와 탐구의 각 단계에서 사용한 개념과 전략을 스스로 점검하고, 발견한 오류를 수정하여 결과의 논리적 완결성을 높임.',
      ...teacherObservations,
      levelSentence
    );
  }

  $('#result').value = polishRecord(sentences);
  $('#emptyState').classList.add('hidden');
  $('#resultArea').classList.remove('hidden');
  updateCount();
}

$('#studentForm').addEventListener('submit', event => {
  event.preventDefault();
  variant = 0;
  generateRecord();
});

$('#regenerate').addEventListener('click', () => { variant += 1; generateRecord(); });

function updateCount() {
  const text = $('#result').value;
  $('#charCount').textContent = `${text.length}자 · ${new TextEncoder().encode(text).length}바이트`;
}

$('#result').addEventListener('input', updateCount);

async function copyText(text) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const temporary = document.createElement('textarea');
    temporary.value = text;
    temporary.style.position = 'fixed';
    temporary.style.opacity = '0';
    document.body.append(temporary);
    temporary.select();
    document.execCommand('copy');
    temporary.remove();
  }
}

function buildAIPrompt() {
  const item = assessments.find(assessment => assessment.id === $('#assessmentSelect').value);
  if (!item) return '';
  const competencyNames = {
    problem: '문제해결 역량', reasoning: '추론 역량', communication: '의사소통 역량',
    connection: '연결 역량', information: '정보처리 역량'
  };
  const achievementNames = { excellent: '매우 우수', good: '우수', steady: '보통', growth: '성장 중' };
  const lengthGuide = {
    short: '간결하게(약 250~350자)', medium: '보통(약 400~550자)', long: '상세하게(약 600자 이상)'
  };
  const selectedCompetencies = $$('#competencyChoices input:checked').map(input => competencyNames[input.value]);
  const achievement = $('input[name="achievement"]:checked').value;
  const length = $('input[name="length"]:checked').value;
  const standards = item.standards.map(code => {
    const standard = ACHIEVEMENT_STANDARDS[item.subject]?.find(entry => entry.code === code);
    return standard ? `[${standard.code}] ${standard.text}` : '';
  }).filter(Boolean).join('\n');
  const career = clean($('#careerTrack').value) || '입력하지 않음';
  const teacherEvaluation = clean($('#teacherEvaluation').value) || '입력하지 않음';

  return `# 역할
한국 고등학교에서 30년간 근무한 베테랑 수학교사처럼 교과세부능력 및 특기사항을 작성해 주세요. 품격 있고 신뢰감 있는 교사 관찰 문체를 사용하세요.

# 입력 자료
- 과목: ${item.subject}
- 수행평가명: ${item.name}
- 수행평가 활동: ${item.activity}
- 학생 관찰 근거: ${$('#studentEvidence').value.trim()}
- 강조할 수학 역량: ${selectedCompetencies.join(', ')}
- 성취 수준: ${achievementNames[achievement]}
- 희망 분량: ${lengthGuide[length]}
- 진로 계열: ${career}
- 교사의 평가: ${teacherEvaluation}
- 프로그램이 만든 1차 초안: ${$('#result').value.trim()}

# 교육과정 내부 참고 자료
아래 내용은 활동을 해석하기 위한 참고 자료일 뿐입니다. 최종 세특에는 성취기준 코드, 성취기준 원문, '성취기준에 따르면' 같은 표현을 절대 노출하지 마세요.
${standards || '없음'}

# 작성 원칙
1. 학생 관찰 근거를 최우선으로 삼고, 입력에 없는 행동·성과·감정·수치·친구의 반응을 만들어내지 마세요.
2. 수행평가 설명을 그대로 인용하거나 '수행평가 내용을 주제로 과제를 수행함'이라고 쓰지 말고, 실제로 활동한 것처럼 자연스럽게 풀어 쓰세요.
3. '학생', '그는', '그가', '그의'를 주어로 사용하지 마세요.
4. 모든 문장은 현재형 명사형 어미인 '~함', '~음', '~임'을 중심으로 끝내세요. 과거형과 미래형 종결은 사용하지 마세요.
5. 깨달음·느낌·생각·다짐처럼 교사가 직접 확인할 수 없는 내면 상태를 단정하지 말고, 작성함·설명함·분석함·질문함·수정함·태도를 보임 등 관찰 가능한 행동으로 표현하세요.
6. 관찰 근거가 짧으면 수행평가 맥락 안에서 구체화하되 새로운 사실을 추가하지 말고, 길면 중복을 줄여 핵심 행동과 성장 과정이 드러나도록 다듬으세요.
7. 선택한 수학 역량은 관찰 근거로 뒷받침되는 경우에만 자연스럽게 녹여 쓰고, 역량 이름을 기계적으로 나열하지 마세요.
8. '탁월함', '우수함', '논리적 사고', '자기주도성', '문제해결능력', '추론', '표현력', '성실성', '끈기' 등의 긍정어휘는 성취 수준과 근거에 맞게 절제하여 사용하세요.
9. '다짐함', '느낌', '생각함', '깨닫게 됨', '알게 됨', '관심을 갖게 됨', '이해함함'으로 문장을 끝내지 마세요.
10. 진로 계열과 교사의 평가는 입력된 경우에만 반영하고, 1차 초안의 어색한 표현이나 근거 없는 칭찬은 과감히 삭제하세요.

# 최종 검수
출력 전에 관찰 근거 충실성, 사실 왜곡 여부, 성취기준 노출 여부, 금지 주어, 종결 어미, 문장 간 중복을 내부적으로 점검하세요.

# 출력 형식
설명이나 제목 없이 완성된 세특 한 문단만 출력하세요.`;
}

function buildCommonPrompt() {
  return `# 역할
앞으로 이 대화에서는 한국 고등학교에서 30년간 근무한 베테랑 수학교사처럼 교과세부능력 및 특기사항을 다듬어 주세요. 사용자가 학생별 세특 초안을 한 문단씩 보내면 아래 원칙에 따라 완성도 높은 최종 문장으로 교정하세요.

# 가장 중요한 원칙
1. 초안에 포함된 관찰 사실을 최우선으로 보존하고, 입력에 없는 행동·성과·감정·수치·친구의 반응을 새로 만들지 마세요.
2. 학생별 메시지는 각각 독립된 기록입니다. 이전 학생의 활동이나 평가를 다음 학생의 문장에 절대 섞지 마세요.
3. 수행평가 설명을 그대로 인용하거나 ‘수행평가 내용을 주제로 과제를 수행함’처럼 쓰지 말고, 실제로 수행한 행동이 자연스럽게 드러나도록 풀어 쓰세요.
4. 어색한 나열과 반복을 줄이고, 관찰 행동 → 구체적 수행 과정 → 드러난 수학 역량 또는 성장의 순서로 문장을 조직하세요.

# 문체와 표현
1. ‘학생’, ‘그는’, ‘그가’, ‘그의’를 주어로 사용하지 마세요.
2. 품격 있고 신뢰감 있는 교사 관찰 문체를 사용하세요.
3. 모든 문장은 현재형 명사형 어미인 ‘~함’, ‘~음’, ‘~임’을 중심으로 끝내고 과거형·미래형 종결을 사용하지 마세요.
4. 깨달음·느낌·생각·다짐처럼 교사가 직접 확인할 수 없는 내면 상태를 단정하지 마세요. 작성함·설명함·분석함·질문함·수정함·태도를 보임처럼 관찰 가능한 행동으로 표현하세요.
5. ‘다짐함’, ‘느낌’, ‘생각함’, ‘깨닫게 됨’, ‘알게 됨’, ‘관심을 갖게 됨’, ‘이해함함’으로 문장을 끝내지 마세요.
6. 성취기준 코드나 원문, ‘성취기준에 따르면’ 같은 행정적 문구가 초안에 있으면 최종 문장에서 제거하세요.

# 내용 다듬기
1. 초안이 짧으면 이미 기록된 사실의 범위 안에서 과정과 의미가 선명해지도록 구체화하세요.
2. 초안이 길면 핵심 관찰 근거를 보존하면서 중복과 상투적인 칭찬을 줄이세요.
3. 수학 역량은 관찰 행동으로 뒷받침되는 경우에만 자연스럽게 드러내고 역량 이름을 기계적으로 나열하지 마세요.
4. ‘탁월함’, ‘우수함’, ‘논리적 사고’, ‘자기주도성’, ‘문제해결능력’, ‘추론’, ‘표현력’, ‘성실성’, ‘끈기’ 등의 긍정어휘는 근거에 맞게 절제하여 사용하세요.
5. 원문의 분량을 대체로 유지하되, 문장 완성도를 위해 필요한 범위에서 적절히 늘이거나 줄이세요.

# 매번의 출력 방식
사용자가 세특 초안을 보내면 설명, 제목, 수정 이유, 따옴표 없이 다듬어진 최종 세특 한 문단만 출력하세요. 답변 전에 사실 추가 여부, 학생 간 정보 혼합, 금지 주어, 관찰 불가능한 표현, 종결 어미, 성취기준 노출, 문장 중복을 내부적으로 점검하세요.`;
}

function buildAssessmentPrompt() {
  const item = assessments.find(assessment => assessment.id === $('#assessmentSelect').value);
  if (!item) return '';
  const standards = item.standards.map(code => {
    const standard = ACHIEVEMENT_STANDARDS[item.subject]?.find(entry => entry.code === code);
    return standard ? `[${standard.code}] ${standard.text}` : '';
  }).filter(Boolean).join('\n');

  return `${buildCommonPrompt()}

# 이 대화방에서 적용할 수행평가
- 과목: ${item.subject}
- 수행평가명: ${item.name}
- 수행평가 활동: ${item.activity}

# 성취기준 — 해석을 위한 내부 참고용
${standards || '등록된 성취기준 없음'}

# 수행평가별 적용 원칙
1. 이후 전달되는 모든 초안은 위 수행평가에 참여한 서로 다른 학생의 기록입니다.
2. 수행평가 활동과 성취기준은 초안의 관찰 행동을 해석하는 데만 활용하고, 초안에 없는 구체적 행동이나 성과를 추측하여 추가하지 마세요.
3. 최종 문장에는 성취기준 코드, 원문, ‘성취기준에 따르면’과 같은 표현을 절대 노출하지 마세요.
4. 수행평가 활동 설명을 그대로 반복하지 말고 각 초안에 기록된 실제 수행 행동과 자연스럽게 결합하세요.
5. 다른 수행평가로 넘어갈 때는 새 대화방에서 해당 평가의 전용 프롬프트를 다시 입력해야 합니다.

위 지침과 수행평가 맥락을 이해했다면 지금은 “준비되었습니다. 이 수행평가의 학생별 세특 초안을 보내주세요.”라고만 답하세요.`;
}

$('#copyAssessmentPrompt').addEventListener('click', async () => {
  const prompt = buildAssessmentPrompt();
  if (!prompt) return showToast('수행평가를 먼저 선택해 주세요.');
  await copyText(prompt);
  showToast('수행평가별 프롬프트를 복사했습니다. 새 AI 대화방에 붙여넣으세요.');
});

$('#copyResult').addEventListener('click', async () => {
  await copyText($('#result').value);
  showToast('학생별 초안을 복사했습니다. 같은 AI 대화방에 붙여넣으세요.');
});

const helpModal = $('#helpModal');
let helpReturnFocus = null;

function openHelp() {
  helpReturnFocus = document.activeElement;
  helpModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  $('#closeHelp').focus();
}

function closeHelp() {
  helpModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  helpReturnFocus?.focus();
}

$('#helpButton').addEventListener('click', openHelp);
$('#openGuideInline').addEventListener('click', openHelp);
$('#closeHelp').addEventListener('click', closeHelp);
$('#dismissHelp').addEventListener('click', closeHelp);
$('#helpBackdrop').addEventListener('click', closeHelp);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !helpModal.classList.contains('hidden')) closeHelp();
});

renderAssessmentList();
renderAssessmentSelect();
renderStandards('');

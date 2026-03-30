const notesInput = document.getElementById('notesInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const output = document.getElementById('output');
const summaryText = document.getElementById('summaryText');
const actionItems = document.getElementById('actionItems');
const emailDraft = document.getElementById('emailDraft');
const statusEl = document.getElementById('status');

async function analyzeNotes() {
  const text = notesInput.value.trim();

  if (!text) {
    statusEl.textContent = 'Please enter meeting notes before analyzing.';
    output.classList.add('hidden');
    return;
  }

  analyzeBtn.disabled = true;
  analyzeBtn.textContent = 'Analyzing...';
  statusEl.textContent = '';

  try {
    const response = await fetch('/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
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
      li.textContent = 'No action items found.';
      actionItems.appendChild(li);
    }

    output.classList.remove('hidden');
  } catch (error) {
    statusEl.textContent = `Error: ${error.message}`;
    output.classList.add('hidden');
  } finally {
    analyzeBtn.disabled = false;
    analyzeBtn.textContent = 'Analyze Notes';
  }
}

analyzeBtn.addEventListener('click', analyzeNotes);

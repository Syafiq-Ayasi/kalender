// ===== STATE MANAGEMENT =====
let currentDate = new Date();
let selectedDate = null;
let events = {};
let allEventsForSearch = [];
const categoryColors = {
    'Kerja': '#3b82f6',
    'Pribadi': '#ec4899',
    'Penting': '#f59e0b',
    'Lainnya': '#667eea'
};

// ===== THEME MANAGEMENT =====
function initTheme() {
    const savedTheme = localStorage.getItem('calendarTheme') || 'light';
    setTheme(savedTheme);
}

function setTheme(theme) {
    const body = document.body;
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        localStorage.setItem('calendarTheme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️';
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('calendarTheme', 'light');
        document.getElementById('themeToggle').textContent = '🌙';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
}

// ===== STORAGE FUNCTIONS =====
function loadEvents() {
    const stored = localStorage.getItem('calendarEvents');
    events = stored ? JSON.parse(stored) : {};
    buildSearchIndex();
}

function saveEvents() {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
    buildSearchIndex();
}

function getDateKey(date) {
    return date.toISOString().split('T')[0];
}

// ===== DATE UTILITY FUNCTIONS =====
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function getFirstDayOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
}

function isToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
}

function isSameDate(date1, date2) {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
}

function isWeekend(dayOfWeek) {
    return dayOfWeek === 0 || dayOfWeek === 6;
}

function getUpcomingEvents(days = 7) {
    const upcoming = [];
    const today = new Date();

    for (let i = 0; i < days; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        const dateKey = getDateKey(date);

        if (events[dateKey]) {
            events[dateKey].forEach(event => {
                upcoming.push({
                    ...event,
                    date: new Date(date),
                    dateKey: dateKey
                });
            });
        }
    }

    return upcoming.sort((a, b) => a.date - b.date);
}

// ===== SEARCH FUNCTIONS =====
function buildSearchIndex() {
    allEventsForSearch = [];
    for (const dateKey in events) {
        const date = new Date(dateKey);
        events[dateKey].forEach((event, index) => {
            allEventsForSearch.push({
                ...event,
                dateKey: dateKey,
                date: date,
                index: index
            });
        });
    }
}

function searchEvents(query) {
    if (!query.trim()) {
        document.getElementById('searchResults').style.display = 'none';
        return;
    }

    const lowerQuery = query.toLowerCase();
    const results = allEventsForSearch.filter(event =>
        event.title.toLowerCase().includes(lowerQuery) ||
        (event.desc && event.desc.toLowerCase().includes(lowerQuery))
    );

    const resultsEl = document.getElementById('searchResults');
    resultsEl.innerHTML = '';

    if (results.length === 0) {
        resultsEl.innerHTML = '<div style="padding: 12px 15px; color: var(--text-secondary); text-align: center;">Tidak ada hasil</div>';
        resultsEl.style.display = 'block';
        return;
    }

    results.forEach(result => {
        const resultEl = document.createElement('div');
        resultEl.className = 'search-result-item';
        const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                          'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
        const dateStr = `${result.date.getDate()} ${monthNames[result.date.getMonth()]} ${result.date.getFullYear()}`;

        resultEl.innerHTML = `
            <div class="search-result-title">${escapeHtml(result.title)}</div>
            <div class="search-result-date">${dateStr}</div>
        `;

        resultEl.addEventListener('click', () => {
            selectDate(result.date);
            document.getElementById('searchInput').value = '';
            document.getElementById('searchResults').style.display = 'none';
        });

        resultsEl.appendChild(resultEl);
    });

    resultsEl.style.display = 'block';
}

// ===== CALENDAR RENDERING =====
function renderCalendar() {
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);

    // Update header
    document.getElementById('monthYear').textContent = `${monthNames[month]} ${year}`;

    // Render upcoming events panel
    renderUpcomingEvents();

    // Clear calendar
    const calendarDates = document.getElementById('calendarDates');
    calendarDates.innerHTML = '';

    // Add empty cells for days from previous month
    for (let i = 0; i < firstDay; i++) {
        const emptyDate = document.createElement('div');
        emptyDate.className = 'date other-month';
        calendarDates.appendChild(emptyDate);
    }

    // Add days of current month
    for (let day = 1; day <= daysInMonth; day++) {
        const dateObj = new Date(year, month, day);
        const dateEl = document.createElement('div');
        dateEl.className = 'date';

        // Add weekend class
        if (isWeekend(dateObj.getDay())) {
            dateEl.classList.add('weekend');
        }

        if (isToday(dateObj)) {
            dateEl.classList.add('today');
        }

        if (selectedDate && isSameDate(dateObj, selectedDate)) {
            dateEl.classList.add('selected');
        }

        // Check if date has events
        const dateKey = getDateKey(dateObj);
        if (events[dateKey] && events[dateKey].length > 0) {
            dateEl.classList.add('has-events');
        }

        dateEl.innerHTML = `<div class="date-number">${day}</div>`;

        // Add event preview if exists
        if (events[dateKey] && events[dateKey].length > 0) {
            const preview = events[dateKey][0];
            const categoryColor = categoryColors[preview.category] || categoryColors['Lainnya'];
            dateEl.innerHTML += `
                <div class="date-preview">
                    <span class="event-category-indicator" style="background-color: ${categoryColor}"></span>
                    ${escapeHtml(preview.title)}
                </div>
            `;
        }

        dateEl.addEventListener('click', () => selectDate(dateObj));
        calendarDates.appendChild(dateEl);
    }

    // Add empty cells for remaining days
    const totalCells = calendarDates.children.length;
    const remainingCells = (42 - totalCells); // 6 rows × 7 days
    for (let i = 0; i < remainingCells; i++) {
        const emptyDate = document.createElement('div');
        emptyDate.className = 'date other-month';
        calendarDates.appendChild(emptyDate);
    }
}

function renderUpcomingEvents() {
    const upcomingPanel = document.getElementById('upcomingPanel');
    const upcoming = getUpcomingEvents(7);

    if (upcoming.length === 0) {
        upcomingPanel.innerHTML = '';
        return;
    }

    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                       'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    let html = '<h3>📅 Event Mendatang (7 hari)</h3>';

    upcoming.forEach(event => {
        const dateStr = `${event.date.getDate()} ${monthNames[event.date.getMonth()]}`;
        let className = 'upcoming-event';

        if (isToday(event.date)) {
            className += ' today';
            dateStr += ' (Hari ini)';
        } else if (event.date.getDate() === new Date().getDate() + 1 &&
                   event.date.getMonth() === new Date().getMonth() &&
                   event.date.getFullYear() === new Date().getFullYear()) {
            className += ' tomorrow';
        }

        html += `<div class="${className}" onclick="selectDate(new Date('${event.dateKey}'))" style="border-left-color: ${categoryColors[event.category] || categoryColors['Lainnya']}">${escapeHtml(event.title)} - ${dateStr}</div>`;
    });

    upcomingPanel.innerHTML = html;
}

// ===== EVENT FUNCTIONS =====
function selectDate(dateObj) {
    selectedDate = dateObj;
    renderCalendar();
    renderEventPanel();
}

function renderEventPanel() {
    const dateKey = getDateKey(selectedDate);
    const dateEvents = events[dateKey] || [];
    const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
                        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    const dateLabel = `${selectedDate.getDate()} ${monthNames[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;
    document.getElementById('selectedDateLabel').textContent = dateLabel;

    // Apply category filter
    const filterValue = document.getElementById('categoryFilter').value;
    const filteredEvents = filterValue
        ? dateEvents.filter(e => e.category === filterValue)
        : dateEvents;

    // Render events
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    if (filteredEvents.length === 0) {
        eventList.innerHTML = '<p style="color: var(--text-secondary); font-size: 14px; text-align: center;">Tidak ada event</p>';
    } else {
        filteredEvents.forEach((event) => {
            const actualIndex = dateEvents.indexOf(event);
            const eventEl = document.createElement('div');
            eventEl.className = 'event-item';
            eventEl.setAttribute('data-category', event.category || 'Lainnya');

            const categoryColor = categoryColors[event.category] || categoryColors['Lainnya'];
            eventEl.innerHTML = `
                <div class="event-content">
                    <span class="event-category-indicator" style="background-color: ${categoryColor}"></span>
                    <div class="event-title">${escapeHtml(event.title)}</div>
                    ${event.desc ? `<div class="event-desc">${escapeHtml(event.desc)}</div>` : ''}
                </div>
                <button class="event-delete" data-index="${actualIndex}">Hapus</button>
            `;
            eventList.appendChild(eventEl);

            eventEl.querySelector('.event-delete').addEventListener('click', () => {
                showDeleteModal(event.title, () => deleteEvent(dateKey, actualIndex));
            });
        });
    }

    // Show/hide form
    document.getElementById('eventForm').style.display = 'block';
    clearEventForm();
}

function clearEventForm() {
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventDesc').value = '';
    document.getElementById('eventCategory').value = 'Lainnya';
}

function addEvent() {
    const title = document.getElementById('eventTitle').value.trim();
    const desc = document.getElementById('eventDesc').value.trim();
    const category = document.getElementById('eventCategory').value;

    if (!title) {
        alert('Judul event tidak boleh kosong');
        return;
    }

    const dateKey = getDateKey(selectedDate);
    if (!events[dateKey]) {
        events[dateKey] = [];
    }

    events[dateKey].push({ title, desc, category: category || 'Lainnya' });
    saveEvents();
    renderCalendar();
    renderEventPanel();
}

function deleteEvent(dateKey, index) {
    if (events[dateKey]) {
        events[dateKey].splice(index, 1);
        if (events[dateKey].length === 0) {
            delete events[dateKey];
        }
        saveEvents();
        renderCalendar();
        renderEventPanel();
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showDeleteModal(eventTitle, onConfirm) {
    document.getElementById('deleteEventTitle').textContent = eventTitle;
    const modal = document.getElementById('deleteModal');
    modal.style.display = 'flex';

    const confirmBtn = document.getElementById('confirmDeleteBtn');
    const cancelBtn = document.getElementById('cancelDeleteBtn');

    const handleConfirm = () => {
        onConfirm();
        modal.style.display = 'none';
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };

    const handleCancel = () => {
        modal.style.display = 'none';
        confirmBtn.removeEventListener('click', handleConfirm);
        cancelBtn.removeEventListener('click', handleCancel);
    };

    confirmBtn.addEventListener('click', handleConfirm);
    cancelBtn.addEventListener('click', handleCancel);
}

// ===== EXPORT/IMPORT FUNCTIONS =====
function exportEvents() {
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');

    const today = new Date();
    const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    link.href = url;
    link.download = `calendar-events-${dateStr}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function importEvents() {
    document.getElementById('importFile').click();
}

function handleImportFile(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importedData = JSON.parse(e.target.result);

            // Validate format
            if (typeof importedData !== 'object') {
                alert('Format file tidak valid');
                return;
            }

            // Ask user about merge or replace
            const shouldMerge = confirm('Merge dengan data existing? Klik OK untuk merge, Cancel untuk replace.');

            if (shouldMerge) {
                events = { ...events, ...importedData };
            } else {
                events = importedData;
            }

            saveEvents();
            renderCalendar();
            if (selectedDate) renderEventPanel();
            alert('Event berhasil di-import!');
        } catch (err) {
            alert('Gagal membaca file: ' + err.message);
        }
    };
    reader.readAsText(file);

    // Reset input
    event.target.value = '';
}

// ===== EVENT LISTENERS =====
document.getElementById('prevBtn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

document.getElementById('todayBtn').addEventListener('click', () => {
    currentDate = new Date();
    renderCalendar();
});

document.getElementById('themeToggle').addEventListener('click', toggleTheme);

document.getElementById('addEventBtn').addEventListener('click', addEvent);

document.getElementById('eventTitle').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addEvent();
    }
});

document.getElementById('cancelEventBtn').addEventListener('click', () => {
    selectedDate = null;
    document.getElementById('eventForm').style.display = 'none';
    renderCalendar();
});

document.getElementById('categoryFilter').addEventListener('change', () => {
    if (selectedDate) {
        renderEventPanel();
    }
});

document.getElementById('searchInput').addEventListener('input', (e) => {
    searchEvents(e.target.value);
});

document.getElementById('exportBtn').addEventListener('click', exportEvents);
document.getElementById('importBtn').addEventListener('click', importEvents);
document.getElementById('importFile').addEventListener('change', handleImportFile);

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer.contains(e.target)) {
        document.getElementById('searchResults').style.display = 'none';
    }
});

// ===== INITIALIZATION =====
initTheme();
loadEvents();
renderCalendar();

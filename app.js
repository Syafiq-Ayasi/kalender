// ===== STATE MANAGEMENT =====
let currentDate = new Date();
let selectedDate = null;
let events = {};

// ===== STORAGE FUNCTIONS =====
function loadEvents() {
    const stored = localStorage.getItem('calendarEvents');
    events = stored ? JSON.parse(stored) : {};
}

function saveEvents() {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
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
            dateEl.innerHTML += `<div class="date-preview">${preview.title}</div>`;
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

    // Render events
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    if (dateEvents.length === 0) {
        eventList.innerHTML = '<p style="color: #a0aec0; font-size: 14px; text-align: center;">Tidak ada event</p>';
    } else {
        dateEvents.forEach((event, index) => {
            const eventEl = document.createElement('div');
            eventEl.className = 'event-item';
            eventEl.innerHTML = `
                <div class="event-content">
                    <div class="event-title">${escapeHtml(event.title)}</div>
                    ${event.desc ? `<div class="event-desc">${escapeHtml(event.desc)}</div>` : ''}
                </div>
                <button class="event-delete" data-index="${index}">Hapus</button>
            `;
            eventList.appendChild(eventEl);

            eventEl.querySelector('.event-delete').addEventListener('click', () => {
                showDeleteModal(event.title, () => deleteEvent(dateKey, index));
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
}

function addEvent() {
    const title = document.getElementById('eventTitle').value.trim();
    const desc = document.getElementById('eventDesc').value.trim();

    if (!title) {
        alert('Judul event tidak boleh kosong');
        return;
    }

    const dateKey = getDateKey(selectedDate);
    if (!events[dateKey]) {
        events[dateKey] = [];
    }

    events[dateKey].push({ title, desc });
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

// ===== INITIALIZATION =====
loadEvents();
renderCalendar();

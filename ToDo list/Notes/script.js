document.addEventListener('DOMContentLoaded', () => {
    loadNotes();
});

function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('noteList');

    noteList.innerHTML = '';

    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note.text;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function(event) {
            event.stopPropagation();
            deleteNote(index);
        });

        li.appendChild(deleteButton);
        noteList.appendChild(li);
    });
}

function addNote() {
    const noteInput = document.getElementById('noteInput');
    const noteText = noteInput.value.trim();

    if (noteText !== '') {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.push({ text: noteText });
        localStorage.setItem('notes', JSON.stringify(notes));
        noteInput.value = '';
        loadNotes();
    }
}

function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notes));
    loadNotes();
}

// Добавление заметки при нажатии Enter или Shift + Enter
document.getElementById('noteInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Предотвращаем стандартное поведение (добавление новой строки)
        addNote();
    }
});

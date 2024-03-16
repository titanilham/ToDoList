window.addEventListener('load', function() {
    var savedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
    savedPhotos.forEach(function(photoData) {
        createPhotoElement(photoData.src);
    });
});

var fileInput = document.getElementById('fileInput');
fileInput.addEventListener('change', function() {
    var files = fileInput.files;

    for (var i = 0; i < files.length; i++) {
        var file = files[i];
        var reader = new FileReader();

        reader.onload = function(e) {
            createPhotoElement(e.target.result, true); 
            savePhoto(e.target.result);
        }

        reader.readAsDataURL(file);
    }
    // Очищает название файла на кнопке добавления
    fileInput.value = '';
});

function createPhotoElement(src, isNew) {
    var img = document.createElement('img');
    img.src = src;
    img.className = 'thumbnail';

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    deleteButton.addEventListener('click', function() {
        deletePhoto(img);
    });

    var container = document.createElement('div');
    container.className = 'photo-container';
    container.appendChild(img);
    container.appendChild(deleteButton);

    var gallery = document.getElementById('gallery');

    if (isNew) {
        gallery.insertBefore(container, gallery.firstChild); // Вставляет новую фотографию в начало галереи
    } else {
        gallery.appendChild(container); // Добавляет старую фотографию в конец галереи
    }
}

function savePhoto(src) {
    var savedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
    savedPhotos.unshift({ src: src }); // Добавляет новую фотографию в начало массива
    localStorage.setItem('photos', JSON.stringify(savedPhotos));
}

function deletePhoto(photoElement) {
    var container = photoElement.parentNode;
    var gallery = document.getElementById('gallery');
    gallery.removeChild(container);

    var savedPhotos = JSON.parse(localStorage.getItem('photos')) || [];
    var src = photoElement.src;
    savedPhotos = savedPhotos.filter(function(photoData) {
        return photoData.src !== src;
    });
    localStorage.setItem('photos', JSON.stringify(savedPhotos));
}

// Получает ссылку на элемент галереи
const gallery = document.getElementById('gallery');

// Добавляет обработчик события на элемент галереи
gallery.addEventListener('click', function(event) {
    // Проверяет, что кликнули на изображение
    if (event.target.tagName === 'IMG') {
        // Изменяет размер изображения на полный
        event.target.classList.toggle('full-size');
    }
});

// Функция для добавления изображения в галерею
function addImage(file) {
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    const container = document.createElement('div');
    container.classList.add('photo-container');
    container.appendChild(img);
    gallery.appendChild(container);
}

// Обработчик события изменения содержимого поля выбора файла
document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    for (const file of files) {
        addImage(file);
    }
});


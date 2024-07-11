// Inisialisasi Element
const welcomeApps = document.querySelector('.welcome-apps');
const welcome = document.querySelector('.welcome');
const quest = document.querySelector('.quest');
const buttons = document.querySelector('.button-grup');
const button1 = document.querySelector('.unwell');
const button2 = document.querySelector('.healthy');
const form = document.querySelector('.form');
const containerContents = document.querySelector('.container-contents');
const searchTheBooks = document.querySelector('.search-book');
const wantToSearch = document.querySelector('.want-search');
const search = document.querySelector('.search');
const dontSearch = document.querySelector('.dont-search');
const pencarian = document.querySelector('.pencarian');
const pencarianBaru = document.querySelector('#pencarian-baru');
const newSubmit = document.querySelector('.new-submit')

// Mendapatkan data buku dari local storage atau membuat array kosong jika tidak ada data
const books = JSON.parse(localStorage.getItem('BOOKS')) || [];
const RENDER_BOOK_EVENT = 'render-book'; 

document.addEventListener('DOMContentLoaded', function() {
    button1.addEventListener('click', function() {
        quest.innerText = 'Jangan Lupa Makan Dan Minum Obat';
        button1.setAttribute('hidden', true);
        button2.setAttribute('hidden', true);
        const newButton = document.createElement('button');
        newButton.setAttribute('id', 'new-button')
        newButton.innerText = 'masuk';
        buttons.appendChild(newButton);
        newButton.addEventListener('click', function() {
            welcome.setAttribute('hidden', true);
            buttons.setAttribute('hidden', true);
            containerContents.removeAttribute('hidden')
        })
    });

    button2.addEventListener('click', function() {
        quest.innerText = 'Jaga Kesehatan Jangan Sampai Sakit';
        button1.setAttribute('hidden', true);
        button2.setAttribute('hidden', true);
        const newButton1 = document.createElement('button');
        newButton1.setAttribute('id', 'new-button')
        newButton1.innerText = 'masuk';
        buttons.appendChild(newButton1);
        newButton1.addEventListener('click', function() {
            welcome.setAttribute('hidden', true);
            buttons.setAttribute('hidden', true);
            containerContents.removeAttribute('hidden')
        })
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        addBook();
        form.reset();
    });

    search.addEventListener('click', function() {
        search.setAttribute('hidden', true);
        dontSearch.setAttribute('hidden', true);
        wantToSearch.innerText = 'Cari Buku';
        pencarian.removeAttribute('hidden');
    });
    
    dontSearch.addEventListener('click', function() {
        searchTheBooks.style.display = 'none';
    });
    
    // Event Listener untuk melakukan pencarian judul buku
    newSubmit.addEventListener('click', function() {
        const searchText = pencarianBaru.value;
        let bookFiltered = []
        if (searchText == '') bookFiltered = books
        bookFiltered = books.filter(book => book.title.includes(searchText))
        unCompletedBOOKList.innerHTML = '';
        completedBOOKList.innerHTML = '';
    
        for (const bookItem of bookFiltered) {
            const bookElement = makeBook(bookItem);
            if (!bookItem.isCompleted) {
                unCompletedBOOKList.append(bookElement);
            } else {
                completedBOOKList.append(bookElement);
            }
        }
    })
});

function addBook() {
    const judul = document.querySelector('#judul').value;
    const penulis = document.querySelector('#penulis').value;
    const tahun = parseInt(document.querySelector('#tahun').value);
    const dibaca = document.querySelector('#already-read').checked;

    if(judul == ''){
        alert('Harus Menginputkan Judul Terlebih Dahulu');
        return;
    }

    const createID = createId();
    const bookObject = createBookObject(createID, judul, penulis, tahun, dibaca);
    books.push(bookObject);

    localStorage.setItem('BOOKS', JSON.stringify(books));
    document.dispatchEvent(new Event(RENDER_BOOK_EVENT));
};

function createId() {
    return +new Date();
};

function createBookObject(id, title, author, year, isCompleted) {
    return {
        id,
        title,
        author,
        year,
        isCompleted
    }
};

document.addEventListener(RENDER_BOOK_EVENT, function() {
    console.log(books);
});

function makeBook(bookObject) {
    const newElementTitle = document.createElement('h2');
    newElementTitle.innerText = bookObject.title;

    const newElementAuthor = document.createElement('p');
    newElementAuthor.innerText = bookObject.author;

    const newElementYear = document.createElement('p');
    newElementYear.innerText = bookObject.year;

    const newChildContainer = document.createElement('div');
    newChildContainer.classList.add('child-container');
    newChildContainer.append(newElementTitle, newElementAuthor, newElementYear);

    const newContainer = document.createElement('div');
    newContainer.classList.add('class', 'new-container');
    newContainer.setAttribute('id', `book-${bookObject.id}`);

    newContainer.append(newChildContainer);

    if (bookObject.isCompleted) {
        const undoButton = document.createElement('button');
        undoButton.innerText = 'Belum Dibaca';
        undoButton.addEventListener('click', function() {
            undoBookFromAlreadyRead(bookObject.id);
        });

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Hapus Buku';
        removeButton.addEventListener('click', function() {
            // Membuat BOM untuk menanyakan apakah buku yakin ingin dihapus
            const hapusBuku = prompt('Apakah Kamu Ingin Menghapus Buku Dari Daftar Rak? (hapus/tidak)');
            if(hapusBuku == 'hapus'){
                removeBookFromAlreadyRead(bookObject.id);
                alert(`Buku ${bookObject.title} Akan Dihapus`)
            } else {
                alert(`Buku ${bookObject.title} Tidak Jadi Dihapus`);
            }
            
        });

        const rightChild = document.createElement('div');
        rightChild.setAttribute('class', 'right-child');
        rightChild.append(undoButton, removeButton)

        newContainer.append(rightChild);
    } else {
        const checkButton = document.createElement('button');
        checkButton.innerText = 'Sudah Dibaca';
        
        checkButton.addEventListener('click', function() {
            addBookAlreadyRead(bookObject.id);
            window.alert(`Buku ${bookObject.title} Sudah Dibaca`);
        });

        const removeButton = document.createElement('button');
        removeButton.innerText = 'Hapus Buku';
        removeButton.addEventListener('click', function() {
            // Membuat BOM untuk menanyakan apakah buku yakin ingin dihapus
            const hapusBuku = prompt('Apakah Kamu Ingin Menghapus Buku Dari Daftar Rak? (hapus/tidak)');
            if(hapusBuku == 'hapus'){
                removeBookFromAlreadyRead(bookObject.id);
                alert(`Buku ${bookObject.title} Akan Dihapus`)
            } else {
                alert(`Buku ${bookObject.title} Tidak Jadi Dihapus`);
            }
            
        });
        
        const rightChild = document.createElement('div');
        rightChild.setAttribute('class', 'right-child');
        rightChild.append(checkButton, removeButton)

        newContainer.append(rightChild);
    }

    return newContainer;
}

document.addEventListener(RENDER_BOOK_EVENT, function() {
    const unCompletedBOOKList = document.querySelector('#books');
    unCompletedBOOKList.innerHTML = '';

    const completedBOOKList = document.querySelector('#completed-books');
    completedBOOKList.innerHTML = '';

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if(!bookItem.isCompleted) {
            unCompletedBOOKList.append(bookElement);
        } else {
            completedBOOKList.append(bookElement);
        }
    }
});

function addBookAlreadyRead(bookId) {
    const bookTarget = findBook(bookId);

    if(bookTarget == null) return;

    bookTarget.isCompleted = true;
    localStorage.setItem('BOOKS', JSON.stringify(books));
    document.dispatchEvent(new Event(RENDER_BOOK_EVENT));
};

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id == bookId) {
            return bookItem;
        }
    }
    return null;
};

function removeBookFromAlreadyRead(bookId) {
    const bookTarget = findBookIndex(bookId);

    if(bookTarget === -1) return;

    books.splice(bookTarget, 1);
    localStorage.setItem('BOOKS', JSON.stringify(books));
    document.dispatchEvent(new Event(RENDER_BOOK_EVENT));
};

function undoBookFromAlreadyRead(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    localStorage.setItem('BOOKS', JSON.stringify(books));

    document.dispatchEvent(new Event(RENDER_BOOK_EVENT));
};

function findBookIndex(bookId) {
    for(const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
};

const unCompletedBOOKList = document.querySelector('#books');
unCompletedBOOKList.innerHTML = '';

const completedBOOKList = document.querySelector('#completed-books');
completedBOOKList.innerHTML = '';

for (const bookItem of books) {
    const bookElement = makeBook(bookItem);
    if (!bookItem.isCompleted) {
        unCompletedBOOKList.append(bookElement);
    } else {
        completedBOOKList.append(bookElement);
    }
};


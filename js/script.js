// settings
const MaxImageSize = 2; // Mb


// elements
const MainPage = document.getElementById('main_page');
const ContactPage = document.getElementById('contact_page');
const PreviewPage = document.getElementById('preview');


// buttons
const ShowMain = document.getElementById('show_main_page');
const ShowContact = document.querySelectorAll('.show_contact_page'); // collection
const ShowCard = document.getElementById('create_card');
const Download = document.getElementById('download');


// inputs
const Photo = document.getElementById('photo');
const Name = document.getElementById('name');
const Comments = document.getElementById('comments');
const Instagram = document.getElementById('instagram');
const Facebook = document.getElementById('facebook');
const Twitter = document.getElementById('twitter');
const Telegram = document.getElementById('telegram');
const Github = document.getElementById('github');
const Viber = document.getElementById('viber');
const Youtube = document.getElementById('youtube');


// functions
const showMainPage = () => {
    ContactPage.classList.add('hide');
    PreviewPage.classList.add('hide');
    MainPage.classList.remove('hide');
};

const showContactPage = () => {
    MainPage.classList.add('hide');
    PreviewPage.classList.add('hide');
    ContactPage.classList.remove('hide');
}

const showPreviewPage = (e) => {
    fillPreviewPage(e);
    MainPage.classList.add('hide');
    ContactPage.classList.add('hide');
    PreviewPage.classList.remove('hide');
};

const checkFile = (file) => {
    if (!file)
        return null; // файл не выбран

    let index_type = file.name.lastIndexOf('.') + 1;
    let type = file.name.substr(index_type);
    if ('jpeg' !== type && 'jpg' !== type && 'png' !== type)
        return null; // неверный тип файла

    if (MaxImageSize * 1024 * 1024 < file.size)
        return null; // превышен размер файла

    return file.name;
};

const fillPreviewPage = (e) => {
    e.preventDefault();
};


// creating event

// переход на главную
ShowMain.addEventListener('click', showMainPage);

// переход на заполнение контактов
for (let showContact of ShowContact) {
    showContact.addEventListener('click', showContactPage);
}

// переход на предварительный просмотр
ShowCard.addEventListener('click', showPreviewPage);


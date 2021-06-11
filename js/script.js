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
const Status = document.getElementById('comments');
const Instagram = document.getElementById('instagram');
const Facebook = document.getElementById('facebook');
const Twitter = document.getElementById('twitter');
const Telegram = document.getElementById('telegram');
const Github = document.getElementById('github');
const Viber = document.getElementById('viber');
const Youtube = document.getElementById('youtube');


// containers
const PhotoContainer = document.getElementById('photo_container');
const NameContainer = document.getElementById('name_container');
const StatusContainer = document.getElementById('status_container');
const LinksContainer = document.getElementById('links');


// functions
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

const createAvatar = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    let img = document.createElement('img');
    img.id = 'avatar';
    reader.onloadend = function () {
        img.src = reader.result;
    }
    let div = document.createElement('div');
    div.id = 'avatardiv';
    div.append(img);

    return div;
};

const createLink = (type, name) => {
    let resultLink = '';
    switch (type) {
        case 'instagram':
            resultLink = 'https://www.instagram.com/' + name;
            break;
        case 'facebook':
            resultLink = 'https://www.facebook.com/profile.php?id=' + name;
            break;
        case 'twitter':
            resultLink = 'https://twitter.com/' + name;
            break;
        case 'telegram':
            resultLink = 'https://telegram.me/' + name;
            break;
        case 'github':
            resultLink = 'https://github.com/' + name;
            break;
        case 'viber':
            resultLink = 'viber://chat?number=' + name;
            break;
        case 'youtube':
            resultLink = name;
            break;
    }

    return resultLink;
}

const createLinkContainer = (type, name) => {
    const span = document.createElement('span');
    span.innerText = type;
    const div = document.createElement('div');
    div.append(span);
    const a = document.createElement('a');
    a.href = createLink(type, name);
    a.append(div);

    return a;
};

const fillPreviewPage = (e) => {
    e.preventDefault();

    if (checkFile(Photo.files[0])) {
        let photo = document.getElementById('avatardiv');
        if (photo)
            PhotoContainer.removeChild(photo);
        PhotoContainer.prepend(createAvatar(Photo.files[0]));
    }

    NameContainer.innerText = Name.value;
    StatusContainer.innerText = Status.value;

    while (LinksContainer.firstElementChild)
        LinksContainer.removeChild(LinksContainer.firstElementChild);

    if (Instagram.value)
        LinksContainer.prepend(createLinkContainer(Instagram.id, Instagram.value));
    if (Facebook.value)
        LinksContainer.prepend(createLinkContainer(Facebook.id, Facebook.value));
    if (Twitter.value)
        LinksContainer.prepend(createLinkContainer(Twitter.id, Twitter.value));
    if (Telegram.value)
        LinksContainer.prepend(createLinkContainer(Telegram.id, Telegram.value));
    if (Github.value)
        LinksContainer.prepend(createLinkContainer(Github.id, Github.value));
    if (Viber.value)
        LinksContainer.prepend(createLinkContainer(Viber.id, Viber.value));
    if (Youtube.value)
        LinksContainer.prepend(createLinkContainer(Youtube.id, Youtube.value));

};


// listeners
const showMainPage = () => {
    ContactPage.classList.add('hide');
    PreviewPage.classList.add('hide');
    MainPage.classList.remove('hide');
};

const showContactPage = () => {
    MainPage.classList.add('hide');
    PreviewPage.classList.add('hide');
    ContactPage.classList.remove('hide');
};

const showPreviewPage = (e) => {
    fillPreviewPage(e);
    MainPage.classList.add('hide');
    ContactPage.classList.add('hide');
    PreviewPage.classList.remove('hide');
};

const checkFileAfterChange = (e) => {
    if (!checkFile(Photo.files[0]))
        e.target.value = '';
};

const changePhotoPath = (path) => {
    if (checkFile(Photo.files[0])) {
        let indF = path.indexOf('src=\"');
        let indE = path.indexOf('\"', indF + 5);
        let substr = path.slice(indF + 5, indE);
        return path.replace(substr, Photo.files[0].name);
    }
    return path;
};

const downloadFile = () => {
    let type = 'data:application/octet-stream;base64, ';
    let style = '<style>\n' + document.querySelector('style').innerHTML + '\n</style>\n';
    let html = document.getElementById('card').innerHTML;
    html = "<div class=\"main\">" + changePhotoPath(html) + "</div>";
    let text = btoa(style + html);
    Download.href = type + text;
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

// выбор фото пользователем
Photo.addEventListener('change', checkFileAfterChange);

Download.addEventListener('click', downloadFile);
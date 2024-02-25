import iziToast from 'izitoast';
import errorIcon from '/img/error-icon.png';
import successIcon from '/img/success-icon.png';

const FULLFILED_STATE = 'fulfilled';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');

function showErrorMessage(msgText) {
    iziToast.error({
        title: 'Error',
        message: msgText,
        iconUrl: errorIcon,
        position: 'topRight',
        titleColor: '#FFF',
        messageColor: '#FFF',
        backgroundColor: '#EF4040',
        theme: 'dark',
        progressBar: false,
        close: false,
    });
}

function showSuccessMessage(msgText){
    iziToast.success({
        title: 'OK',
        message: msgText,
        iconUrl: successIcon,
        position: 'topRight',
        titleColor: '#FFF',
        messageColor: '#FFF',
        backgroundColor: '#59A10D',
        theme: 'dark',
        progressBar: false,
        close: false,
    });
}

function onSubmit(event) {
    event.preventDefault();

    const delayInMs = parseInt(delayInput.value);

    if (isNaN(delayInMs) || delayInMs <= 0) {
        showErrorMessage('Delay must be an integer positive number');
        return;
    }

    const checkedPromiseStateInput = document.querySelector('input[name="state"]:checked').value;

    new Promise((resolve, reject) => {
        if (checkedPromiseStateInput === FULLFILED_STATE) {
          setTimeout(() => resolve(delayInMs), delayInMs);
        } else {
          setTimeout(() => reject(delayInMs), delayInMs);
        }
    }).then(delay => {
        showSuccessMessage(`Fulfilled promise in ${delay}ms`);
    }).catch(delay => {
        showErrorMessage(`Rejected promise in ${delay}ms`);
    })

    event.target.reset();
}

form.addEventListener('submit', onSubmit);

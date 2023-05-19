import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('click', onPromiseCreate);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  if (inputAmount < 0) {
    // inputAmount <= 0 || inputAmount === 0; так виводиться навіть коли нічого не введено(((((((((((((
    return Notiflix.Notify.warning(
      `❗ Amount cannot be less than or equal to zero! Try`
    );
  } else {
    for (let i = 1; i <= inputAmount; i += 1) {
      createPromise(i, inputDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          );
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
      inputDelay += inputStep;
      e.currentTarget.reset();
    }
  }
}

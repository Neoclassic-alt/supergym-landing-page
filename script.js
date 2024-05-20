const swiper = new Swiper('.swiper-1', {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next-1',
    prevEl: '.swiper-button-prev-1',
  },
  spaceBetween: 40,
  breakpoints: {
    768: {
      slidesPerView: 2,
    },
    1080: {
      slidesPerView: 3,
    },
    1225: {
      slidesPerView: 4,
    }
  }
});

const swiper2 = new Swiper('.swiper-2', {
  loop: true,
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next-2',
    prevEl: '.swiper-button-prev-2',
  },
});

const videoHolder = document.querySelector(".video-holder")
const playButton = document.querySelector(".play-button")
const iframe = document.querySelector("iframe")

videoHolder.addEventListener("click", () => {
  videoHolder.remove()
  playButton.remove()
  iframe.hidden = false
})

const tabs = document.querySelectorAll(".tabs")

const dataV1 = document.querySelectorAll(`[data-variant='1']`)
const dataV2 = document.querySelectorAll(`[data-variant='2']`)
const dataV3 = document.querySelectorAll(`[data-variant='3']`)

tabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    event.preventDefault()
    if (event.target.closest(".tab")) {
      const activeTab = document.querySelector(".tab-active")
      activeTab.classList.remove("tab-active")
      event.target.classList.add("tab-active")
      if (event.target.dataset.term === "1") {
        dataV1.forEach((price) => {
          price.hidden = false
        })
        dataV2.forEach((price) => {
          price.hidden = true
        })
        dataV3.forEach((price) => {
          price.hidden = true
        })
      }
      if (event.target.dataset.term === "2") {
        dataV1.forEach((price) => {
          price.hidden = true
        })
        dataV2.forEach((price) => {
          price.hidden = false
        })
        dataV3.forEach((price) => {
          price.hidden = true
        })
      }
      if (event.target.dataset.term === "3") {
        dataV1.forEach((price) => {
          price.hidden = true
        })
        dataV2.forEach((price) => {
          price.hidden = true
        })
        dataV3.forEach((price) => {
          price.hidden = false
        })
      }
    }
  })
})

// == Модальное окно == //

const modal = document.querySelector(".modal")

const modalCloseButton = document.querySelector(".modal__close")
modalCloseButton.addEventListener("click", () => {
  modal.classList.remove("modal__active")
})

// Закрытие за пределами модального окна

modal.addEventListener("click", (e) => {
  if (!e.target.closest(".modal__content")) {
    modal.classList.remove("modal__active")
  }
})

const priceCardButtons = document.querySelectorAll(".price-card__button")

priceCardButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault()
    modal.classList.add("modal__active")
  })
})

const lineLinks = document.querySelectorAll(".red-line-link, .blue-line-link")

lineLinks.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault()
    modal.classList.add("modal__active")
  })
})

/* == Телефонная маска == */

window.addEventListener("DOMContentLoaded", function() {
  [].forEach.call( document.querySelectorAll('.tel'), function(input) {
  var keyCode;
  function mask(event) {
      event.keyCode && (keyCode = event.keyCode);
      var pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      var matrix = "+7 (___) ___ ____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
          });
      i = new_value.indexOf("_");
      if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
      }
      var reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function(a) {
              return "\\d{1," + a.length + "}"
          }).replace(/[+()]/g, "\\$&");
      reg = new RegExp("^" + reg + "$");
      if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
      if (event.type == "blur" && this.value.length < 5)  this.value = ""
  }

  input.addEventListener("input", mask, false);
  input.addEventListener("focus", mask, false);
  input.addEventListener("blur", mask, false);
  input.addEventListener("keydown", mask, false)
});

});

// == Валидация формы == //

const textValid1 = document.querySelector(".novalid-text-1")
const textValid2 = document.querySelector(".novalid-text-2")
const nameInput = document.querySelector("[name='name']")
const phoneInput = document.querySelector("[name='phone']")
const submitButton = document.querySelector(".pre-footer-submit")

let timer = 30
let errors = 0

nameInput.addEventListener("input", (event) => {
  if (/[a-z]/.test(nameInput.value)) {
    textValid1.classList.remove("novalid-text-1")
    textValid1.innerHTML = "Пожалуйста, вводите только кириллицу"
    submitButton.disabled = true
    if (event.inputType == "insertText") {
      errors += 1
    }
  } else if (/[0-9]/.test(nameInput.value)) {
    textValid1.classList.remove("novalid-text-1")
    textValid1.innerHTML = "Пожалуйста, вводите только буквы"
    submitButton.disabled = true
    if (event.inputType == "insertText") {
      errors += 1
    }
  } else if (/'.*'/.test(nameInput.value)) {
    textValid1.classList.remove("novalid-text-1")
    textValid1.innerHTML = "Допускается не более одного апострофа"
    submitButton.disabled = true
    if (event.inputType == "insertText") {
      errors += 1
    }
  } else {
    textValid1.classList.add("novalid-text-1")
    submitButton.disabled = false
  }

  if (errors >= 3) {
    nameInput.disabled = true
    textValid1.innerHTML = "Ввод заблокирован на 30 секунд"

    setTimeout(() => {
      nameInput.disabled = false
      textValid1.classList.add("novalid-text-1")
      timer = 30
      errors = 0
      clearInterval(timerId)
    }, 30000)

    const timerId = setInterval(() => {
      timer -= 1
      textValid1.innerHTML = `Ввод заблокирован на ${timer} секунд`
    }, 1000)
  }
})

const form = document.querySelector(".start-form")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  if (!textValid1.value) {
    textValid1.classList.remove("novalid-text-1")
    textValid1.innerHTML = "Поле должно быть заполнено"
  } else {
    textValid1.classList.add("novalid-text-1")
  }
  if (!textValid2.value) {
    textValid2.classList.remove("novalid-text-2")
    textValid2.innerHTML = "Поле должно быть заполнено"
  } else {
    textValid1.classList.add("novalid-text-2")
  }
  if (textValid1.value && textValid2.value) {
    const formData = new formData(form)
    await fetch('/formUrl', { /* отправка на абстрактный бэкенд */
      method: 'POST',
      body: formData,
    })
  }
})
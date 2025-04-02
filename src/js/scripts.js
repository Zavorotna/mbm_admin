document.addEventListener("DOMContentLoaded", function () {
    //color
    const inputs = document.querySelectorAll('.color input[type="radio"]')
    inputs.forEach(input => {
        let color = input.value,
            span = input.nextElementSibling
        input.style.backgroundColor = color
        console.log(color);
        span.style.border = "1px solid"
        span.style.borderColor = color === '#fff' ? '#000' : 'transparent'
    })

    //sort
    if (document.querySelector(".sort-select")) {
        const selects = document.querySelectorAll('.select')

        selects.forEach(select => {
            const selectIn = select.querySelector('.select__in'),
                selectItems = select.querySelectorAll('.select__item'),
                thisInput = select.querySelector('.select__input'),
                event = new Event('change')

            selectIn.addEventListener('click', () => {
                selects.forEach(_select => {
                    if (_select !== select)
                        _select.classList.remove('is-opened')
                })
                select.classList.toggle('is-opened')
            })
            if (selectItems.length > 0) {
                const firstItem = selectItems[0]
                thisInput.value = firstItem.dataset.value
                // selectIn.innerHTML = firstItem.innerHTML
                firstItem.classList.add('is-active')
            }
            selectItems.forEach(item => {
                item.addEventListener('click', () => {
                    thisInput.value = item.dataset.value
                    thisInput.dispatchEvent(event)
                    selectIn.innerHTML = item.innerHTML
                    selectItems.forEach(_item => {
                        _item.classList.remove('is-active')
                    })
                    item.classList.add('is-active')
                    select.classList.remove('is-opened')
                })
            })
        })

        document.addEventListener('click', e => {
            if (!e.target.closest('.select')) {
                selects.forEach(select => {
                    if (select.classList.contains('is-opened'))
                        select.classList.remove('is-opened')
                })
            }
        })

        document.addEventListener('keyup', e => {
            if (e.key == 'Escape') {
                selects.forEach(select => {
                    if (select.classList.contains('is-opened'))
                        select.classList.remove('is-opened')
                })
            }
        })
    }

    const dark = document.querySelector(".dark-bgc"),
        darkSucces = document.querySelector(".dark-bgc-succes"),
        privacy = document.querySelector(".privacy_container"),
        privacyBtn = document.querySelector(".privacyPolice"),
        cancelPopupPr = document.querySelector(".cancel_popup"),
        forms = document.querySelectorAll("form"),
        succesPopup = document.querySelector("#successPopup")

    // privacyBtn.addEventListener("click", function (e) {
    //     e.preventDefault()
    //     privacy.style.display = "block"
    //     dark.style.display = "block"
    // })

    cancelPopupPr.addEventListener("click", function (e) {
        e.preventDefault()
        // privacy.style.display = "none"
        succesPopup.style.display = "none"
        dark.style.display = "none"
        darkSucces.style.display = "none"
    })
    /*move text page*/
    const carousel = document.querySelector('.content-slider')
    if (document.querySelector(".content-slider h3")) {
        let items = [...document.querySelectorAll(".content-slider h3")],
            itemImgWidth = items[0].offsetWidth,
            isAnimatingImg = false

        // console.log(itemImgWidth);
        function updateCarouselImg() {
            while (carousel.firstChild) {
                carousel.removeChild(carousel.firstChild)
            }
            for (let i = 0; i < items.length; i++) {
                const cloneImg = items[i].cloneNode(true)
                carousel.appendChild(cloneImg)
            }

        }
        updateCarouselImg()

        function startAutoScroll() {
            let currentOffset = 0

            setInterval(() => {
                if (!isAnimatingImg) {
                    isAnimatingImg = true
                    currentOffset -= 1;


                    carousel.style.transition = 'none'
                    carousel.style.transform = `translateX(${currentOffset}px)`
                    // console.log(currentOffset);
                    if (Math.abs(currentOffset) >= itemImgWidth + 30) {
                        currentOffset = 0;
                        updateCarouselImg()
                    }
                    isAnimatingImg = false
                }
            }, 20)
        }
        startAutoScroll()
        window.addEventListener('resize', () => {
            updateCarouselImg();
        })
    }
    //fade out for main container
    if (document.querySelector('.slider-images-1') && document.querySelector('.slider-images-2')) {
        const images1 = document.querySelectorAll('.slider-images-1 img'),
            images2 = document.querySelectorAll('.slider-images-2 img')

        let currentImgIndex1 = 0,
            currentImgIndex2 = 0

        if (images1.length > 0) images1[0].classList.add('active')
        if (images2.length > 0) images2[0].classList.add('active')

        setInterval(() => {
            if (images1.length > 0) {
                images1[currentImgIndex1].classList.remove('active')
                currentImgIndex1 = (currentImgIndex1 + 1) % images1.length
                images1[currentImgIndex1].classList.add('active')
            }

            if (images2.length > 0) {
                images2[currentImgIndex2].classList.remove('active')
                currentImgIndex2 = (currentImgIndex2 + 1) % images2.length
                images2[currentImgIndex2].classList.add('active')
            }
        }, 3000)
    }

    if (document.querySelector('.slider-range')) {
        const slider = document.querySelector('.slider-range'),
            minHandle = document.querySelector('#min-handle'),
            maxHandle = document.querySelector('#max-handle'),
            range = document.querySelector('#range'),
            minPriceInput = document.querySelector('#min-price'),
            maxPriceInput = document.querySelector('#max-price'),
            minValueSpan = document.querySelector('#min-value'),
            maxValueSpan = document.querySelector('#max-value'),
            handleWidth = minHandle.offsetWidth

        let minPrice = parseFloat(minValueSpan.getAttribute("data-value")),
            maxPrice = parseFloat(maxValueSpan.getAttribute("data-value"))

        let sliderWidth

        if (localStorage.getItem('sliderWidth')) {
            sliderWidth = parseFloat(localStorage.getItem('sliderWidth'))
        } else {
            sliderWidth = slider.offsetWidth
            localStorage.setItem('sliderWidth', sliderWidth)
        }

        if (localStorage.getItem('minValue') && localStorage.getItem('maxValue') && localStorage.getItem('minPos') && localStorage.getItem('maxPos')) {
            minPriceInput.value = localStorage.getItem('minValue')
            maxPriceInput.value = localStorage.getItem('maxValue')
            minHandle.style.left = localStorage.getItem('minPos') + 'px'
            maxHandle.style.left = localStorage.getItem('maxPos') + 'px'
            updateRange()
        }

        function updateRange() {
            const minPos = minHandle.offsetLeft,
                maxPos = maxHandle.offsetLeft

            range.style.left = minPos + 'px'
            range.style.width = (maxPos - minPos) + 'px'

            const minValue = Math.round(minPrice + (minPos / (sliderWidth - handleWidth)) * (maxPrice - minPrice)),
                maxValue = Math.round(minPrice + (maxPos / (sliderWidth - handleWidth)) * (maxPrice - minPrice))

            minPriceInput.value = minValue
            maxPriceInput.value = maxValue
            minValueSpan.textContent = minValue
            maxValueSpan.textContent = maxValue

            localStorage.setItem('minValue', minValue)
            localStorage.setItem('maxValue', maxValue)
            localStorage.setItem('minPos', minPos)
            localStorage.setItem('maxPos', maxPos)
        }

        function handleDrag(e, handle) {
            e.preventDefault()

            const handleStartX = e.clientX || e.touches[0].clientX,
                handleStartLeft = handle.offsetLeft

            const onMove = (moveEvent) => {
                const moveX = moveEvent.clientX || moveEvent.touches[0].clientX
                let newLeft = moveX - handleStartX + handleStartLeft

                if (handle === minHandle) {
                    newLeft = Math.max(0, Math.min(newLeft, maxHandle.offsetLeft - handleWidth))
                } else {
                    newLeft = Math.max(minHandle.offsetLeft + handleWidth, Math.min(newLeft, sliderWidth - handleWidth))
                }

                handle.style.left = newLeft + 'px'
                updateRange()
            }

            const onEnd = () => {
                document.removeEventListener('mousemove', onMove)
                document.removeEventListener('mouseup', onEnd)
                document.removeEventListener('touchmove', onMove)
                document.removeEventListener('touchend', onEnd)
            }

            document.addEventListener('mousemove', onMove)
            document.addEventListener('mouseup', onEnd)
            document.addEventListener('touchmove', onMove)
            document.addEventListener('touchend', onEnd)
        }

        minHandle.addEventListener('mousedown', (e) => handleDrag(e, minHandle))
        maxHandle.addEventListener('mousedown', (e) => handleDrag(e, maxHandle))
        minHandle.addEventListener('touchstart', (e) => handleDrag(e, minHandle))
        maxHandle.addEventListener('touchstart', (e) => handleDrag(e, maxHandle))

        updateRange()
    }

    //burger
    if (document.querySelector(".burger")) {
        const burger = document.querySelector(".burger"),
            menu = document.querySelector(".nav"),
            cancel = document.querySelector(".cancel"),
            listItem = menu.querySelectorAll("a")

        burger.addEventListener("click", function () {
            menu.style.left = "0";
            dark.style.display = "block"
        })

        function cancelBurger() {
            menu.style.left = "-100%";
            dark.style.display = "none"
        }
        listItem.forEach(item => {
            item.addEventListener("click", cancelBurger)
        })
        cancel.addEventListener("click", function (e) {
            e.preventDefault()
            cancelBurger()
        })
        dark.addEventListener("click", cancelBurger)
    }

    // випадаючі блоки з інформацією
    function toggleVisibility(buttons, visibleClass, activeClass) {
        buttons.forEach((item) => {
            item.addEventListener("click", function (e) {
                e.preventDefault()
                const descriptionMore = item.nextElementSibling
                descriptionMore.classList.toggle(visibleClass)
                item.classList.toggle(activeClass)
            })
        })
    }

    const btnReadMore = document.querySelectorAll(".readmore")

    toggleVisibility(btnReadMore, "visible", "readmore-active")

    //btn for block info
    const buttons = document.querySelectorAll('.nav a '),
        sections = document.querySelectorAll('.description-more'),
        footerBtn = document.querySelectorAll(".menu_footer a")
    let activeSection = null

    function hideAllSections() {
        sections.forEach(section => section.classList.remove('visible'))
    }

    function deactivateAllButtons() {
        buttons.forEach(button => button.classList.remove('visible'))
    }

    function deactivateAllButtons() {
        footerBtn.forEach(button => button.classList.remove('visible'))
    }

    buttons.forEach(button => {
        button.addEventListener('click', function (event) {
            const target = button.getAttribute('data-target')

            hideAllSections()
            deactivateAllButtons()

            const sectionToShow = document.getElementById(target)
            if (sectionToShow) {
                if (activeSection && activeSection.previousElementSibling) {
                    activeSection.previousElementSibling.classList.remove('readmore-active')
                }

                sectionToShow.classList.add('visible')
                if (sectionToShow.previousElementSibling) {
                    sectionToShow.previousElementSibling.classList.add('readmore-active')
                }

                activeSection = sectionToShow
            }
        })
    })
    footerBtn.forEach(button => {
        button.addEventListener('click', function (event) {
            const target = button.getAttribute('data-target')

            hideAllSections()
            deactivateAllButtons()

            const sectionToShow = document.getElementById(target)
            if (sectionToShow) {
                if (activeSection && activeSection.previousElementSibling) {
                    activeSection.previousElementSibling.classList.remove('readmore-active')
                }

                sectionToShow.classList.add('visible')
                if (sectionToShow.previousElementSibling) {
                    sectionToShow.previousElementSibling.classList.add('readmore-active')
                }

                activeSection = sectionToShow
            }
        })
    })

    hideAllSections()
    deactivateAllButtons()

    //spivpracia popup
    const spivpraciaBtn = document.querySelectorAll(".spivpracia_btn"),
        popupSpivpracia = document.querySelector(".spivpracia_popup"),
        cancelSpevpr = document.querySelector(".cancel_spivpracia"),
        darkBg = document.querySelector(".dark-bgc")

    spivpraciaBtn.forEach(item => {
        item.addEventListener("click", function (e) {
            e.preventDefault()
            popupSpivpracia.style.display = "block"
            darkBg.style.display = "block"
        })
    })

    function cancelPopup(e) {
        e.preventDefault()
        popupSpivpracia.style.display = "none"
        succesPopup.style.display = "none"
        darkBg.style.display = "none"
        darkSucces.style.display = "none"
    }

    cancelSpevpr.addEventListener("click", cancelPopup)
    darkBg.addEventListener("click", cancelPopup)
    darkSucces.addEventListener("click", cancelPopup)

    //succes popup
    succesPopup.style.transition = "opacity 0.5s ease"
    succesPopup.style.opacity = "0"
    succesPopup.style.zIndex = "-1"

    darkSucces.style.transition = "opacity 0.5s ease"
    darkSucces.style.opacity = "0"

    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault()
            popupSpivpracia.style.display = "none"
            succesPopup.style.display = "block"
            succesPopup.style.zIndex = "10"
            dark.style.display = "none"
            darkSucces.style.display = "block"

            setTimeout(() => {
                succesPopup.style.opacity = "1"
                succesPopup.style.visibility = "visible"
                darkSucces.style.opacity = "1"
            }, 10)

            setTimeout(() => {
                succesPopup.style.opacity = "0"
                succesPopup.style.visibility = "hidden"
                darkSucces.style.opacity = "0"

                setTimeout(() => {
                    darkSucces.style.display = "none"
                    succesPopup.style.display = "none"
                }, 500)

                form.submit()
            }, 4000)
        })
    })
    //autoload video after click on document
    if (document.querySelector('video') && window.innerWidth < 1024) {
        const video = document.querySelectorAll('video');

        function playVideo() {
            video.forEach(item => {
                item.play();
            })
            document.removeEventListener('click', playVideo);
        }
        document.addEventListener('click', playVideo);
    }

    if (document.querySelector(".toggle-btn")) {
        const toggleButtons = document.querySelectorAll(".toggle-btn"),
            sections = {
                rozdrib: document.querySelector("#rozdrib"),
                gurt: document.querySelector("#gurt")
            }

        toggleButtons.forEach(button => {
            button.addEventListener("click", function (e) {
                e.preventDefault()

                toggleButtons.forEach(btn => btn.classList.remove("active_product"))
                this.classList.add("active_product")

                const target = this.dataset.target
                Object.keys(sections).forEach(key => {
                    sections[key].style.display = key === target ? "block" : "none"
                })
            })
        })

        sections.gurt.style.display = "none"
    }

    function slider() {
        const sliderContainer = document.querySelector('.carousel-card'),
            sliderImages = [...document.querySelectorAll('.carousel-item')],
            btnSlider = document.querySelectorAll(".btn"),
            imgBlock = document.querySelector(".img-block"),
            carouselContainer = document.querySelector(".small-img"),
            mainImg = document.querySelector(".main-img"),
            cardMain = document.querySelector(".description_container")
        let imageHeight,
            containerHeight,
            imageWidth,
            currentSlide = 0
        for (let i = 0; i < sliderImages.length; i++) {
            console.log(mainImg.offsetHeight / 2);
            sliderImages[i].style.height = mainImg.offsetHeight / 2 - 2 + "px"
        }
        mainImg.style.height = cardMain.offsetHeight + "px"
        sliderContainer.style.height = mainImg.offsetHeight + "px"
        // console.log(mainImg.offsetHeight);
        btnSlider.forEach(itemBtn => {
            if (sliderImages.length > 2) {
                imageHeight = sliderImages[0].offsetHeight + 10,
                    containerHeight = imageHeight * 2,
                    imageWidth = sliderImages[0].offsetWidth
                imgBlock.style.height = containerHeight + 50 + "rem"
                carouselContainer.style.height = containerHeight + "rem"
                itemBtn.style.display = "block"
                carouselContainer.style.padding = "55px 0 25rem"
                // carouselContainer.style.margin = "0 0 25px"
            } else if (sliderImages.length == 2) {
                imgBlock.style.display = "grid"
                carouselContainer.style.display = "block"
                itemBtn.style.display = "none"
            } else {
                itemBtn.style.display = "none"
                carouselContainer.style.padding = ""
                imgBlock.style.display = "block"
                carouselContainer.style.display = "none"
            }
        })

        function nextSlide(e) {
            e.preventDefault()
            if (currentSlide > 0) {
                currentSlide--
                sliderContainer.style.transition = 'transform 0.3s ease-in-out'
                sliderContainer.style.transform = `translateY(-${currentSlide * imageHeight}px)`
            }
        }

        function prevSlide(e) {
            e.preventDefault()
            if (currentSlide < sliderImages.length - 2) {
                currentSlide++
                sliderContainer.style.transition = 'transform 0.3s ease-in-out'
                sliderContainer.style.transform = `translateY(-${currentSlide * imageHeight}px)`
            }
        }

        const nextButton = document.querySelector('.btn-next')
        if (nextButton) {
            nextButton.style.width = imageWidth + "rem"
            nextButton.querySelector("svg").style.width = imageWidth + "rem"
            nextButton.addEventListener('click', nextSlide)
        }

        const prevButton = document.querySelector('.btn-prev')
        if (prevButton) {
            prevButton.style.width = imageWidth + "rem"
            prevButton.querySelector("svg").style.width = imageWidth + "rem"
            prevButton.addEventListener('click', prevSlide)
        }

    }
    if (document.querySelector(".img-block")) {
        slider()
    }
    if (document.querySelector(".products-sm")) {
        let productImages = document.querySelectorAll('.products-sm img'),
            generalImg = document.querySelector('.general-img img')

        productImages.forEach(function (image) {
            image.addEventListener('click', function () {
                let clickedImageUrl = this.src
                generalImg.src = clickedImageUrl
            })
        })
    }
    //перевірка відправки форми для телефону і імені

    const phoneInput = document.querySelectorAll('.phoneInput'),
        errorName = document.querySelectorAll('.error-name'),
        errorTel = document.querySelectorAll('.error-tel')
    phoneInput.forEach(item => {
        item.addEventListener('input', function () {
            let phoneNumber = item.value.trim()
            const mask = "+380"

            if (!phoneNumber.startsWith(mask)) {
                phoneNumber = mask + phoneNumber
            }

            let cleanedValue = phoneNumber.replace(/[^\d+]/g, "")

            if (cleanedValue.length > 13) {
                cleanedValue = cleanedValue.slice(0, 13)
            }

            const validInput = isValidPhoneNumber(cleanedValue)

            if (validInput && cleanedValue.length === 13) {
                item.style.borderColor = 'green'
                item.style.color = '#121212'

                errorTel.forEach(item => {
                    item.innerText = ""
                })
            } else {
                item.style.borderColor = '#EB4242'
                item.style.color = '#EB4242'
                errorTel.forEach(item => {
                    item.innerText = "Введіть коректний номер телефону"
                })
            }
        })
    })

    function validateForm(form) {
        const phoneInput = form.querySelector("input[name='userPhone']"),
            phoneNumber = phoneInput.value.trim()

        if (!phoneNumber || !isValidPhoneNumber(phoneNumber) || phoneNumber.length < 13) {
            errorTel.forEach(item => {
                item.innerText = "Введіть коректний номер телефону"
            })
            return false
        }

        const inputFields = form.querySelectorAll("input[name='userName']")
        for (const inputField of inputFields) {
            const userInput = inputField.value.trim()
            if (userInput.length < 3) {
                errorName.forEach(item => {
                    item.innerText = 'Мінімальна кількість символів для імені: 3'
                })
                return false
            }
            if (userInput.length > 30) {
                errorName.forEach(item => {
                    item.innerText = 'Максимальна кількість символів для імені: 30'
                })
                return false
            }
        }
        return true
    }

    document.querySelectorAll("form[action='sendorder.php'], form[action='senddata.php'], form[action='sendcontact.php']").forEach(form => {
        form.addEventListener("submit", (e) => {
            if (!validateForm(form)) {
                e.preventDefault()
            }
        })
    })


    function isValidPhoneNumber(phoneNumber) {
        return /^\+?(\d{2})?([(]?\d{3}[)]?)\s?[-]?\s?(?:\d{3})\s?[-]?(?:\s?\d{2})\s?[-]?(?:\s?\d{2})$/.test(phoneNumber)
    }

    const inputMasks = document.querySelectorAll(".inputMask");

    inputMasks.forEach(function (inputMask) {
        inputMask.addEventListener("click", function () {
            if (!inputMask.value) {
                inputMask.value = "+380";
            }
        });

        inputMask.addEventListener("input", function () {
            let inputValue = inputMask.value;
            let cleanedValue = inputValue.replace(/[^\d+]/g, "");

            inputMask.value = cleanedValue;

            if (cleanedValue.length > 13) {
                inputMask.value = cleanedValue.slice(0, 13);
            }

            if (!cleanedValue.startsWith("+380")) {
                inputMask.value = "+380" + cleanedValue.slice(3);
            }
        });
    });
})
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
})
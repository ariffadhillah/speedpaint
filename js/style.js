function initializeDropdowns(dropdownSelector) {
    const dropdownContainers = document.querySelectorAll(dropdownSelector);

    dropdownContainers.forEach(dropdownContainer => {
        const dropdownHeader = dropdownContainer.querySelector(".dropdown-header");
        const dropdownItems = dropdownContainer.querySelectorAll(".dropdown-item");
        const closeButton = dropdownContainer.querySelector(".close-button");


        const toggleDropdown = () => {
            dropdownContainer.classList.toggle("active");
        };
  
        const getMaxCharacters = () => {
            return window.matchMedia("(max-width: 768px)").matches ? 15 : 22;
        };

        const truncateText = (text, maxLength) => {
            return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        };

        const updateHeader = (item) => {
            const titleText = item.querySelector(".title-dropdown-item").textContent;
            const truncatedText = truncateText(titleText, getMaxCharacters()); 
            dropdownHeader.textContent = truncatedText; 

            dropdownItems.forEach(dropdownItem => {
                dropdownItem.classList.remove("selected");
            });

            item.classList.add("selected");

            dropdownContainer.classList.remove("active"); 
        };

        dropdownHeader.addEventListener("click", toggleDropdown);

        dropdownItems.forEach(item => {
            item.addEventListener("click", () => updateHeader(item));
        });

        if (closeButton) {
            closeButton.addEventListener("click", () => {
                const isMobile = window.matchMedia("(max-width: 768px)").matches;
                if (isMobile) {
                    dropdownContainer.classList.remove("active");
                }
            });
        }
    });

    document.addEventListener("click", (e) => {
        dropdownContainers.forEach(dropdownContainer => {
            if (!dropdownContainer.contains(e.target)) {
                dropdownContainer.classList.remove("active");
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initializeDropdowns(".dropdown-container");
});



// // sidebar 
document.addEventListener('DOMContentLoaded', () => {
    const initializeSidebar = (options) => {
        const sidebarSelector = options.sidebarSelector || '.sidebar-item';
        const offcanvasSelector = options.offcanvasSelector || '.offcanvas';
        const defaultOffcanvasId = options.defaultOffcanvasId || 'offcanvasHandStyles';
        const mainContentSelector = options.mainContentSelector || '.main-content';

        const sidebarLinks = document.querySelectorAll(sidebarSelector);
        const offcanvasElements = document.querySelectorAll(offcanvasSelector);
        const mainContent = document.querySelector(mainContentSelector);

        const deactivateSidebarLinks = () => {
            sidebarLinks.forEach(link => link.classList.remove('active'));
        };

        const hideAllOffcanvas = () => {
            offcanvasElements.forEach(offcanvas => {
                offcanvas.classList.remove('show');
                offcanvas.style.visibility = 'hidden'; 
            });
        };

        const showDefaultOffcanvas = () => {
            const defaultOffcanvas = document.getElementById(defaultOffcanvasId);
            if (defaultOffcanvas) {
                defaultOffcanvas.classList.add('show'); 
                defaultOffcanvas.style.visibility = 'visible'; 

                
                const defaultLink = document.querySelector(`[data-bs-target="#${defaultOffcanvasId}"]`);
                if (defaultLink) {
                    defaultLink.classList.add('active');
                }

                
                if (mainContent) {
                    mainContent.classList.add('expanded');
                }
            }
        };

        const addSidebarLinkListeners = () => {
            sidebarLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();

                    if (link.classList.contains('active')) {
                        // console.log('Link sudah aktif. Tidak ada tindakan.');
                        return;
                    }

                    deactivateSidebarLinks();
                    hideAllOffcanvas();

                    link.classList.add('active');
                    const targetSelector = link.getAttribute('data-bs-target');
                    if (targetSelector) {
                        const targetElement = document.querySelector(targetSelector);
                        if (targetElement) {
                            targetElement.classList.add('show');
                            targetElement.style.visibility = 'visible';
                        }
                    }

                    if (mainContent) mainContent.classList.add('expanded');
                });
            });
        };

        const addCloseButtonListeners = () => {
            offcanvasElements.forEach(offcanvas => {
                const closeButton = offcanvas.querySelector('.btn-close');
                if (closeButton) {
                    closeButton.addEventListener('click', () => {
                        deactivateSidebarLinks();
                        offcanvas.classList.remove('show');
                        offcanvas.style.visibility = 'hidden';
                        if (mainContent) mainContent.classList.remove('expanded');
                    });
                }
            });
        };

        hideAllOffcanvas(); 
        showDefaultOffcanvas(); 
        addSidebarLinkListeners();
        addCloseButtonListeners();
    };

    initializeSidebar({
        sidebarSelector: '.sidebar-item',
        offcanvasSelector: '.offcanvas',
        defaultOffcanvasId: 'offcanvasHandStyles',
        mainContentSelector: '.main-content'
    });
});



//  slider input/range

function updateSlider(slider, inputId) {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;

    slider.style.background = `linear-gradient(to right, #424242 ${percentage}%, #1f1f1f ${percentage}%)`;


    const associatedInput = document.getElementById(inputId);
    if (associatedInput) {
        associatedInput.value = value;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateSlider(document.getElementById("slider1"), 'input1');
    updateSlider(document.getElementById("slider2"), 'input2');
    updateSlider(document.getElementById("slider3"), 'input3');
});


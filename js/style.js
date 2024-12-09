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



// Sidebar
document.addEventListener('DOMContentLoaded', () => {
    const initializeSidebar = (options) => {
        
        const sidebarSelector = options.sidebarSelector || '.sidebar-item';
        const mainContentSelector = options.mainContentSelector || '.main-content';
        const closeButtonSelector = options.closeButtonSelector || '.btn-close';

        const sidebarLinks = document.querySelectorAll(sidebarSelector);
        const mainContent = document.querySelector(mainContentSelector);
        const closeButtons = document.querySelectorAll(closeButtonSelector);

        const deactivateSidebarLinks = () => {
            sidebarLinks.forEach(link => link.classList.remove('active'));
        };

        const addSidebarLinkListeners = () => {
            sidebarLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault(); 
                    deactivateSidebarLinks(); 
                    link.classList.add('active'); 
                    if (mainContent) mainContent.classList.add('expanded'); 
                });
            });
        };

        const addCloseButtonListeners = () => {
            closeButtons.forEach(button => {
                button.addEventListener('click', () => {
                    deactivateSidebarLinks(); 
                    if (mainContent) mainContent.classList.remove('expanded');
                });
            });
        };

        addSidebarLinkListeners();
        addCloseButtonListeners();
    };

    initializeSidebar({
        sidebarSelector: '.sidebar-item',
        mainContentSelector: '.main-content',
        closeButtonSelector: '.btn-close'
    });
});





//  slider input/range

function updateSlider(slider, initialValue) {
    const value = slider.value;
    const max = slider.max;
    const percentage = (value / max) * 100;

    slider.style.background = `linear-gradient(to right, #424242 ${percentage}%, #1f1f1f ${percentage}%)`;

    if (slider.value == initialValue) {
        slider.style.background = `linear-gradient(to right, #424242 ${initialValue}%, #1f1f1f ${initialValue}%)`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateSlider(document.getElementById("slider1"), 28);
    updateSlider(document.getElementById("slider2"), 45);
    updateSlider(document.getElementById("slider3"), 35);
});




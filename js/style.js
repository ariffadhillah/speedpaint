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



// // sidebar new
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



// // sidebar

// document.addEventListener('DOMContentLoaded', () => {
//     const initializeSidebar = (options) => {
//         const sidebarSelector = options.sidebarSelector || '.sidebar-item';
//         const offcanvasSelector = options.offcanvasSelector || '.offcanvas';
//         const mainContentSelector = options.mainContentSelector || '.main-content';

//         const sidebarLinks = document.querySelectorAll(sidebarSelector);
//         const offcanvasElements = document.querySelectorAll(offcanvasSelector);
//         const mainContent = document.querySelector(mainContentSelector);

//         const deactivateSidebarLinks = () => {
//             sidebarLinks.forEach(link => link.classList.remove('active'));
//         };

//         const hideAllOffcanvas = () => {
//             offcanvasElements.forEach(offcanvas => {
//                 offcanvas.classList.remove('show');
//                 offcanvas.style.visibility = 'hidden'; // Set visibility to hidden
//             });
//         };

//         const addSidebarLinkListeners = () => {
//             sidebarLinks.forEach(link => {
//                 link.addEventListener('click', (e) => {
//                     e.preventDefault();

//                     // Jika link sudah aktif, jangan lakukan apa-apa
//                     if (link.classList.contains('active')) {
//                         console.log('Link sudah aktif. Tidak ada tindakan.');
//                         return;
//                     }

//                     deactivateSidebarLinks(); // Nonaktifkan semua link sidebar
//                     hideAllOffcanvas(); // Sembunyikan semua elemen offcanvas

//                     link.classList.add('active'); // Aktifkan link yang diklik

//                     // Tampilkan elemen offcanvas terkait
//                     const targetSelector = link.getAttribute('data-bs-target');
//                     if (targetSelector) {
//                         const targetElement = document.querySelector(targetSelector);
//                         if (targetElement) {
//                             targetElement.classList.add('show');
//                             targetElement.style.visibility = 'visible'; // Set visibility to visible
//                         }
//                     }

//                     // Perluas main content (jika ada)
//                     if (mainContent) mainContent.classList.add('expanded');
//                 });
//             });
//         };

//         const addCloseButtonListeners = () => {
//             offcanvasElements.forEach(offcanvas => {
//                 const closeButton = offcanvas.querySelector('.btn-close');
//                 if (closeButton) {
//                     closeButton.addEventListener('click', () => {
//                         deactivateSidebarLinks(); // Nonaktifkan semua link
//                         offcanvas.classList.remove('show'); // Tutup offcanvas
//                         offcanvas.style.visibility = 'hidden'; // Sembunyikan elemen
//                         if (mainContent) mainContent.classList.remove('expanded'); // Persempit main content
//                     });
//                 }
//             });
//         };

//         addSidebarLinkListeners();
//         addCloseButtonListeners();
//     };

//     initializeSidebar({
//         sidebarSelector: '.sidebar-item',
//         offcanvasSelector: '.offcanvas',
//         mainContentSelector: '.main-content'
//     });
// });





// // Sidebar
// document.addEventListener('DOMContentLoaded', () => {
//     const initializeSidebar = (options) => {
        
//         const sidebarSelector = options.sidebarSelector || '.sidebar-item';
//         const mainContentSelector = options.mainContentSelector || '.main-content';
//         const closeButtonSelector = options.closeButtonSelector || '.btn-close';

//         const sidebarLinks = document.querySelectorAll(sidebarSelector);
//         const mainContent = document.querySelector(mainContentSelector);
//         const closeButtons = document.querySelectorAll(closeButtonSelector);

//         const deactivateSidebarLinks = () => {
//             sidebarLinks.forEach(link => link.classList.remove('active'));
//         };

//         const addSidebarLinkListeners = () => {
//             sidebarLinks.forEach(link => {
//                 link.addEventListener('click', (e) => {
//                     e.preventDefault(); 
//                     deactivateSidebarLinks(); 
//                     link.classList.add('active'); 
//                     if (mainContent) mainContent.classList.add('expanded'); 
//                 });
//             });
//         };

//         const addCloseButtonListeners = () => {
//             closeButtons.forEach(button => {
//                 button.addEventListener('click', () => {
//                     deactivateSidebarLinks(); 
//                     if (mainContent) mainContent.classList.remove('expanded');
//                 });
//             });
//         };

//         addSidebarLinkListeners();
//         addCloseButtonListeners();
//     };

//     initializeSidebar({
//         sidebarSelector: '.sidebar-item',
//         mainContentSelector: '.main-content',
//         closeButtonSelector: '.btn-close'
//     });
// });



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




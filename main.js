document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainMenuList = document.getElementById('mainMenuList');
    const modeToggle = document.getElementById('modeToggle');
    const modeIcon = document.getElementById('modeIcon');
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const projectMenu = document.querySelector('.project-menu');

    hamburgerMenu.addEventListener('click', function () {
        if (mainMenuList.classList.contains('show')) {
            mainMenuList.style.maxHeight = '0';
            mainMenuList.style.opacity = '0';
            setTimeout(() => {
                mainMenuList.classList.remove('show');
            }, 500); // Match the duration of the CSS transition
        } else {
            mainMenuList.classList.add('show');
            setTimeout(() => {
                mainMenuList.style.maxHeight = '1000px';
                mainMenuList.style.opacity = '1';
            }, 10); // Slight delay to trigger the transition
        }
    });

    modeToggle.addEventListener('click', function (e) {
        e.preventDefault();
        if (document.body.classList.contains('dark-mode')) {
            document.body.classList.remove('dark-mode');
            document.body.classList.add('light-mode');
            modeIcon.classList.remove('bi-moon-fill');
            modeIcon.classList.add('bi-brightness-high-fill');
        } else {
            document.body.classList.remove('light-mode');
            document.body.classList.add('dark-mode');
            modeIcon.classList.remove('bi-brightness-high-fill');
            modeIcon.classList.add('bi-moon-fill');
        }
    });

    // Initialize mode based on system preference
    if (prefersDarkScheme.matches) {
        document.body.classList.add('dark-mode');
        modeIcon.classList.remove('bi-brightness-high-fill');
        modeIcon.classList.add('bi-moon-fill');
    } else {
        document.body.classList.add('light-mode');
        modeIcon.classList.remove('bi-moon-fill');
        modeIcon.classList.add('bi-brightness-high-fill');
    }

    // Infinite Scroll Functionality
    const winsize = { width: window.innerWidth, height: window.innerHeight };
    let isMobile = false; // initiate as false
    // device detection
    if (
        /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
            navigator.userAgent.substr(0, 4)
        )
    ) {
        isMobile = true;
    }

    class InfiniteMenu {
        constructor(el) {
            if (!isMobile) {
                this.DOM = { el: el };
                this.DOM.menuItems = [...this.DOM.el.querySelectorAll('.menu__item')];

                this.cloneItems();
                this.initScroll();

                this.initEvents();

                // rAF/loop
                requestAnimationFrame(() => this.render());
            } else {
                document.body.classList.add('mobile');
            }
        }
        getScrollPos() {
            return (
                (this.DOM.el.pageYOffset || this.DOM.el.scrollTop) -
                (this.DOM.el.clientTop || 0)
            );
        }
        setScrollPos(pos) {
            this.DOM.el.scrollTop = pos;
        }
        // Create menu items clones and append them to the menu items list
        // total clones = number of menu items that fit in the viewport
        cloneItems() {
            // Get the height of one menu item
            const itemHeight = this.DOM.menuItems[0].offsetHeight;
            // How many items fit in the window?
            const fitIn = Math.ceil(winsize.height / itemHeight);
            // Create [fitIn] clones from the beginning of the list

            // Remove any
            this.DOM.el
                .querySelectorAll('.loop__clone')
                .forEach((clone) => this.DOM.el.removeChild(clone));
            // Add clones
            let totalClones = 0;
            this.DOM.menuItems
                .filter((_, index) => index < fitIn)
                .map((target) => {
                    const clone = target.cloneNode(true);
                    clone.classList.add('loop__clone');
                    this.DOM.el.appendChild(clone);
                    ++totalClones;
                });

            // All clones height
            this.clonesHeight = totalClones * itemHeight;
            // Scrollable area height
            this.scrollHeight = this.DOM.el.scrollHeight;
        }
        initEvents() {
            window.addEventListener('resize', () => this.resize());
        }
        resize() {
            this.cloneItems();
            this.initScroll();
        }
        initScroll() {
            // Scroll 1 pixel to allow upwards scrolling
            this.scrollPos = this.getScrollPos();
            if (this.scrollPos <= 0) {
                this.setScrollPos(1);
            }
        }
        scrollUpdate() {
            this.scrollPos = this.getScrollPos();

            if (this.clonesHeight + this.scrollPos >= this.scrollHeight) {
                // Scroll to the top when you’ve reached the bottom
                this.setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
            } else if (this.scrollPos <= 0) {
                // Scroll to the bottom when you reach the top
                this.setScrollPos(this.scrollHeight - this.clonesHeight);
            }
        }
        render() {
            this.scrollUpdate();
            requestAnimationFrame(() => this.render());
        }
    }

    // Initialize InfiniteMenu
    new InfiniteMenu(projectMenu);
});

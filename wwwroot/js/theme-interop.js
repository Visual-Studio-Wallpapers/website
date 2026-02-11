window.themeInterop = {
    themes: {
        vs_purple: {
            primary: "#68217a",
            secondary: "#8b2da2",
            background: "#f5f5f5",
            headerBg: "wallpapers/desktop/1920x1080/009.jpg"
        },
        vs_blue: {
            primary: "#007acc",
            secondary: "#0098ff",
            background: "#f5f5f5",
            headerBg: "wallpapers/desktop/1920x1080/011.jpg"
        }
    },

    setTheme: function (themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;

        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
        document.documentElement.style.setProperty('--background', theme.background);

        const header = document.querySelector('.header');
        if (header) {
            header.style.backgroundImage = "url('" + theme.headerBg + "')";
        }

        localStorage.setItem('theme', themeName);
    },

    getTheme: function () {
        return localStorage.getItem('theme');
    }
};

window.modalFocusTrap = function (shiftKey) {
    var modal = document.querySelector('[role="dialog"]');
    if (!modal) return;
    var focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (shiftKey && document.activeElement === first) {
        last.focus();
    } else if (!shiftKey && document.activeElement === last) {
        first.focus();
    }
};

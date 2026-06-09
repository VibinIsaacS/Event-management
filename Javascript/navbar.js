function applyNavPadding() {
    const navElement = document.querySelector('#header-placeholder nav');
    if (navElement) {
        document.body.style.paddingTop = `${navElement.offsetHeight}px`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        
        // Smart Path Detection: Check if we are inside the HTML subfolder
        const inHtmlFolder = window.location.pathname.toLowerCase().includes('/html/');
        
        // If in HTML folder, fetch navbar from root directory using '../'
        const basePath = inHtmlFolder ? '../' : './';

        fetch(basePath + 'navbar.html')
            .then(response => {
                if(!response.ok) throw new Error("Could not load navbar");
                return response.text();
            })
            .then(data => {
                let adjustedHtml = data;
                
                // If we are deep inside the HTML folder, dynamically rewrite the root 
                // navbar links so they point properly back up directories!
                if (inHtmlFolder) {
                    adjustedHtml = adjustedHtml.replace(/src="Assets\//g, 'src="../Assets/');
                    adjustedHtml = adjustedHtml.replace(/href="Index\.html"/g, 'href="../Index.html"');
                    adjustedHtml = adjustedHtml.replace(/href="HTML\//g, 'href="');
                    adjustedHtml = adjustedHtml.replace(/href="Login\.html"/g, 'href="../Login.html"');
                }

                headerPlaceholder.innerHTML = adjustedHtml;
                
                applyNavPadding();
                setTimeout(applyNavPadding, 300); 
                window.addEventListener('load', () => {
                    applyNavPadding();
                    setTimeout(applyNavPadding, 500);
                });
                window.addEventListener('resize', applyNavPadding);

                updateNavButtons(inHtmlFolder);
            })
            .catch(error => console.error('Error loading the navbar:', error));
    }
});

async function updateNavButtons(inHtmlFolder) {
    if (typeof account === 'undefined') {
        setTimeout(() => updateNavButtons(inHtmlFolder), 100);
        return;
    }
    
    const loginBtn = document.querySelector('.login-btn');
    const listEventBtn = document.querySelector('.list-event-btn');

    if (!loginBtn || !listEventBtn) return;

    try {
        await account.get();
        listEventBtn.style.display = 'inline-block'; 
        loginBtn.textContent = 'LOGOUT';
        loginBtn.href = '#'; 
        loginBtn.onclick = async (e) => {
            e.preventDefault();
            try {
                await account.deleteSession('current');
                window.location.href = inHtmlFolder ? '../Index.html' : 'Index.html'; 
            } catch (err) {}
        };
        setupIdleTimer(inHtmlFolder);
    } catch (error) {
        listEventBtn.style.display = 'none'; 
        loginBtn.textContent = 'LOGIN';
        loginBtn.href = inHtmlFolder ? '../Login.html' : 'Login.html';
        loginBtn.onclick = null;
    }
}

const timeoutDuration = 300000; 
let idleTimer;

async function handleIdle(inHtmlFolder) {
    try {
        await account.deleteSession('current');
        window.location.href = inHtmlFolder ? '../Login.html' : 'Login.html';
    } catch (err) {
        window.location.href = inHtmlFolder ? '../Login.html' : 'Login.html';
    }
}

function resetTimer(inHtmlFolder) {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => handleIdle(inHtmlFolder), timeoutDuration);
}

function setupIdleTimer(inHtmlFolder) {
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
    activityEvents.forEach(event => {
        document.addEventListener(event, () => resetTimer(inHtmlFolder), true);
    });
    resetTimer(inHtmlFolder); 
}
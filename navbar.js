// --- NEW, MORE RELIABLE FUNCTION ---
/**
 * Calculates the navbar's height and applies it as top padding
 * to the body, preventing content overlap.
 */
function applyNavPadding() {
    // Find the nav element directly
    const navElement = document.querySelector('#header-placeholder nav');
    if (navElement) {
        // Get the height and add a small buffer (e.g., 5px) just in case
        const navHeight = navElement.offsetHeight; 
        document.body.style.paddingTop = `${navHeight}px`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        fetch('navbar.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                
                // --- AGGRESSIVE PADDING LOGIC ---
                // This will now run on ALL pages and at multiple intervals
                
                // 1. Run immediately (might be wrong height, but it's a start)
                applyNavPadding();
                
                // 2. Run after a 300ms delay (safer)
                setTimeout(applyNavPadding, 300); 
                
                // 3. Run when the *entire page* (images, CSS) is loaded
                window.addEventListener('load', () => {
                    applyNavPadding();
                    // 4. Run AGAIN 500ms *after* load, just to be 1000% sure.
                    setTimeout(applyNavPadding, 500);
                });
                
                // 5. Run on every resize (for phone rotation)
                window.addEventListener('resize', applyNavPadding);

                // This function will now also handle starting the idle timer
                updateNavButtons();
            })
            .catch(error => console.error('Error loading the navbar:', error));
    }
});

/**
 * Checks user authentication status, updates nav buttons, and starts the
 * idle timer if the user is logged in.
 */
async function updateNavButtons() {
    // Wait for the 'account' object to be available
    if (typeof account === 'undefined') {
        setTimeout(updateNavButtons, 100);
        return;
    }
    
    const loginBtn = document.querySelector('.login-btn');
    const listEventBtn = document.querySelector('.list-event-btn');

    if (!loginBtn || !listEventBtn) {
      console.error("Navbar buttons not found in the DOM.");
      return;
    }

    try {
        // Asynchronously check if the user is logged in
        await account.get();
        
        // --- USER IS LOGGED IN ---
        listEventBtn.style.display = ''; // Let CSS handle display
        loginBtn.textContent = 'LOGOUT';
        loginBtn.href = '#'; 
        loginBtn.onclick = async (e) => {
            e.preventDefault();
            try {
                await account.deleteSession('current');
                window.location.href = 'Index.html'; // Redirect to correct home
            } catch (err) {
                console.error('Failed to logout:', err);
            }
        };

        // **FIX:** Start the idle timer ONLY after confirming the user is logged in.
        setupIdleTimer();

    } catch (error) {
        // --- USER IS NOT LOGGED IN ---
        listEventBtn.style.display = 'none'; // This is correct, hide if not logged in
        loginBtn.textContent = 'LOGIN';
        loginBtn.href = 'Login.html';
        loginBtn.onclick = null;
    }
}


// --- START OF AUTO-LOGOUT CODE ---

// Set the timeout period in milliseconds (e.g., 5 minutes = 300000)
const timeoutDuration = 300000; 

let idleTimer;

// This function is called when the user becomes idle
async function handleIdle() {
    console.log("User is idle. Logging out...");
    try {
        // Use your existing logout logic
        await account.deleteSession('current');
        // Redirect to the login or home page
        window.location.href = 'Login.html';
    } catch (err) {
        console.error('Failed to auto-logout:', err);
        // Even if the session deletion fails, redirect them.
        window.location.href = 'Login.html';
    }
}

// Function to reset the timer on user activity
function resetTimer() {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(handleIdle, timeoutDuration);
}

// Function to set up event listeners for user activity
function setupIdleTimer() {
    // **FIX:** We no longer need to check if the user is logged in here,
    // because this function is now only called when we know they are.
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll'];
    activityEvents.forEach(event => {
        document.addEventListener(event, resetTimer, true);
    });
    resetTimer(); // Start the timer for the first time
}
// --- END OF AUTO-LOGOUT CODE ---


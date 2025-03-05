// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Replace with your Discord User ID
    const DISCORD_USER_ID = '1290405643576152097';
    const LANYARD_API = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`;

    // Fetch Discord Presence
    async function fetchDiscordPresence() {
        try {
            const response = await fetch(LANYARD_API);
            const data = await response.json();

            if (data.success) {
                const user = data.data;
                updateDiscordPresence(user);
            } else {
                throw new Error('Failed to fetch Discord presence');
            }
        } catch (error) {
            console.error('Error fetching Discord presence:', error);
            document.getElementById('discord-username').textContent = 'Status Unavailable';
            document.getElementById('discord-activity').textContent = 'Could not connect to Discord API';
        }
    }

    function updateDiscordPresence(user) {
        const statusDot = document.querySelector('.status-dot');
        const username = document.getElementById('discord-username');
        const activity = document.getElementById('discord-activity');

        // Update username
        username.textContent = user.discord_user.username;

        // Update status
        statusDot.className = 'status-dot';
        switch (user.discord_status) {
            case 'online':
                statusDot.classList.add('online');
                break;
            case 'idle':
                statusDot.classList.add('idle');
                break;
            case 'dnd':
                statusDot.classList.add('dnd');
                break;
            default:
                statusDot.classList.add('offline');
        }

        // Update activity
        if (user.activities && user.activities.length > 0) {
            const currentActivity = user.activities[0];
            activity.textContent = currentActivity.state || currentActivity.name || 'Currently active';
        } else {
            activity.textContent = 'No current activity';
        }
    }

    // Initial fetch and set interval for updates
    fetchDiscordPresence();
    setInterval(fetchDiscordPresence, 60000); // Update every minute

    // Smooth scrolling for nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });
});

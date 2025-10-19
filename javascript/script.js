/*
  script.js - Interactive functionality for graduation invitation
  Purpose: Envelope animation, countdown timer, calendar integration
*/

document.addEventListener('DOMContentLoaded', function() {
    initCountdown();
    const envelopeContainer = document.getElementById('envelope-container');
    const invitationContent = document.getElementById('invitation-content');
    const closeBtn = document.getElementById('close-invitation');
    const googleCalendarBtn = document.getElementById('google-calendar');
    const downloadIcsBtn = document.getElementById('download-ics');

    envelopeContainer.addEventListener('click', openEnvelope);
    envelopeContainer.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openEnvelope();
        }
    });

    closeBtn.addEventListener('click', closeInvitation);
    closeBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeInvitation();
        }
    });

    function openEnvelope() {
        envelopeContainer.classList.add('opening');
        const nav = document.querySelector('.main-nav');
        const footer = document.querySelector('.site-footer');

        setTimeout(() => {
            envelopeContainer.style.display = 'none';
            invitationContent.classList.add('visible');
            invitationContent.setAttribute('aria-hidden', 'false');
            if (nav) nav.style.display = 'none';
            if (footer) footer.style.display = 'none';
        }, 600);
    }

    function closeInvitation() {
        invitationContent.classList.remove('visible');
        invitationContent.setAttribute('aria-hidden', 'true');
        const nav = document.querySelector('.main-nav');
        const footer = document.querySelector('.site-footer');

        setTimeout(() => {
            envelopeContainer.classList.remove('opening');
            envelopeContainer.style.display = 'flex';
            envelopeContainer.focus();
            if (nav) nav.style.display = '';
            if (footer) footer.style.display = '';
        }, 400);
    }

    googleCalendarBtn.addEventListener('click', function() {
        const eventDetails = {
            text: "Cayleigh and Nataijia's Graduation Celebration",
            dates: '20250615T140000/20250615T180000',
            details: 'Join us in celebrating Cayleigh and Nataijia\'s graduation!',
            location: 'Garden Hall, 123 Celebration Avenue, Springfield, ST 12345'
        };

        const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventDetails.text)}&dates=${eventDetails.dates}&details=${encodeURIComponent(eventDetails.details)}&location=${encodeURIComponent(eventDetails.location)}`;

        window.open(googleCalendarUrl, '_blank');
    });

    downloadIcsBtn.addEventListener('click', function() {
        const icsContent = generateICS();
        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'graduation-celebration.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    });

    function generateICS() {
        const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const icsLines = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Graduation Invitation//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:' + now + '@graduation-invitation',
            'DTSTAMP:' + now,
            'DTSTART:20250615T140000',
            'DTEND:20250615T180000',
            'SUMMARY:Cayleigh and Nataijia\'s Graduation Celebration',
            'DESCRIPTION:Join us in celebrating this momentous achievement as we honor two incredible graduates embarking on their next journey!',
            'LOCATION:Garden Hall, 123 Celebration Avenue, Springfield, ST 12345',
            'STATUS:CONFIRMED',
            'SEQUENCE:0',
            'BEGIN:VALARM',
            'TRIGGER:-PT24H',
            'DESCRIPTION:Reminder: Graduation celebration tomorrow',
            'ACTION:DISPLAY',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ];

        return icsLines.join('\r\n');
    }

    function initCountdown() {
        const eventDate = new Date('2025-12-15T14:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                document.getElementById('countdown').innerHTML = '<p class="countdown-label">The event has started!</p>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days;
            document.getElementById('hours').textContent = hours;
            document.getElementById('minutes').textContent = minutes;
            document.getElementById('seconds').textContent = seconds;
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});

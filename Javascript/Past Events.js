/**
 * Fully functional Past Events controller.
 * Fetches dynamic event logs from Appwrite, filters for previous dates,
 * and renders them elegantly on your website!
 */
document.addEventListener('DOMContentLoaded', async () => {
  const eventsContainer = document.getElementById('past-events-container');
  if (!eventsContainer) return;

  let currentUserId = null;

  try {
    const user = await account.get();
    currentUserId = user.$id;
  } catch (error) {
    // User not authenticated is completely fine for viewing past events
  }

  try {
    const response = await databases.listDocuments(DATABASE_ID, EVENTS_COLLECTION_ID);
    const allEvents = response.documents;
    const now = new Date();

    // Past events filter (event date is less than current instant)
    const pastEvents = allEvents
      .filter(event => new Date(event.datetime) < now)
      .sort((a, b) => new Date(b.datetime) - new Date(a.datetime)); // Newest past events first

    if (pastEvents.length === 0) {
      eventsContainer.innerHTML = '<p class="no-events-message">No past events to display.</p>';
      return;
    }

    eventsContainer.innerHTML = ''; // Clear loaders

    pastEvents.forEach(event => {
      const eventCard = document.createElement('div');
      eventCard.className = 'glass-card';

      // Fallback poster loading
      const imageUrl = event.posterFileId
        ? storage.getFileView(EVENTS_POSTERS_BUCKET_ID, event.posterFileId)
        : 'https://placehold.co/400x260/1a1a1a/ffffff?text=Past+Event';
        
      let eventDate = 'Date not specified';
      if (event.datetime) {
          const dateObj = new Date(event.datetime);
          if (!isNaN(dateObj.getTime())) {
              eventDate = dateObj.toLocaleString('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short'
              });
          }
      }

      let editButtonHTML = '';
      if (currentUserId && currentUserId === event.userId) {
        editButtonHTML = `<a href="edit event.html?id=${event.$id}" class="edit-btn">Edit Event</a>`;
      }

      eventCard.innerHTML = `
        <img src="${imageUrl}" alt="Event Poster" class="card-image">
        <div class="card-content">
          <h1>${event.name || 'Untitled Event'}</h1>
          <p style="color: #b8f28a;"><strong>Held On:</strong> ${eventDate}</p>
          <p><strong>Where:</strong> ${event.location || 'N/A'}</p>
          <p class="organizer"><strong>Organizer:</strong> ${event.organizerName || 'N/A'} (${event.organizerContact || 'N/A'})</p>
          <p>${event.description || 'No description provided.'}</p>
          ${editButtonHTML}
        </div>
      `;
      eventsContainer.appendChild(eventCard);
    });

  } catch (error) {
    console.error('Failed to fetch past events:', error);
    eventsContainer.innerHTML = '<p class="error-message">Could not load past events logs. Check database credentials.</p>';
  }
});
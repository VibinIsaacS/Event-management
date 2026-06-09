// Make sure you have the Appwrite SDK script included in your HTML before this script.
// <script src="https://cdn.jsdelivr.net/npm/appwrite@13.0.0"></script>

const { Client, Account, Databases, Storage, ID } = Appwrite;

// --- Globally scoped Configuration to prevent ReferenceErrors ---
window.APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; 
window.APPWRITE_PROJECT_ID = '68e801a9003a23afa77b';

// --- Globally scoped Database & Storage IDs ---
window.DATABASE_ID = '68e80259001af938c1c0';
window.EVENTS_COLLECTION_ID = 'events';
window.EVENTS_POSTERS_BUCKET_ID = '68e803d000383fa19fbd';

// --- Initialize Appwrite Client ---
const client = new Client();
client
    .setEndpoint(window.APPWRITE_ENDPOINT)
    .setProject(window.APPWRITE_PROJECT_ID);

// --- Initialize Appwrite Services to Window Object ---
// This guarantees they are available to ALL your other HTML pages.
window.account = new Account(client);
window.databases = new Databases(client);
window.storage = new Storage(client);
window.AppwriteID = ID;
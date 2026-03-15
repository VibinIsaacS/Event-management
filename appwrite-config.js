// Make sure you have the Appwrite SDK script included in your HTML before this script.
// <script src="https://cdn.jsdelivr.net/npm/appwrite@13.0.0"></script>

const { Client, Account, Databases, Storage, ID } = Appwrite;

// --- Appwrite Configuration ---
const APPWRITE_ENDPOINT = 'https://fra.cloud.appwrite.io/v1'; // ⚠️ Replace this with your actual endpoint
// ⚠️ Replace this with your actual Project ID
const APPWRITE_PROJECT_ID = '68e801a9003a23afa77b';

// --- Database & Storage IDs ---
// ⚠️ Replace these with the actual IDs from your Appwrite project
const DATABASE_ID = '68e80259001af938c1c0';
const EVENTS_COLLECTION_ID = 'events';
const EVENTS_POSTERS_BUCKET_ID = '68e803d000383fa19fbd';

// --- Initialize Appwrite Client ---
const client = new Client();
client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

// --- Initialize Appwrite Services ---
// These are now globally available for your other scripts to use
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);


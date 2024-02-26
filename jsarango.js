const express = require('express');
const arangojs = require("arangojs");

const app = express();
const PORT = 8080;

"use strict";
const encodedCA = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURHRENDQWdDZ0F3SUJBZ0lRSEllcjB2SzNsNkRXa0tLWFJQNVNQVEFOQmdrcWhraUc5dzBCQVFzRkFEQW0KTVJFd0R3WURWUVFLRXdoQmNtRnVaMjlFUWpFUk1BOEdBMVVFQXhNSVFYSmhibWR2UkVJd0hoY05NalF3TWpJMApNVEUwT1RFMldoY05Namt3TWpJeU1URTBPVEUyV2pBbU1SRXdEd1lEVlFRS0V3aEJjbUZ1WjI5RVFqRVJNQThHCkExVUVBeE1JUVhKaGJtZHZSRUl3Z2dFaU1BMEdDU3FHU0liM0RRRUJBUVVBQTRJQkR3QXdnZ0VLQW9JQkFRQ2YKb0lkK01mYngxYnlFZ0ZZMVArdU9HR1ZaRzNmZmt6cTZiakdvMG1McGxpaTljNTEvRkVibXlnTWt3RVVPcjlOeQpQMTdjZWtMdzdmYU5GMS9aU1JML0Vhb3l5TFVUZFk5clpWeTRxM1VFUUZhUnpHcUdHcGdGWllmTUNYV2RHTzlpCllQNWovY1pSY0RmYW1TZEdaQ3ZxRXpHditIc0VDMllRNmNmWm04V2VHWjdoaU1mOEtHZ3hYKytIOHdUVVFBZE8KZkp5OUIvakUwSzNqeUtMaXJHd3dDQlhQUHJKdWFNYzNITkVTUGx0RDRvb1d4czRLZ1h4UG1XSGVEZGpVRTNCagpkWm1wSHVMK3FpMnFTdTBwZjFjOEpZT1VtbFUzWk1hR2xRUFNFQjFPSHlUK2NXUE5TQkFmWXM1eksxQVE3Z3MzCmVXYnFreU9Cdy8vVFFLekJzeUxkQWdNQkFBR2pRakJBTUE0R0ExVWREd0VCL3dRRUF3SUNwREFQQmdOVkhSTUIKQWY4RUJUQURBUUgvTUIwR0ExVWREZ1FXQkJRczAvbGNsL1BtNDBtQ1lXQmN4VHJSYU5oTUFUQU5CZ2txaGtpRwo5dzBCQVFzRkFBT0NBUUVBQzFqMUZubjUybk9tMmg5Rms5emJwbnJrVUZnaHNqSlFMWVQzd3UzY2Y1ZExvREs0ClFWdGpRWkNGRTMvemZRWnVRUklqRVdiTnI1VFhhQmQ2elYrM0IxTWtYNStXMXhTSGt5R1FBNHB5Vzh5V0ZDenQKTVlDMUdSUmhPa0c3K29uV1c3b2ZnMllHSktxVmx0U01PQWVmdTRXRVArK3ZYMnhoYjBXOUpxKzNUOUQ2eTJjRApOQ1hwbnQ2bUV6UG5qWHRHcFFGSFRGVmc5b3lFNEFjbVYwZnE3RlI0OE9ZNGpZQXRONTA1NnBma0RSRC8veXVECkNzdWErUk9sWmdISFoxYThWMXhRS054NlJwai9NdUROckUrMzJRR1hrQ2xLaUtmeWFtYzUvR05NQ0k0QkJ0bDcKUlc0NWpTTE1CQXNZa1NSRW43L1RBVzg4bDFPcTNzNzZHODZLNmc9PQotLS0tLUVORCBDRVJUSUZJQ0FURS0tLS0tCg==";
const db = arangojs({url: "https://085be96d27a5.arangodb.cloud:18529", agentOptions: {ca: Buffer.from(encodedCA, "base64")}});
db.useBasicAuth("root", "wMs2D4PbbWoYujWzoUIr");
db.version().then(
	version => console.log(version),
	error => console.error(error)
);

// Specify the database name
const dbName = "gremb_6kMuULf0"; // Change this to your database name

app.get('/', async (req, res) => {
    try {
        // Use the specified database
        const database = db.database(dbName);

        // Get a list of collections within the specified database
        const collections = await database.collections();

        // Extract relevant information about collections
        const collectionInfo = collections.map(collection => ({
            name: collection.name,
            type: collection.type,
            status: collection.status
            // Add more properties as needed
        }));
        
        // Respond with the collections information in JSON format
        res.json(collectionInfo);
    } catch (error) {
        // Handle errors that occur during the fetching process
        console.error("Error fetching collections:", error);
        res.status(500).json({ error: "Error fetching collections" });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<tu-proyecto>.firebaseio.com",
});

const db = admin.firestore();

async function populateMatches() {
    try {
        const matches = [
            {
                serviceRequestId: "requestid001", // ID de la solicitud que originó el match.
                clientId: "userid001", // Cliente involucrado.
                expertId: "userid002", // Experto involucrado.
                agreedPrice: 100000, // Precio final acordado.
                status: "completed",
                createdAt: new Date().toISOString(),
                completedAt: new Date().toISOString(),
            },
            {
                serviceRequestId: "requestid002",
                clientId: "userid003",
                expertId: "userid004",
                agreedPrice: 85000,
                status: "inProgress",
                createdAt: new Date().toISOString(),
            },
            // Agrega más matches según sea necesario.
        ];

        const batch = db.batch();
        matches.forEach((match) => {
            const docRef = db.collection("matches").doc();
            batch.set(docRef, match);
        });

        await batch.commit();
        console.log("Matches añadidos exitosamente.");
    } catch (error) {
        console.error("Error al poblar los matches:", error);
    }
}

populateMatches();

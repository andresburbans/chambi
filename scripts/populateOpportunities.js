const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<tu-proyecto>.firebaseio.com",
});

const db = admin.firestore();

async function populateOpportunities() {
    try {
        const opportunities = [
            {
                serviceRequestId: "requestid001", // ID de una solicitud de servicio.
                expertId: "userid002", // ID de un experto.
                status: "open",
                counterPrice: null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                serviceRequestId: "requestid002",
                expertId: "userid003",
                status: "counteroffer",
                counterPrice: 85000,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            // Agrega más oportunidades según sea necesario.
        ];

        const batch = db.batch();
        opportunities.forEach((opportunity) => {
            const docRef = db.collection("opportunities").doc();
            batch.set(docRef, opportunity);
        });

        await batch.commit();
        console.log("Oportunidades añadidas exitosamente.");
    } catch (error) {
        console.error("Error al poblar las oportunidades:", error);
    }
}

populateOpportunities();

const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<tu-proyecto>.firebaseio.com",
});

const db = admin.firestore();

async function populateServiceRequests() {
    try {
        const serviceRequests = [
            {
                serviceId: "serviceid001",
                clientId: "userid001", // Reemplaza con IDs reales de clientes.
                expertId: "userid002", // Reemplaza con IDs reales de expertos.
                status: "pending",
                priceOffered: null,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                serviceId: "serviceid002",
                clientId: "userid001",
                expertId: "userid003",
                status: "offered",
                priceOffered: 80000,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            // Agrega más solicitudes según sea necesario.
        ];

        const batch = db.batch();
        serviceRequests.forEach((request) => {
            const docRef = db.collection("serviceRequests").doc();
            batch.set(docRef, request);
        });

        await batch.commit();
        console.log("Solicitudes de servicios añadidas exitosamente.");
    } catch (error) {
        console.error("Error al poblar las solicitudes de servicios:", error);
    }
}

populateServiceRequests();

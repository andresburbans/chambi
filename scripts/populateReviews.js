const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<tu-proyecto>.firebaseio.com",
});

const db = admin.firestore();

async function populateReviews() {
    try {
        const reviews = [
            {
                serviceId: "serviceid001",
                clientId: "userid001", // Cliente que califica.
                expertId: "userid002", // Experto propietario del servicio.
                rating: 4.5,
                review: "Muy buen servicio, puntual y profesional.",
                createdAt: new Date().toISOString(),
            },
            {
                serviceId: "serviceid002",
                clientId: "userid001",
                expertId: "userid003",
                rating: 3.0,
                review: "El servicio fue regular, se retrasó un poco.",
                createdAt: new Date().toISOString(),
            },
            // Agrega más calificaciones y reseñas según sea necesario.
        ];

        const batch = db.batch();
        reviews.forEach((review) => {
            const docRef = db.collection("reviews").doc();
            batch.set(docRef, review);
        });

        await batch.commit();
        console.log("Calificaciones y reseñas añadidas exitosamente.");
    } catch (error) {
        console.error("Error al poblar calificaciones y reseñas:", error);
    }
}

populateReviews();

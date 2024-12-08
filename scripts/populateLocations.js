const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Comunas de Cali
const comunasData = [
    { id: "c01", name: "Comuna 1", latitude: 3.45482, longitude: -76.56539 },
    { id: "c02", name: "Comuna 2", latitude: 3.475, longitude: -76.52486 },
    { id: "c03", name: "Comuna 3", latitude: 3.44956, longitude: -76.53288 },
    { id: "c04", name: "Comuna 4", latitude: 3.46954, longitude: -76.50931 },
    { id: "c05", name: "Comuna 5", latitude: 3.47203, longitude: -76.49531 },
    { id: "c06", name: "Comuna 6", latitude: 3.48556, longitude: -76.48793 },
    { id: "c07", name: "Comuna 7", latitude: 3.45643, longitude: -76.48821 },
    { id: "c08", name: "Comuna 8", latitude: 3.44634, longitude: -76.50598 },
    { id: "c09", name: "Comuna 9", latitude: 3.4413, longitude: -76.52612 },
    { id: "c10", name: "Comuna 10", latitude: 3.41923, longitude: -76.52767 },
    { id: "c11", name: "Comuna 11", latitude: 3.42303, longitude: -76.51473 },
    { id: "c12", name: "Comuna 12", latitude: 3.43454, longitude: -76.50182 },
    { id: "c13", name: "Comuna 13", latitude: 3.42761, longitude: -76.49306 },
    { id: "c14", name: "Comuna 14", latitude: 3.42522, longitude: -76.4773 },
    { id: "c15", name: "Comuna 15", latitude: 3.40486, longitude: -76.50046 },
    { id: "c16", name: "Comuna 16", latitude: 3.40412, longitude: -76.51387 },
    { id: "c17", name: "Comuna 17", latitude: 3.3856, longitude: -76.52992 },
    { id: "c18", name: "Comuna 18", latitude: 3.38186, longitude: -76.55299 },
    { id: "c19", name: "Comuna 19", latitude: 3.42074, longitude: -76.54644 },
    { id: "c20", name: "Comuna 20", latitude: 3.42001, longitude: -76.5592 },
    { id: "c21", name: "Comuna 21", latitude: 3.4239, longitude: -76.47089 },
    { id: "c22", name: "Comuna 22", latitude: 3.35073, longitude: -76.53682 }
];

// Función para poblar Firestore con las ubicaciones
async function populateLocations() {
    try {
        const batch = db.batch();

        comunasData.forEach(commune => {
            const docRef = db.collection('locations').doc(`CN${commune.id.slice(1)}`);
            batch.set(docRef, {
                id: commune.id,
                name: commune.name,
                latitude: commune.latitude,
                longitude: commune.longitude
            });
        });

        await batch.commit();
        console.log('Locations successfully populated in Firestore!');
    } catch (error) {
        console.error('Error populating locations:', error);
    } finally {
        // Opcional: Cerrar la aplicación de Firebase después de la operación
        admin.app().delete();
    }
}

// Ejecutar la función de población
populateLocations();
const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

// Inicializar Firebase Admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://<tu-proyecto>.firebaseio.com",
});

const db = admin.firestore();

async function populateDatabase() {
    try {
        // Ejemplos de usuarios (clientes y expertos)
        const users = [
            {
                firstName: "Juan",
                lastName: "Pérez",
                email: "juanperez@example.com",
                phoneNumber: "3123456789",
                documentType: "CC",
                documentNumber: "123456789",
                type: "cliente",
                coordinates: { latitude: 3.4516, longitude: -76.5319 }, // Cali, Comuna 1
                nearestLocation: "CN01",
                createdAt: new Date().toISOString(),
            },
            {
                firstName: "Ana",
                lastName: "Gómez",
                email: "anagomez@example.com",
                phoneNumber: "3167891234",
                documentType: "PS",
                documentNumber: "AB1234567",
                type: "experto",
                field: "Educación",
                specialty: "Matemáticas",
                professionalLicense: "1234-5678",
                coordinates: { latitude: 3.4526, longitude: -76.5419 }, // Cali, Comuna 2
                nearestLocation: "CN02",
                createdAt: new Date().toISOString(),
            },
            {
                firstName: "Carlos",
                lastName: "Rodríguez",
                email: "carlosrodriguez@example.com",
                phoneNumber: "3176543210",
                documentType: "CC",
                documentNumber: "987654321",
                type: "cliente",
                coordinates: { latitude: 3.4600, longitude: -76.5200 }, // Cali, Comuna 3
                nearestLocation: "CN03",
                createdAt: new Date().toISOString(),
            },
            {
                firstName: "María",
                lastName: "López",
                email: "marialopez@example.com",
                phoneNumber: "3201234567",
                documentType: "PS",
                documentNumber: "XY9876543",
                type: "experto",
                field: "Reparaciones",
                specialty: "Plomería",
                professionalLicense: "No verificado",
                coordinates: { latitude: 3.4550, longitude: -76.5350 }, // Cali, Comuna 4
                nearestLocation: "CN04",
                createdAt: new Date().toISOString(),
            },
            {
                firstName: "Sofía",
                lastName: "Martínez",
                email: "sofia@example.com",
                phoneNumber: "3219876543",
                documentType: "CC",
                documentNumber: "111222333",
                type: "experto",
                field: "Tecnología",
                specialty: "Desarrollo Web",
                professionalLicense: "8765-4321",
                coordinates: { latitude: 3.4500, longitude: -76.5400 }, // Cali, Comuna 5
                nearestLocation: "CN05",
                createdAt: new Date().toISOString(),
            },
        ];

        // Poblar usuarios
        const usersBatch = db.batch();
        users.forEach((user) => {
            const userRef = db.collection("users").doc();
            usersBatch.set(userRef, user);
        });
        await usersBatch.commit();
        console.log("Usuarios añadidos exitosamente.");
    } catch (error) {
        console.error("Error al poblar la base de datos:", error);
    }
}

populateDatabase();

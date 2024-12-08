const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const testFirestoreConnection = async () => {
    const docRef = db.collection("test").doc("example");
    await docRef.set({ message: "Firestore está funcionando correctamente." });
    console.log("Documento creado correctamente.");
};

testFirestoreConnection();

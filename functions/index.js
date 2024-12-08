const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

exports.calculateSuggestedPrice = functions.firestore
    .document("services/{serviceId}")
    .onWrite(async (change, context) => {
        const serviceData = change.after.exists ? change.after.data() : null;

        if (!serviceData || !serviceData.categoryId) {
            console.log("El servicio no tiene categoría o fue eliminado.");
            return null;
        }

        const categoryId = serviceData.categoryId;
        const specialtyId = serviceData.specialtyId || null;
        const filterField = specialtyId ? "specialtyId" : "categoryId";
        const filterValue = specialtyId || categoryId;

        console.log(`Calculando precio sugerido para ${filterField}: ${filterValue}`);

        // Consulta para obtener servicios relacionados
        const servicesRef = db.collection("services");
        const snapshot = await servicesRef.where(filterField, "==", filterValue).get();

        if (snapshot.empty) {
            console.log("No hay servicios relacionados para calcular el precio sugerido.");
            return null;
        }

        // Calcular el promedio de precios
        let totalPrice = 0;
        let count = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            if (data.price && data.price.value) {
                totalPrice += data.price.value;
                count++;
            }
        });

        const averagePrice = count > 0 ? Math.round(totalPrice / count) : 0;

        console.log(`Precio sugerido calculado: ${averagePrice} para ${filterField}: ${filterValue}`);

        // Actualizar el documento `config/precios` agrupando por categoría o especialidad
        const configRef = db.collection("config").doc("precios");
        const updateField = specialtyId
            ? `specialties.${specialtyId}`
            : `categories.${categoryId}`;

        return configRef.set(
            {
                [updateField]: {
                    value: averagePrice,
                    currency: "COP",
                },
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );
    });

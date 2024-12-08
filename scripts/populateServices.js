const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Datos de categorías completas con subcategorías
const categories = [
    { id: "category1.1", name: "Reparación de electrodomésticos" },
    { id: "category1.2", name: "Servicios de plomería y electricidad" },
    { id: "category1.3", name: "Reparación de muebles" },
    { id: "category1.4", name: "Reparación de sistemas eléctricos" },
    { id: "category1.5", name: "Restauración de pisos dañados" },
    { id: "category1.6", name: "Reparación de ventanas y puertas" },
    { id: "category1.7", name: "Remodelación y renovación de espacios" },
    { id: "category1.8", name: "Reparación de cerraduras" },
    { id: "category1.9", name: "Reparación de techos y goteras" },
    { id: "category1.10", name: "Mantenimiento general del hogar" },
    { id: "category2.1", name: "Paseo de perros" },
    { id: "category2.2", name: "Cuidado de mascotas a domicilio" },
    { id: "category2.3", name: "Adiestramiento canino" },
    { id: "category2.4", name: "Servicios de veterinario móvil" },
    { id: "category2.5", name: "Consultas médicas a domicilio" },
    { id: "category2.6", name: "Cuidado de adultos mayores a domicilio" },
    { id: "category2.7", name: "Servicios de enfermería en casa" },
    { id: "category2.8", name: "Guardería para mascotas" },
    { id: "category2.9", name: "Psicología y coaching personal" },
    { id: "category2.10", name: "Alimentación y cuidado de animales grandes" },
    { id: "category3.1", name: "Limpieza profunda del hogar" },
    { id: "category3.2", name: "Lavado de alfombras" },
    { id: "category3.3", name: "Limpieza de ventanas" },
    { id: "category3.4", name: "Servicio de limpieza post-construcción" },
    { id: "category3.5", name: "Desinfección de espacios" },
    { id: "category3.6", name: "Limpieza de jardines y patios" },
    { id: "category3.7", name: "Limpieza de cocinas industriales" },
    { id: "category3.8", name: "Organización de espacios" },
    { id: "category3.9", name: "Eliminación de plagas" },
    { id: "category3.10", name: "Limpieza de piscinas" },
    { id: "category4.1", name: "Instalación de aire acondicionado" },
    { id: "category4.2", name: "Instalación de sistemas de riego" },
    { id: "category4.3", name: "Montaje de muebles" },
    { id: "category4.4", name: "Instalación de calentadores de agua" },
    { id: "category4.5", name: "Instalación de sistemas de alarma" },
    { id: "category4.6", name: "Colocación de cortinas y persianas" },
    { id: "category4.7", name: "Instalación de pisos laminados" },
    { id: "category4.8", name: "Instalación de sistemas de seguridad" },
    { id: "category4.9", name: "Instalación de redes Wi-Fi" },
    { id: "category4.10", name: "Colocación de techos falsos" },
];

// Datos de especialidades completas con subespecialidades
//:P
const specialties = [
    { id: "specialty1.1", name: "Ingeniería Civil" },
    { id: "specialty1.2", name: "Ingeniería Industrial" },
    { id: "specialty1.3", name: "Ingeniería de Sistemas" },
    { id: "specialty1.4", name: "Ingeniería Electrónica" },
    { id: "specialty1.5", name: "Ingeniería Ambiental" },
    { id: "specialty1.6", name: "Ingeniería Mecánica" },
    { id: "specialty1.7", name: "Ingeniería Eléctrica" },
    { id: "specialty1.8", name: "Ingeniería de Telecomunicaciones" },
    { id: "specialty1.9", name: "Ingeniería Agronómica" },
    { id: "specialty1.10", name: "Ingeniería de Petróleos" },
    { id: "specialty2.1", name: "Medicina General" },
    { id: "specialty2.2", name: "Enfermería" },
    { id: "specialty2.3", name: "Fisioterapia" },
    { id: "specialty2.4", name: "Odontología" },
    { id: "specialty2.5", name: "Psicología" },
    { id: "specialty2.6", name: "Nutrición y Dietética" },
    { id: "specialty2.7", name: "Terapia Ocupacional" },
    { id: "specialty2.8", name: "Optometría" },
    { id: "specialty2.9", name: "Medicina Veterinaria" },
    { id: "specialty2.10", name: "Cosmetología" },
];

async function populateServices() {
    const servicesRef = db.collection("services");

    // Eliminar todos los documentos previos
    const snapshot = await servicesRef.get();
    const deleteBatch = db.batch();
    snapshot.forEach((doc) => {
        deleteBatch.delete(doc.ref);
    });
    await deleteBatch.commit();
    console.log("Colección 'services' limpiada.");

    // Crear nuevos documentos
    const batch = db.batch();
    let serviceIdCounter = 1;

    categories.forEach((category) => {
        const serviceId = `serviceid${serviceIdCounter.toString().padStart(3, "0")}`;
        batch.set(servicesRef.doc(serviceId), {
            name: category.name,
            type: "specific",
            categoryId: category.id,
            specialtyId: null,
            description: `Servicio específico asociado a ${category.name}.`,
            price: { value: getRandomPrice(), currency: "COP" },
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        serviceIdCounter++;
    });

    specialties.forEach((specialty) => {
        const serviceId = `serviceid${serviceIdCounter.toString().padStart(3, "0")}`;
        batch.set(servicesRef.doc(serviceId), {
            name: specialty.name,
            type: "specialty",
            categoryId: null,
            specialtyId: specialty.id,
            description: `Servicio especializado en ${specialty.name}.`,
            price: { value: getRandomPrice(100000, 300000), currency: "COP" },
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });
        serviceIdCounter++;
    });

    await batch.commit();
    console.log("Servicios poblados correctamente.");
}

function getRandomPrice(min = 50000, max = 200000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

populateServices();

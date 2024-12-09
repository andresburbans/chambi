const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function populateServices() {
    const services = [
        {
            name: "Limpieza de Hogar",
            type: "specific", // servicio específico
            categoryId: "Limpieza",
            subcategoryId: "Hogar",
            description: "Servicio de limpieza a domicilio, rápido y eficiente",
            price: { value: 80000, currency: "COP" },
            rating: 4.5,
            phoneNumber: "3123456789",
            documentNumber: "12345678",
            professionalLicense: null,
            coordinates: { latitude: 3.4516, longitude: -76.5319 },
            nearestLocation: "CN01"
        },
        {
            name: "Servicio de Plomería",
            type: "specific",
            categoryId: "Reparaciones",
            subcategoryId: "Plomería",
            description: "Arreglo de tuberías y grifos, garantizamos calidad",
            price: { value: 150000, currency: "COP" },
            rating: 3.8,
            phoneNumber: "3151234567",
            documentNumber: "98765432",
            professionalLicense: null,
            coordinates: { latitude: 3.4520, longitude: -76.5400 },
            nearestLocation: "CN02"
        },
        {
            name: "Electricista Certificado",
            type: "expert",
            field: "Ingeniería y Construcción",
            specialty: "Ingeniería Eléctrica",
            description: "Instalaciones eléctricas y reparaciones profesionales",
            price: { value: 120000, currency: "COP" },
            rating: 4.9,
            phoneNumber: "3001112233",
            documentNumber: "87654321",
            professionalLicense: "ELEC1234",
            coordinates: { latitude: 3.4530, longitude: -76.5500 },
            nearestLocation: "CN03"
        },
        {
            name: "Pintura Residencial",
            type: "specific",
            categoryId: "Reparaciones",
            subcategoryId: "Pintura",
            description: "Pintamos tu hogar con acabados profesionales",
            price: { value: 90000, currency: "COP" },
            rating: 4.2,
            phoneNumber: "3145678901",
            documentNumber: "11223344",
            professionalLicense: null,
            coordinates: { latitude: 3.4540, longitude: -76.5600 },
            nearestLocation: "CN04"
        },
        {
            name: "Jardinería y Podas",
            type: "specific",
            categoryId: "Hogar y Jardín",
            subcategoryId: "Jardinería",
            description: "Cuidado y mantenimiento de jardines",
            price: { value: 70000, currency: "COP" },
            rating: 3.5,
            phoneNumber: "3132223344",
            documentNumber: "66778899",
            professionalLicense: null,
            coordinates: { latitude: 3.4550, longitude: -76.5700 },
            nearestLocation: "CN05"
        },
        {
            name: "Ingeniero Civil Experto",
            type: "expert",
            field: "Ingeniería y Construcción",
            specialty: "Ingeniería Civil",
            description: "Diseño y supervisión de proyectos de construcción",
            price: { value: 200000, currency: "COP" },
            rating: 4.7,
            phoneNumber: "3209998887",
            documentNumber: "99887766",
            professionalLicense: "CIVIL5678",
            coordinates: { latitude: 3.4560, longitude: -76.5800 },
            nearestLocation: "CN06"
        },
        {
            name: "Pedagogía Infantil",
            type: "expert",
            field: "Educación y Entrenamiento",
            specialty: "Educación Infantil",
            description: "Clases de estimulación temprana para niños",
            price: { value: 50000, currency: "COP" },
            rating: 4.3,
            phoneNumber: "3115556677",
            documentNumber: "44556677",
            professionalLicense: null,
            coordinates: { latitude: 3.4570, longitude: -76.5900 },
            nearestLocation: "CN07"
        },
        {
            name: "Mecánico Automotriz",
            type: "specific",
            categoryId: "Automotriz",
            subcategoryId: "Mecánica",
            description: "Mantenimiento y reparación de vehículos",
            price: { value: 130000, currency: "COP" },
            rating: 4.0,
            phoneNumber: "3012223344",
            documentNumber: "33445566",
            professionalLicense: null,
            coordinates: { latitude: 3.4580, longitude: -76.6000 },
            nearestLocation: "CN08"
        },
        {
            name: "Asesoría Contable",
            type: "expert",
            field: "Finanzas y Legal",
            specialty: "Contaduría",
            description: "Asesoría en impuestos, finanzas y contabilidad",
            price: { value: 100000, currency: "COP" },
            rating: 4.1,
            phoneNumber: "3195556789",
            documentNumber: "22334455",
            professionalLicense: "CONT1234",
            coordinates: { latitude: 3.4590, longitude: -76.6100 },
            nearestLocation: "CN09"
        },
        {
            name: "Entrenador Personal",
            type: "expert",
            field: "Salud y Bienestar",
            specialty: "Entrenamiento Personal",
            description: "Planes de entrenamiento personalizados",
            price: { value: 110000, currency: "COP" },
            rating: 4.6,
            phoneNumber: "3007778899",
            documentNumber: "11110000",
            professionalLicense: null,
            coordinates: { latitude: 3.4600, longitude: -76.6200 },
            nearestLocation: "CN10"
        }
    ];

    for (const svc of services) {
        await db.collection("services").add(svc);
    }

    console.log("Servicios poblados con éxito!");
}

populateServices().catch(console.error);

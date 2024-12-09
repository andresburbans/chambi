const admin = require("firebase-admin");
const path = require('path');
const serviceAccount = require(path.resolve('D:/PROYECTO-CHAMBI/PROD_CHAMBI/serviceAccountKey.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const populateSpecialties = async () => {
    const specialties = [
        {
            field: "Ingeniería y Construcción",
            description: "Especialidades relacionadas con ingeniería.",
            subcategories: [
                // Especialidades de Ingeniería y Construcción
                { id: "1.1", name: "Ingeniería Civil" },
                { id: "1.2", name: "Ingeniería Industrial" },
                { id: "1.3", name: "Ingeniería de Sistemas" },
                { id: "1.4", name: "Ingeniería Electrónica" },
                { id: "1.5", name: "Ingeniería Ambiental" },
                { id: "1.6", name: "Ingeniería Mecánica" },
                { id: "1.7", name: "Ingeniería Eléctrica" },
                { id: "1.8", name: "Ingeniería de Telecomunicaciones" },
                { id: "1.9", name: "Ingeniería Agronómica" },
                { id: "1.10", name: "Ingeniería de Petróleos" },
            ]
        },
        {
            field: "Salud y Cuidado Personal",
            description: "Especialidades relacionadas con la salud y el cuidado personal.",
            subcategories: [
                // Especialidades de Salud y Cuidado Personal
                { id: "2.1", name: "Medicina General" },
                { id: "2.2", name: "Enfermería" },
                { id: "2.3", name: "Fisioterapia" },
                { id: "2.4", name: "Odontología" },
                { id: "2.5", name: "Psicología" },
                { id: "2.6", name: "Nutrición y Dietética" },
                { id: "2.7", name: "Terapia Ocupacional" },
                { id: "2.8", name: "Optometría" },
                { id: "2.9", name: "Medicina Veterinaria" },
                { id: "2.10", name: "Cosmetología" },
            ]
        },
        {
            field: "Arquitectura y Diseño",
            description: "Especialidades relacionadas con la arquitectura y el diseño.",
            subcategories: [
                // Especialidades de Arquitectura y Diseño
                { id: "3.1", name: "Arquitectura" },
                { id: "3.2", name: "Diseño de Interiores" },
                { id: "3.3", name: "Diseño Gráfico" },
                { id: "3.4", name: "Paisajismo" },
                { id: "3.5", name: "Diseño Industrial" },
                { id: "3.6", name: "Urbanismo" },
                { id: "3.7", name: "Decoración de Eventos" },
                { id: "3.8", name: "Diseño de Iluminación" },
                { id: "3.9", name: "Restauración de Edificaciones" },
                { id: "3.10", name: "Animación y Modelado 3D" },
            ]
        },
        {
            field: "Administración y Finanzas",
            description: "Especialidades relacionadas con la administración y las finanzas.",
            subcategories: [
                // Especialidades de Administración y Finanzas
                { id: "4.1", name: "Administración de Empresas" },
                { id: "4.2", name: "Contaduría Pública" },
                { id: "4.3", name: "Finanzas y Banca" },
                { id: "4.4", name: "Mercadeo y Publicidad" },
                { id: "4.5", name: "Recursos Humanos" },
                { id: "4.6", name: "Logística y Supply Chain" },
                { id: "4.7", name: "Comercio Internacional" },
                { id: "4.8", name: "Economía" },
                { id: "4.9", name: "Gestión de Proyectos" },
                { id: "4.10", name: "Auditoría" },
            ]
        },
        {
            field: "Servicios Generales y Oficios Varios",
            description: "Especialidades relacionadas con servicios generales y oficios varios.",
            subcategories: [
                // Especialidades de Servicios Generales y Oficios Varios
                { id: "5.1", name: "Electricista" },
                { id: "5.2", name: "Plomero" },
                { id: "5.3", name: "Carpintero" },
                { id: "5.4", name: "Albañil" },
                { id: "5.5", name: "Jornalero Agrícola" },
                { id: "5.6", name: "Jornalero de Obra" },
                { id: "5.7", name: "Soldador" },
                { id: "5.8", name: "Mecánico Automotriz" },
                { id: "5.9", name: "Jardinería" },
                { id: "5.10", name: "Operador de Maquinaria Pesada" },
            ]
        },
    ];

    const batch = db.batch();

    specialties.forEach((specialty, index) => {
        const docRef = db.collection("specialties").doc(`specialty${index + 1}`);
        batch.set(docRef, specialty);
    });

    await batch.commit();
    console.log("Especialidades insertadas exitosamente.");
};

populateSpecialties();
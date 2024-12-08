const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const populateSpecialties = async () => {
    const specialties = [
        // Especialidades de Ingeniería y Construcción
        { name: "Ingeniería Civil", field: "Ingeniería y Construcción" },
        { name: "Ingeniería Industrial", field: "Ingeniería y Construcción" },
        { name: "Ingeniería de Sistemas", field: "Ingeniería y Construcción" },
        { name: "Ingeniería Electrónica", field: "Ingeniería y Construcción" },
        { name: "Ingeniería Ambiental", field: "Ingeniería y Construcción" },
        { name: "Ingeniería Mecánica", field: "Ingeniería y Construcción" },
        { name: "Ingeniería Eléctrica", field: "Ingeniería y Construcción" },
        { name: "Ingeniería de Telecomunicaciones", field: "Ingeniería y Construcción" },
        { name: "Ingeniería Agronómica", field: "Ingeniería y Construcción" },
        { name: "Ingeniería de Petróleos", field: "Ingeniería y Construcción" },

        // Especialidades de Salud y Cuidado Personal
        { name: "Medicina General", field: "Salud y Cuidado Personal" },
        { name: "Enfermería", field: "Salud y Cuidado Personal" },
        { name: "Fisioterapia", field: "Salud y Cuidado Personal" },
        { name: "Odontología", field: "Salud y Cuidado Personal" },
        { name: "Psicología", field: "Salud y Cuidado Personal" },
        { name: "Nutrición y Dietética", field: "Salud y Cuidado Personal" },
        { name: "Terapia Ocupacional", field: "Salud y Cuidado Personal" },
        { name: "Optometría", field: "Salud y Cuidado Personal" },
        { name: "Medicina Veterinaria", field: "Salud y Cuidado Personal" },
        { name: "Cosmetología", field: "Salud y Cuidado Personal" },

        // Especialidades de Arquitectura y Diseño
        { name: "Arquitectura", field: "Arquitectura y Diseño" },
        { name: "Diseño de Interiores", field: "Arquitectura y Diseño" },
        { name: "Diseño Gráfico", field: "Arquitectura y Diseño" },
        { name: "Paisajismo", field: "Arquitectura y Diseño" },
        { name: "Diseño Industrial", field: "Arquitectura y Diseño" },
        { name: "Urbanismo", field: "Arquitectura y Diseño" },
        { name: "Decoración de Eventos", field: "Arquitectura y Diseño" },
        { name: "Diseño de Iluminación", field: "Arquitectura y Diseño" },
        { name: "Restauración de Edificaciones", field: "Arquitectura y Diseño" },
        { name: "Animación y Modelado 3D", field: "Arquitectura y Diseño" },

        // Especialidades de Administración y Finanzas
        { name: "Administración de Empresas", field: "Administración y Finanzas" },
        { name: "Contaduría Pública", field: "Administración y Finanzas" },
        { name: "Finanzas y Banca", field: "Administración y Finanzas" },
        { name: "Mercadeo y Publicidad", field: "Administración y Finanzas" },
        { name: "Recursos Humanos", field: "Administración y Finanzas" },
        { name: "Logística y Supply Chain", field: "Administración y Finanzas" },
        { name: "Comercio Internacional", field: "Administración y Finanzas" },
        { name: "Economía", field: "Administración y Finanzas" },
        { name: "Gestión de Proyectos", field: "Administración y Finanzas" },
        { name: "Auditoría", field: "Administración y Finanzas" },

        // Especialidades de Servicios Generales y Oficios Varios
        { name: "Electricista", field: "Servicios Generales y Oficios Varios" },
        { name: "Plomero", field: "Servicios Generales y Oficios Varios" },
        { name: "Carpintero", field: "Servicios Generales y Oficios Varios" },
        { name: "Albañil", field: "Servicios Generales y Oficios Varios" },
        { name: "Jornalero Agrícola", field: "Servicios Generales y Oficios Varios" },
        { name: "Jornalero de Obra", field: "Servicios Generales y Oficios Varios" },
        { name: "Soldador", field: "Servicios Generales y Oficios Varios" },
        { name: "Mecánico Automotriz", field: "Servicios Generales y Oficios Varios" },
        { name: "Jardinería", field: "Servicios Generales y Oficios Varios" },
        { name: "Operador de Maquinaria Pesada", field: "Servicios Generales y Oficios Varios" }
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

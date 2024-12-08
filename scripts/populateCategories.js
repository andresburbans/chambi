const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const populateCategories = async () => {
    const categories = [
        {
            name: "Reparaciones y Mantenimiento",
            description: "Servicios relacionados con la reparación y mantenimiento.",
            subcategories: [
                { id: "1.1", name: "Reparación de electrodomésticos" },
                { id: "1.2", name: "Servicios de plomería y electricidad" },
                { id: "1.3", name: "Reparación de muebles" },
                { id: "1.4", name: "Reparación de sistemas eléctricos" },
                { id: "1.5", name: "Restauración de pisos dañados" },
                { id: "1.6", name: "Reparación de ventanas y puertas" },
                { id: "1.7", name: "Remodelación y renovación de espacios" },
                { id: "1.8", name: "Reparación de cerraduras" },
                { id: "1.9", name: "Reparación de techos y goteras" },
                { id: "1.10", name: "Mantenimiento general del hogar" }
            ]
        },
        {
            name: "Cuidado de Animales y Personas",
            description: "Servicios relacionados con el cuidado de animales y personas.",
            subcategories: [
                { id: "2.1", name: "Paseo de perros" },
                { id: "2.2", name: "Cuidado de mascotas a domicilio" },
                { id: "2.3", name: "Adiestramiento canino" },
                { id: "2.4", name: "Servicios de veterinario móvil" },
                { id: "2.5", name: "Consultas médicas a domicilio" },
                { id: "2.6", name: "Cuidado de adultos mayores a domicilio" },
                { id: "2.7", name: "Servicios de enfermería en casa" },
                { id: "2.8", name: "Guardería para mascotas" },
                { id: "2.9", name: "Psicología y coaching personal" },
                { id: "2.10", name: "Alimentación y cuidado de animales grandes" }
            ]
        },
        {
            name: "Limpieza y Mantenimiento del Hogar",
            description: "Servicios relacionados con la limpieza y el mantenimiento del hogar.",
            subcategories: [
                { id: "3.1", name: "Limpieza profunda del hogar" },
                { id: "3.2", name: "Lavado de alfombras" },
                { id: "3.3", name: "Limpieza de ventanas" },
                { id: "3.4", name: "Servicio de limpieza post-construcción" },
                { id: "3.5", name: "Desinfección de espacios" },
                { id: "3.6", name: "Limpieza de jardines y patios" },
                { id: "3.7", name: "Limpieza de cocinas industriales" },
                { id: "3.8", name: "Organización de espacios" },
                { id: "3.9", name: "Eliminación de plagas" },
                { id: "3.10", name: "Limpieza de piscinas" }
            ]
        },
        {
            name: "Instalaciones y Colocaciones",
            description: "Servicios relacionados con instalaciones y colocaciones en el hogar.",
            subcategories: [
                { id: "4.1", name: "Instalación de aire acondicionado" },
                { id: "4.2", name: "Instalación de sistemas de riego" },
                { id: "4.3", name: "Montaje de muebles" },
                { id: "4.4", name: "Instalación de calentadores de agua" },
                { id: "4.5", name: "Instalación de sistemas de alarma" },
                { id: "4.6", name: "Colocación de cortinas y persianas" },
                { id: "4.7", name: "Instalación de pisos laminados" },
                { id: "4.8", name: "Instalación de sistemas de seguridad" },
                { id: "4.9", name: "Instalación de redes Wi-Fi" },
                { id: "4.10", name: "Colocación de techos falsos" }
            ]
        },
        {
            name: "Decoración y Estética",
            description: "Servicios relacionados con decoración y estética del hogar.",
            subcategories: [
                { id: "5.1", name: "Diseño y decoración de interiores" },
                { id: "5.2", name: "Pintura mural" },
                { id: "5.3", name: "Decoración de eventos" },
                { id: "5.4", name: "Restauración de piezas antiguas" },
                { id: "5.5", name: "Diseño de jardines" },
                { id: "5.6", name: "Personalización de muebles" },
                { id: "5.7", name: "Instalación de iluminación decorativa" },
                { id: "5.8", name: "Diseño de vitrinas comerciales" },
                { id: "5.9", name: "Remodelación de espacios" },
                { id: "5.10", name: "Montaje de cuadros y arte" }
            ]
        },
        {
            name: "Belleza, Estética y Cuidado Personal",
            description: "Servicios relacionados con belleza y cuidado personal.",
            subcategories: [
                { id: "6.1", name: "Peluquería a domicilio" },
                { id: "6.2", name: "Manicure y pedicure a domicilio" },
                { id: "6.3", name: "Maquillaje profesional para eventos" },
                { id: "6.4", name: "Masajes terapéuticos" },
                { id: "6.5", name: "Tratamientos faciales" },
                { id: "6.6", name: "Cuidado y corte de barba" },
                { id: "6.7", name: "Aplicación de extensiones de cabello" },
                { id: "6.8", name: "Depilación profesional" },
                { id: "6.9", name: "Cursos de maquillaje" },
                { id: "6.10", name: "Tatuajes y piercings" }
            ]
        },
        {
            name: "Servicios de Mecánica y Automotores",
            description: "Servicios relacionados con mantenimiento automotriz.",
            subcategories: [
                { id: "7.1", name: "Cambio de aceite a domicilio" },
                { id: "7.2", name: "Reparación de frenos" },
                { id: "7.3", name: "Mantenimiento de aire acondicionado automotriz" },
                { id: "7.4", name: "Diagnóstico y reparación de motores" },
                { id: "7.5", name: "Pintura automotriz" },
                { id: "7.6", name: "Servicio de grúa" },
                { id: "7.7", name: "Revisión técnico-mecánica" },
                { id: "7.8", name: "Instalación de sistemas de sonido" },
                { id: "7.9", name: "Reparación de llantas" },
                { id: "7.10", name: "Personalización de vehículos" }
            ]
        },
        {
            name: "Otros",
            description: "Otros servicios especializados.",
            subcategories: [
                { id: "8.1", name: "Asesoría financiera y planificación fiscal" },
                { id: "8.2", name: "Clases particulares y tutorías" },
                { id: "8.3", name: "Transporte de mercancías y carga" },
                { id: "8.4", name: "Gestión de redes sociales y community management" },
                { id: "8.5", name: "Cursos de tecnología y programación" },
                { id: "8.6", name: "Reparación de equipos electrónicos" },
                { id: "8.7", name: "Diseño gráfico y producción audiovisual" },
                { id: "8.8", name: "Almacenamiento y gestión de inventarios" },
                { id: "8.9", name: "Consultoría en proyectos educativos y pedagógicos" },
                { id: "8.10", name: "Consultoría en logística y distribución" }
            ]
        }
    ];

    const batch = db.batch();
    categories.forEach((category, index) => {
        const docRef = db.collection("categories").doc(`category${index + 1}`);
        batch.set(docRef, category);
    });

    await batch.commit();
    console.log("Categorías insertadas exitosamente.");
};

populateCategories();

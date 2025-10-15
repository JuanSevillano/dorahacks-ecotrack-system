// src/components/data/appData.ts

// Importa las imágenes desde tu carpeta de assets

export const appData = {
    // --- Header & Footer Data ---
    projectName: "VerdeCap",
    navLinks: [
        { title: "Home", url: "/" },
        { title: "Protocol", url: "/protocol" },
        { title: "Biokeys", url: "#" },
        { title: "Community", url: "#" },
    ],
    footer: {
        copy: "© 2024 VerdeCap. All rights reserved.",
        links: [
            { title: "Terms of Service", url: "#" },
            { title: "Privacy Policy", url: "#" },
        ],
    },

    // --- Hero Section ---
    hero: {
        background: '../../assets/home/image.jpeg',
        title: "VerdeCap: Digitalizando Acciones Ecológicas",
        subtitle: "Un marketplace para registrar tus acciones de bioconstrucción en nuestro sistema de recompensas 'B3TR'. Participa, aprende y gana con VerdeCap.",
        cta: "Explora Biokeys",
    },

    // --- Biokeys Section ---
    biokeys: {
        image: '',
        title: "Biokeys: Tu Llave al Futuro Sostenible",
        description: "Biokeys es nuestra colección piloto de NFTs que representa la digitalización de acciones de bioconstrucción. Cada Biokey es una prueba de tu contribución a un planeta más verde, integrada en nuestro sistema de recompensas B3TR. Al poseer un Biokey, no solo tienes un activo digital único, sino que también eres parte activa de la revolución ecológica.",
    },

    // --- Participation Section ---
    participation: {
        title: "Participa y Transforma",
        description: "VerdeCap es más que un protocolo DeFi, es una comunidad de acción. Ofrecemos diversas oportunidades para que te involucres directamente en la construcción de un futuro más sostenible. Tus acciones son valiosas y, con VerdeCap, ahora pueden ser recompensadas.",
        features: [
            { title: "Talleres de Bioconstrucción", description: "Aprende técnicas de construcción sostenible de la mano de expertos. Nuestros talleres prácticos te enseñarán a utilizar materiales naturales y a reducir el impacto de carbono en la edificación." },
            { title: "Voluntariados", description: "Únete a nuestros programas de voluntariado y participa en la construcción de bio-casas reales. Tu tiempo y esfuerzo se convierten en un activo digital." },
            { title: "Campamentos", description: "Vive una inmersión total en el mundo de la bioconstrucción. Nuestros campamentos ofrecen una experiencia educativa y comunitaria única." },
        ],
    },

    // --- How It Works Section ---
    howItWorks: {
        title: "¿Cómo Funciona el Sistema B3TR?",
        steps: [
            { title: "Participa en una Actividad", description: "Inscríbete y completa un taller, voluntariado o campamento de VerdeCap." },
            { title: "Verificación y Digitalización", description: "Tu participación es verificada y registrada en la blockchain, creando un Biokey NFT como prueba de tu acción ecológica." },
            { title: "Gana Recompensas", description: "Tu Biokey te da acceso a recompensas dentro del ecosistema VerdeCap, incentivando tu continuo apoyo a la sostenibilidad." },
        ],
    },

    // --- Team Section ---
    team: {
        title: "Conoce a Nuestro Equipo",
        description: "Un equipo diverso y apasionado que impulsa la visión de VerdeCap de un futuro más verde y descentralizado.",
        members: [
            { name: "Jimmy Sevillano Giraldo", role: "CEO & Founder", imageUrl: './assets/home/0_team.jpg', description: "Arquitecto y pionero en técnicas de construcción sostenible. Supervisa todos los proyectos de campo." },
            { name: "Juan D. Sevillano Giraldo", role: "Founder & Developer", imageUrl: './assets/home/1_team.jpg', description: "Experta en blockchain con una pasión por la sostenibilidad. Lidera la visión estratégica de VerdeCap." },
        ],
    },

    // --- Partners Section ---
    partners: {
        title: "Nuestras Alianzas Estratégicas",
        description: "Colaboramos con líderes en sostenibilidad y tecnología para amplificar nuestro impacto.",
        logos: [
            { name: "EcoBuild Solutions", logo: 'ecoBuildLogo', description: "Líderes en materiales de construcción sostenibles." },
            { name: "GreenTech Foundation", logo: 'greenTechLogo', description: "ONG enfocada en la innovación tecnológica para el medio ambiente." },
            { name: "Polygon Network", logo: 'polygonLogo', description: "Nuestra infraestructura blockchain, eficiente y de bajo impacto." },
        ],
    },

    // --- Roadmap Section ---
    roadmap: {
        title: "Nuestro Camino Hacia Adelante",
        description: "El futuro de VerdeCap es brillante y verde. Nuestro roadmap está diseñado para expandir nuestro impacto y fortalecer nuestra comunidad.",
        milestones: [
            { quarter: "Q3 2024", title: "Lanzamiento del Protocolo V1", description: "Lanzamiento oficial de la plataforma VerdeCap, incluyendo el marketplace de Biokeys y el sistema B3TR." },
            { quarter: "Q4 2024", title: "Expansión de Alianzas", description: "Establecer colaboraciones con organizaciones de bioconstrucción y ONGs a nivel global." },
            { quarter: "Q1 2025", title: "Gobernanza Comunitaria", description: "Implementación de un sistema de gobernanza (DAO) para los poseedores de Biokeys." },
            { quarter: "Q2 2025", title: "Nuevas Funcionalidades DeFi", description: "Introducción de staking de Biokeys y pools de liquidez para aumentar la utilidad y el valor." },
        ],
    },

    // --- CTA Section ---
    cta: {
        title: "¿Listo para Hacer la Diferencia?",
        buttonText: "Empezar",
    },
};
export const siteConfig = {
    brand: {
        name: "KF Planejados",
        logo: "/assets/logo-kf.png",
        logoFooter: "/assets/logo-rodape.png",
        favicon: "/assets/logo-kf.png",
    },
    colors: {
        primary: "#C5A059", // Dourado
        secondary: "#0a0a0a", // Preto Fundo
        accent: "#ffffff", // Branco/Destaque
    },
    hero: {
        tagline: "Marcenaria de Alto Padrão",
        title: "Exclusividade <br /> Atemporal.",
        subtitle: "Onde a tradição da marcenaria encontra a sofisticação do design contemporâneo.",
        bgImage: "/assets/asweb-b0567458e9becbefca45ef6c00b622b30.jpg",
        cta: "Agendar Consultoria",
        portfolioLink: "Portfólio 2026"
    },
    about: {
        tagline: "Nossa Essência",
        title: "Móveis 100% MDF <br /> Feitos Para Durar.",
        description: "Fundada por Kássio Fernando de Souza, a KF Planejados une a maestria da marcenaria tradicional às tendências do design moderno.",
        image: "/assets/asweb-9fc95c794c35b6f987d609f1abf2396b0.jpg",
        stats: {
            value: "35",
            label: "Anos de História"
        },
        features: [
            { title: "Garantia Premium", description: "Materiais certificados." },
            { title: "Excelência", description: "Referência em Goiânia." }
        ]
    },
    portfolio: {
        tagline: "The Signature Collection",
        title: "Obras Primas",
        description: "Uma seleção curada de nossos projetos mais emblemáticos.",
        projects: [
            { id: 1, title: 'Cozinha Gourmet', img: '/assets/asweb-20fc625b081546ce6680e515e4aa7d410.jpg', type: 'Moderna', size: 'large' },
            { id: 2, title: 'Living Suave', img: '/assets/asweb-70f1f67c8b12293745b6deb62322b5550.jpg', type: 'Design', size: 'small' },
            { id: 3, title: 'Suíte Luxo', img: '/assets/asweb-67a2df494bf367e5281e4b79fe2515900.jpg', type: 'Private', size: 'small' },
            { id: 4, title: 'Office Design', img: '/assets/asweb-ca17aaea3b8014aac4e882733a915b990.jpg', type: 'Executive', size: 'large' },
        ]
    },
    contact: {
        address: "Avenida França - Ville de France, Goiânia / GO",
        phone: "(62) 99100-9746",
        email: "contato@kfplanejados.com.br",
        social: {
            instagram: "#",
            facebook: "#"
        },
        whatsapp: "5562991009746"
    },
    modal: {
        totalSteps: 7,
        whatsappMessage: "Recebeu meu pedido?",
        steps: [
            {
                id: 1,
                title: "O que você precisa?",
                subtitle: "Selecione o tipo de serviço",
                field: "tipo",
                options: ["Cozinha planejada", "Guarda-roupa", "Painel de TV", "Escritório", "Outro"]
            },
            // ... as outras etapas seriam configuradas aqui para total flexibilidade
        ]
    }
};

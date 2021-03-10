const riseAndEnegise = {
    hero: {
        title: 'Rise & Energise',
        tagline: 'To support your energy throughout the day',
        description: 'Feel bright eyed and bushy tailed with boosting B vitamins, Siberian Ginseng and fatigue-fighting minerals.',
        imgUrl: 'https://static-prod.vitl.com/images/health-goals/rise-and-energise/hero.jpg',
        imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/rise-and-energise/hero-mobile.jpg',
        bgColor: '#F0DFD8'
    },
    benefits: {
        description: 'Forget afternoon slumps and energy dips as this potent formula has been designed to fuel up your cellular powerhouses to help you feel lively from dusk ‘til dawn.',
        items: [
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-vitamins.svg',
                label: 'Vitamins',
                description: 'A full <strong>B vitamin complex</strong> with vitamin C to support normal <strong>energy-yielding metabolism</strong> as well as help the <strong>reduction of tiredness and fatigue</strong>.'
            },
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-amino.svg',
                label: 'Plant extracts & antioxidants',
                description: 'Siberian Ginseng has been shown to help <strong>reduce fatigue</strong> and <strong>support energy levels</strong>, whilst CoQ10 has been shown to <strong>reduce symptoms of fatigue</strong>.'
            },
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-minerals.svg',
                label: 'Minerals',
                description: 'Iron, choline, magnesium and iodine contribute to normal <strong>energy-yielding metabolism</strong> and to the <strong>reduction of tiredness and fatigue</strong>.'
            }
        ]
    },
    ingredients: {
        items: [
            {
                name: 'B vitamin complex',
                description: 'Including vitamin B1, B2, B3, B5, B6, biotin, folate and B12 to support <strong>energy-yielding metabolism</strong> and the <strong>reduction of tiredness and fatigue</strong>.',
                amount: '',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/B-vitamin-complex.jpg',
                sources: []
            },
            {
                name: 'Siberian Ginseng',
                description: 'Research has shown that this plant extract may help <strong>reduce fatigue and support energy levels</strong>.',
                amount: '4mg, 25:1 extract',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Siberian-Ginseng.jpg',
                sources: [
                    {
                        id: 1,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5052440/'
                    },
                    {
                        id: 2,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/23356855'
                    },
                    {
                        id: 3,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/27822924'
                    },
                    {
                        id: 4,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/23613825/'
                    },
                    {
                        id: 5,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/15982990'
                    }
                ]
            },
            {
                name: 'Vitamin C',
                description: 'Contributes to <strong>normal energy-yielding metabolism<strong/> and to the <strong>reduction of tiredness and fatigue</strong>.',
                amount: '60mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-C.jpg',
                sources: []
            },
            {
                name: 'CoQ10',
                description: 'A powerful antioxidant. Research has shown it may help to <strong>reduce symptoms of fatigue</strong>.',
                amount: '60mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/CoQ10.jpg',
                sources: [
                    {
                        id: 6,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4112525/'
                    },
                    {
                        id: 7,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/18272335/;'
                    },
                    {
                        id: 8,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/30935528'
                    },
                    {
                        id: 9,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/26526835'
                    }
                ]
            },
            {
                name: 'Iron',
                description: 'Contributes to normal <strong>energy-yielding metabolism</strong> and to the <strong>reduction of tiredness and fatigue</strong>.',
                amount: '7mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Iron.jpg',
                sources: []
            },
            {
                name: 'Magnesium',
                description: 'Contributes to normal <strong>energy-yielding metabolism</strong> and to the <strong>reduction of tiredness and fatigue</strong>.',
                amount: '60mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Magnesium.jpg',
                sources: []
            },
            {
                name: 'Choline',
                description: 'Used in many stages of <strong>metabolism</strong> and the production of specific neurotransmitters required for heartbeat and muscle movement.',
                amount: '50mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Choline.jpg',
                sources: [
                    {
                        id: 10,
                        url: 'https://ods.od.nih.gov/factsheets/Choline-HealthProfessional/#en1'
                    },
                    {
                        id: 11,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2782876/'
                    },
                    {
                        id: 12,
                        url: 'https://www.frontiersin.org/articles/10.3389/fphys.2012.00174/full'
                    },
                    {
                        id: 13,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2518394/'
                    }
                ]
            },
            {
                name: 'Iodine',
                description: 'Contributes to <strong>normal energy-yielding metabolism</strong>.',
                amount: '75μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Iodine.jpg',
                sources: []
            }

        ]
    },
    facts: {
        items: [
            {
                category: 'No nasties',
                us: {
                    description: 'There’s no room for anything but goodness in these daily, vegan-friendly capsules. That means they’re completely filler free, so no bulking agents, artificial colours or preservatives.',
                    icons: [
                        {
                            name: 'Vegan',
                            url: 'https://static.vitl.com/images/icons/icon-boxed-vegan.svg'
                        },
                        {
                            name: 'Highly absorbable',
                            url: 'https://static.vitl.com/images/icons/icon-boxed-highly-absorbable.svg'
                        },
                        {
                            name: 'Non-GMO',
                            url: 'https://static.vitl.com/images/icons/icon-boxed-non-gmo.svg'
                        }
                    ]
                },
                others: {
                    description: 'Most of the main supplements brands bulk out their formulas with anti-caking agents and bulking powders to make you think you’re getting your money’s worth.'
                }
            },
            {
                category: 'Pure and powerful',
                us: {
                    description: 'You’ll get each individual nutrient is its purest, most bioavailable form, so you’ll actually absorb all the goodness contained in each digestible and easy-to-swallow capsule.',
                    icons: []
                },
                others: {
                    description: 'Made using low-quality artificial ingredients instead of plant and food extracts to keep costs low.'
                }
            },
            {
                category: 'Premium quality',
                us: {
                    description: 'This unique formula has been designed by experienced nutritionists using a synergistic combination to target both the reduction of tiredness and fatigue and support sustained energy levels.',
                    icons: []
                },
                others: {
                    description: 'Often loaded with preservatives, colourants and non-medical ingredients that harm the bioavailability of the vitamins, reducing the impact of the nutrients they provide.'
                }
            }
        ]
    },
    footer: {
        imgUrl: 'https://static-prod.vitl.com/images/health-goals/rise-and-energise/lifestyle.jpg',
        imgUrlTablet: 'https://static-prod.vitl.com/images/health-goals/rise-and-energise/lifestyle-tablet.jpg',
        imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/rise-and-energise/lifestyle-mobile.jpg'
    },
    recommendedProductIDs: [68, 69]
};

export default riseAndEnegise;
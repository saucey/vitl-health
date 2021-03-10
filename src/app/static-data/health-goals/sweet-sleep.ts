const sweetSleep = {
    hero: {
        title: 'Sweet Sleep',
        tagline: 'To help you prepare for a deep and restful sleep',
        description: 'Tune into your inner tranquility with this dreamy blend of vitamins, minerals, calming plant extracts and soothing aminos.',
        imgUrl: 'https://static-prod.vitl.com/images/health-goals/sweet-sleep/hero.jpg',
        imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/sweet-sleep/hero-mobile.jpg',
        bgColor: '#C4D8E4'
    },
    benefits: {
        description: 'Formulated to help you drift off to the land of nod by supporting melatonin production, promoting relaxation, and helping to balance psychological function. This supplement is designed to be taken close to bedtime as the potent herbal and plant extracts it delivers have mild sedative properties to help signal to your body that it’s time to sleep.',
        items: [
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-vitamins.svg',
                label: 'Plant extracts',
                description: 'Lemon balm and cherry extract have been shown to promote <strong>calmness</strong> as well as have <strong>mild sedative</strong> properties, and shown to <strong>increase sleep time and efficiency</strong>.'
            },
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-amino.svg',
                label: 'Amino acids',
                description: 'Research has shown that glycine and L-theanine help to promote <strong>sleep and relaxation</strong>, to <strong>soothe anxiety</strong> and may also <strong>lessen daytime sleepiness</strong> and <strong>improve cognition</strong>.'
            },
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-minerals.svg',
                label: 'Vitamins & minerals',
                description: 'Vitamin B6, zinc and magnesium to minimise sleep disturbance, support normal <strong>cognitive function</strong>, the <strong>onset of sleep</strong>, as well as <strong>healthy melatonin levels</strong>.'
            }
        ]
    },
    ingredients: {
        items: [
            {
                name: 'Glycine',
                description: 'Research has shown glycine to have an effect on neurotransmitter receptors.',
                amount: '200mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Glycine.jpg',
                sources: [
                    {
                        id: 1,
                        url: 'https://onlinelibrary.wiley.com/doi/full/10.1111/j.1479-8425.2007.00262.x'
                    },
                    {
                        id: 2,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/22529837/'
                    }
                ]
            },
            {
                name: 'Magnesium',
                description: 'Magnesium contributes to the normal functioning of the nervous system.',
                amount: '50mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Magnesium.jpg',
                sources: [
                    {
                        id: 3,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/12030424/'
                    },
                    {
                        id: 4,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/12163983/'
                    },
                    {
                        id: 5,
                        url: 'https://efsa.onlinelibrary.wiley.com/doi/pdf/10.2903/j.efsa.2010.1807'
                    }
                ]
            },
            {
                name: 'L-Theanine',
                description: 'Found in green tea, L-theanine is an amino acid not naturally produced by the body.',
                amount: '100mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/L-Theanine.jpg',
                sources: [
                    {
                        id: 6,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4008810/'
                    },
                    {
                        id: 7,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/15378679/'
                    },
                    {
                        id: 8,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/22214254/'
                    }
                ]
            },
            {
                name: 'Lemon Balm',
                description: 'Lemon balm is an extract that is a popular ingredient in herbal teas.',
                amount: '100mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Lemon-Balm.jpg',
                sources: [
                    {
                        id: 9,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4245564/'
                    },
                    {
                        id: 10,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/12888775/'
                    }
                ]
            },
            {
                name: 'Zinc',
                description: 'Zinc contributes to normal cognitive function.',
                amount: '10mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Zinc.jpg',
                sources: [
                    {
                        id: 11,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5713303/'
                    },
                    {
                        id: 12,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/21226679/'
                    }
                ]
            },
            {
                name: 'Cherry extract',
                description: 'Our cherry extract is derived from Montmorency Cherry, which contains melatonin.',
                amount: '32mg, 5:1 extract',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Cherry-extract.jpg',
                sources: [
                    {
                        id: 13,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/11600041/'
                    },
                    {
                        id: 14,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/22038497/'
                    },
                    {
                        id: 15,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/28901958/'
                    }
                ]
            },
            {
                name: 'Vitamin B6',
                description: 'Contributes to normal psychological function and the regulation of hormonal activity.',
                amount: '1.4mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B6.jpg',
                sources: [
                    {
                        id: 16,
                        url: 'https://www.sciencedirect.com/topics/social-sciences/serotonin'
                    },
                    {
                        id: 17,
                        url: 'https://pubmed.ncbi.nlm.nih.gov/28274900/'
                    },
                    {
                        id: 18,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2174691/'
                    }
                ]
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
                category: 'Balanced ingredients',
                us: {
                    description: 'This unique formulation has been designed to provide synergistic combinations of nutrients that work together to enhance their effects to help you both in the short term, helping you to drift off, as well as in the long term, helping to recalibrate your bodyclock.',
                    icons: []
                },
                others: {
                    description: 'Often loaded with preservatives, colourants and non-medical ingredients that harm the bioavailability of the vitamins, reducing the impact of the nutrients they provide.'
                }
            },
            {
                category: 'Premium quality',
                us: {
                    description: 'You’ll get each individual nutrient is its purest, most bioavailable form, so you’ll actually absorb all the goodness contained in each digestible and easy-to-swallow capsule.',
                    icons: []
                },
                others: {
                    description: 'Made using low-quality artificial ingredients instead of plant and food extracts to keep costs low.'
                }
            }
        ]
    },
    footer: {
        imgUrl: 'https://static-prod.vitl.com/images/health-goals/sweet-sleep/lifestyle.jpg',
        imgUrlTablet: 'https://static-prod.vitl.com/images/health-goals/sweet-sleep/lifestyle-tablet.jpg',
        imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/sweet-sleep/lifestyle-mobile.jpg'
    },
    recommendedProductIDs: [67, 69]
};

export default sweetSleep;
const getUpAndGlow = {
    hero: {
        title: 'Get Up & Glow',
        tagline: 'For skin, hair and nails',
        description: 'Get glowing with these super skin saviours, formulated to nourish you from the inside so you can radiate on the outside.',
        imgUrl: 'https://static-prod.vitl.com/images/health-goals/get-up-and-glow/hero.jpg',
        imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/get-up-and-glow/hero-mobile.jpg',
        bgColor: '#F4DFF4'
    },
    benefits: {
        description: 'A dose of classic complexion heroes such as vitamin E, biotin and zinc, as well as a number of potent antioxidants. Our expert nutritionists have added specific nutrients to support collagen production, regulate hormones and protect against skin UV damage.',
        items: [
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-vitamins.svg',
                label: 'Vitamins',
                description: 'Vitamins C, D, E with B vitamins to <strong>regulate hormones</strong>, <strong>support collagen production</strong>, and provide antioxidants that help to <strong>protect skin from the effects of UV</strong> exposure.'
            },
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-amino.svg',
                label: 'Plant extracts & amino acids',
                description: 'Phytonutrients and astaxanthin provide antioxidants to <strong>protect skin</strong> and <strong>maintain complexion</strong>, and L-cysteine which supports keratin production to help <strong>strengthen hair and nails</strong>.'
            },
            {
                iconUrl: 'https://static.vitl.com/images/icons/icon-minerals.svg',
                label: 'Minerals',
                description: 'Zinc, selenium, iodine, iron and copper contribute to the maintenance <strong>of connective tissues</strong> as well as <strong>skin and hair pigmentation</strong>.'
            }
        ]
    },
    ingredients: {
        items: [
            {
                name: 'Vitamin C',
                description: '<strong>Crucial for collagen production</strong> and contributes to the <strong>protection of cells from oxidative stress</strong>.',
                amount: '200mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-C.jpg',
                sources: []
            },
            {
                name: 'Vitamin E',
                description: 'Shown to help <strong>protect skin from harmful UV damage</strong> and to <strong>alleviate atopic dermatitis and psoriasis</strong>.',
                amount: '12mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-E.jpg',
                sources: [
                    {
                        id: 1,
                        url: 'https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2012:136:0001:0040:EN:PDF'
                    },
                    {
                        id: 2,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3257702/'
                    },
                    {
                        id: 3,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4755091/'
                    },
                    {
                        id: 4,
                        url: 'https://www.longdom.org/open-access/psoriasis-and-fatsoluble-vitamins-a-review-2155-9554-1000421.pdf'
                    }
                ]
            },
            {
                name: 'L-cysteine',
                description: 'Required for the synthesis of keratin. Studies have shown it can <strong>reduce hair loss</strong> and help to <strong>strengthen hair</strong>.',
                amount: '100mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/L-cysteine.jpg',
                sources: [
                    {
                        id: 5,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6561714/'
                    },
                    {
                        id: 6,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6017824/'
                    }
                ]
            },
            {
                name: 'Curcurmin extract',
                description: 'The active element in turmeric, curcurmin has <strong>anti-inflammatory and antioxidant properties</strong>.',
                amount: '60mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Curcurmin-extract.jpg',
                sources: [
                    {
                        id: 7,
                        url: 'http://archive.foundationalmedicinereview.com/publications/14/2/141.pdf'
                    },
                    {
                        id: 8,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/27213821'
                    },
                    {
                        id: 9,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3535097/'
                    },
                    {
                        id: 10,
                        url: 'https://onlinelibrary.wiley.com/doi/abs/10.1002/ptr.5640'
                    }
                ]
            },
            {
                name: 'Astaxanthin',
                description: 'A vitamin A derivative, studies suggest a <strong>preventative effect from damage caused by sunlight</strong> such as wrinkling or sagging.',
                amount: '1.5mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Astaxanthin.jpg',
                sources: [
                    {
                        id: 11,
                        url: 'https://www.tandfonline.com/doi/full/10.4161/derm.22876'
                    },
                    {
                        id: 12,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5946307/'
                    }
                ]
            },
            {
                name: 'Zinc',
                description: 'Contributes to the <strong>maintenance of normal skin, hair and nails</strong>.',
                amount: '10mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Zinc.jpg',
                sources: []
            },
            {
                name: 'Selenium',
                description: 'Contributes to the <strong>protection of cells from oxidative stress</strong>.',
                amount: '55μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Selenium.jpg',
                sources: []
            },
            {
                name: 'Beta-carotene',
                description: 'Shown to <strong>protect against sun damage</strong> in the skin.',
                amount: '2mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Beta-carotene.jpg',
                sources: [
                    {
                        id: 13,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/9285493'
                    },
                    {
                        id: 14,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3257702/#!po=87.5000'
                    },
                    {
                        id: 15,
                        url: 'https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2012:136:0001:0040:EN:PDF'
                    }
                    
                ]
            },
            {
                name: 'Grape seed extract',
                description: 'Shown to help <strong>protect against oxidative stress</strong>, <strong>tissue damage from UV</strong> exposure and <strong>inflammation</strong>.',
                amount: '10mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Grape-seed-extract.jpg',
                sources: [
                    {
                        id: 16,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3916869/#!po=19.2308'
                    },
                    {
                        id: 17,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/21762105'
                    },
                    {
                        id: 18,
                        url: 'https://www.nature.com/articles/1602438'
                    },
                    {
                        id: 19,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/28208630'
                    }
                ]
            },
            {
                name: 'Vitamin D',
                description: 'Numerous studies have correlated low vitamin D levels to skin conditions including psoriasis and atopic dermatitis',
                amount: '10μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-D.jpg',
                sources: [
                    {
                        id: 20,
                        url: 'https://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:2012:136:0001:0040:EN:PDF'
                    },
                    {
                        id: 21,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4642156/#!po=81.6667'
                    },
                    {
                        id: 22,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5929942/'
                    },
                    {
                        id: 23,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4828511/'
                    }
                ]
            },
            {
                name: 'Vitamin K',
                description: 'Vitamin K works synergistically with vitamin D to help <strong>maintain normal blood calcium levels</strong>.',
                amount: '75μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-K.jpg',
                sources: [
                    {
                        id: 24,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5613455/'
                    }
                ]
            },
            {
                name: 'Vitamin B6',
                description: 'Contributes to the <strong>regulation of hormonal activity</strong>.',
                amount: '5mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B6.jpg',
                sources: []
            },
            {
                name: 'Copper',
                description: 'Contributes to the <strong>maintenance of connective tissues</strong> as well as skin and hair pigmentation.',
                amount: '1mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Copper.jpg',
                sources: []
            },
            {
                name: 'Folate',
                description: 'Contributes to <strong>normal amino acid synthesis</strong>, essential for healthy hair, skin and nail growth.',
                amount: '200μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Folate.jpg',
                sources: [
                    {
                        id: 25,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/19301095'
                    }
                ]
            },
            {
                name: 'Iodine',
                description: 'Contributes to the <strong>maintenance of normal skin</strong>.',
                amount: '150μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Iodine.jpg',
                sources: []
            },
            {
                name: 'Biotin',
                description: 'Contributes to the <strong>maintenance of normal hair and skin</strong>.',
                amount: '100μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Biotin.jpg',
                sources: []
            },
            {
                name: 'Black pepper',
                description: 'Shown to <strong>increase the bioavailability of nutrients</strong> such as curcurmin, vitamin C and beta-carotene.',
                amount: '2mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Black-pepper.jpg',
                sources: [
                    {
                        id: 26,
                        url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3535097'
                    },
                    {
                        id: 27,
                        url: 'https://www.ncbi.nlm.nih.gov/pubmed/14971727'
                    },
                    {
                        id: 28,
                        url: 'http://www.nutraproductsinc.com/wp-content/uploads/2015/03/Fast-C_ClinicalAbstracts2014.pdf'
                    },
                    {
                        id: 29,
                        url: 'https://www.sciencedirect.com/science/article/pii/S027153179900007X'
                    }
                ]
            },
            {
                name: 'Iron',
                description: 'Contributes to <strong>normal energy levels</strong> and the <strong>reduction of tiredness and fatigue</strong>.',
                amount: '7mg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Iron.jpg',
                sources: []
            },
            {
                name: 'Vitamin B12',
                description: 'Contributes to <strong>normal red blood cell formation</strong> to help skin healthy by helping to distribute oxygen around the body.',
                amount: '7.5μg',
                imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B12.jpg',
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
                category: 'Absolute absorption',
                us: {
                    description: 'You’ll get each individual nutrient is its purest, most bioavailable form, so you’ll actually absorb all the goodness contained in each digestible and easy-to-swallow capsule.',
                    icons: []
                },
                others: {
                    description: 'Often loaded with preservatives, colourants and non-medical ingredients that harm the bioavailability of the vitamins, reducing the impact of the nutrients they provide.'
                }
            },
            {
                category: 'Premium quality',
                us: {
                    description: 'This unique formulation has been designed to provide synergistic combinations of nutrients that work together to enhance their effects, which is why vitamin D has been combined with vitamin K, and black pepper has been added to support the absorption of curcurmin, vitamin C and beta-carotene.',
                    icons: []
                },
                others: {
                    description: 'Made using low-quality artificial ingredients instead of plant and food extracts to keep costs low.'
                }
            }
        ]
    },
    footer: {
        imgUrl: 'https://static-prod.vitl.com/images/health-goals/get-up-and-glow/lifestyle.jpg',
        imgUrlTablet: 'https://static-prod.vitl.com/images/health-goals/get-up-and-glow/lifestyle-tablet.jpg',
        imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/get-up-and-glow/lifestyle-mobile.jpg'
    },
    recommendedProductIDs: [67, 68]
};

export default getUpAndGlow;
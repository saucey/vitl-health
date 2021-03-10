const Navigation = {
    shopCategories: [
        {
            id: 'personalised',
            label: 'Personalised',
            products: [
                {
                    label: 'Personalised Pack',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/personalised.jpg',
                    description: '4 daily supplements formulated by experts based on your diet and lifestyle.',
                    route: 'product/personalised'
                },
                {
                    label: 'Essential One',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/essential-one.jpg',
                    description: 'A single personalised daily multivitamin covering the essentials.',
                    route: 'product/essential-one'
                }

            ],
            action: {
                description: 'Uniquely formulated to ensure you have the best start to the day, every day.',
                buttonLabel: 'Compare products',
                route: 'compare-personalised-products'
            }
        },
        {
            id: 'health-goals',
            label: 'Health Goals',
            products: [
                {
                    label: 'Get up & Glow',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/get-up-and-glow.jpg',
                    description: 'Supports the maintenance of normal skin, hair & nails.',
                    route: 'product/get-up-and-glow'
                },
                {
                    label: 'Rise & Energise',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/rise-and-energise.jpg',
                    description: 'To support your energy throughout the day.',
                    route: 'product/rise-and-energise'
                },
                {
                    label: 'Sweet Sleep',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/sweet-sleep.jpg',
                    description: 'To help you prepare for a deep and restful sleep.',
                    route: 'product/sweet-sleep'
                }
            ],
            action: {
                description: 'Formulated by experts to target the most common health goals.',
                buttonLabel: 'See all products',
                route: 'products/health-goals'
            }
        },
        {
            id: 'womens-health',
            label: 'Women’s Health',
            products: [
                {
                    label: 'Fertility Pack',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/fertility.jpg',
                    description: 'To prepare your body for a healthy conception.',
                    route: 'product/fertility'
                },
                {
                    label: 'Pregnancy Pack',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/pregnancy.jpg',
                    description: ' To support you and your growing baby through each stage of your pregnancy.',
                    route: 'product/pregnancy'
                },
                {
                    label: 'Postnatal Pack',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/breastfeeding.jpg',
                    description: ' To support your wellbeing as your body recovers into convenient daily strips.',
                    route: 'product/postnatal'
                },
                {
                    label: 'Menopause Pack',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/menopause.jpg',
                    description: 'To help you feel more comfortable as your body makes its menopausal adjustments.',
                    route: 'product/menopause'
                }
            ],
            action: {
                description: 'Supplements suited specifically to women, from prenatal support all the way through to managing the menopause.',
                buttonLabel: 'See all products',
                route: 'products/womens-health'
            }
        },
        {
            id: 'pocket-packs',
            label: 'Pocket Packs',
            products: [
                {
                    label: 'Immunity',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/immunity.jpg',
                    description: 'High strength antioxidants with natural plant extracts to support a healthy immune system.',
                    route: 'product/immunity'
                },
                {
                    label: 'Vitamin D',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/vitamin-d.jpg',
                    description: 'To support healthy bones, teeth, muscles and immune function.',
                    route: 'product/vitamin-d'
                },
                {
                    label: 'Omega 3',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/omega-3.jpg',
                    description: 'To support blood pressure, vision, normal heart, brain and liver function.',
                    route: 'product/omega-3'
                }
            ]
        },
        {
            id: 'dna-tests',
            label: 'DNA Tests',
            products: [
                {
                    label: 'DNA Nutrition Test',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/dna.jpg',
                    description: 'Discover how to feel your best with personalised diet, exercise & lifestyle advice based on your DNA.',
                    route: 'product/dna'
                },
                {
                    label: 'Vitamin DNA Test',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/dna-vitamin.jpg?v=2',
                    description: 'Discover which key nutrients you’re more likely to need to supplement with according to your DNA.',
                    route: 'product/dna-vitamin-test'
                }
            ],
            action: {
                description: 'Optimise your wellbeing with personalised dietary, fitness and lifestyle advice based on your genetics.',
                buttonLabel: 'Compare products',
                route: 'products/dna'
            }
        },
        {
            id: 'vitamin-tests',
            label: 'Vitamin Tests',
            products: [
                {
                    label: 'Vitamin & Cholesterol Blood Test',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/blood.jpg',
                    description: 'Check and track your vitamins and cholesterol levels.',
                    route: 'product/blood'
                }
            ]
        },
        {
            id: 'accessories',
            label: 'Accessories',
            products: [
                {
                    label: 'The Vitl Bottle',
                    imgUrl: 'https://static-prod.vitl.com/images/nav/bottle.jpg',
                    description: 'To help remind you to stay hydrated and to take your vitamins!',
                    route: 'product/bottle'
                }
            ]
        }
    ],
    account: [
        {
            label: 'Personal Details',
            actionType: 'navigate',
            actionValue: 'myvitl/account/details',
            hasDivider: true
        },
        {
            label: 'Orders',
            actionType: 'navigate',
            actionValue: 'myvitl/account/orders',
            hasDivider: false
        },
        {
            label: 'Payment Methods',
            actionType: 'navigate',
            actionValue: 'myvitl/account/payment',
            hasDivider: false
        },
        {
            label: 'Register Kit',
            actionType: 'navigate',
            actionValue: 'kit',
            hasDivider: true
        },
        {
            label: 'Use Promo Code',
            actionType: 'callback',
            actionValue: 'addCoupon',
            hasDivider: true
        },
        {
            label: 'Referral Rewards',
            actionType: 'navigate',
            actionValue: 'myvitl/account/referral',
            hasDivider: false
        },
        {
            label: 'Feedback',
            actionType: 'navigate',
            actionValue: 'myvitl/account/feedback',
            hasDivider: true
        },
        {
            label: 'Help',
            actionType: 'navigate',
            actionValue: 'myvitl/help',
            hasDivider: false
        },
        {
            label: 'Logout',
            actionType: 'callback',
            actionValue: 'logout',
            hasDivider: false
        }
    ]
};


export default Navigation;

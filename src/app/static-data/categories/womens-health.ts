const womensHealth = {
    hero: {
        buttonLabel: 'Find out more'
    },
    overview: {
        title: 'Which best describes you?',
        description: 'Feel your best, no matter which stage you’re at.',
    },
    products: {
        title: 'Shop women’s health range',
        description: 'These unique formulations will do more than simply supplement your diet.',
        items: [
            {
                id: 'fertility',
                name: 'Fertility Pack',
                title: 'To prepare your body for a healthy conception.',
                description: 'If you’re trying for a baby, you want to know you’re giving your body the best chance of success, which is why our supplements contain all the essential nutrients to support a healthy conception.',
                price: 'From £24.95',
                imgUrl: 'https://static-prod.vitl.com/images/womens-health/product-fertility.jpg',
                buttonLabel: 'I’m trying for a baby',
                buttonIcon: 'icon-fertility'
            },
            {
                id: 'pregnancy',
                name: 'Pregnancy Pack',
                title: 'To support you and your growing baby through each stage of your pregnancy.',
                description: 'These daily supplements provide a full range of pregnancy-approved vitamins and minerals to support you and your growing baby through each exciting trimester.',
                price: 'From £24.95',
                imgUrl: 'https://static-prod.vitl.com/images/womens-health/product-pregnancy.jpg',
                buttonLabel: 'I’m pregnant',
                buttonIcon: 'icon-pregnancy'
            },
            {
                id: 'postnatal',
                name: 'Postnatal Pack',
                title: 'To support your wellbeing as your body recovers into convenient daily strips.',
                description: 'Motherhood can be overwhelming so, to keep things simple, these daily supplements are designed to provide all the nutritional support your body needs as it recovers from giving birth and adapts to nursing.',
                price: 'From £24.95',
                imgUrl: 'https://static-prod.vitl.com/images/womens-health/product-breastfeeding.jpg',
                buttonLabel: 'I recently gave birth',
                buttonIcon: 'icon-breastfeeding'
            },
            {
                id: 'menopause',
                name: 'Menopause Pack',
                title: 'To help you feel more comfortable as your body makes its menopausal adjustments.',
                description: 'The menopause can be a rollercoaster of life-disrupting side effects, which is why these supplements have been designed providing specific nutrients to help support a smoother transition.',
                price: 'From £24.95',
                imgUrl: 'https://static-prod.vitl.com/images/womens-health/product-menopause.jpg',
                buttonLabel: 'I’m menopausal',
                buttonIcon: 'icon-menopause'
            }
        ]
    }
}

export default womensHealth;
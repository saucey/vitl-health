const immunity = {
    hero: {
      title:'Immunity',
      tagline:'To help you reinforce your natural defences',
      description:'High-strength and fast-acting vitamin C, D and zinc with natural turmeric and elderberry extracts to support a healthy immune system.',
      imgUrl: 'https://static-prod.vitl.com/images/health-goals/immunity/hero.jpg',
      imgUrlMobile: 'https://static-prod.vitl.com/images/health-goals/immunity/hero-mobile.jpg',
      bgColor: '#FFF5DC'
    },
    benefits: {
      description:'Designed for cold and flu season, a potent combination of ingredients formulated to fuel up your defences and support a well-functioning immune system.',
      items: [
        {
          iconUrl: 'https://static.vitl.com/images/icons/icon-vitamins.svg',
          label:'Vitamins',
          description:'Vitamins C and D to maintain the normal function of your immune system, shown to reduce the incidence and severity of common colds in physically active people.'
        },
        {
          iconUrl: 'https://static.vitl.com/images/icons/icon-amino.svg',
          label:'Plant extracts',
          description:'Plant extracts from elderberries, turmeric and black pepper have been shown to have antiviral and antimicrobial properties.'
        },
        {
          iconUrl: 'https://static.vitl.com/images/icons/icon-minerals.svg',
          label:'Minerals',
          description:'Zinc and Selenium are antioxidants that have been shown to contribute to the maintenance and development of immune cells, by regulating T cell expression and function.'
        }
      ]
    },
    ingredients: {
      items: [
        {
          name:'Vitamin C',
          description:'Studies show this antioxidant contributes to the normal function of the immune system.',
          amount:'180mg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-C.jpg',
          sources: [
            {
              id: 1,
              url:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0432'
            },
            {
              id: 2,
              url:'https://www.tandfonline.com/doi/full/10.1080/14787210.2020.1706483?scroll=top&needAccess=true'
            },
            {
              id: 3,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5409678/'
            },
            {
              id: 4,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3659258/'
            }
          ]
        },
        {
          name:'Selenium',
          description:'Contributes to the normal function of the immune system.',
          amount:'85μg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Selenium.jpg',
          sources: [
            {
              id: 5,
              url:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0432'
            },
            {
              id: 6,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3277928/'
            },
            {
              id: 7,
              url:'https://www.thelancet.com/journals/lancet/article/PIIS0140-6736(00)02490-9/fulltext'
            }
          ]
        },
        {
          name:'Zinc',
          description:'Contributes to the normal function of the immune system.',
          amount:'15mg',
          imgUrl:'https://static-prod.vitl.com/images/health-goals/ingredients/Zinc.jpg',
          sources: [
            {
              id: 8,
              url:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0432'
            },
            {
              id: 9,
              url:'https://www.sciencedirect.com/science/article/abs/pii/S0003986116300741?via%3Dihub'
            },
            {
              id: 10,
              url:'https://academic.oup.com/jn/article/133/5/1452S/4558525'
            },
            {
              id: 11,
              url:'https://immunityageing.biomedcentral.com/articles/10.1186/1742-4933-6-9'
            }
          ]
        },
        {
          name:'Beta glucans',
          description:'Glucans have been shown to increase immune defences by activating cell immunity against infection.',
          amount:'150mg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Beta-glucans.jpg',
          sources: [
            {
              id: 12,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2704234/'
            },
            {
              id: 13,
              url:'https://pubmed.ncbi.nlm.nih.gov/17895634-effects-of-beta-glucans-on-the-immune-system/'
            },
            {
              id: 14,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3230760/'
            },
            {
              id: 15,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6479769/'
            },
            {
              id: 16,
              url:'https://www.researchgate.net/publication/46273761_Immune_modulating_effects_of_b-glucan'
            }
          ]
        },
        {
          name:'Vitamin D3',
          description:'Contributes to the normal function of the immune system.',
          amount:'25μg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-D.jpg',
          sources: [
            {
              id: 17,
              url:'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32012R0432'
            },
            {
              id: 18,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3166406/'
            },
            {
              id: 19,
              url:'https://pubmed.ncbi.nlm.nih.gov/23527013-influence-of-vitamin-d-status-and-vitamin-d3-supplementation-on-genome-wide-expression-of-white-blood-cells-a-randomized-double-blind-clinical-trial/'
            },
            {
              id: 20,
              url:'https://openrheumatologyjournal.com/VOLUME/12/PAGE/201/FULLTEXT/'
            },
            {
              id: 21,
              url:'https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/537616/SACN_Vitamin_D_and_Health_report.pdf'
            }
          ]
        },
        {
          name:'Bioperine® Black Pepper extract',
          description:'Black pepper has been shown to increase the bioavailability of nutrients such as curcurmin, vitamin C and beta-carotene.',
          amount:'1mg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Black-pepper.jpg',
          sources: [
            {
              id: 22,
              url:'https://www.tandfonline.com/doi/full/10.1080/10408398.2011.571799'
            },
            {
              id: 23,
              url:'https://pubmed.ncbi.nlm.nih.gov/27111639-quantum-chemical-and-docking-insights-into-bioavailability-enhancement-of-curcumin-by-piperine-in-pepper/'
            },
            {
              id: 24,
              url:'https://www.frontiersin.org/articles/10.3389/fcell.2018.00010/full'
            },
            {
              id: 25,
              url:'https://www.tandfonline.com/doi/abs/10.1080/10408398.2019.1565489?src=recsys&journalCode=bfsn20'
            }
          ]
        },
        {
          name:'Elderberry extract (30:1)',
          description:'Elderberries have been shown to reduce duration and severity of colds through antimicrobial activity.',
          amount:'30mg',
          imgUrl:'https://static-prod.vitl.com/images/health-goals/ingredients/Elderberry-extract.jpg',
          sources: [
            {
              id: 26,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4848651/'
            },
            {
              id: 27,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3056848/'
            },
            {
              id: 28,
              url:'https://pubmed.ncbi.nlm.nih.gov/11399518-the-effect-of-sambucol-a-black-elderberry-based-natural-product-on-the-production-of-human-cytokines-i-inflammatory-cytokines/'
            },
            {
              id: 29,
              url:'https://pubmed.ncbi.nlm.nih.gov/28198157-a-review-of-the-antiviral-properties-of-black-elder-sambucus-nigra-l-products/'
            },
            {
              id: 30,
              url:'https://pubmed.ncbi.nlm.nih.gov/15080016-randomized-study-of-the-efficacy-and-safety-of-oral-elderberry-extract-in-the-treatment-of-influenza-a-and-b-virus-infections/'
            }
          ]
        },
        {
          name:'Turmeric extract (95% curcuminoids)',
          description:'Turmeric extract has been shown to modulate the immune system by enhancing immune activities and activation of immune cells.',
          amount:'100mg',
          imgUrl:'https://static-prod.vitl.com/images/health-goals/ingredients/Turmeric-extract.jpg',
          sources: [
            {
              id: 31,
              url:'https://link.springer.com/article/10.1007%2Fs10875-006-9066-7'
            },
            {
              id: 32,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6278270/'
            },
            {
              id: 33,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5664031/'
            },
            {
              id: 34,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4022204/'
            },
            {
              id: 35,
              url:'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6509173/'
            }
          ]
        },
        {
          name: 'Vitamin B6',
          description: 'Contributes to the normal function of the immune system.',
          amount: '1.4mg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B6.jpg',
          sources: []
        },
        {
          name: 'Copper',
          description: 'Contributes to the normal function of the immune system.',
          amount: '1mg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Copper.jpg',
          sources: []
        },
        {
          name: 'Folate',
          description: 'Contributes to the normal function of the immune system.',
          amount: '200μg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Folate.jpg',
          sources: []
        },
        {
          name: 'Vitamin B12',
          description: 'Contributes to the normal function of the immune system.',
          amount: '10μg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-B12.jpg',
          sources: []
        },
        {
          name: 'Vitamin E',
          description: 'Vitamin E is shown to be an important nutrient for immune system function.',
          amount: '12mg',
          imgUrl: 'https://static-prod.vitl.com/images/health-goals/ingredients/Vitamin-E.jpg',
          sources: [
            {
              id: 1,
              url: 'https://pubmed.ncbi.nlm.nih.gov/10714244/'
            },
            {
              id: 2,
              url: 'https://pubmed.ncbi.nlm.nih.gov/3074789/'
            }
          ]
        }
      ]
    },
    facts: {
      items: [
        {
          category:'No nasties',
          us: {
            description:'There’s no room for anything but goodness in these daily, vegan-friendly capsules. That means they’re completely filler free, so no bulking agents, artificial colours or preservatives.',
            icons: [
              {
                name:'Vegan',
                url:'https://static.vitl.com/images/icons/icon-boxed-vegan.svg'
              },
              {
                name:'Highly absorbable',
                url:'https://static.vitl.com/images/icons/icon-boxed-highly-absorbable.svg'
              },
              {
                name:'Non-GMO',
                url:'https://static.vitl.com/images/icons/icon-boxed-non-gmo.svg'
              }
            ]
          },
          others: {
            description:'Most of the main supplements brands bulk out their formulas with anti-caking agents and bulking powders to make you think you’re getting your money’s worth.'
          }
        },
        {
          category:'Balanced ingredients',
          us: {
            description:'This unique formulation has been designed to provide synergistic combinations of nutrients that work together to enhance their effects to help you maintain your immune system.',
            icons: []
          },
          others: {
            description:'Often loaded with preservatives, colourants and non-medical ingredients that harm the bioavailability of the vitamins, reducing the impact of the nutrients they provide.'
          }
        },
        {
          category:'Premium quality',
          us: {
            description:'You’ll get each individual nutrient is its purest, most bioavailable form, so you’ll actually absorb all the goodness contained in each digestible and easy-to-swallow capsule.',
            icons: []
          },
          others: {
            description:'Made using low-quality artificial ingredients instead of plant and food extracts to keep costs low.'
          }
        }
      ]
    },
    footer: {
      imgUrl:'https://static-prod.vitl.com/images/health-goals/immunity/lifestyle.jpg',
      imgUrlTablet:'https://static-prod.vitl.com/images/health-goals/immunity/lifestyle-tablet.jpg',
      imgUrlMobile:'https://static-prod.vitl.com/images/health-goals/immunity/lifestyle-mobile.jpg'
    },
    recommendedProductIDs: [67, 69]
  };

  export default immunity;
export const categories = {
  Tulot: {
    id: 'Tulot',
    humanString: 'Income'
  },
  Terveys: {
    id: 'Terveys',
    humanString: 'Health'
  },
  Ravintolat_kahvilat: {
    id: 'Ravintolat_kahvilat',
    humanString: 'Eating out'
  },
  Matkailu: {
    id: 'Matkailu',
    humanString: 'Travel'
  },
  Muut: {
    id: 'Muut',
    humanString: 'Other'
  },
  Ruoka_paivittaistavarakauppa: {
    id: 'Ruoka_paivittaistavarakauppa',
    humanString: 'Grocery'
  },
  Liikkuminen: {
    id: 'Liikkuminen',
    humanString: 'Exercise'
  },
  Kulttuuri_viihde: {
    id: 'Kulttuuri_viihde',
    humanString: 'Culture and entertainment'
  },
  Luokittelemattomat: {
    id: 'Luokittelemattomat',
    humanString: 'Unclassified'
  },
  Saastot_sijoitukset: {
    id: 'Saastot_sijoitukset',
    humanString: 'Savings and investments'
  },
  Lemmikit: {
    id: 'Lemmikit',
    humanString: 'Pets'
  },
  Hyvinvointijakauneus: {
    id: 'Hyvinvointijakauneus',
    humanString: 'Welfare, beauty'
  },
  Asuminen: {
    id: 'Asuminen',
    humanString: 'Rent'
  },
  Hyvinvointi: {
    id: 'Hyvinvointi',
    humanString: 'Wellbeing'
  },
  Harrastukset: {
    id: 'Harrastukset',
    humanString: 'Hobbies'
  },
  Luottojen_maksut: {
    id: 'Luottojen_maksut',
    humanString: 'Credit payments'
  },
  Lapset: {
    id: 'Lapset',
    humanString: 'Children'
  },
  Shoppailu: {
    id: 'Shoppailu',
    humanString: 'Shopping'
  },
  Vakuutukset: {
    id: 'Vakuutukset',
    humanString: 'Insurence'
  },
}

export const rewards = [
  {
    id: 'CATEGORY_LIMIT_MASTERY_ENTERTAINMENT',
    definition: 'Meet your Entertainment limit goal for 6 consecutive months',
    test: (statistics) => true
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_LIVING',
    definition: 'Meet your Living limit goal for 6 consecutive months',
    test: (statistics) => false
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_GROCERIES',
    definition: 'Meet your Groceries limit goal for 6 consecutive months',
    test: (statistics) => true
  }
]

export const achievements = [
  {
    id: 'CATEGORY_LIMIT_MASTERY_ENTERTAINMENT',
    definition: 'Meet your Entertainment limit goal for 6 consecutive months',
    test: (statistics) => true
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_LIVING',
    definition: 'Meet your Living limit goal for 6 consecutive months',
    test: (statistics) => false
  },
  {
    id: 'CATEGORY_LIMIT_MASTERY_GROCERIES',
    definition: 'Meet your Groceries limit goal for 6 consecutive months',
    test: (statistics) => true
  }
]
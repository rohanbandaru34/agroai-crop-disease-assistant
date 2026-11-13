# AgroAI Crop Images Repository

This directory contains individual crop photographs for the AgroAI Crop Library.

## Directory Structure
`public/images/crops/{crop-id}.jpg`

## Independent Image Management
Every crop in `src/data/cropsData.ts` defines its own image metadata:
```ts
{
  id: "rice",
  name: "Rice",
  botanicalName: "Oryza sativa",
  image: "/images/crops/rice.jpg",
  imageAlt: "Rice (Oryza sativa) plants growing in a paddy field",
  imageSource: "Wikimedia Commons",
  imageCredit: "National Rice Research Institute",
  imageLicense: "CC BY-SA 4.0"
}
```

To update any crop's image, simply replace the corresponding `.jpg` file in this directory or edit the `image` field in its metadata.

## Current Crop Inventory (33 Crops)
| Crop ID | Name | File | Status |
|---|---|---|---|
| rice | Rice | `rice.jpg` | Verified Local Photograph |
| wheat | Wheat | `wheat.jpg` | Verified Local Photograph |
| maize | Maize | `maize.jpg` | Verified Local Photograph |
| sorghum | Sorghum (Jowar) | `sorghum.jpg` | Pending Verified Photograph |
| pearl-millet | Pearl Millet (Bajra) | `pearl-millet.jpg` | Pending Verified Photograph |
| finger-millet | Finger Millet (Ragi) | `finger-millet.jpg` | Pending Verified Photograph |
| chickpea | Chickpea (Chana) | `chickpea.jpg` | Pending Verified Photograph |
| pigeon-pea | Pigeon Pea (Tur) | `pigeon-pea.jpg` | Pending Verified Photograph |
| green-gram | Green Gram (Moong) | `green-gram.jpg` | Pending Verified Photograph |
| black-gram | Black Gram (Urad) | `black-gram.jpg` | Pending Verified Photograph |
| lentil | Lentil (Masoor) | `lentil.jpg` | Pending Verified Photograph |
| cowpea | Cowpea (Lobia) | `cowpea.jpg` | Pending Verified Photograph |
| cotton | Cotton | `cotton.jpg` | Verified Local Photograph |
| sugarcane | Sugarcane | `sugarcane.jpg` | Verified Local Photograph |
| tobacco | Tobacco | `tobacco.jpg` | Pending Verified Photograph |
| jute | Jute | `jute.jpg` | Pending Verified Photograph |
| groundnut | Groundnut (Peanut) | `groundnut.jpg` | Verified Local Photograph |
| soybean | Soybean | `soybean.jpg` | Verified Local Photograph |
| mustard | Mustard (Rai) | `mustard.jpg` | Pending Verified Photograph |
| sunflower | Sunflower | `sunflower.jpg` | Pending Verified Photograph |
| sesame | Sesame (Til) | `sesame.jpg` | Pending Verified Photograph |
| mango | Mango | `mango.jpg` | Verified Local Photograph |
| banana | Banana | `banana.jpg` | Verified Local Photograph |
| papaya | Papaya | `papaya.jpg` | Pending Verified Photograph |
| tomato | Tomato | `tomato.jpg` | Verified Local Photograph |
| chilli | Chilli Pepper | `chilli.jpg` | Verified Local Photograph |
| potato | Potato | `potato.jpg` | Verified Local Photograph |
| onion | Onion | `onion.jpg` | Verified Local Photograph |
| brinjal | Brinjal (Eggplant) | `brinjal.jpg` | Verified Local Photograph |
| okra | Okra (Lady's Finger) | `okra.jpg` | Pending Verified Photograph |
| cabbage | Cabbage | `cabbage.jpg` | Pending Verified Photograph |
| cauliflower | Cauliflower | `cauliflower.jpg` | Pending Verified Photograph |
| cucumber | Cucumber | `cucumber.jpg` | Pending Verified Photograph |

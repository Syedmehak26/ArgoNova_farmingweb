// src/data/diseaseData.ts

export interface Disease {
  id: string;
  name: string;
  nameHi: string;
  nameTe: string;
  crop: string;
  severity: 'High' | 'Medium' | 'Low';
  season: 'Kharif' | 'Rabi' | 'Summer' | 'All';
  symptoms: string[];
  causes: string[];
  prevention: string[];
  organicTreatment: string[];
  chemicalTreatment: string[];
  fertilizerAdvice: string;
  image?: string; // Optional for future use
}

export const diseases: Disease[] = [
  // ==================== RICE DISEASES ====================
  {
    id: 'rice-blast',
    name: 'Rice Blast',
    nameHi: 'धान का झुलसा रोग',
    nameTe: 'వరి బ్లాస్ట్',
    crop: 'Rice',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Diamond-shaped lesions on leaves with gray centers and brown margins',
      'Neck rot causing panicles to break',
      'Nodal infection causing stem breakage',
      'White to gray-green lesions on collars',
    ],
    causes: [
      'Fungus Magnaporthe oryzae',
      'High humidity (>90%) with temperatures 24-28°C',
      'Excessive nitrogen fertilization',
      'Cloudy weather with frequent rainfall',
    ],
    prevention: [
      'Use resistant varieties like IR64, MTU1010',
      'Avoid excessive nitrogen application',
      'Maintain proper spacing for air circulation',
      'Remove and destroy infected plant debris',
    ],
    organicTreatment: [
      'Spray neem oil (3%) at 15-day intervals',
      'Apply Trichoderma viride @ 5g/L water',
      'Use cow urine spray (10% solution)',
      'Apply compost tea as foliar spray',
    ],
    chemicalTreatment: [
      'Spray Tricyclazole 75% WP @ 1g/L',
      'Apply Carbendazim 50% WP @ 1g/L',
      'Use Isoprothiolane 40% EC @ 1.5ml/L',
      'Alternate fungicides to prevent resistance',
    ],
    fertilizerAdvice: 'Reduce nitrogen by 25%, increase potassium application. Use balanced NPK (14-14-14).',
  },
  {
    id: 'rice-bacterial-blight',
    name: 'Bacterial Leaf Blight',
    nameHi: 'धान का जीवाणु पत्ती झुलसा',
    nameTe: 'వరి బ్యాక్టీరియల్ లీఫ్ బ్లైట్',
    crop: 'Rice',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Yellow to white stripes along leaf veins',
      'Leaves turn pale and dry from tips',
      'Bacterial ooze on cut leaves (milky droplets)',
      'Complete drying of leaves in severe cases',
    ],
    causes: [
      'Bacteria Xanthomonas oryzae pv. oryzae',
      'High humidity and rain',
      'Overcrowded planting',
      'Excessive nitrogen application',
    ],
    prevention: [
      'Use resistant varieties like IR64, PR114',
      'Avoid overhead irrigation',
      'Maintain proper field drainage',
      'Remove infected crop debris',
    ],
    organicTreatment: [
      'Apply Trichoderma viride',
      'Use neem oil spray (3%)',
      'Apply cow dung slurry (1:5) as soil drench',
      'Use biocontrol agents like Pseudomonas fluorescens',
    ],
    chemicalTreatment: [
      'Apply Streptocycline 1g + Copper oxychloride 2g/L',
      'Spray Copper oxychloride 50% WP @ 2.5g/L',
      'Use Bactericide formulation @ 1.5ml/L',
      'Two sprays at 10-day interval',
    ],
    fertilizerAdvice: 'Apply balanced fertilizer. Avoid excess nitrogen. Include zinc and silica for resistance.',
  },
  {
    id: 'rice-false-smut',
    name: 'False Smut',
    nameHi: 'धान का मिथ्या कंडा',
    nameTe: 'వరి ఫాల్స్ స్మట్',
    crop: 'Rice',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Greenish-black spore balls on panicles',
      'Spore balls covered with yellowish-orange powder',
      'Partial grain filling',
      'Reduced yield and grain quality',
    ],
    causes: [
      'Fungus Ustilaginoidea virens',
      'High humidity and rainfall during flowering',
      'Excessive nitrogen application',
      'Cloudy weather during panicle emergence',
    ],
    prevention: [
      'Use resistant varieties',
      'Avoid excess nitrogen at flowering',
      'Maintain proper spacing',
      'Remove infected panicles',
    ],
    organicTreatment: [
      'Apply neem oil (3%) at booting stage',
      'Use Trichoderma viride spray',
      'Apply cow urine (10%) as preventive',
      'Use compost tea weekly',
    ],
    chemicalTreatment: [
      'Spray Carbendazim 50% WP @ 1g/L at booting',
      'Apply Propiconazole 25% EC @ 1ml/L',
      'Use Tebuconazole @ 1ml/L at flowering',
      'Spray during flowering stage',
    ],
    fertilizerAdvice: 'Balanced NPK with higher potassium. Avoid late nitrogen application.',
  },

  // ==================== WHEAT DISEASES ====================
  {
    id: 'wheat-rust',
    name: 'Wheat Rust (Yellow Rust)',
    nameHi: 'गेहूँ का पीला रतुआ',
    nameTe: 'గోధుమ పసుపు తుప్పు',
    crop: 'Wheat',
    severity: 'High',
    season: 'Rabi',
    symptoms: [
      'Yellow-orange pustules in stripes on leaves',
      'Pustules on leaf sheaths and stems',
      'Black spores on mature lesions',
      'Stunted growth and reduced tillering',
    ],
    causes: [
      'Fungus Puccinia striiformis',
      'Cool moist conditions (10-15°C)',
      'Dew formation on leaves',
      'Wind-borne spores from distant fields',
    ],
    prevention: [
      'Plant resistant varieties like HD2967',
      'Avoid late sowing',
      'Ensure good field drainage',
      'Monitor fields regularly during susceptible stage',
    ],
    organicTreatment: [
      'Spray cow milk solution (1:10)',
      'Apply wheatgrass extract as foliar spray',
      'Use compost tea regularly',
      'Increase plant spacing for airflow',
    ],
    chemicalTreatment: [
      'Spray Propiconazole 25% EC @ 1ml/L',
      'Apply Tebuconazole 25.9% EC @ 1ml/L',
      'Use Mancozeb 75% WP @ 2.5g/L as preventive',
      'Two sprays at 15-day interval if needed',
    ],
    fertilizerAdvice: 'Avoid late nitrogen application. Ensure adequate manganese and zinc levels.',
  },
  {
    id: 'wheat-stem-rust',
    name: 'Stem Rust (Black Rust)',
    nameHi: 'गेहूँ का काण्ड रतुआ',
    nameTe: 'గోధుమ కాండం తుప్పు',
    crop: 'Wheat',
    severity: 'High',
    season: 'Rabi',
    symptoms: [
      'Dark brown to black elongated pustules on stem',
      'Pustules also on leaf sheaths and spikes',
      'Epidermis ruptures exposing black spores',
      'Brittle stems that break easily',
    ],
    causes: [
      'Fungus Puccinia graminis',
      'Temperatures 20-30°C',
      'Alternating wet and dry periods',
      'Wind-borne uredospores',
    ],
    prevention: [
      'Plant resistant varieties (Sr2, Sr31 genes)',
      'Remove barberry (alternate host)',
      'Early sowing to avoid peak infection',
      'Regular field monitoring',
    ],
    organicTreatment: [
      'Spray cow milk solution (1:5)',
      'Apply neem oil (2%) as preventive',
      'Use compost tea weekly',
      'Apply garlic extract spray',
    ],
    chemicalTreatment: [
      'Spray Tebuconazole 25.9% EC @ 1ml/L',
      'Apply Propiconazole 25% EC @ 1ml/L',
      'Use Mancozeb 75% WP @ 2.5g/L',
      'Spray at first sign of disease',
    ],
    fertilizerAdvice: 'Apply potash @ 40kg/ha. Avoid excess nitrogen. Ensure adequate zinc.',
  },
  {
    id: 'wheat-loose-smut',
    name: 'Loose Smut',
    nameHi: 'गेहूँ का ढीला कंडा',
    nameTe: 'గోధుమ లూజ్ స్మట్',
    crop: 'Wheat',
    severity: 'Medium',
    season: 'Rabi',
    symptoms: [
      'Dark brown to black powdery mass instead of grain',
      'Spikes emerge earlier than healthy ones',
      'Spores covering the entire spike',
      'Reduced yield and seed contamination',
    ],
    causes: [
      'Fungus Ustilago tritici',
      'Seedborne infection',
      'High humidity at flowering',
      'Temperatures 20-25°C at infection time',
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Hot water treatment of seeds (52°C for 15 min)',
      'Seed treatment with fungicides',
      'Plant resistant varieties',
    ],
    organicTreatment: [
      'Seed treatment with Trichoderma viride',
      'Use neem cake in soil',
      'Apply compost tea foliar spray',
      'Use biocontrol agents',
    ],
    chemicalTreatment: [
      'Seed treatment with Carboxin 37.5% + Thiram 37.5% @ 2g/kg seed',
      'Apply Tebuconazole seed treatment',
      'Use Vitavax powder @ 2g/kg seed',
      'Foliar spray at booting stage',
    ],
    fertilizerAdvice: 'Balanced NPK with higher potassium. Ensure adequate micronutrients.',
  },

  // ==================== COTTON DISEASES ====================
  {
    id: 'cotton-bollworm',
    name: 'Cotton Bollworm',
    nameHi: 'कपास का बॉलवर्म',
    nameTe: 'పత్తి బోల్వార్మ్',
    crop: 'Cotton',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Round holes in bolls with frass excretion',
      'Damaged flower buds and flowers',
      'Bolls turn brown and drop prematurely',
      'Larvae visible inside damaged bolls',
    ],
    causes: [
      'Helicoverpa armigera moth larvae',
      'Warm temperatures (25-35°C)',
      'Monoculture of cotton',
      'Lack of natural predators',
    ],
    prevention: [
      'Use Bt cotton resistant varieties',
      'Install pheromone traps (10/acre)',
      'Practice crop rotation with legumes',
      'Release Trichogramma parasitoids',
    ],
    organicTreatment: [
      'Apply neem seed kernel extract (5%)',
      'Use Bacillus thuringiensis (Bt) spray',
      'Release Chrysoperla predators',
      'Apply jeevamrutham as soil drench',
    ],
    chemicalTreatment: [
      'Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L',
      'Apply Emamectin benzoate 5% SG @ 0.4g/L',
      'Use Spinosad 45% SC @ 0.3ml/L',
      'Rotate insecticide modes of action',
    ],
    fertilizerAdvice: 'Ensure adequate zinc and boron. Avoid excessive nitrogen which promotes succulent growth.',
  },

  // ==================== TOMATO DISEASES ====================
  {
    id: 'tomato-early-blight',
    name: 'Tomato Early Blight',
    nameHi: 'टमाटर का आरंभिक झुलसा',
    nameTe: 'టమోటా ఎర్లీ బ్లైట్',
    crop: 'Tomato',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'Dark brown to black concentric rings on lower leaves',
      'Yellowing of leaf tissue around spots',
      'Stem lesions near soil line',
      'Fruit rot with sunken dark lesions',
    ],
    causes: [
      'Fungus Alternaria solani',
      'Warm humid weather (24-30°C)',
      'Old crop debris in field',
      'Water splash spreading spores',
    ],
    prevention: [
      'Use certified disease-free seeds',
      'Mulch around plants to prevent soil splash',
      'Remove lower infected leaves promptly',
      'Rotate with non-solanaceous crops',
    ],
    organicTreatment: [
      'Apply baking soda spray (1 tbsp/L)',
      'Use copper-based organic fungicide',
      'Spray neem oil (2%) weekly',
      'Apply compost tea as preventive',
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2g/L',
      'Apply Chlorothalonil 75% WP @ 2g/L',
      'Use Azoxystrobin 23% SC @ 1ml/L',
      'Begin sprays at first sign of disease',
    ],
    fertilizerAdvice: 'Maintain adequate potassium levels. Avoid water stress. Use calcium-rich fertilizers.',
  },
  {
    id: 'tomato-fusarium-wilt',
    name: 'Fusarium Wilt',
    nameHi: 'टमाटर का फ्यूजेरियम मुरझाव',
    nameTe: 'టమోటా ఫ్యూసేరియం విల్ట్',
    crop: 'Tomato',
    severity: 'High',
    season: 'All',
    symptoms: [
      'Yellowing and wilting of lower leaves',
      'Brown discoloration of vascular tissue',
      'Plant stunting and drooping',
      'Complete plant death in severe cases',
    ],
    causes: [
      'Fungus Fusarium oxysporum',
      'Soil-borne pathogen',
      'Warm soil temperatures (25-30°C)',
      'Poor soil drainage',
    ],
    prevention: [
      'Use resistant varieties (F1 hybrids)',
      'Solarize soil before planting',
      'Practice 4-5 year crop rotation',
      'Use raised beds for better drainage',
    ],
    organicTreatment: [
      'Apply Trichoderma viride to soil',
      'Use neem cake @ 200kg/ha',
      'Apply compost tea as soil drench',
      'Use cow dung slurry (1:5)',
    ],
    chemicalTreatment: [
      'Drench soil with Carbendazim 50% WP @ 1g/L',
      'Apply Thiophanate-methyl @ 1g/L',
      'Use Copper oxychloride as soil drench',
      'Soil sterilization with formalin',
    ],
    fertilizerAdvice: 'Add calcium and magnesium. Maintain balanced nutrition. Avoid excess nitrogen.',
  },
  {
    id: 'tomato-leaf-curl',
    name: 'Tomato Leaf Curl Virus',
    nameHi: 'टमाटर पत्ती मुड़ाव वायरस',
    nameTe: 'టమోటా లీఫ్ కర్ల్ వైరస్',
    crop: 'Tomato',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Leaves curling upwards and inwards',
      'Yellowing of leaf margins and veins',
      'Stunted plant growth',
      'Reduced fruit set and size',
    ],
    causes: [
      'Tomato leaf curl virus (ToLCV)',
      'Transmitted by whiteflies (Bemisia tabaci)',
      'Warm weather with high whitefly population',
      'Infected nursery plants',
    ],
    prevention: [
      'Use virus-free seedlings',
      'Install insect-proof netting (40-50 mesh)',
      'Control whiteflies with yellow sticky traps',
      'Remove infected plants immediately',
    ],
    organicTreatment: [
      'Spray neem oil (3%) weekly',
      'Apply garlic-chilli spray',
      'Use NSKE (neem seed kernel extract) 5%',
      'Release Encarsia wasps (whitefly predator)',
    ],
    chemicalTreatment: [
      'Spray Imidacloprid 17.8% SL @ 0.3ml/L',
      'Apply Thiamethoxam 25% WG @ 0.2g/L',
      'Use Buprofezin 25% SC @ 1ml/L',
      'Control vector (whitefly) effectively',
    ],
    fertilizerAdvice: 'Apply balanced NPK. Ensure adequate zinc and boron for virus resistance.',
  },

  // ==================== CHILLI DISEASES ====================
  {
    id: 'chilli-anthracnose',
    name: 'Chilli Anthracnose',
    nameHi: 'मिर्च का एन्थ्रेक्नोज',
    nameTe: 'మిరప ఆంథ్రాక్నోజ్',
    crop: 'Chilli',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Sunken necrotic spots on ripening fruits',
      'Pinkish spore masses in wet conditions',
      'Leaf spots with tan centers',
      'Fruit drop and rotting',
    ],
    causes: [
      'Fungus Colletotrichum capsici',
      'Warm rainy weather (25-30°C)',
      'High relative humidity',
      'Infected seed and crop residue',
    ],
    prevention: [
      'Use treated/certified seeds',
      'Avoid overhead irrigation',
      'Harvest fruits before over-ripening',
      'Practice field sanitation',
    ],
    organicTreatment: [
      'Spray neem oil (3%) with garlic extract',
      'Apply Trichoderma harzianum @ 5g/L',
      'Use Bordeaux mixture (1%)',
      'Apply compost tea weekly',
    ],
    chemicalTreatment: [
      'Spray Carbendazim 50% WP @ 1g/L',
      'Apply Mancozeb 75% WP @ 2.5g/L',
      'Use Azoxystrobin 23% SC @ 1ml/L',
      'Start at fruit set stage',
    ],
    fertilizerAdvice: 'Reduce nitrogen, increase phosphorus and potassium. Ensure calcium availability.',
  },
  {
    id: 'chilli-powdery-mildew',
    name: 'Chilli Powdery Mildew',
    nameHi: 'मिर्च का चूर्णिल आसिता',
    nameTe: 'మిరప పౌడరీ మిల్డ్యూ',
    crop: 'Chilli',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'White powdery spots on upper leaf surface',
      'Yellowing and curling of infected leaves',
      'Premature leaf drop',
      'Reduced fruit quality and yield',
    ],
    causes: [
      'Fungus Leveillula taurica',
      'Dry weather with high humidity',
      'Temperatures 20-30°C',
      'Close plant spacing (poor air circulation)',
    ],
    prevention: [
      'Maintain proper plant spacing',
      'Avoid overhead irrigation',
      'Remove infected leaves early',
      'Use resistant varieties',
    ],
    organicTreatment: [
      'Spray baking soda (1 tbsp/L water)',
      'Apply neem oil (3%) weekly',
      'Use milk spray (1:9 milk:water)',
      'Apply sulfur dust (80%)',
    ],
    chemicalTreatment: [
      'Spray Sulfur 80% WP @ 2g/L',
      'Apply Propiconazole 25% EC @ 1ml/L',
      'Use Tebuconazole 25.9% EC @ 1ml/L',
      'Spray at 10-15 day intervals',
    ],
    fertilizerAdvice: 'Reduce nitrogen, increase potassium. Maintain balanced nutrition.',
  },
  {
    id: 'chilli-leaf-curl',
    name: 'Chilli Leaf Curl Virus',
    nameHi: 'मिर्च पत्ती मुड़ाव वायरस',
    nameTe: 'మిరప లీఫ్ కర్ల్ వైరస్',
    crop: 'Chilli',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Leaves curled upwards and downwards',
      'Crinkled and distorted leaves',
      'Stunted plant growth',
      'Reduced flowering and fruiting',
    ],
    causes: [
      'Chilli leaf curl virus (ChiLCV)',
      'Transmitted by whiteflies',
      'Warm weather with high vector population',
      'Infected weeds as alternate hosts',
    ],
    prevention: [
      'Use virus-free seedlings',
      'Control whiteflies with yellow traps',
      'Remove infected plants immediately',
      'Plant border crops as trap',
    ],
    organicTreatment: [
      'Spray neem oil (3%) weekly',
      'Apply garlic-chilli spray',
      'Use NSKE (5%) for vector control',
      'Release Encarsia wasps',
    ],
    chemicalTreatment: [
      'Spray Imidacloprid 17.8% SL @ 0.3ml/L',
      'Apply Thiamethoxam 25% WG @ 0.2g/L',
      'Use Buprofezin 25% SC @ 1ml/L',
      'Control whiteflies effectively',
    ],
    fertilizerAdvice: 'Apply balanced NPK. Ensure adequate zinc and boron.',
  },

  // ==================== SUGARCANE DISEASES ====================
  {
    id: 'sugarcane-borer',
    name: 'Sugarcane Top Borer',
    nameHi: 'गन्ना तना बोरर',
    nameTe: 'చెరకు కాండం బోరర్',
    crop: 'Sugarcane',
    severity: 'High',
    season: 'All',
    symptoms: [
      'Dead heart in young canes',
      'Bore holes in the stem with frass',
      'Stunted growth and shortened internodes',
      'Reddish-brown larva inside stems',
    ],
    causes: [
      'Moth Scirpophaga excerptalis larvae',
      'Warm weather (25-35°C)',
      'Ratoon crops without management',
      'Susceptible varieties',
    ],
    prevention: [
      'Use resistant varieties like Co 86032',
      'Remove and destroy dead hearts',
      'Avoid waterlogging in field',
      'Release egg parasitoids (Trichogramma)',
    ],
    organicTreatment: [
      'Apply neem cake @ 250 kg/ha in soil',
      'Use pheromone traps for monitoring',
      'Release Trichogramma chilonis',
      'Apply Jeevamrutham fortnightly',
    ],
    chemicalTreatment: [
      'Apply Chlorantraniliprole 0.4% GR @ 4kg/acre',
      'Use Fipronil 0.3% GR @ 15 kg/acre',
      'Apply Cartap hydrochloride 4% GR @ 10kg/acre',
      'Apply at planting or first appearance',
    ],
    fertilizerAdvice: 'Apply potassium as muriate of potash. Avoid excessive nitrogen. Include boron.',
  },
  {
    id: 'sugarcane-red-rot',
    name: 'Red Rot',
    nameHi: 'गन्ना का लाल सड़न',
    nameTe: 'చెరకు ఎర్ర తెగులు',
    crop: 'Sugarcane',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Red discoloration of internal stem tissues',
      'Whitish spots on leaf midribs',
      'Cane becomes hollow and dries',
      'Foul smell from infected canes',
    ],
    causes: [
      'Fungus Colletotrichum falcatum',
      'Warm humid weather (25-30°C)',
      'Waterlogged conditions',
      'Ratoon crops',
    ],
    prevention: [
      'Use disease-free seed material',
      'Hot water treatment of setts (50°C for 2 hrs)',
      'Avoid waterlogging',
      'Remove infected canes from field',
    ],
    organicTreatment: [
      'Apply Trichoderma viride to soil',
      'Treat setts with Trichoderma @ 10g/L',
      'Use neem cake in soil',
      'Apply Jeevamrutham as soil drench',
    ],
    chemicalTreatment: [
      'Seed treatment with Carbendazim 50% WP @ 1g/L',
      'Apply Carbendazim as sett treatment',
      'Use Copper oxychloride as soil drench',
      'Apply at planting time',
    ],
    fertilizerAdvice: 'Apply balanced NPK. Avoid excess nitrogen. Maintain proper drainage.',
  },

  // ==================== BRINJAL DISEASES ====================
  {
    id: 'brinjal-shoot-borer',
    name: 'Brinjal Shoot Borer',
    nameHi: 'बैंगन प्ररोह बोरर',
    nameTe: 'వంకాయ కాండం బోరర్',
    crop: 'Brinjal',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'Wilting of growing shoots',
      'Larval entry holes on shoots and fruits',
      'Frass coming out of holes',
      'Drooping and drying of terminal shoots',
    ],
    causes: [
      'Moth Leucinodes orbonalis larvae',
      'Warm humid conditions',
      'Continuous brinjal cultivation',
      'Lack of crop rotation',
    ],
    prevention: [
      'Use resistant/tolerant varieties',
      'Remove and destroy infested shoots',
      'Install pheromone traps (8-10/acre)',
      'Practice crop rotation for 2 years',
    ],
    organicTreatment: [
      'Apply neem oil (3%) at weekly intervals',
      'Use Bacillus thuringiensis (Bt) var. kurstaki',
      'Release Trichogramma @ 50,000/ha',
      'Spray NSKE 5% at fruiting stage',
    ],
    chemicalTreatment: [
      'Spray Flubendiamide 39.35% SC @ 0.3ml/L',
      'Apply Emamectin benzoate 5% SG @ 0.3g/L',
      'Use Lambda-cyhalothrin 5% EC @ 1ml/L',
      'Start spray at flowering stage',
    ],
    fertilizerAdvice: 'Maintain balanced nutrition. Apply micronutrients (Zn, B) as foliar spray.',
  },

  // ==================== GROUNDNUT DISEASES ====================
  {
    id: 'groundnut-tikka',
    name: 'Groundnut Tikka Disease',
    nameHi: 'मूंगफली का टिक्का रोग',
    nameTe: 'వేరుశనగ టిక్కా వ్యాధి',
    crop: 'Groundnut',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Circular dark spots on leaves (1-6mm)',
      'Yellow halo around spots',
      'Defoliation in severe cases',
      'Stem and petiole lesions',
    ],
    causes: [
      'Fungi Cercospora arachidicola and Cercosporidium personatum',
      'Warm humid weather (25-30°C)',
      'Dense plant canopy',
      'Infected crop residue',
    ],
    prevention: [
      'Use resistant varieties like TG37A',
      'Maintain proper plant spacing',
      'Remove infected leaves early',
      'Avoid late sowing',
    ],
    organicTreatment: [
      'Spray neem oil (2%) fortnightly',
      'Apply Trichoderma viride @ 5g/L',
      'Use cow dung ash spray',
      'Apply compost tea regularly',
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2g/L',
      'Apply Hexaconazole 5% EC @ 2ml/L',
      'Use Tebuconazole 25.9% EC @ 1ml/L',
      'Begin at 30 days after sowing',
    ],
    fertilizerAdvice: 'Apply gypsum @ 400 kg/ha at pegging. Ensure adequate calcium.',
  },
  {
    id: 'groundnut-cercospora',
    name: 'Cercospora Leaf Spot',
    nameHi: 'मूंगफली पत्ती धब्बा',
    nameTe: 'వేరుశనగ ఆకు మచ్చ',
    crop: 'Groundnut',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Small dark spots with yellow halo',
      'Multiple spots coalesce forming large areas',
      'Leaves turn yellow and drop',
      'Stem lesions appear as dark streaks',
    ],
    causes: [
      'Fungus Cercospora arachidicola',
      'Warm humid weather (22-28°C)',
      'Dense plant canopy',
      'Infected crop residue',
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Maintain proper plant spacing',
      'Remove infected leaves',
      'Practice crop rotation',
    ],
    organicTreatment: [
      'Spray neem oil (2%) at 15-day interval',
      'Apply Trichoderma viride @ 5g/L',
      'Use cow dung ash spray',
      'Apply compost tea regularly',
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2g/L',
      'Apply Propiconazole 25% EC @ 1ml/L',
      'Use Chlorothalonil 75% WP @ 2g/L',
      'Begin at 30 days after sowing',
    ],
    fertilizerAdvice: 'Apply gypsum @ 400 kg/ha at pegging. Ensure adequate calcium and potassium.',
  },

  // ==================== MAIZE DISEASES ====================
  {
    id: 'maize-stem-borer',
    name: 'Maize Stem Borer',
    nameHi: 'मक्का तना बोरर',
    nameTe: 'మొక్కజొన్న కాండం బోరర్',
    crop: 'Maize',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Dead heart in young plants',
      'Bore holes in stem with excreta',
      'Stunted and yellowing plants',
      'Broken tassels and damaged cobs',
    ],
    causes: [
      'Moth Chilo partellus larvae',
      'Warm dry weather followed by rain',
      'Early planted crop (susceptible stage)',
      'No crop rotation',
    ],
    prevention: [
      'Use resistant varieties like HQPM1',
      'Plant during recommended window',
      'Remove crop stubble after harvest',
      'Intercrop with legumes or cowpea',
    ],
    organicTreatment: [
      'Apply neem cake @ 200 kg/ha',
      'Use pheromone traps (10/acre)',
      'Spray NSKE 5% at whorl stage',
      'Release Trichogramma parasitoids',
    ],
    chemicalTreatment: [
      'Apply Carbofuran 3% CG @ 15 kg/acre',
      'Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L',
      'Use Fipronil 5% SC @ 2ml/L',
      'Apply at whorl stage for best results',
    ],
    fertilizerAdvice: 'Apply potash to strengthen stems. Split nitrogen application. Include zinc.',
  },
  {
    id: 'maize-leaf-blight',
    name: 'Maize Leaf Blight',
    nameHi: 'मक्का पत्ती झुलसा',
    nameTe: 'మొక్కజొన్న ఆకు బ్లైట్',
    crop: 'Maize',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Elliptical gray-green lesions on leaves',
      'Lesions become bleached with dark borders',
      'Complete drying of lower leaves',
      'Reduced grain filling and yield',
    ],
    causes: [
      'Fungus Exserohilum turcicum',
      'Warm humid weather (20-30°C)',
      'Dense planting',
      'Susceptible varieties',
    ],
    prevention: [
      'Use resistant varieties',
      'Maintain proper plant spacing',
      'Remove crop debris after harvest',
      'Avoid overhead irrigation',
    ],
    organicTreatment: [
      'Spray neem oil (3%) weekly',
      'Apply Trichoderma viride @ 5g/L',
      'Use compost tea as foliar spray',
      'Apply cow dung ash solution',
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2.5g/L',
      'Apply Propiconazole 25% EC @ 1ml/L',
      'Use Tebuconazole 25.9% EC @ 1ml/L',
      'Begin at first sign of disease',
    ],
    fertilizerAdvice: 'Balanced NPK with higher potassium. Avoid excess nitrogen.',
  },

  // ==================== ONION DISEASES ====================
  {
    id: 'onion-purple-blotch',
    name: 'Onion Purple Blotch',
    nameHi: 'प्याज बैंगनी धब्बा',
    nameTe: 'ఉల్లిపాయ ఊదా మచ్చ',
    crop: 'Onion',
    severity: 'Medium',
    season: 'Rabi',
    symptoms: [
      'Small white lesions with purple centers on leaves',
      'Lesions elongate and girdle leaves',
      'Yellowing and lodging of plants',
      'Bull-neck appearance in bulbs',
    ],
    causes: [
      'Fungus Alternaria porri',
      'Warm humid conditions (24-30°C)',
      'Prolonged leaf wetness',
      'Poor field drainage',
    ],
    prevention: [
      'Use certified seeds/seedlings',
      'Ensure good field drainage',
      'Avoid overhead irrigation',
      'Practice crop rotation (3 years)',
    ],
    organicTreatment: [
      'Spray neem oil (3%) at 10-day intervals',
      'Apply Trichoderma harzianum',
      'Use copper oxychloride (organic grade)',
      'Apply compost tea preventively',
    ],
    chemicalTreatment: [
      'Spray Mancozeb 75% WP @ 2.5g/L',
      'Apply Chlorothalonil 75% WP @ 2g/L',
      'Use Azoxystrobin 23% SC @ 1ml/L',
      'Begin at first sign of infection',
    ],
    fertilizerAdvice: 'Reduce nitrogen. Ensure adequate sulfur for pungency. Apply potash.',
  },

  // ==================== INSECT PESTS ====================

  // 1. APHIDS
  {
    id: 'aphids',
    name: 'Aphids',
    nameHi: 'एफिड्स (माहू)',
    nameTe: 'ఆఫిడ్స్ (మాహు)',
    crop: 'Multiple Crops',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'Curling and yellowing of leaves',
      'Sticky honeydew on leaves',
      'Presence of ants (attracted to honeydew)',
      'Stunted plant growth',
    ],
    causes: [
      'Warm weather (20-25°C)',
      'Excessive nitrogen fertilization',
      'Overcrowded planting',
      'Presence of weeds',
    ],
    prevention: [
      'Companion planting with marigolds and basil',
      'Regular monitoring of plants',
      'Avoid over-fertilizing',
      'Maintain good air circulation',
    ],
    organicTreatment: [
      'Spray neem oil (5ml/L water + few drops of soap)',
      'Release ladybugs (natural predators)',
      'Garlic-chilli spray (blend 10 cloves + 5 chillies)',
      'Strong water jet to dislodge them',
    ],
    chemicalTreatment: [
      'Spray Imidacloprid 17.8% SL @ 0.3ml/L',
      'Apply Thiamethoxam 25% WG @ 0.25g/L',
      'Use Dimethoate 30% EC @ 1ml/L',
    ],
    fertilizerAdvice: 'Avoid excess nitrogen. Maintain balanced nutrition.',
  },

  // 2. WHITEFLY
  {
    id: 'whitefly',
    name: 'Whitefly',
    nameHi: 'सफेद मक्खी',
    nameTe: 'వైట్ఫ్లై',
    crop: 'Multiple Crops',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'White insects flying when plant is disturbed',
      'Yellowing and curling of leaves',
      'Sticky honeydew on leaves',
      'Sooty mold development',
    ],
    causes: [
      'Warm weather (25-30°C)',
      'Dense planting',
      'Presence of weeds',
      'Lack of natural predators',
    ],
    prevention: [
      'Use yellow sticky traps (10/acre)',
      'Remove infected leaves immediately',
      'Maintain good air circulation',
      'Use reflective mulch',
    ],
    organicTreatment: [
      'Spray neem oil (5ml/L water + few drops of soap)',
      'Apply garlic-chilli spray',
      'Release Encarsia wasps (natural predator)',
      'Use NSKE 5%',
    ],
    chemicalTreatment: [
      'Spray Imidacloprid 17.8% SL @ 0.3ml/L',
      'Apply Buprofezin 25% SC @ 1ml/L',
      'Use Thiamethoxam 25% WG @ 0.2g/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Avoid excess nitrogen.',
  },

  // 3. THRIPS
  {
    id: 'thrips',
    name: 'Thrips',
    nameHi: 'थ्रिप्स',
    nameTe: 'త్రిప్స్',
    crop: 'Multiple Crops',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'Silver or bronze streaks on leaves',
      'Distorted and curled leaves',
      'Scarring on fruits',
      'Sticky honeydew and black sooty mold',
    ],
    causes: [
      'Warm dry weather',
      'Weed hosts',
      'Overcrowded planting',
      'Water stress',
    ],
    prevention: [
      'Use blue sticky traps',
      'Maintain good air circulation',
      'Remove weed hosts',
      'Avoid water stress',
    ],
    organicTreatment: [
      'Spray neem oil (5ml/L water + few drops of soap)',
      'Apply spinosad (organic insecticide)',
      'Release predatory mites',
      'Use garlic-chilli spray',
    ],
    chemicalTreatment: [
      'Spray Spinosad 45% SC @ 0.5ml/L',
      'Apply Fipronil 5% SC @ 1ml/L',
      'Use Imidacloprid 17.8% SL @ 0.3ml/L',
    ],
    fertilizerAdvice: 'Balanced nutrition. Avoid water stress.',
  },

  // 4. TOMATO HORNWORM
  {
    id: 'tomato-hornworm',
    name: 'Tomato Hornworm',
    nameHi: 'टमाटर हॉर्मवर्म',
    nameTe: 'టమోటా హార్మ్వార్మ్',
    crop: 'Tomato',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Large green caterpillars on plants',
      'Defoliation of leaves',
      'Fruits with large holes',
      'Frass (droppings) on leaves',
    ],
    causes: [
      'Moth Manduca quinquemaculata larvae',
      'Warm weather (25-30°C)',
      'Susceptible varieties',
      'Lack of natural predators',
    ],
    prevention: [
      'Regular monitoring',
      'Companion planting with dill or parsley',
      'Tilling soil in winter',
      'Using row covers',
    ],
    organicTreatment: [
      'Handpick caterpillars',
      'Spray Bt (Bacillus thuringiensis)',
      'Release parasitic wasps',
      'Neem oil spray',
    ],
    chemicalTreatment: [
      'Spray Bt (Bacillus thuringiensis) @ 2ml/L',
      'Apply Spinosad 45% SC @ 0.5ml/L',
      'Use Lambda-cyhalothrin 5% EC @ 1ml/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Avoid excess nitrogen.',
  },

  // 5. FRUIT BORER
  {
    id: 'fruit-borer',
    name: 'Fruit Borer',
    nameHi: 'फल बोरर',
    nameTe: 'ఫ్రూట్ బోరర్',
    crop: 'Brinjal',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Small holes on fruits',
      'Frass (droppings) on fruits',
      'Rotting fruits',
      'Wilted growing tips',
    ],
    causes: [
      'Moth larvae (Leucinodes orbonalis)',
      'Warm humid weather',
      'Continuous brinjal cultivation',
      'Lack of crop rotation',
    ],
    prevention: [
      'Regular monitoring',
      'Remove infected fruits immediately',
      'Deep ploughing in summer',
      'Use pheromone traps',
    ],
    organicTreatment: [
      'Spray neem oil weekly',
      'Use pheromone traps for monitoring',
      'Handpick and destroy infected fruits',
      'Apply Bt (Bacillus thuringiensis)',
    ],
    chemicalTreatment: [
      'Spray Spinosad 45% SC @ 0.5ml/L',
      'Apply Flubendiamide 39.35% SC @ 0.3ml/L',
      'Use Emamectin benzoate 5% SG @ 0.3g/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Apply micronutrients (Zn, B).',
  },

  // 6. FRUIT FLY
  {
    id: 'fruit-fly',
    name: 'Fruit Fly',
    nameHi: 'फल मक्खी',
    nameTe: 'ఫ్రూట్ ఫ్లై',
    crop: 'Bottle Gourd',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Small puncture marks on fruits',
      'Oozing from puncture sites',
      'Fruits rotting from inside',
      'Larvae visible inside fruit',
    ],
    causes: [
      'Moth Bactrocera cucurbitae larvae',
      'Warm humid weather',
      'Over-ripened fruits',
      'Crop residue in field',
    ],
    prevention: [
      'Collect and destroy infected fruits',
      'Use pheromone traps for monitoring',
      'Deep ploughing in summer',
      'Early harvesting',
    ],
    organicTreatment: [
      'Use pheromone traps',
      'Apply neem oil',
      'Wrap young fruits with paper',
      'Remove infected fruits',
    ],
    chemicalTreatment: [
      'Spray Malathion 50% EC @ 2ml/L',
      'Apply Cypermethrin 10% EC @ 1ml/L',
      'Use Dimethoate 30% EC @ 1ml/L',
    ],
    fertilizerAdvice: 'Balanced nutrition. Avoid over-ripening.',
  },

  // 7. CUCUMBER BEETLE
  {
    id: 'cucumber-beetle',
    name: 'Cucumber Beetle',
    nameHi: 'खीरा भृंग',
    nameTe: 'దోసకాయ బీటిల్',
    crop: 'Cucumber',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Chewed leaves and stems',
      'Yellow-brown beetles visible',
      'Stunted growth',
      'Wilting',
    ],
    causes: [
      'Beetle larvae',
      'Warm weather (25-30°C)',
      'Weed hosts',
      'No crop rotation',
    ],
    prevention: [
      'Use row covers',
      'Companion planting',
      'Crop rotation',
      'Regular monitoring',
    ],
    organicTreatment: [
      'Handpick beetles',
      'Use row covers',
      'Apply neem oil',
      'Companion planting with radish',
    ],
    chemicalTreatment: [
      'Spray Cypermethrin 10% EC @ 1ml/L',
      'Apply Fenvalerate 20% EC @ 1ml/L',
      'Use Carbaryl 50% WP @ 2g/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Avoid excess nitrogen.',
  },

  // 8. VINE BORER
  {
    id: 'vine-borer',
    name: 'Vine Borer',
    nameHi: 'बेल बोरर',
    nameTe: 'వైన్ బోరర్',
    crop: 'Pumpkin',
    severity: 'High',
    season: 'Kharif',
    symptoms: [
      'Wilting vines',
      'Sawdust-like frass at base',
      'Larvae visible in stem',
      'Plant collapse',
    ],
    causes: [
      'Moth Melittia cucurbitae larvae',
      'Warm weather (25-35°C)',
      'Susceptible varieties',
      'Crop residue in field',
    ],
    prevention: [
      'Cover stems with soil',
      'Remove crop debris',
      'Regular monitoring',
      'Crop rotation',
    ],
    organicTreatment: [
      'Remove and destroy larvae',
      'Cover stems with soil',
      'Apply Bt (Bacillus thuringiensis)',
      'Remove infected vines',
    ],
    chemicalTreatment: [
      'Spray Bt @ 2ml/L',
      'Apply Cypermethrin 10% EC @ 1ml/L',
      'Use Carbaryl 50% WP @ 2g/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Maintain good soil drainage.',
  },

  // 9. POTATO BEETLE
  {
    id: 'potato-beetle',
    name: 'Potato Beetle',
    nameHi: 'आलू भृंग',
    nameTe: 'బంగాలదుంప బీటిల్',
    crop: 'Potato',
    severity: 'Medium',
    season: 'Kharif',
    symptoms: [
      'Defoliation',
      'Yellow, skeletonized leaves',
      'Orange-black beetle visible',
      'Stunted plant growth',
    ],
    causes: [
      'Beetle Leptinotarsa decemlineata',
      'Warm weather (20-25°C)',
      'Continuous potato cultivation',
      'Weed hosts',
    ],
    prevention: [
      'Rotate crops',
      'Use resistant varieties',
      'Remove crop debris',
      'Regular monitoring',
    ],
    organicTreatment: [
      'Handpick beetles',
      'Spray Bt (Bacillus thuringiensis)',
      'Neem oil',
      'Use row covers',
    ],
    chemicalTreatment: [
      'Spray Bt @ 2ml/L',
      'Apply Cypermethrin 10% EC @ 1ml/L',
      'Use Carbaryl 50% WP @ 2g/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Apply potash for tuber development.',
  },

  // 10. CARROT FLY
  {
    id: 'carrot-fly',
    name: 'Carrot Fly',
    nameHi: 'गाजर मक्खी',
    nameTe: 'క్యారెట్ ఫ్లై',
    crop: 'Carrot',
    severity: 'Medium',
    season: 'Rabi',
    symptoms: [
      'Wilting of plants',
      'Tunnels in roots',
      'Brown, rotting areas on carrots',
      'Stunted growth',
    ],
    causes: [
      'Moth Psila rosae larvae',
      'Cool moist weather',
      'Susceptible varieties',
      'Crop residue in field',
    ],
    prevention: [
      'Use row covers',
      'Companion planting with onions',
      'Late sowing (after June)',
      'Rotate crops',
    ],
    organicTreatment: [
      'Use row covers',
      'Companion planting with onions',
      'Apply neem oil',
      'Late sowing (after June)',
    ],
    chemicalTreatment: [
      'Spray Cypermethrin 10% EC @ 1ml/L',
      'Apply Fenitrothion 50% EC @ 2ml/L',
      'Use Malathion 50% EC @ 2ml/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Avoid over-ripening.',
  },

  // 11. LEAF MINER
  {
    id: 'leaf-miner',
    name: 'Leaf Miner',
    nameHi: 'पत्ती खनक',
    nameTe: 'లీఫ్ మైనర్',
    crop: 'Multiple Crops',
    severity: 'Medium',
    season: 'All',
    symptoms: [
      'White, winding trails on leaves',
      'Blotchy, brown patches',
      'Reduced photosynthesis',
      'Premature leaf drop',
    ],
    causes: [
      'Liriomyza spp. larvae',
      'Warm weather',
      'Weed hosts',
      'Overcrowded planting',
    ],
    prevention: [
      'Regular monitoring',
      'Remove weed hosts',
      'Crop rotation',
      'Use row covers',
    ],
    organicTreatment: [
      'Remove affected leaves',
      'Spray neem oil',
      'Release parasitic wasps',
      'Use yellow sticky traps',
    ],
    chemicalTreatment: [
      'Spray Spinosad 45% SC @ 0.5ml/L',
      'Apply Fipronil 5% SC @ 1ml/L',
      'Use Cypermethrin 10% EC @ 1ml/L',
    ],
    fertilizerAdvice: 'Balanced NPK. Avoid excess nitrogen.',
  },
];

// ===== CROP OPTIONS =====
export const cropOptions = [
  'All Crops',
  'Rice',
  'Wheat',
  'Cotton',
  'Tomato',
  'Chilli',
  'Sugarcane',
  'Brinjal',
  'Groundnut',
  'Maize',
  'Onion',
  'Bottle Gourd',
  'Cucumber',
  'Pumpkin',
  'Potato',
  'Carrot',
  'Multiple Crops'
];

// ===== HELPER FUNCTIONS =====
export function getDiseaseById(id: string): Disease | undefined {
  return diseases.find(d => d.id === id);
}

export function getDiseasesByCrop(crop: string): Disease[] {
  return diseases.filter(d => d.crop === crop || d.crop === 'Multiple Crops');
}

export function getDiseasesBySeverity(severity: Disease['severity']): Disease[] {
  return diseases.filter(d => d.severity === severity);
}

export function getDiseasesBySeason(season: Disease['season']): Disease[] {
  return diseases.filter(d => d.season === season || d.season === 'All');
}

export function getDiseasesByCropAndSeverity(crop: string, severity: Disease['severity']): Disease[] {
  return diseases.filter(d => 
    (d.crop === crop || d.crop === 'Multiple Crops') && 
    d.severity === severity
  );
}

export function getPestById(id: string): Disease | undefined {
  return diseases.find(d => d.id === id);
}

export function getPestsByType(_type: 'insect' | 'fungus' | 'bacteria' | 'virus'): Disease[] {
  // Insect pests are identified by having 'larvae' or 'moth' in causes or symptoms
  return diseases.filter(d => 
    d.causes.some(c => 
      c.toLowerCase().includes('larvae') || 
      c.toLowerCase().includes('moth') ||
      c.toLowerCase().includes('beetle') ||
      c.toLowerCase().includes('bug')
    )
  );
}
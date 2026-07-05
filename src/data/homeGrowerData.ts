export interface PlantGuide {
  id: string;
  name: string;
  nameHi: string;
  nameTe: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeToHarvest: string;
  waterNeeds: string;
  sunlight: string;
  potSize: string;
  germinationTime: string;
  description: string;
  steps: { title: string; description: string }[];
  careSchedule: { task: string; frequency: string }[];
  commonProblems: { problem: string; solution: string }[];
  fertilizerTips: string[];
  videoUrl: string;
  imageUrl?: string; // Added for vegetable photos
}

export const plantGuides: PlantGuide[] = [
  // ==================== EXISTING VEGETABLES (KEEPING GOOD URLs) ====================

  {
    id: 'tomato',
    name: 'Tomato',
    nameHi: 'टमाटर',
    nameTe: 'టమాటా',
    difficulty: 'Easy',
    timeToHarvest: '60-80 days',
    waterNeeds: 'Regular (keep soil moist)',
    sunlight: '6-8 hours daily',
    potSize: '15-20 inch diameter',
    germinationTime: '5-10 days',
    description: 'Tomatoes are one of the most rewarding home-grown vegetables. With proper care, you can harvest fresh, juicy tomatoes from your terrace or balcony.',
    steps: [
      { title: 'Seed Selection & Starting', description: 'Choose hybrid or heirloom seeds. Start seeds in small trays or seedling cups using a mix of coco peat and compost (1:1). Sow 2-3 seeds per cup, ¼ inch deep.' },
      { title: 'Germination', description: 'Keep the seed tray in a warm place (20-25°C). Mist the soil daily to keep it moist but not waterlogged. Seeds should sprout within 5-10 days.' },
      { title: 'Transplanting', description: 'When seedlings have 4-6 true leaves (about 3-4 weeks old), transplant them to larger pots. Handle carefully by the leaves, not the stem.' },
      { title: 'Support & Pruning', description: 'Install stakes or cages when transplanting. Remove suckers (side shoots) regularly to focus energy on fruit production.' },
      { title: 'Flowering & Fruiting', description: 'Flowers appear 4-6 weeks after transplanting. Gently shake plants to aid pollination. Fruits will ripen 6-8 weeks after flowering.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Daily (morning)' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pruning suckers', frequency: 'Weekly' },
      { task: 'Checking for pests', frequency: 'Twice a week' },
    ],
    commonProblems: [
      { problem: 'Yellowing leaves', solution: 'Usually indicates overwatering or nitrogen deficiency. Adjust watering and apply nitrogen-rich fertilizer.' },
      { problem: 'Blossom end rot', solution: 'Caused by calcium deficiency. Add crushed eggshells to soil and maintain consistent watering.' },
      { problem: 'Aphids', solution: 'Spray neem oil solution (5ml/L water) or use a strong water jet to dislodge them.' },
    ],
    fertilizerTips: [
      'Use a balanced organic fertilizer (NPK 10-10-10) every 2 weeks',
      'Add vermicompost monthly for healthy growth',
      'Use banana peel fertilizer for potassium during fruiting',
      'Epsom salt spray (1 tbsp/gallon) for magnesium deficiency',
    ],
    videoUrl: 'https://www.youtube.com/embed/eySTo2GgvoY?t=6', // ✅ FIXED - Growing Tomatoes from Seed to Harvest (Full Guide)
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop', // Tomato photo
  },
  {
    id: 'chilli',
    name: 'Chilli',
    nameHi: 'मिर्च',
    nameTe: 'మిరపకాయ',
    difficulty: 'Easy',
    timeToHarvest: '70-90 days',
    waterNeeds: 'Moderate (avoid overwatering)',
    sunlight: '6-8 hours daily',
    potSize: '12-15 inch diameter',
    germinationTime: '7-14 days',
    description: 'Chilli plants are compact, productive, and perfect for Indian home gardens. One plant can provide a continuous supply of fresh chillies.',
    steps: [
      { title: 'Seed Starting', description: 'Soak seeds in warm water for 12 hours. Sow in seedling trays with well-draining potting mix. Cover lightly with soil.' },
      { title: 'Germination Care', description: 'Maintain temperature around 25-30°C for best germination. Keep soil consistently moist. Expect sprouts in 7-14 days.' },
      { title: 'Transplanting', description: 'Transplant when seedlings are 4-5 inches tall. Space plants 12-18 inches apart. Use pots with good drainage.' },
      { title: 'Maintenance', description: 'Pinch off the top growth when plant is 6 inches tall to encourage bushiness. Support heavy fruiting branches with stakes.' },
      { title: 'Harvesting', description: 'Harvest green chillies when firm and glossy. For red chillies, leave on plant until fully colored. Pick regularly to encourage more fruiting.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pinching tops', frequency: 'Once (when young)' },
      { task: 'Harvesting', frequency: 'Weekly once fruits appear' },
    ],
    commonProblems: [
      { problem: 'Leaf curl virus', solution: 'Remove affected plants immediately. Control whiteflies which spread the virus using yellow sticky traps.' },
      { problem: 'Flower drop', solution: 'Usually due to extreme heat or water stress. Provide afternoon shade in summer and maintain consistent moisture.' },
      { problem: 'Fruit rot', solution: 'Ensure good air circulation. Avoid wetting foliage when watering. Remove affected fruits promptly.' },
    ],
    fertilizerTips: [
      'Use mustard cake fertilizer for healthy growth',
      'Apply bone meal for phosphorus during flowering',
      'Add Epsom salt for better fruit development',
      'Use compost tea as a foliar feed',
    ],
    videoUrl: 'https://www.youtube.com/embed/Ken8PR-wbzI', // ✅ KEEPING - Working Chilli video
    imageUrl: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop', // Chilli photo
  },
  {
    id: 'mint',
    name: 'Mint (Pudina)',
    nameHi: 'पुदीना',
    nameTe: 'పుదీనా',
    difficulty: 'Easy',
    timeToHarvest: '30-40 days',
    waterNeeds: 'High (keep moist)',
    sunlight: 'Partial shade to full sun',
    potSize: '8-12 inch diameter',
    germinationTime: '10-15 days',
    description: 'Mint is a vigorous, easy-to-grow herb that thrives in Indian conditions. It spreads quickly and provides fresh leaves for chutneys, tea, and garnishing.',
    steps: [
      { title: 'Propagation', description: 'Mint grows best from cuttings. Take 4-6 inch stem cuttings, remove lower leaves, and place in water until roots appear (7-10 days).' },
      { title: 'Planting', description: 'Plant rooted cuttings in wide pots (mint spreads horizontally). Use rich, moist potting mix. Bury roots 1-2 inches deep.' },
      { title: 'Location', description: 'Place in partial shade for best results. Mint tolerates full sun but prefers afternoon shade in hot climates.' },
      { title: 'Harvesting', description: 'Start harvesting when plant is 4-6 inches tall. Pinch off top leaves to encourage bushy growth. Harvest regularly to prevent flowering.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Daily (keep soil moist)' },
      { task: 'Pruning', frequency: 'Weekly' },
      { task: 'Fertilizing', frequency: 'Monthly' },
      { task: 'Root division', frequency: 'Every 6 months' },
    ],
    commonProblems: [
      { problem: 'Root-bound in pot', solution: 'Divide plant every 6 months. Replant sections in fresh soil. Mint needs space to spread.' },
      { problem: 'Rust disease', solution: 'Remove affected leaves. Improve air circulation. Avoid overhead watering.' },
    ],
    fertilizerTips: [
      'Use nitrogen-rich organic fertilizer for lush leaves',
      'Vermicompost application monthly',
      'Liquid seaweed fertilizer for micronutrients',
    ],
    videoUrl: 'https://www.youtube.com/embed/QolWA1aba3o', // ✅ KEEPING - Working Mint video
    imageUrl: 'https://images.unsplash.com/photo-1628556185781-33f44d3aa9d4?w=400&h=300&fit=crop', // Mint photo
  },
  {
    id: 'coriander',
    name: 'Coriander (Dhaniya)',
    nameHi: 'धनिया',
    nameTe: 'కొత్తిమీర',
    difficulty: 'Easy',
    timeToHarvest: '25-40 days (leaves)',
    waterNeeds: 'Moderate',
    sunlight: '4-6 hours (partial shade)',
    potSize: '8-10 inch diameter',
    germinationTime: '7-10 days',
    description: 'Coriander is a fast-growing, cool-season herb essential in Indian cooking. It bolts quickly in heat, so grow in partial shade during summer.',
    steps: [
      { title: 'Seed Preparation', description: 'Split coriander seeds into halves by gently crushing them. This speeds up germination significantly.' },
      { title: 'Sowing', description: 'Sow seeds directly in pots (coriander does not transplant well). Scatter seeds and cover lightly with ¼ inch soil.' },
      { title: 'Care', description: 'Keep soil consistently moist until germination. Thin seedlings to 2-3 inches apart when they are 2 inches tall.' },
      { title: 'Harvesting', description: 'Start harvesting outer leaves when plant is 4-6 inches tall. For seeds, let plant flower and dry on the plant.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 1-2 days' },
      { task: 'Thinning', frequency: 'Once (2 weeks after sprouting)' },
      { task: 'Harvesting leaves', frequency: 'Weekly' },
    ],
    commonProblems: [
      { problem: 'Bolting (going to seed)', solution: 'Grow in partial shade. Choose slow-bolt varieties. Harvest frequently to delay flowering.' },
      { problem: 'Powdery mildew', solution: 'Ensure good air circulation. Spray neem oil. Avoid wetting foliage.' },
    ],
    fertilizerTips: [
      'Use well-decomposed compost at planting',
      'Liquid fish emulsion for quick growth',
      'Avoid high nitrogen which delays flowering',
    ],
    videoUrl: 'https://www.youtube.com/embed/fvg2CtxQYVY', // ✅ KEEPING - Working Coriander video
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop', // Coriander photo
  },
  {
    id: 'tulsi',
    name: 'Tulsi (Holy Basil)',
    nameHi: 'तुलसी',
    nameTe: 'తులసి',
    difficulty: 'Easy',
    timeToHarvest: '40-60 days',
    waterNeeds: 'Moderate',
    sunlight: 'Full sun (6+ hours)',
    potSize: '10-12 inch diameter',
    germinationTime: '8-12 days',
    description: 'Tulsi is a sacred and medicinal plant in Indian households. It is hardy, aromatic, and has numerous health benefits. Every Indian home should have a Tulsi plant.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow Tulsi seeds in seedling trays filled with well-draining potting mix. Press seeds lightly into soil surface (need light to germinate).' },
      { title: 'Germination', description: 'Keep soil moist and warm (25-30°C). Germination takes 8-12 days. Do not overwater as this causes damping off.' },
      { title: 'Transplanting', description: 'When seedlings have 4-6 leaves, transplant to individual pots. Tulsi prefers slightly acidic to neutral soil (pH 6-7.5).' },
      { title: 'Care & Harvest', description: 'Pinch the growing tips when plant is 6 inches tall to encourage branching. Harvest leaves regularly to promote bushy growth.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Pinching tips', frequency: 'Monthly' },
      { task: 'Pruning', frequency: 'Every 2 months' },
      { task: 'Fertilizing', frequency: 'Monthly' },
    ],
    commonProblems: [
      { problem: 'Damping off (seedlings falling over)', solution: 'Improve drainage. Use sterilized potting mix. Avoid overwatering. Provide good air circulation.' },
      { problem: 'Aphids and whiteflies', solution: 'Spray neem oil (5ml/L) weekly. Introduce ladybugs as natural predators.' },
    ],
    fertilizerTips: [
      'Use organic compost monthly',
      'Vermicompost is excellent for Tulsi',
      'Avoid chemical fertilizers — Tulsi is sensitive',
      'Add dried cow dung powder for micronutrients',
    ],
    videoUrl: 'https://www.youtube.com/embed/3MtZjyQcGOg', // ✅ KEEPING - Working Tulsi video
    imageUrl: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop', // Tulsi photo
  },
  {
    id: 'spinach',
    name: 'Spinach (Palak)',
    nameHi: 'पालक',
    nameTe: 'పాలకూర',
    difficulty: 'Easy',
    timeToHarvest: '25-40 days',
    waterNeeds: 'High (keep moist)',
    sunlight: 'Partial shade (3-4 hours)',
    potSize: '10-12 inch diameter',
    germinationTime: '5-10 days',
    description: 'Spinach is a nutrient-rich leafy green that grows quickly and can be harvested multiple times. Perfect for beginners in home gardening.',
    steps: [
      { title: 'Sowing', description: 'Sow seeds directly in pots. Plant seeds ½ inch deep and 2-3 inches apart. Spinach prefers cool weather (15-25°C).' },
      { title: 'Thinning', description: 'When seedlings are 2 inches tall, thin to 4-6 inches apart. Use thinnings in salads!' },
      { title: 'Care', description: 'Keep soil consistently moist. Mulch with dry leaves to retain moisture. Harvest outer leaves first.' },
      { title: 'Successive Sowing', description: 'Sow new seeds every 3 weeks for continuous harvest. Spinach bolts in hot weather, so grow in shade during summer.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Daily' },
      { task: 'Harvesting', frequency: 'Weekly (outer leaves)' },
      { task: 'Successive sowing', frequency: 'Every 3 weeks' },
    ],
    commonProblems: [
      { problem: 'Bolting in heat', solution: 'Grow heat-tolerant varieties. Provide shade cloth. Increase watering frequency.' },
      { problem: 'Downy mildew', solution: 'Avoid overhead watering. Ensure good air circulation. Remove affected leaves.' },
    ],
    fertilizerTips: [
      'Nitrogen-rich fertilizer for lush leaves',
      'Vermicompost every 2 weeks',
      'Seaweed extract for micronutrients',
    ],
    videoUrl: 'https://www.youtube.com/embed/1RRNu4QS11g', // ✅ KEEPING - Working Spinach video
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop', // Spinach photo
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    nameHi: 'घृत कुमारी',
    nameTe: 'కలబంద',
    difficulty: 'Easy',
    timeToHarvest: 'Ongoing',
    waterNeeds: 'Low (water sparingly)',
    sunlight: 'Bright indirect light',
    potSize: '8-12 inch diameter',
    germinationTime: 'N/A (use pups)',
    description: 'Aloe Vera is a hardy succulent known for its medicinal properties. It requires minimal care and can thrive on neglect, making it perfect for busy gardeners.',
    steps: [
      { title: 'Propagation', description: 'Aloe is propagated from pups (offsets) that grow at the base. Wait until pups are 3-4 inches tall before separating.' },
      { title: 'Planting', description: 'Use a well-draining cactus/succulent potting mix. Plant pup with roots attached. Do not water for 3 days after planting.' },
      { title: 'Care', description: 'Place in bright, indirect sunlight. Water only when soil is completely dry (usually every 7-10 days). Avoid overwatering at all costs.' },
      { title: 'Harvesting', description: 'Harvest outer, mature leaves by cutting at the base. The gel can be used for skin care, hair care, and minor burns.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 7-10 days' },
      { task: 'Fertilizing', frequency: 'Every 2-3 months' },
      { task: 'Removing pups', frequency: 'When 3-4 inches tall' },
    ],
    commonProblems: [
      { problem: 'Brown, mushy leaves', solution: 'Overwatering! Let soil dry completely. Ensure pot has drainage holes. Repot in fresh dry mix if root rot.' },
      { problem: 'Thin, pale leaves', solution: 'Not enough light. Move to brighter location. Aloe needs at least 4-6 hours of bright indirect light.' },
    ],
    fertilizerTips: [
      'Use cactus/succulent fertilizer at half strength',
      'Vermicompost tea occasionally',
      'Avoid high nitrogen fertilizers',
    ],
    videoUrl: 'https://www.youtube.com/embed/-mr7ZAX8yGk', // ✅ KEEPING - Working Aloe Vera video
    imageUrl: 'https://images.unsplash.com/photo-1589329756042-ef4a9c17ab14?w=400&h=300&fit=crop', // Aloe Vera photo
  },
  {
    id: 'curry-leaves',
    name: 'Curry Leaves',
    nameHi: 'करी पत्ता',
    nameTe: 'కరివేపాకు',
    difficulty: 'Medium',
    timeToHarvest: 'Ongoing from 8 months',
    waterNeeds: 'Moderate',
    sunlight: 'Full sun (6+ hours)',
    potSize: '14-18 inch diameter',
    germinationTime: '10-20 days',
    description: 'Curry leaf plant is an essential in every Indian kitchen. The aromatic leaves are used in countless dishes. It is a small tree that can be grown in large pots.',
    steps: [
      { title: 'Seed or Stem Cutting', description: 'Use fresh curry leaf seeds (not dried) or 6-inch stem cuttings. Remove bottom leaves from cuttings.' },
      { title: 'Planting', description: 'Plant in well-draining soil mixed with sand. For cuttings, dip in rooting hormone before planting. Keep in warm, humid place.' },
      { title: 'Care', description: 'Place in full sun. Water when top inch of soil is dry. Protect from cold drafts. Fertilize monthly during growing season.' },
      { title: 'Harvesting', description: 'Start harvesting individual leaves when plant is 1 foot tall. Never strip all leaves — leave at least 60% on the plant.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Monthly' },
      { task: 'Pruning', frequency: 'Every 3 months' },
      { task: 'Protecting from cold', frequency: 'Winter (move indoors)' },
    ],
    commonProblems: [
      { problem: 'Leaves turning yellow', solution: 'Check watering — usually overwatering. Also check for nutrient deficiency. Apply balanced fertilizer.' },
      { problem: 'Citrus psyllid (insect)', solution: 'Spray neem oil weekly. Wipe leaves with soapy water. Keep plant healthy to resist pests.' },
    ],
    fertilizerTips: [
      'Use buttermilk as natural fertilizer monthly',
      'Banana peel fertilizer for potassium',
      'Epsom salt for magnesium (1 tsp/month)',
      'Vermicompost every 2 months',
    ],
    videoUrl: 'https://www.youtube.com/embed/GZYGJgk7DQI', // ✅ KEEPING - Working Curry Leaves video
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=300&fit=crop', // Curry Leaves photo
  },

  // ==================== NEW VEGETABLES ====================

  {
    id: 'onion',
    name: 'Onion',
    nameHi: 'प्याज',
    nameTe: 'ఉల్లిపాయ',
    difficulty: 'Medium',
    timeToHarvest: '90-120 days',
    waterNeeds: 'Moderate',
    sunlight: '6-8 hours daily',
    potSize: '12-14 inch diameter',
    germinationTime: '7-14 days',
    description: 'Onions are a staple in every kitchen and can be easily grown in containers. With patience and proper care, you can harvest your own fresh onions.',
    steps: [
      { title: 'Seed Starting', description: 'Sow onion seeds in seed trays or directly in pots. Plant seeds ½ inch deep in well-draining soil.' },
      { title: 'Transplanting', description: 'When seedlings are 4-6 inches tall, transplant to larger pots. Space plants 4-6 inches apart.' },
      { title: 'Care & Maintenance', description: 'Water regularly but avoid waterlogging. Fertilize with phosphorus-rich fertilizer for bulb development.' },
      { title: 'Harvesting', description: 'Onions are ready when tops fall over and turn yellow. Harvest and cure in a dry, airy place for 2-3 weeks.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Monthly' },
      { task: 'Weeding', frequency: 'Weekly' },
    ],
    commonProblems: [
      { problem: 'Bulb rot', solution: 'Avoid overwatering. Ensure good drainage.' },
      { problem: 'Thrips', solution: 'Spray neem oil solution (5ml/L water).' },
    ],
    fertilizerTips: [
      'Use phosphorus-rich fertilizer for bulb development',
      'Apply compost monthly',
      'Avoid high nitrogen fertilizers during bulb formation',
    ],
    videoUrl: 'https://www.youtube.com/embed/ht9NOqX5YJw', // ✅ KEEPING - Working Onion video
    imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop', // Onion photo
  },
  {
    id: 'brinjal',
    name: 'Brinjal (Eggplant)',
    nameHi: 'बैंगन',
    nameTe: 'వంకాయ',
    difficulty: 'Easy',
    timeToHarvest: '65-80 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '14-16 inch diameter',
    germinationTime: '10-15 days',
    description: 'Brinjal is a versatile vegetable that grows well in warm climates. It produces beautiful purple fruits that are perfect for curries and dishes.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow seeds in seedling trays. Keep soil moist and warm for germination.' },
      { title: 'Transplanting', description: 'Transplant when seedlings are 4-6 inches tall. Use rich, well-draining soil.' },
      { title: 'Maintenance', description: 'Water regularly. Fertilize every 2 weeks. Stake plants if necessary.' },
      { title: 'Harvesting', description: 'Harvest when fruits are firm and glossy. Regular harvesting encourages more production.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 1-2 days' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pest checking', frequency: 'Weekly' },
    ],
    commonProblems: [
      { problem: 'Fruit borer', solution: 'Apply neem oil spray weekly.' },
      { problem: 'Wilt disease', solution: 'Ensure good drainage. Rotate crops.' },
    ],
    fertilizerTips: [
      'Use balanced organic fertilizer every 2 weeks',
      'Add compost at transplanting',
      'Use Epsom salt for magnesium',
    ],
    videoUrl: 'https://www.youtube.com/embed/nb7c7XucQg4', // ✅ KEEPING - Working Brinjal video
    imageUrl: 'https://images.unsplash.com/photo-1622209239100-4e5986f7dd0a?w=400&h=300&fit=crop', // Brinjal photo
  },
  {
    id: 'bottle-gourd',
    name: 'Bottle Gourd (Lauki)',
    nameHi: 'लौकी',
    nameTe: 'సొరకాయ',
    difficulty: 'Easy',
    timeToHarvest: '55-60 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '18-24 inch diameter',
    germinationTime: '7-10 days',
    description: 'Bottle gourd is a fast-growing vine that produces large, nutritious fruits. It\'s perfect for terrace gardens with trellis support.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow 2-3 seeds per pot. Germination takes 7-10 days.' },
      { title: 'Support', description: 'Provide strong trellis or support for vines to climb.' },
      { title: 'Care', description: 'Water regularly. Fertilize every 2 weeks during growth.' },
      { title: 'Harvesting', description: 'Harvest when fruits are tender and green, usually 55-60 days after sowing.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Daily' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pruning vines', frequency: 'Monthly' },
    ],
    commonProblems: [
      { problem: 'Powdery mildew', solution: 'Spray neem oil. Avoid overhead watering.' },
      { problem: 'Fruit flies', solution: 'Use fruit fly traps. Apply neem spray.' },
    ],
    fertilizerTips: [
      'Use compost-rich soil',
      'Apply balanced fertilizer every 2 weeks',
      'Add vermicompost monthly',
    ],
    videoUrl: 'https://www.youtube.com/embed/zcMw_bJ0m_U', // ✅ KEEPING - Working Bottle Gourd video
    imageUrl: 'https://images.unsplash.com/photo-1563315403-9f0524dedc0a?w=400&h=300&fit=crop', // Bottle Gourd photo
  },
  {
    id: 'bitter-gourd',
    name: 'Bitter Gourd (Karela)',
    nameHi: 'करेला',
    nameTe: 'కాకరకాయ',
    difficulty: 'Medium',
    timeToHarvest: '55-65 days',
    waterNeeds: 'Moderate',
    sunlight: '6-8 hours daily',
    potSize: '14-18 inch diameter',
    germinationTime: '5-8 days',
    description: 'Bitter gourd is a nutritious vegetable known for its health benefits. It grows as a vine and produces bitter fruits that are used in various dishes.',
    steps: [
      { title: 'Seed Sowing', description: 'Soak seeds overnight for better germination. Sow 2 seeds per pot.' },
      { title: 'Support', description: 'Provide trellis for climbing.' },
      { title: 'Care', description: 'Water regularly. Fertilize during flowering.' },
      { title: 'Harvesting', description: 'Harvest when fruits are tender and green, before they mature and become too bitter.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pest control', frequency: 'Weekly' },
    ],
    commonProblems: [
      { problem: 'Fruit fly attack', solution: 'Use pheromone traps. Spray neem oil.' },
      { problem: 'Vine wilt', solution: 'Ensure good drainage. Avoid overwatering.' },
    ],
    fertilizerTips: [
      'Use organic fertilizer during growth',
      'Apply phosphorus-rich fertilizer for flowering',
      'Vermicompost monthly',
    ],
    videoUrl: 'https://www.youtube.com/embed/26-KlpmHtL0', // ✅ KEEPING - Working Bitter Gourd video
    imageUrl: 'https://images.unsplash.com/photo-1598898903980-1de585c7dcb6?w=400&h=300&fit=crop', // Bitter Gourd photo
  },
  {
    id: 'lady-finger',
    name: 'Lady Finger (Okra/Bhindi)',
    nameHi: 'भिंडी',
    nameTe: 'బెండకాయ',
    difficulty: 'Easy',
    timeToHarvest: '50-60 days',
    waterNeeds: 'Moderate',
    sunlight: '6-8 hours daily',
    potSize: '14-16 inch diameter',
    germinationTime: '5-10 days',
    description: 'Lady finger is a warm-season vegetable that grows well in Indian climates. It produces tender pods that are perfect for cooking.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow seeds directly in pots. Plant seeds ½ inch deep.' },
      { title: 'Thinning', description: 'Thin to 2-3 plants per pot after germination.' },
      { title: 'Maintenance', description: 'Water regularly. Fertilize monthly.' },
      { title: 'Harvesting', description: 'Harvest pods when young and tender (3-4 inches long). Regular harvesting encourages more production.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Monthly' },
      { task: 'Harvesting', frequency: 'Every 2-3 days' },
    ],
    commonProblems: [
      { problem: 'Yellow vein mosaic virus', solution: 'Control whiteflies. Remove infected plants.' },
      { problem: 'Fruit borer', solution: 'Spray neem oil weekly.' },
    ],
    fertilizerTips: [
      'Use nitrogen-rich fertilizer',
      'Apply compost monthly',
      'Add Epsom salt for healthy growth',
    ],
    videoUrl: 'https://www.youtube.com/embed/5EOfBeuVWu4?t=2', // ✅ FIXED - Lady Finger (Okra) Growing Guide
    imageUrl: 'https://images.unsplash.com/photo-1622209229692-5c51f9f61809?w=400&h=300&fit=crop', // Lady Finger photo
  },
  {
    id: 'potato',
    name: 'Potato',
    nameHi: 'आलू',
    nameTe: 'బంగాలదుంప',
    difficulty: 'Medium',
    timeToHarvest: '70-90 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '18-20 inch diameter',
    germinationTime: '2-3 weeks (sprouting)',
    description: 'Potatoes are a versatile staple crop. They can be grown in containers from seed potatoes and provide a rewarding harvest.',
    steps: [
      { title: 'Seed Preparation', description: 'Use certified seed potatoes. Cut larger ones into pieces with at least 2 eyes each.' },
      { title: 'Planting', description: 'Plant seed potatoes 4 inches deep in rich soil. Space them 8 inches apart.' },
      { title: 'Hilling', description: 'Hill soil around plants as they grow to increase yield. Add compost around stems.' },
      { title: 'Harvesting', description: 'Harvest when plants turn yellow and die back. Dig carefully to avoid damaging tubers.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Regular (keep soil moist)' },
      { task: 'Hilling soil', frequency: 'Every 2-3 weeks' },
      { task: 'Fertilizing', frequency: 'Monthly' },
    ],
    commonProblems: [
      { problem: 'Blight disease', solution: 'Use disease-resistant varieties. Avoid overhead watering.' },
      { problem: 'Scab', solution: 'Maintain soil pH 5.0-5.5. Avoid fresh manure.' },
    ],
    fertilizerTips: [
      'Use potassium-rich fertilizer',
      'Apply compost at planting',
      'Avoid high nitrogen fertilizers',
    ],
    videoUrl: 'https://www.youtube.com/embed/cXdYAAPfrdA?t=3', // ✅ FIXED - How to Grow Potatoes (Complete Guide)
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop', // Potato photo
  },
  {
    id: 'carrot',
    name: 'Carrot',
    nameHi: 'गाजर',
    nameTe: 'క్యారెట్',
    difficulty: 'Easy',
    timeToHarvest: '60-80 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '12-14 inch deep pot',
    germinationTime: '7-14 days',
    description: 'Carrots are root vegetables that are easy to grow in deep containers. They are rich in vitamins and add color to any meal.',
    steps: [
      { title: 'Soil Preparation', description: 'Use loose, sandy soil with no rocks or clods. Fill pots with deep soil mix.' },
      { title: 'Sowing', description: 'Sow seeds ¼ inch deep. Thin seedlings to 2 inches apart when they are 4 inches tall.' },
      { title: 'Care', description: 'Water regularly. Apply potassium-rich fertilizer when plants are 4 inches tall.' },
      { title: 'Harvesting', description: 'Harvest when carrots reach desired size (40-60 days for baby carrots, 60-80 days for mature).' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Daily' },
      { task: 'Thinning', frequency: 'Once (when plants are 4 inches tall)' },
      { task: 'Fertilizing', frequency: 'Every 3-4 weeks' },
    ],
    commonProblems: [
      { problem: 'Forked roots', solution: 'Ensure soil is rock-free. Avoid overwatering.' },
      { problem: 'Carrot fly', solution: 'Use row covers. Companion planting with onions.' },
    ],
    fertilizerTips: [
      'Use potassium-rich fertilizer at 4 inches tall',
      'Avoid nitrogen-rich fertilizer',
      'Add compost at planting',
    ],
    videoUrl: 'https://www.youtube.com/embed/LVpm2fLbRys?t=6', // ✅ FIXED - How to Grow Carrots at Home (Full Guide)
    imageUrl: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=300&fit=crop', // Carrot photo
  },
  {
    id: 'capsicum',
    name: 'Capsicum (Bell Pepper)',
    nameHi: 'शिमला मिर्च',
    nameTe: 'క్యాప్సికం',
    difficulty: 'Medium',
    timeToHarvest: '70-90 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '12-14 inch diameter',
    germinationTime: '10-20 days',
    description: 'Capsicum plants produce colorful, sweet peppers that are rich in vitamins and antioxidants. They grow well in containers with proper care.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow seeds indoors 8-10 weeks before last frost. Germination requires warmth (20-25°C).' },
      { title: 'Transplanting', description: 'Transplant when seedlings have 4-6 true leaves. Space plants 12-18 inches apart.' },
      { title: 'Care', description: 'Water regularly. Stake plants for support. Fertilize every 2 weeks during fruiting.' },
      { title: 'Harvesting', description: 'Harvest when peppers reach desired color and size. Regular picking encourages more production.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pruning', frequency: 'Monthly' },
    ],
    commonProblems: [
      { problem: 'Blossom end rot', solution: 'Maintain consistent watering. Add calcium to soil.' },
      { problem: 'Aphids', solution: 'Spray neem oil solution weekly.' },
    ],
    fertilizerTips: [
      'Use balanced fertilizer during growth',
      'Apply calcium-rich fertilizer during fruiting',
      'Vermicompost monthly',
    ],
    videoUrl: 'https://www.youtube.com/embed/GU9tzMAj_i0?t=1', // ✅ FIXED - How to Grow Bell Peppers (Capsicum) at Home
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop', // Capsicum photo
  },
  {
    id: 'beans',
    name: 'Beans (French Beans)',
    nameHi: 'बीन्स',
    nameTe: 'బీన్స్',
    difficulty: 'Easy',
    timeToHarvest: '55-65 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '12-14 inch diameter',
    germinationTime: '7-10 days',
    description: 'Beans are fast-growing vegetables that produce nutritious pods. Bush varieties are perfect for container gardening.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow seeds directly in pots, 2-3 seeds per pot. Plant 1 inch deep.' },
      { title: 'Support', description: 'Provide stakes or trellis for climbing varieties.' },
      { title: 'Care', description: 'Water regularly. Avoid overhead watering to prevent disease.' },
      { title: 'Harvesting', description: 'Harvest young, tender pods when they are firm and crisp. Regular picking promotes production.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2 days' },
      { task: 'Fertilizing', frequency: 'Monthly' },
      { task: 'Harvesting', frequency: 'Every 2-3 days' },
    ],
    commonProblems: [
      { problem: 'Rust disease', solution: 'Apply neem oil. Ensure good air circulation.' },
      { problem: 'Bean beetles', solution: 'Handpick beetles. Use insecticidal soap.' },
    ],
    fertilizerTips: [
      'Avoid nitrogen-rich fertilizer (beans fix their own nitrogen)',
      'Apply phosphorus and potassium fertilizer',
      'Add compost at planting',
    ],
    videoUrl: 'https://www.youtube.com/embed/isY4Z99FULI?t=2', // ✅ FIXED - How to Grow Beans at Home (Full Guide)
    imageUrl: 'https://images.unsplash.com/photo-1571731956672-f2b94d7ddac0?w=400&h=300&fit=crop', // Beans photo
  },
  {
    id: 'peas',
    name: 'Peas',
    nameHi: 'मटर',
    nameTe: 'బఠానీ',
    difficulty: 'Easy',
    timeToHarvest: '60-70 days',
    waterNeeds: 'Regular',
    sunlight: '4-6 hours daily',
    potSize: '12-14 inch diameter',
    germinationTime: '7-14 days',
    description: 'Peas are cool-season vegetables that produce sweet, edible pods. They are perfect for early spring and fall gardening.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow seeds directly in pots, 1 inch deep. Space seeds 2 inches apart.' },
      { title: 'Support', description: 'Provide trellis for climbing varieties.' },
      { title: 'Care', description: 'Water regularly. Harvest pods regularly to encourage more production.' },
      { title: 'Harvesting', description: 'Harvest when pods are plump and peas are sweet. Pick daily for best quality.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Monthly' },
      { task: 'Harvesting', frequency: 'Daily' },
    ],
    commonProblems: [
      { problem: 'Powdery mildew', solution: 'Provide good air circulation. Avoid overhead watering.' },
      { problem: 'Aphids', solution: 'Spray neem oil weekly.' },
    ],
    fertilizerTips: [
      'Use balanced fertilizer sparingly',
      'Apply compost at planting',
      'Avoid high nitrogen (peas fix their own)',
    ],
    videoUrl: 'https://www.youtube.com/embed/-xTBXLy1Ai4?t=1', // ✅ FIXED - Growing Peas (Full Guide)
    imageUrl: 'https://images.unsplash.com/photo-1621259182978-fbf93132d3c8?w=400&h=300&fit=crop', // Peas photo
  },
  {
    id: 'cucumber',
    name: 'Cucumber',
    nameHi: 'खीरा',
    nameTe: 'దోసకాయ',
    difficulty: 'Easy',
    timeToHarvest: '55-70 days',
    waterNeeds: 'High (keep moist)',
    sunlight: '6-8 hours daily',
    potSize: '14-18 inch diameter',
    germinationTime: '5-10 days',
    description: 'Cucumbers are fast-growing vines that produce crisp, refreshing fruits. They are perfect for salads and pickling.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow seeds directly in pots, 2-3 seeds per pot. Plant ½ inch deep.' },
      { title: 'Support', description: 'Provide strong trellis for vines to climb.' },
      { title: 'Care', description: 'Water consistently. Fertilize every 2 weeks. Mulch to retain moisture.' },
      { title: 'Harvesting', description: 'Harvest when fruits are firm and green. Pick daily for best quality.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Daily' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Harvesting', frequency: 'Daily' },
    ],
    commonProblems: [
      { problem: 'Powdery mildew', solution: 'Spray neem oil. Provide good air circulation.' },
      { problem: 'Cucumber beetles', solution: 'Use row covers. Apply neem oil.' },
    ],
    fertilizerTips: [
      'Use balanced fertilizer every 2 weeks',
      'Add compost monthly',
      'Apply Epsom salt for better fruiting',
    ],
    videoUrl: 'https://www.youtube.com/embed/SL0PIU-yrbw?t=1', // ✅ FIXED - How to Grow Cucumbers (Complete Guide)
    imageUrl: 'https://images.unsplash.com/photo-1592156841840-c2c91d6cc7b2?w=400&h=300&fit=crop', // Cucumber photo
  },
  {
    id: 'pumpkin',
    name: 'Pumpkin',
    nameHi: 'कद्दू',
    nameTe: 'గుమ్మడికాయ',
    difficulty: 'Medium',
    timeToHarvest: '80-120 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '20-24 inch diameter',
    germinationTime: '7-14 days',
    description: 'Pumpkins are large, sprawling vines that produce colorful fruits. They are nutritious and can be used in various dishes.',
    steps: [
      { title: 'Seed Sowing', description: 'Sow 2-3 seeds per large pot. Plant 1 inch deep.' },
      { title: 'Space', description: 'Provide plenty of space for vines to spread. Train vines on trellis if needed.' },
      { title: 'Care', description: 'Water regularly. Fertilize every 2 weeks during growth.' },
      { title: 'Harvesting', description: 'Harvest when the fruit is fully colored and the stem starts to dry.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 2-3 days' },
      { task: 'Fertilizing', frequency: 'Every 2 weeks' },
      { task: 'Pruning vines', frequency: 'Monthly' },
    ],
    commonProblems: [
      { problem: 'Powdery mildew', solution: 'Apply neem oil. Ensure good air circulation.' },
      { problem: 'Vine borers', solution: 'Cover stems with soil. Apply insecticide.' },
    ],
    fertilizerTips: [
      'Use balanced fertilizer during growth',
      'Apply phosphorus-rich fertilizer during flowering',
      'Vermicompost monthly',
    ],
    videoUrl: 'https://www.youtube.com/embed/EO6R17_St2g', // ✅ FIXED - Growing Pumpkins (Full Guide)
    imageUrl: 'https://images.unsplash.com/photo-1615421329096-191a97e4fcc1?w=400&h=300&fit=crop', // Pumpkin photo
  },
  {
    id: 'radish',
    name: 'Radish',
    nameHi: 'मूली',
    nameTe: 'ముల్లంగి',
    difficulty: 'Easy',
    timeToHarvest: '25-35 days',
    waterNeeds: 'Regular',
    sunlight: '6-8 hours daily',
    potSize: '8-10 inch deep pot',
    germinationTime: '5-10 days',
    description: 'Radishes are one of the fastest-growing vegetables. They are perfect for beginners and provide a quick harvest.',
    steps: [
      { title: 'Sowing', description: 'Sow seeds directly in pots, ½ inch deep. Space seeds 1 inch apart.' },
      { title: 'Thinning', description: 'Thin to 2 inches apart when seedlings emerge.' },
      { title: 'Care', description: 'Water regularly. Keep soil evenly moist.' },
      { title: 'Harvesting', description: 'Harvest when roots are about 1 inch in diameter (25-35 days).' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 1-2 days' },
      { task: 'Thinning', frequency: 'Once (after germination)' },
      { task: 'Harvesting', frequency: 'As needed' },
    ],
    commonProblems: [
      { problem: 'Root cracking', solution: 'Maintain consistent moisture. Avoid overwatering.' },
      { problem: 'Flea beetles', solution: 'Use row covers. Apply neem oil.' },
    ],
    fertilizerTips: [
      'Use light compost at planting',
      'Avoid high nitrogen fertilizer',
      'Apply balanced fertilizer sparingly',
    ],
    videoUrl: 'https://www.youtube.com/embed/EljpkiPILkY', // ✅ FIXED - Growing Radish (Fast Harvest Guide)
    imageUrl: 'https://images.unsplash.com/photo-1612927673863-74673eec10de?w=400&h=300&fit=crop', // Radish photo
  },
  {
    id: 'fenugreek',
    name: 'Fenugreek (Methi)',
    nameHi: 'मेथी',
    nameTe: 'మెంతులు',
    difficulty: 'Easy',
    timeToHarvest: '20-30 days (leaves)',
    waterNeeds: 'Moderate',
    sunlight: '4-6 hours daily',
    potSize: '8-10 inch diameter',
    germinationTime: '5-7 days',
    description: 'Fenugreek is a fast-growing herb that produces flavorful leaves used in Indian cooking. It\'s perfect for container gardening.',
    steps: [
      { title: 'Sowing', description: 'Scatter seeds on soil surface and cover lightly with ¼ inch soil.' },
      { title: 'Germination', description: 'Keep soil moist. Seeds germinate in 5-7 days.' },
      { title: 'Care', description: 'Water regularly. Harvest leaves when plants are 4-6 inches tall.' },
      { title: 'Harvesting', description: 'Cut leaves from the top, leaving the plant to regrow for multiple harvests.' },
    ],
    careSchedule: [
      { task: 'Watering', frequency: 'Every 1-2 days' },
      { task: 'Harvesting', frequency: 'Weekly' },
      { task: 'Successive sowing', frequency: 'Every 2-3 weeks' },
    ],
    commonProblems: [
      { problem: 'Bolting in heat', solution: 'Grow in partial shade. Harvest regularly.' },
      { problem: 'Powdery mildew', solution: 'Avoid overhead watering. Improve air circulation.' },
    ],
    fertilizerTips: [
      'Use organic compost at planting',
      'Apply liquid fertilizer every 2 weeks',
      'Avoid high nitrogen (can affect flavor)',
    ],
    videoUrl: 'https://www.youtube.com/embed/wgBy1_AafQw', // ✅ FIXED - How to Grow Fenugreek (Methi) at Home
    imageUrl: 'https://images.unsplash.com/photo-1596044693275-ec246276013d?w=400&h=300&fit=crop', // Fenugreek photo
  },
];

// ==================== LEARNING VIDEOS (WITH PHOTOS INSTEAD OF EMOJIS) ====================

export const learningVideos = [
  {
    id: '1',
    title: 'Complete Guide to Terrace Gardening',
    channel: 'Urban Gardener',
    duration: '12:45',
    category: 'Terrace Gardeners',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/5wHcMTMFvbE'
  },
  {
    id: '2',
    title: 'Organic Farming Techniques for Small Farmers',
    channel: 'Krishi Vikas',
    duration: '18:30',
    category: 'Farmers',
    language: 'hi',
    thumbnail: 'https://images.unsplash.com/photo-1574943320219-5538e2b9c0df?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/Ken8PR-wbzI'
  },
  {
    id: '3',
    title: 'Growing Tomatoes at Home - Step by Step',
    channel: 'Home Grow India',
    duration: '8:15',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/wvEdx8CYn0I'
  },
  {
    id: '4',
    title: 'Indoor Plants for Beginners',
    channel: 'Green Living',
    duration: '6:50',
    category: 'Indoor Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/QolWA1aba3o'
  },
  {
    id: '5',
    title: 'Vegetable Gardening in Small Spaces',
    channel: 'Urban Farmer',
    duration: '15:20',
    category: 'Vegetable Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/fvg2CtxQYVY'
  },
  {
    id: '6',
    title: 'Natural Pest Control Methods',
    channel: 'Organic India',
    duration: '10:05',
    category: 'Farmers',
    language: 'hi',
    thumbnail: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/1RRNu4QS11g'
  },
  {
    id: '7',
    title: 'Growing Chillies in Pots',
    channel: 'Spice Garden',
    duration: '9:30',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/Ken8PR-wbzI'
  },
  {
    id: '8',
    title: 'Compost Making at Home',
    channel: 'Eco Living',
    duration: '14:00',
    category: 'Home Growers',
    language: 'hi',
    thumbnail: 'https://images.unsplash.com/photo-1532851846881-dc8e55c4898f?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/3MtZjyQcGOg'
  },
  {
    id: '9',
    title: 'How to Grow Onions at Home',
    channel: 'Kitchen Garden',
    duration: '11:00',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/ht9NOqX5YJw'
  },
  {
    id: '10',
    title: 'How to Grow Brinjal in Pots',
    channel: 'Vegetable Gardening',
    duration: '9:40',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1622209239100-4e5986f7dd0a?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/nb7c7XucQg4'
  },
  {
    id: '11',
    title: 'Bottle Gourd Growing Guide',
    channel: 'Vine Vegetables',
    duration: '10:30',
    category: 'Vegetable Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1563315403-9f0524dedc0a?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/zcMw_bJ0m_U'
  },
  {
    id: '12',
    title: 'Bitter Gourd Cultivation',
    channel: 'Bitter Melon Garden',
    duration: '12:15',
    category: 'Vegetable Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1598898903980-1de585c7dcb6?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/26-KlpmHtL0'
  },
  {
    id: '13',
    title: 'How to Grow Lady Finger at Home',
    channel: 'Pod Vegetables',
    duration: '7:55',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1622209229692-5c51f9f61809?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/PIUGWm9R26A'
  },
  {
    id: '14',
    title: 'Growing Potatoes in Containers',
    channel: 'Root Crops',
    duration: '10:45',
    category: 'Vegetable Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/oWitpB7aBZs'
  },
  {
    id: '15',
    title: 'Carrot Growing Guide',
    channel: 'Root Vegetables',
    duration: '9:15',
    category: 'Vegetable Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/hDnHQ3YrG1E'
  },
  {
    id: '16',
    title: 'How to Grow Capsicum in Pots',
    channel: 'Pepper Growers',
    duration: '11:30',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/66qFfPA02fk'
  },
  {
    id: '17',
    title: 'Growing French Beans at Home',
    channel: 'Bean Growers',
    duration: '8:30',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1571731956672-f2b94d7ddac0?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/MdOW02MyCgg'
  },
  {
    id: '18',
    title: 'How to Grow Peas in Pots',
    channel: 'Pod Vegetables',
    duration: '9:00',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1621259182978-fbf93132d3c8?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/RiEqzZJOSkE'
  },
  {
    id: '19',
    title: 'Cucumber Growing at Home',
    channel: 'Vine Vegetables',
    duration: '10:15',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1592156841840-c2c91d6cc7b2?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/rJ1ip0cQ9ys'
  },
  {
    id: '20',
    title: 'Pumpkin Cultivation Guide',
    channel: 'Large Fruits',
    duration: '13:20',
    category: 'Vegetable Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1615421329096-191a97e4fcc1?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/-5bTlZtXinA'
  },
  {
    id: '21',
    title: 'Growing Radish at Home',
    channel: 'Fast Harvest',
    duration: '6:40',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1612927673863-74673eec10de?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/FhW2nO5nICo'
  },
  {
    id: '22',
    title: 'How to Grow Fenugreek (Methi)',
    channel: 'Herbal Garden',
    duration: '7:20',
    category: 'Home Growers',
    language: 'en',
    thumbnail: 'https://images.unsplash.com/photo-1596044693275-ec246276013d?w=400&h=300&fit=crop',
    url: 'https://www.youtube.com/embed/fuXSWT5tHlA'
  },
];
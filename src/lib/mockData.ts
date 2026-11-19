import type { Profile } from './types.ts';

export const INITIAL_PROFILES: Profile[] = [
  {
    id: 'prof_01',
    name: 'Ananya Sharma',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Golden hour enthusiast, vinyl collector, and chronic iced matcha drinker. Looking for someone to explore indie bookstore cafes with.',
    city: 'New Delhi',
    college: "St. Stephen's College",
    job: 'Literature Student & Podcaster',
    interests: ['Indie Rock', 'Film Photography', 'Iced Matcha', 'Thrifting', 'Cats'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_02',
    name: 'Rohan Mehta',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Software engineer by day, amateur standup comedian by night. I make a mean sourdough pizza and know the best speakeasies in town.',
    city: 'Bengaluru',
    college: 'BITS Pilani',
    job: 'Full-stack Developer',
    interests: ['Standup Comedy', 'Sourdough', 'Bouldering', 'Podcasts', 'Dogs'],
    hasLikedUser: false,
  },
  {
    id: 'prof_03',
    name: 'Tara Mukherjee',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Architecture student who sketches old doors and complains about city planning. Can beat you at Catan.',
    city: 'Mumbai',
    college: 'Sir J.J. College of Architecture',
    job: 'Architectural Designer',
    interests: ['Urban Sketching', 'Board Games', 'Filter Coffee', 'Modern Art', 'Museums'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_04',
    name: 'Kabir Verma',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Building consumer tech. Weekend trekker. Always up for 2 AM spontaneous chai runs and deep conversations about human psychology.',
    city: 'Gurgaon',
    college: 'IIT Delhi',
    job: 'Product Manager',
    interests: ['Trekking', 'Startups', 'Chai', 'Sci-Fi', 'Running'],
    hasLikedUser: false,
  },
  {
    id: 'prof_05',
    name: 'Meera Sen',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Film major. Probably rewatching Wong Kar-wai or debating whether 35mm film has a soul. Tell me your top 3 comfort movies.',
    city: 'Kolkata',
    college: 'Jadavpur University',
    job: 'Film Student & Editor',
    interests: ['Cinema', 'Analog Cameras', 'Late Night Walks', 'Poetry', 'Jazz'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_06',
    name: 'Aarav Patel',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Fintech analyst who actually likes math. In training for my second half-marathon. Let’s grab ramen and talk life goals.',
    city: 'Mumbai',
    college: 'NMIMS',
    job: 'Equity Research Associate',
    interests: ['Marathon', 'Ramen', 'Chess', 'Investing', 'Travel'],
    hasLikedUser: false,
  },
  {
    id: 'prof_07',
    name: 'Diya Nambiar',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Ceramics enthusiast and UX designer. Half my plant collection has names. I will send you Spotify playlists unprovoked.',
    city: 'Bengaluru',
    college: 'Srishti Institute of Art, Design and Technology',
    job: 'UX Designer',
    interests: ['Pottery', 'Plants', 'Indie Pop', 'Baking', 'Graphic Novels'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_08',
    name: 'Arjun Kapoor',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Lawyer negotiating contracts by day, DJing deep house on weekends. Looking for someone who doesn’t take themselves too seriously.',
    city: 'New Delhi',
    college: 'National Law University',
    job: 'Corporate Attorney',
    interests: ['House Music', 'Formula 1', 'Tennis', 'Wine Tasting', 'Dog Lover'],
    hasLikedUser: false,
  },
  {
    id: 'prof_09',
    name: 'Zoya Khan',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Fashion communication graduate. Curator of vintage jackets and obscure meme collections. Fluent in sarcasm and Hindi retro music.',
    city: 'New Delhi',
    college: 'NIFT Delhi',
    job: 'Stylist & Content Creator',
    interests: ['Vintage Fashion', 'Retro Bollywood', 'Thrifting', 'Photography', 'Travel'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_10',
    name: 'Vikramaditya Roy',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Data scientist who loves acoustic guitar. I believe in honest communication, good coffee, and dogs having equal rights to couch space.',
    city: 'Hyderabad',
    college: 'IIIT Hyderabad',
    job: 'Machine Learning Engineer',
    interests: ['Acoustic Guitar', 'Coffee Brewing', 'AI Ethics', 'Dogs', 'Badminton'],
    hasLikedUser: false,
  },
  {
    id: 'prof_11',
    name: 'Sanya Malhotra',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Psychology graduate. Curious about how people fall in love and why we overthink text messages. Big fan of sunset picnics.',
    city: 'Chandigarh',
    college: 'Panjab University',
    job: 'Content Strategist',
    interests: ['Psychology', 'Picnics', 'Journaling', 'Sunsets', 'Matcha'],
    hasLikedUser: false,
  },
  {
    id: 'prof_12',
    name: 'Devansh Singhania',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Automobile engineer with a passion for cycling trails and espresso machines. Always ready to pack a bag for the hills.',
    city: 'Pune',
    college: 'COEP Pune',
    job: 'Mechanical Design Engineer',
    interests: ['Cycling', 'Espresso', 'Mountains', 'Camping', 'Road Trips'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_13',
    name: 'Kritika Joshi',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Copywriter who writes ads during the day and speculative fiction at night. Will cook you pasta if you have good music taste.',
    city: 'Mumbai',
    college: "St. Xavier's College",
    job: 'Senior Copywriter',
    interests: ['Writing', 'Italian Food', 'Live Gigs', 'Cocktails', 'Cats'],
    hasLikedUser: false,
  },
  {
    id: 'prof_14',
    name: 'Ishaan Gupta',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Founder building in sustainability. Passionate about scuba diving and reducing food waste. Looking for a partner in crime.',
    city: 'Bengaluru',
    college: 'Ashoka University',
    job: 'Climate Tech Founder',
    interests: ['Scuba Diving', 'Sustainability', 'Tennis', 'Board Games', 'Podcasts'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_15',
    name: 'Avani Reddy',
    age: 21,
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Pre-med student who survives on black coffee and sheer willpower. Tell me a secret nobody knows about you.',
    city: 'Chennai',
    college: 'Madras Medical College',
    job: 'Medical Intern',
    interests: ['Medicine', 'Neuroscience', 'Classical Music', 'Baking', 'Coffee'],
    hasLikedUser: false,
  },
  {
    id: 'prof_16',
    name: 'Sameer Nair',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1480429370139-e0132c086e2a?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Visual effects artist. Obsessed with sci-fi cinema and synthwave. Always looking for hidden gem Korean BBQ joints.',
    city: 'Hyderabad',
    college: 'National Institute of Design',
    job: 'VFX Lead',
    interests: ['VFX', 'Korean BBQ', 'Synthwave', 'Cinema', 'Gaming'],
    hasLikedUser: false,
  },
  {
    id: 'prof_17',
    name: 'Rhea Chakraborty',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1526080652727-5b77f74eacd2?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Environmental economist. Loves bird watching, pottery, and indie folk albums. I can make you laugh in 30 seconds.',
    city: 'New Delhi',
    college: 'Delhi School of Economics',
    job: 'Policy Researcher',
    interests: ['Bird Watching', 'Indie Folk', 'Economics', 'Pottery', 'Gardening'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_18',
    name: 'Yashvardhan Kulkarni',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Aerospace geek who builds racing drones. Can explain orbital mechanics or make you the perfect pour-over.',
    city: 'Bengaluru',
    college: 'IISc Bangalore',
    job: 'Drone Systems Engineer',
    interests: ['Drones', 'Pour Over', 'Astrophysics', 'Rock Climbing', 'Sci-Fi'],
    hasLikedUser: false,
  },
  {
    id: 'prof_19',
    name: 'Nandini Das',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1514315384763-ba401779410f?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Dancer and graphic illustrator. My aesthetic is pastel sweaters, warm bakeries, and moody sunsets.',
    city: 'Kolkata',
    college: 'Kala Bhavana, Visva-Bharati',
    job: 'Illustrator & Animator',
    interests: ['Illustration', 'Contemporary Dance', 'Bakeries', 'Museums', 'Typography'],
    hasLikedUser: false,
  },
  {
    id: 'prof_20',
    name: 'Neil Fernandes',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Goa boy living in Mumbai. Acoustic guitar player, sunset surfer, and seafood connoisseur.',
    city: 'Goa',
    college: 'Goa University',
    job: 'Sound Designer',
    interests: ['Surfing', 'Acoustic Sessions', 'Seafood', 'Vinyl', 'Camping'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_21',
    name: 'Ahana Sengupta',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1534751516642-a171ed25a767?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534751516642-a171ed25a767?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Journalist covering culture and social movements. Loves flea markets, dark chocolate, and spontaneous weekend road trips.',
    city: 'New Delhi',
    college: 'Lady Shri Ram College',
    job: 'Culture Journalist',
    interests: ['Journalism', 'Flea Markets', 'Dark Chocolate', 'Road Trips', 'Books'],
    hasLikedUser: false,
  },
  {
    id: 'prof_22',
    name: 'Pranav Bhatia',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Consultant by profession, amateur chef at heart. I know all the secret culinary spots from Chandni Chowk to Bandra.',
    city: 'Gurgaon',
    college: 'SRCC Delhi',
    job: 'Management Consultant',
    interests: ['Culinary Arts', 'Street Food', 'Badminton', 'Standup Comedy', 'Travel'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_23',
    name: 'Tanvi Agarwal',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Marketing enthusiast with a huge soft corner for golden retrievers and rooftop conversations under fairy lights.',
    city: 'Jaipur',
    college: 'Manipal University',
    job: 'Brand Strategist',
    interests: ['Dogs', 'Rooftop Cafes', 'Photography', 'Indie Music', 'Thrifting'],
    hasLikedUser: false,
  },
  {
    id: 'prof_24',
    name: 'Siddharth Iyer',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1508243771214-6e85e40077c9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1508243771214-6e85e40077c9?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Robotics engineer passionate about AI hardware. Love brewing craft beers and solving cryptic crosswords.',
    city: 'Bengaluru',
    college: 'IIT Madras',
    job: 'Robotics Engineer',
    interests: ['Robotics', 'Craft Beer', 'Crosswords', 'Hiking', 'Sci-Fi'],
    hasLikedUser: false,
  },
  {
    id: 'prof_25',
    name: 'Rupali Deshmukh',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Theatre actress and voiceover artist. Expressive, dramatic when ordered the wrong coffee, and extremely loyal.',
    city: 'Pune',
    college: 'Fergusson College',
    job: 'Theatre Artist',
    interests: ['Theatre', 'Voice Acting', 'Poetry', 'Chai', 'Art Festivals'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_26',
    name: 'Karan Mehra',
    age: 26,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Venture capital associate who reads philosophy on the metro. Let’s grab sushi and tell each other our real life stories.',
    city: 'Mumbai',
    college: 'IIM Ahmedabad',
    job: 'VC Investor',
    interests: ['Philosophy', 'Sushi', 'Podcasts', 'Marathon', 'Books'],
    hasLikedUser: false,
  },
  {
    id: 'prof_27',
    name: 'Pooja Hegde',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Fashion stylist with an obsession for 90s vintage watches and Japanese denim. Life is too short to wear boring outfits.',
    city: 'Bengaluru',
    college: 'NIFT Bengaluru',
    job: 'Fashion Stylist',
    interests: ['Vintage Watches', 'Denim', 'Design', 'House Plants', 'Coffee'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_28',
    name: 'Aditya Chawla',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Sports journalist and football fanatic. Can analyze Arsenal’s midfield tactics for 2 hours straight without stopping.',
    city: 'New Delhi',
    college: 'Delhi University',
    job: 'Sports Journalist',
    interests: ['Football', 'Journalism', 'Running', 'Board Games', 'Pizza'],
    hasLikedUser: false,
  },
  {
    id: 'prof_29',
    name: 'Isha Bansal',
    age: 23,
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Urban planner fighting for more green spaces and pedestrian walkways. Enjoys pottery, indie concerts, and rooftop stargazing.',
    city: 'Chandigarh',
    college: 'School of Planning and Architecture',
    job: 'Urban Designer',
    interests: ['Urbanism', 'Stargazing', 'Indie Concerts', 'Pottery', 'Cycling'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_30',
    name: 'Manish Rao',
    age: 25,
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Product designer obsessed with micro-interactions and dark mode UI. Weekend barista and collector of mechanical keyboards.',
    city: 'Hyderabad',
    college: 'BITS Hyderabad',
    job: 'Senior Product Designer',
    interests: ['Keyboards', 'Espresso', 'UI/UX', 'Photography', 'Synthwave'],
    hasLikedUser: false,
  },
  {
    id: 'prof_31',
    name: 'Simran Walia',
    age: 22,
    photo: 'https://images.unsplash.com/photo-1534751516642-a171ed25a767?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1534751516642-a171ed25a767?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Neuroscience student and part-time pastry baker. If you can beat me at Scrabble, the first coffee is on me.',
    city: 'New Delhi',
    college: 'AIIMS New Delhi',
    job: 'Research Assistant',
    interests: ['Neuroscience', 'Baking', 'Scrabble', 'Matcha', 'Classical Music'],
    hasLikedUser: true, // Will match on swipe right!
  },
  {
    id: 'prof_32',
    name: 'Varun Kashyap',
    age: 24,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80'
    ],
    bio: 'Cybersecurity researcher who values privacy more than anything. I like analog watches, mechanical locks, and night bike rides.',
    city: 'Bengaluru',
    college: 'IIT Roorkee',
    job: 'Security Engineer',
    interests: ['Cybersecurity', 'Night Rides', 'Privacy Tech', 'Bouldering', 'Chai'],
    hasLikedUser: false,
  }
];

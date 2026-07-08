import type { NavLink, Milestone, Mission, GalleryImage } from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "History", href: "/history" },
  { label: "Missions", href: "/missions" },
  { label: "Gallery", href: "/gallery" },
  { label: "Astronomy", href: "/astronomy" },
  { label: "Mars", href: "/mars" },
  { label: "Earth", href: "/earth" },
  { label: "Contact", href: "/contact" },
];

export const MILESTONES: Milestone[] = [
  {
    year: "1958",
    title: "NASA Founded",
    description:
      "The National Aeronautics and Space Administration was established by President Eisenhower, ushering in the era of American space exploration.",
    image: "/pages/history.webp",
  },
  {
    year: "1961",
    title: "First American in Space",
    description:
      "Alan Shepard became the first American in space aboard Freedom 7, a milestone in the Space Race.",
    image: "/missions/voyager.webp",
  },
  {
    year: "1969",
    title: "Apollo 11 Moon Landing",
    description:
      "Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, achieving President Kennedy's goal of a lunar landing before the decade's end.",
    image: "/missions/apollo-11.webp",
  },
  {
    year: "1981",
    title: "First Space Shuttle Flight",
    description:
      "The first reusable spacecraft, Columbia, launched inaugurating a new era of regular access to space with the Space Shuttle program.",
    image: "/pages/gallery.webp",
  },
  {
    year: "1990",
    title: "Hubble Space Telescope",
    description:
      "The Hubble Space Telescope launched, revolutionizing astronomy with unprecedented views of the universe from low Earth orbit.",
    image: "/missions/hubble.webp",
  },
  {
    year: "1998",
    title: "ISS Assembly Begins",
    description:
      "Construction of the International Space Station began, creating a collaborative orbiting laboratory involving multiple space agencies.",
    image: "/earth/blue-marble.jpeg",
  },
  {
    year: "2021",
    title: "Perseverance Lands on Mars",
    description:
      "NASA's Perseverance rover landed on Mars, searching for signs of ancient life and collecting samples for future return to Earth.",
    image: "/missions/perseverance.webp",
  },
  {
    year: "2022",
    title: "James Webb First Images",
    description:
      "The James Webb Space Telescope began science operations, revealing the universe in unprecedented infrared detail and depth.",
    image: "/missions/james-webb.webp",
  },
  {
    year: "2025",
    title: "Artemis II Lunar Flyby",
    description:
      "NASA's Artemis program returned humans to the lunar vicinity, paving the way for sustainable exploration of the Moon and future Mars missions.",
    image: "/missions/artemis.webp",
  },
];

export const MISSIONS: Mission[] = [
  {
    id: "apollo-11",
    slug: "apollo-11",
    name: "Apollo 11",
    description:
      "The first crewed lunar landing mission, carrying astronauts Neil Armstrong, Buzz Aldrin, and Michael Collins to the Moon and back.",
    longDescription:
      "Apollo 11 was the spaceflight that first landed humans on the Moon. Commander Neil Armstrong and lunar module pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969. Armstrong became the first person to step onto the lunar surface six hours later. The mission fulfilled President John F. Kennedy's 1961 goal of landing a man on the Moon and returning him safely to Earth before the end of the decade.",
    year: "1969",
    icon: "🚀",
    image: "/missions/apollo-11.webp",
    heroImage: "/missions/apollo-11.webp",
    objectives: [
      { title: "Lunar Landing", description: "Perform a crewed lunar landing and return safely to Earth." },
      { title: "Scientific Collection", description: "Collect lunar surface samples for geological analysis." },
      { title: "Surface Exploration", description: "Deploy scientific instruments including a seismometer and laser reflector." },
      { title: "Technology Demonstration", description: "Demonstrate the capability of lunar orbit rendezvous and extravehicular activity." },
    ],
    achievements: [
      { year: "Jul 16, 1969", title: "Launch", description: "Saturn V rocket launches from Kennedy Space Center carrying Apollo 11 crew." },
      { year: "Jul 20, 1969", title: "Moon Landing", description: "Eagle lunar module lands on the Sea of Tranquility." },
      { year: "Jul 20, 1969", title: "First Steps", description: "Armstrong descends the ladder: 'one small step for man, one giant leap for mankind.'" },
      { year: "Jul 24, 1969", title: "Splashdown", description: "Command Module Columbia splashes down in the Pacific Ocean." },
    ],
    facts: [
      { label: "Duration", value: "8 days, 3 hours" },
      { label: "Crew", value: "3 astronauts" },
      { label: "Moon Rocks", value: "47.5 lbs collected" },
      { label: "Orbits", value: "30 lunar orbits" },
    ],
    related: ["voyager", "hubble", "artemis"],
  },
  {
    id: "voyager",
    slug: "voyager",
    name: "Voyager",
    description:
      "Twin spacecraft that explored Jupiter, Saturn, Uranus, and Neptune, now traveling in interstellar space beyond our solar system.",
    longDescription:
      "The Voyager program consists of two robotic probes, Voyager 1 and Voyager 2, launched in 1977. They were designed to study the outer planets and have continued their mission into interstellar space, making them the farthest human-made objects from Earth. Voyager 2 is the only spacecraft to have visited Uranus and Neptune.",
    year: "1977",
    icon: "🛸",
    image: "/missions/voyager.webp",
    heroImage: "/missions/voyager.webp",
    objectives: [
      { title: "Outer Planet Exploration", description: "Conduct close-up studies of Jupiter, Saturn, Uranus, and Neptune." },
      { title: "Interstellar Mission", description: "Continue operations beyond the heliosphere into interstellar space." },
      { title: "Golden Record", description: "Carry a message from humanity including sounds, images, and music of Earth." },
    ],
    achievements: [
      { year: "1979", title: "Jupiter Flyby", description: "Voyager 1 and 2 reveal Jupiter's complex atmosphere and volcanic activity on Io." },
      { year: "1980", title: "Saturn Flyby", description: "Detailed observations of Saturn's rings, atmosphere, and moon Titan." },
      { year: "1986", title: "Uranus Encounter", description: "Voyager 2 makes the first and only flyby of Uranus." },
      { year: "2012", title: "Interstellar Space", description: "Voyager 1 enters interstellar space, crossing the heliopause boundary." },
    ],
    facts: [
      { label: "Launch", value: "Aug 20 & Sep 5, 1977" },
      { label: "Distance", value: "15+ billion miles" },
      { label: "Power Source", value: "Radioisotope Thermoelectric" },
      { label: "Golden Record", value: "115 images, 90 min music" },
    ],
    related: ["hubble", "james-webb", "curiosity"],
  },
  {
    id: "hubble",
    slug: "hubble",
    name: "Hubble",
    description:
      "The iconic space telescope that has transformed our understanding of the cosmos with stunning imagery and groundbreaking discoveries.",
    longDescription:
      "The Hubble Space Telescope was launched in 1990 and has operated for over three decades, providing unprecedented views of the universe. It has made over 1.5 million observations, contributed to thousands of scientific papers, and revolutionized our understanding of the cosmos from the birth of stars to the expansion of the universe.",
    year: "1990",
    icon: "🔭",
    image: "/missions/hubble.webp",
    heroImage: "/missions/hubble.webp",
    objectives: [
      { title: "Deep Space Imaging", description: "Capture high-resolution images of distant galaxies, nebulae, and celestial phenomena." },
      { title: "Cosmic Measurement", description: "Measure the rate of expansion of the universe and determine its age." },
      { title: "Exoplanet Studies", description: "Study the atmospheres of exoplanets and characterize their composition." },
    ],
    achievements: [
      { year: "1990", title: "Launch & Deployment", description: "Hubble launches aboard Space Shuttle Discovery." },
      { year: "1993", title: "First Servicing Mission", description: "Corrective optics installed to fix Hubble's flawed mirror." },
      { year: "2004", title: "Ultra Deep Field", description: "Hubble captures the deepest view of the universe." },
      { year: "2021", title: "30+ Years of Science", description: "Over 1.5 million observations and 19,000+ scientific papers." },
    ],
    facts: [
      { label: "Orbit", value: "340 miles altitude" },
      { label: "Speed", value: "17,500 mph" },
      { label: "Servicing Missions", value: "5 completed" },
      { label: "Data", value: "180+ TB collected" },
    ],
    related: ["james-webb", "voyager", "apollo-11"],
  },
  {
    id: "curiosity",
    slug: "curiosity",
    name: "Curiosity",
    description:
      "A car-sized Mars rover exploring Gale Crater, investigating the planet's climate, geology, and potential for past microbial life.",
    longDescription:
      "Curiosity is a car-sized Mars rover exploring Gale Crater on Mars. Launched in 2011 and landing in 2012, it has made numerous discoveries including evidence of ancient water flows, organic molecules, and seasonal methane variations. It carries the most advanced suite of scientific instruments ever sent to the Martian surface.",
    year: "2012",
    icon: "🛰",
    image: "/missions/curiosity.webp",
    heroImage: "/missions/curiosity.webp",
    objectives: [
      { title: "Habitability Assessment", description: "Determine whether Mars ever had the environmental conditions to support microbial life." },
      { title: "Geological Study", description: "Study the climate and geology of Mars." },
      { title: "Organic Detection", description: "Search for organic compounds and potential biosignatures." },
    ],
    achievements: [
      { year: "2012", title: "Sky Crane Landing", description: "Curiosity executes a revolutionary sky crane landing maneuver." },
      { year: "2013", title: "Ancient Water Found", description: "Evidence of an ancient freshwater lake discovered." },
      { year: "2018", title: "Organic Molecules", description: "Detection of organic molecules in 3.5 billion-year-old sedimentary rocks." },
      { year: "2023", title: "11+ Years of Exploration", description: "Over 18 miles traveled and hundreds of rock samples analyzed." },
    ],
    facts: [
      { label: "Mass", value: "1,982 lbs" },
      { label: "Distance Traveled", value: "18+ miles" },
      { label: "Instruments", value: "10 science instruments" },
      { label: "Power", value: "Radioisotope Power System" },
    ],
    related: ["perseverance", "voyager", "hubble"],
  },
  {
    id: "perseverance",
    slug: "perseverance",
    name: "Perseverance",
    description:
      "NASA's most advanced Mars rover, seeking signs of ancient life and collecting samples for a future Mars sample return mission.",
    longDescription:
      "Perseverance is NASA's most sophisticated Mars rover, designed to search for signs of ancient microbial life, collect and cache Martian rock and soil samples, and demonstrate technologies for future human exploration of Mars. It carries the Ingenuity helicopter, which achieved the first powered flight on another planet.",
    year: "2020",
    icon: "🧪",
    image: "/missions/perseverance.webp",
    heroImage: "/missions/perseverance.webp",
    objectives: [
      { title: "Astrobiology", description: "Search for signs of ancient microbial life in Jezero Crater." },
      { title: "Sample Caching", description: "Collect and store Martian rock and soil samples for future return to Earth." },
      { title: "Technology Demo", description: "Demonstrate oxygen production from Mars atmosphere and helicopter flight." },
    ],
    achievements: [
      { year: "Feb 18, 2021", title: "Landing on Mars", description: "Perseverance successfully lands in Jezero Crater." },
      { year: "Apr 19, 2021", title: "First Helicopter Flight", description: "Ingenuity makes the first powered flight on another planet." },
      { year: "2022", title: "Sample Collection", description: "First core samples collected and sealed for future return." },
      { year: "2023", title: "Organic Discovery", description: "Detection of diverse organic molecules in Jezero Crater delta deposits." },
    ],
    facts: [
      { label: "Mass", value: "2,260 lbs" },
      { label: "Instruments", value: "7 science instruments" },
      { label: "Helicopter", value: "Ingenuity (4 lbs)" },
      { label: "Samples Collected", value: "20+ core samples" },
    ],
    related: ["curiosity", "apollo-11", "artemis"],
  },
  {
    id: "james-webb",
    slug: "james-webb",
    name: "James Webb",
    description:
      "The largest and most powerful space telescope ever built, revealing the universe's first galaxies and forming stars in infrared light.",
    longDescription:
      "The James Webb Space Telescope (JWST) is the most powerful space telescope ever constructed. Launched in December 2021, it observes the universe in infrared wavelengths, allowing it to see the first stars and galaxies that formed after the Big Bang. Its 6.5-meter segmented mirror and sunshield enable unprecedented observations.",
    year: "2021",
    icon: "✨",
    image: "/missions/james-webb.webp",
    heroImage: "/missions/james-webb.webp",
    objectives: [
      { title: "First Light", description: "Observe the first stars and galaxies that formed after the Big Bang." },
      { title: "Galaxy Evolution", description: "Study how galaxies assemble and evolve over cosmic time." },
      { title: "Star Formation", description: "Peer through dust clouds to observe star and planet formation." },
      { title: "Exoplanet Atmospheres", description: "Characterize the atmospheres of exoplanets." },
    ],
    achievements: [
      { year: "Dec 25, 2021", title: "Launch", description: "JWST launches aboard an Ariane 5 rocket." },
      { year: "Jan 2022", title: "Deployment", description: "Complex 14-day deployment of sunshield and mirror completes successfully." },
      { year: "Jul 12, 2022", title: "First Images", description: "First full-color images released." },
      { year: "2023", title: "Breakthrough Discoveries", description: "Carbon dioxide in exoplanet atmosphere, early galaxies discovered." },
    ],
    facts: [
      { label: "Mirror Size", value: "6.5 meters" },
      { label: "Orbit", value: "L2 Lagrange Point" },
      { label: "Sunshield", value: "Tennis court size" },
      { label: "Operating Temp", value: "-370°F" },
    ],
    related: ["hubble", "voyager", "artemis"],
  },
  {
    id: "artemis",
    slug: "artemis",
    name: "Artemis",
    description:
      "NASA's program to return humans to the Moon, including the first woman and first person of color, establishing sustainable lunar exploration.",
    longDescription:
      "The Artemis program is NASA's ambitious initiative to return humans to the Moon and establish a sustainable presence there. Named after Apollo's twin sister in Greek mythology, Artemis aims to land the first woman and first person of color on the lunar surface, develop infrastructure for long-term exploration, and prepare for future crewed missions to Mars.",
    year: "2025",
    icon: "🌙",
    image: "/missions/artemis.webp",
    heroImage: "/missions/artemis.webp",
    objectives: [
      { title: "Return to Moon", description: "Land the first woman and first person of color on the lunar surface." },
      { title: "Sustainable Presence", description: "Establish the Lunar Gateway and surface infrastructure." },
      { title: "Mars Preparation", description: "Develop and test technologies needed for human missions to Mars." },
      { title: "Scientific Research", description: "Conduct extensive lunar science." },
    ],
    achievements: [
      { year: "Nov 2022", title: "Artemis I Launch", description: "Uncrewed Orion spacecraft completes successful mission around the Moon." },
      { year: "2025", title: "Artemis II", description: "First crewed Artemis mission with astronauts orbiting the Moon." },
      { year: "2026", title: "Artemis III", description: "Planned crewed lunar landing mission at the South Pole." },
      { year: "2030s", title: "Mars Missions", description: "Technologies developed from Artemis enable human missions to Mars." },
    ],
    facts: [
      { label: "Rocket", value: "Space Launch System" },
      { label: "Crew Vehicle", value: "Orion spacecraft" },
      { label: "Lunar Gateway", value: "Orbital outpost planned" },
      { label: "Duration", value: "30+ day missions" },
    ],
    related: ["apollo-11", "perseverance", "james-webb"],
  },
];

export const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/pages/astronomy.webp", title: "Pillars of Creation", alt: "Pillars of Creation", category: "deep-space" },
  { src: "/earth/blue-marble.jpeg", title: "Earthrise", alt: "Earthrise viewed from lunar orbit", category: "earth" },
  { src: "/pages/mars.webp", title: "Mars Surface", alt: "Mars surface", category: "planets" },
  { src: "/earth/moon.jpeg", title: "Lunar Surface", alt: "Moon surface", category: "planets" },
  { src: "/earth/earth-night.webp", title: "Earth at Night", alt: "City lights visible from orbit", category: "earth" },
  { src: "/pages/earth.webp", title: "Earth and Moon", alt: "Earth and Moon from space", category: "earth" },
  { src: "/pages/gallery.webp", title: "Space Shuttle Launch", alt: "Space Shuttle launching into space", category: "missions" },
  { src: "/pages/history.webp", title: "Mission Control", alt: "NASA Mission Control Center", category: "missions" },
  { src: "/missions/voyager.webp", title: "Voyager Spacecraft", alt: "Voyager in deep space", category: "deep-space" },
];

export const GALLERY_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "deep-space", label: "Deep Space" },
  { id: "planets", label: "Planets" },
  { id: "earth", label: "Earth" },
  { id: "missions", label: "Missions" },
];

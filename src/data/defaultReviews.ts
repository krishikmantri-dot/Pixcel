import { GameReview } from '../types';

export const DEFAULT_PRESET_IMAGES = [
  {
    name: 'Red Dead Redemption 2',
    url: '/apps.58752.68182501197884443.ac728a87-7bc1-4a0d-8bc6-0712072da93c.jpg'
  },
  {
    name: 'Elden Ring: Erdtree',
    url: '/games/elden_ring.jpg'
  },
  {
    name: 'Cyberpunk 2077',
    url: '/games/cyberpunk.jpg'
  },
  {
    name: 'Ghost of Tsushima',
    url: '/games/ghost_of_tsushima.jpg'
  },
  {
    name: 'Hollow Knight',
    url: '/games/hollow_knight.jpg'
  },
  {
    name: 'God of War Ragnarök',
    url: '/games/god_of_war.jpg'
  },
  {
    name: 'Zelda: Tears of the Kingdom',
    url: '/games/zelda_totk.jpg'
  },
  {
    name: 'Forza Horizon 5',
    url: '/games/forza_horizon_5.jpg'
  }
];

export const INITIAL_BLOGS: GameReview[] = [
  {
    id: 'elden-ring-shadow-erdtree',
    title: 'Elden Ring: Shadow of the Erdtree',
    genre: 'Action RPG',
    rating: 9.8,
    image: '/games/elden_ring.jpg',
    summary: "FromSoftware has accomplished what few developers could dream of: matching and surpassing the monumental standard of the base game. Shadow of the Erdtree delivers fifty hours of breathless dark fantasy exploration across the Land of Shadow, uniting peerless vertical level architecture, eight inventive weapon classes, and unforgettable boss battles into a certified masterpiece.",
    fullReview: "FromSoftware has accomplished what few developers in gaming history could dream of: matching, and in many respects surpassing, the monumental standard established by the 2022 Game of the Year. Shadow of the Erdtree transports the Tarnished across the ethereal veil directly into the Land of Shadow—a densely layered continent that elevates vertical map architecture into high art.\n\nEvery winding ravine, subterranean catacomb, and ruined gothic citadel holds secrets that challenge even the most hardened Souls veterans. The expansion introduces eight versatile weapon categories, ranging from kinetic martial arts hand-to-hand brawling to razor-sharp reverse-grip blades, completely revitalizing buildcrafting and experimental loadouts.\n\nCrucially, the Scadutree Blessing progression system prevents over-leveled characters from steamrolling the campaign, forcing players to explore the world thoroughly to earn stat boosts before confronting towering demigods like Messmer the Impaler and the Divine Beast Dancing Lion. Coupled with an evocative, tragedy-laden narrative that fleshes out Miquella’s sacrifice and St. Trina’s sorrow, this release stands as an undeniable magnum opus of dark fantasy world-building, delivering sixty hours of peerless atmosphere and relentless mechanical challenge that redefine what a video game expansion can achieve.",
    date: 'Oct 12, 2024',
    author: 'Elena Rostova',
    platform: 'PC · PS5 · Xbox Series X',
    playtime: '52 hours logged',
    isFeatured: true,
    pros: [
      'Peerless vertical level architecture and hidden zones',
      'Eight versatile and inventive new weapon categories',
      'Memorable boss fights with unmatched cinematic scoring',
      'Breathtaking art direction that constantly rewards curiosity'
    ],
    cons: [
      'Punishing late-game difficulty spike for casual builds',
      'Frame pacing dips in complex particle-heavy arenas'
    ],
    breakdown: {
      gameplay: 9.9,
      graphics: 9.8,
      sound: 9.9,
      story: 9.6
    },
    comments: [
      {
        id: 'c1',
        author: 'MalikTheSunken',
        date: 'Oct 13, 2024',
        text: 'The Belurat Tower settlement had me lost in the best way possible. Truly peak level design.',
        likes: 14
      },
      {
        id: 'c2',
        author: 'Valkyrie99',
        date: 'Oct 14, 2024',
        text: 'Messmer was an incredible boss fight. Took 30 tries but so rewarding!',
        likes: 8
      }
    ]
  },
  {
    id: 'cyberpunk-phantom-liberty',
    title: 'Cyberpunk 2077: Phantom Liberty',
    genre: 'Sci-Fi RPG',
    rating: 9.5,
    image: '/games/cyberpunk.jpg',
    summary: "CD Projekt Red completes one of gaming's greatest redemption stories with Phantom Liberty and the comprehensive 2.0 system overhaul. Dogtown serves as a gritty espionage pressure cooker anchored by Idris Elba's magnetic performance, rebuilt skill trees, dynamic cyberware limits, and kinetic vehicular combat.",
    fullReview: "CD Projekt Red completes one of the greatest redemption arcs in modern entertainment history with Phantom Liberty and the comprehensive 2.0 system overhaul. Dogtown—a walled-off, sovereign combat zone ruled by the brutal warlord Kurt Hansen—serves as the pressure cooker for an intense spy-thriller campaign inspired by John le Carré and 80s dystopian techno-noirs.\n\nIdris Elba delivers an unforgettable, nuanced performance as veteran sleeper agent Solomon Reed, anchoring an intricate web of espionage where every moral choice carries visceral, heartbreaking consequences. Combined with Keanu Reeves’s increasingly empathetic Johnny Silverhand, the storytelling hits emotional highs unmatched by the base game.\n\nMechanically, the complete overhaul of perk trees, cyberware capacity limiters, vehicular gunplay, and aggressive police responses transforms Night City into a responsive, lethal playground. Melee dashes, air reflex redirections, and monowire hacks flow together with seamless kinetic elegance, while Dogtown’s dense architectural layers push contemporary ray tracing and path reconstruction technology to its absolute limits. Phantom Liberty is not merely an expansion; it is the definitive realization of what Cyberpunk 2077 was always destined to be, offering twenty-five hours of breathless espionage, razor-sharp dialogue, and phenomenal combat depth.",
    date: 'Oct 10, 2024',
    author: 'Marcus Vance',
    platform: 'PC · PS5 · Xbox Series X',
    playtime: '38 hours logged',
    pros: [
      'Genuinely gripping political espionage storyline',
      'Idris Elba and Keanu Reeves deliver knockout performances',
      'Complete perk overhaul makes cyberware buildcrafting deeply satisfying',
      'Dogtown is arguably the densest, most atmospheric urban district ever built'
    ],
    cons: [
      'Some vehicular combat controls feel slightly floaty',
      'Demands high-end hardware for maximum ray reconstruction'
    ],
    breakdown: {
      gameplay: 9.4,
      graphics: 9.9,
      sound: 9.6,
      story: 9.7
    },
    comments: [
      {
        id: 'c3',
        author: 'NetrunnerJax',
        date: 'Oct 11, 2024',
        text: 'The ending choice haunted me for days. One of the best expansion stories in RPG history.',
        likes: 19
      }
    ]
  },
  {
    id: 'ghost-of-tsushima',
    title: 'Ghost of Tsushima',
    genre: 'Action Adventure',
    rating: 9.2,
    image: '/games/ghost_of_tsushima.jpg',
    summary: "A sublime visual poem in motion and a cinematic love letter to classic Akira Kurosawa cinema. Ghost of Tsushima replaces traditional minimap markers with guiding winds, framing a moving story of samurai honor, lethal stance-based swordplay, and painterly Japanese landscapes.",
    fullReview: "Sucker Punch Productions crafted a breathtaking cinematic homage to classical Akira Kurosawa cinema that stands as a modern masterclass in open-world environmental design. Tsushima eschews intrusive minimaps and immersion-breaking UI compasses in favor of the Guiding Wind—a natural breeze that gently rustles bamboo stalks and golden pampas grass to point players toward their destination.\n\nThis ingenious diegetic interface keeps your eyes glued to the screen, where rolling hills, crimson maple groves, and stormy coastal cliffs evoke an interactive watercolor scroll. Beneath its painterly surface lies a lethal stance-based combat system that rewards rhythm, parry precision, and ruthless discipline. Switching between Stone, Water, Wind, and Moon stances mid-skirmish against Mongol warriors feels exhilarating, particularly during high-stakes one-on-one samurai duels under the falling cherry blossoms.\n\nJin Sakai’s tragic internal conflict between the strict honor code of his uncle Lord Shimura and the dishonorable, pragmatic ghost tactics required to rescue his homeland gives the campaign genuine emotional gravitas. Ghost of Tsushima is a sublime blend of visual poetry, razor-sharp swordplay, and poignant historical tragedy that commands complete attention from beginning to end.",
    date: 'Oct 08, 2024',
    author: 'Kenji Sato',
    platform: 'PC · PS5 · PS4',
    playtime: '45 hours logged',
    pros: [
      'Guiding wind mechanic creates uncluttered, cinematic immersion',
      'Stance-based swordplay is crisp, satisfying, and lethal',
      'Gorgeous atmospheric lighting and wind-swept particle effects',
      'Moving emotional arc exploring honor vs survival'
    ],
    cons: [
      'Side quest formats follow familiar open-world structures',
      'Camera occasionally struggles in tight indoor duels'
    ],
    breakdown: {
      gameplay: 9.1,
      graphics: 9.6,
      sound: 9.4,
      story: 9.0
    },
    comments: []
  },
  {
    id: 'hollow-knight',
    title: 'Hollow Knight',
    genre: 'Metroidvania',
    rating: 9.7,
    image: '/games/hollow_knight.jpg',
    summary: "Team Cherry's subterranean opus stands as the gold standard for the modern Metroidvania. Hallownest is a labyrinth of melancholic beauty, demanding platforming gauntlets, customizable charm builds, and Christopher Larkin's evocative orchestral score.",
    fullReview: "Team Cherry’s subterranean masterpiece remains the undisputed gold standard for the modern 2D Metroidvania genre. Hallownest is a melancholic, vast, and beautifully hand-drawn subterranean kingdom consumed by the mysterious orange Infection. Every interconnected zone—from the rainy stone spires of the City of Tears to the fungal tunnels and claustrophobic depths of Deepnest—radiates atmospheric brilliance and subtle environmental lore.\n\nThe responsive nail combat is masterfully tuned, delivering pixel-perfect jumping, wall-dashing, and nail-slashing physics that demand razor-sharp precision across demanding boss encounters and punishing platforming gauntlets like the White Palace. Players customize their playstyle through an ingenious charm system, experimenting with spell damage, nail reach, and healing speed to overcome fierce insect warriors.\n\nChristopher Larkin’s hauntingly orchestral soundtrack perfectly captures the ruined majesty of Hallownest, underscoring both delicate moments of quiet contemplation on forgotten benches and pulse-pounding battles against the Mantis Lords and the Radiance. Filled with deep secrets, hidden lore, and unmatched emotional depth, Hollow Knight is a triumphant achievement in independent game development that provides dozens of hours of pure, unadulterated exploration.",
    date: 'Oct 05, 2024',
    author: 'Siobhan Thorne',
    platform: 'PC · Switch · PS4 · Xbox One',
    playtime: '60 hours logged',
    pros: [
      'Colossal map filled with genuine surprises and shortcuts',
      'Christopher Larkin’s orchestral score is emotional perfection',
      'Razor-sharp jump and nail responsiveness',
      'Tremendous value with all included content packs'
    ],
    cons: [
      'Early navigation can be disorienting without the compass charm',
      'Corpse run punishment can feel harsh in late gauntlets'
    ],
    breakdown: {
      gameplay: 9.8,
      graphics: 9.6,
      sound: 9.9,
      story: 9.5
    },
    comments: [
      {
        id: 'c4',
        author: 'HornetFanatic',
        date: 'Oct 06, 2024',
        text: 'City of Tears music still gives me goosebumps every single playthrough.',
        likes: 27
      }
    ]
  },
  {
    id: 'red-dead-redemption-2',
    title: 'Red Dead Redemption 2',
    genre: 'Open World',
    rating: 10.0,
    image: '/apps.58752.68182501197884443.ac728a87-7bc1-4a0d-8bc6-0712072da93c.jpg',
    summary: "Rockstar Games crafted not merely an open-world adventure, but a living historical ecosystem operating under its own indifferent natural laws. Arthur Morgan's tragic, weary journey through the dying American frontier represents an all-time literary-grade triumph in gaming history.",
    fullReview: "Rockstar Games created not merely an open-world video game, but an astonishingly detailed, living historical ecosystem operating under its own indifferent natural laws. Set across the dying frontier of 1899 America, the game chronicles the slow, heartbreaking collapse of the Van der Linde gang through the eyes of Arthur Morgan—arguably the finest, most deeply realized protagonist in the entire history of digital storytelling.\n\nArthur’s journey from a loyal enforcer to a weary soul seeking redemption in the face of creeping industrial modernity carries the emotional weight of a monumental literary novel. The technological simulation density is staggering: dynamic weather systems roll realistically over snow-capped mountains, over two hundred individual animal species behave with biological accuracy, and stranger encounters evolve organically into memorable multi-part stories.\n\nFirefights possess a bone-crunching weight, while quiet campfire melodies and Daniel Lanois’s soulful musical compositions ground the tragedy in authentic Americana. Even six years after its original release, the staggering level of craftsmanship, voice acting, and emergent world simulation in Red Dead Redemption 2 remains completely unmatched in the interactive medium, standing as a generational 10/10 masterpiece.",
    date: 'Oct 01, 2024',
    author: 'Elena Rostova',
    platform: 'PC · PS4 · Xbox One',
    playtime: '120 hours logged',
    pros: [
      'Arthur Morgan is an all-time literary-grade gaming protagonist',
      'Unrivaled environmental physics and biological simulation',
      'Stirring soundtrack featuring D’Angelo and Daniel Lanois',
      'Dozens of emergent campfire and backcountry vignettes'
    ],
    cons: [
      'Deliberate, heavy movement mechanics take time to adjust to',
      'Mission structure during gunfights can be rigid'
    ],
    breakdown: {
      gameplay: 9.8,
      graphics: 10.0,
      sound: 10.0,
      story: 10.0
    },
    comments: [
      {
        id: 'c5',
        author: 'OutlawHeart',
        date: 'Oct 02, 2024',
        text: 'May I Stand Unshaken. Tears every time. A genuine 10/10 masterpiece.',
        likes: 35
      }
    ]
  },
  {
    id: 'valorant',
    title: 'Valorant',
    genre: 'Tactical Shooter',
    rating: 8.5,
    image: '/games/valorant.png',
    summary: "Riot Games combined surgical round-based gunplay with diverse character abilities to forge a premier competitive arena. Precise weapon recoil mastery, 128-tick server fidelity, and calculated agent utility coalesce into an esports staple that continually tests teamwork and mechanical skill.",
    fullReview: "Riot Games brilliantly combined the surgical, round-based tactical gunplay of Counter-Strike with the dynamic utility and character expression of modern hero shooters. Built from the ground up for esports purity, Valorant prioritizes high-tickrate servers, custom netcode, and aggressive anti-cheat systems to ensure that every gunfight is decided purely by mechanical discipline and strategic foresight.\n\nWeapons demand strict mastery of recoil patterns, counter-strafing, and precise crosshair placement, where a single well-aimed Vandal headshot instantly ends an opponent’s round. However, the game’s true genius lies in its diverse roster of Agents. Initiators, Duelists, Controllers, and Sentinels utilize distinctive tactical abilities—from blinding flashes and smoke curtains to recon arrows and healing spheres—to shape the geometry of the battlefield without overpowering core gunplay.\n\nTeam coordination, ultimate economy management, and clutch composure are non-negotiable at competitive ranks. With an ever-evolving seasonal meta, frequent balance adjustments, and a passionate global tournament circuit, Valorant has established itself as an essential pillar of contemporary PC competitive gaming that continuously challenges and rewards player dedication.",
    date: 'Sep 28, 2024',
    author: 'Derrick Wu',
    platform: 'PC · PS5 · Xbox Series X',
    playtime: '340 hours logged',
    pros: [
      'Crisp, responsive server tick rates and netcode',
      'Creative agent abilities complement rather than replace shooting',
      'High skill ceiling with rewarding ranked progression'
    ],
    cons: [
      'Can be unforgiving and toxic for solo queue newcomers',
      'Microtransaction skin bundle pricing remains steep'
    ],
    breakdown: {
      gameplay: 9.0,
      graphics: 8.2,
      sound: 8.8,
      story: 7.5
    },
    comments: []
  },
  {
    id: 'zelda-tears-of-kingdom',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    genre: 'Adventure',
    rating: 9.9,
    image: '/games/zelda_totk.jpg',
    summary: "An astonishing engineering feat that transforms Hyrule into a physics-driven playground. Link's Ultrahand, Fuse, and Ascend mechanics empower players to construct imaginative vehicles and conquer a vast three-tiered world stretching from the Sky Islands to the abyssal Depths.",
    fullReview: "Where many sequels would have simply expanded the familiar geography of Hyrule, Nintendo accomplished a miraculous engineering feat with Tears of the Kingdom. By introducing the Ultrahand, Fuse, and Ascend mechanics, the development team turned the physics-based world of Hyrule into an unprecedented creative sandbox running on humble Switch hardware.\n\nPlayers are no longer passive travelers; they are inventors crafting motorized hovercrafts, multi-stage missile batteries, catapults, and mechanized walkers to solve environmental puzzles and defeat enemy encampments. The world itself has tripled in vertical scope: you can sky-dive from mystical floating Sky Islands, glide across the sunlit surface of Hyrule, and plunge directly into the pitch-black, gloom-infested subterranean Depths spanning the entirety of the map.\n\nThe seamlessly connected three-tiered sandbox rewards player curiosity at every single step, with clever shrine puzzles that accommodate multiple completely unintended solutions. Backed by a poignant story revolving around Zelda’s noble sacrifice and the ancient Zonai civilization, Tears of the Kingdom is a triumph of playful engineering and boundless imagination that sets a towering new benchmark for open-world gaming.",
    date: 'Sep 25, 2024',
    author: 'Kenji Sato',
    platform: 'Nintendo Switch',
    playtime: '85 hours logged',
    pros: [
      'Physics and building system is an astonishing engineering miracle',
      'Three-tiered world map (Sky, Surface, Depths) rewards exploration',
      'Clever dungeon puzzles with multiple creative solutions',
      'Whimsical narrative honoring Zelda lore'
    ],
    cons: [
      'Switch hardware exhibits framerate chug in dense Ultrahand builds',
      'Menu management when fusing arrows can feel tedious'
    ],
    breakdown: {
      gameplay: 10.0,
      graphics: 9.2,
      sound: 9.8,
      story: 9.5
    },
    comments: []
  },
  {
    id: 'forza-horizon-5',
    title: 'Forza Horizon 5',
    genre: 'Racing',
    rating: 9.0,
    image: '/games/forza_horizon_5.jpg',
    summary: "Playground Games delivers a breathtaking celebration of automotive culture set in vibrant Mexico. Over seven hundred photorealistic cars, dynamic tropical weather systems, and sublime sim-cade driving physics make this the premier racing experience of the generation.",
    fullReview: "Playground Games delivers an exhilarating, accessible, and breathtakingly beautiful celebration of automotive culture that stands as the premier arcade racer of this generation. Set across an expansive and diverse recreation of Mexico, the map encompasses volcanic mountain peaks, sun-drenched Guanajuato colonial alleys, dense tropical rainforests, and expansive coastal sand dunes.\n\nPlayers can collect, customize, and push the limits of more than seven hundred painstakingly rendered vehicles, each modeled with microscopic exterior detail and authentic engine audio captured from real dyno tests. Driving physics strike the perfect sweet spot between high-speed accessibility and tactile feedback, making a drift around a jungle hairpin in an exotic hypercar feel just as thrilling as rock-crawling through a rugged canyon in an off-road buggy.\n\nThe dynamic weather system—highlighted by towering desert dust storms and blinding tropical rainstorms—adds intense atmospheric spectacle to festival circuit races. Complemented by extensive community EventLab custom creations, weekly seasonal playlists, and smooth performance, Forza Horizon 5 is an absolute dream for automotive enthusiasts and casual racers alike.",
    date: 'Sep 22, 2024',
    author: 'Marcus Vance',
    platform: 'PC · Xbox Series X/S · Xbox One',
    playtime: '50 hours logged',
    pros: [
      'Photorealistic vehicle models and dynamic weather lighting',
      'Overhauled engine audio recording sets a new standard',
      'Sublime driving physics strike the perfect sim-cade balance',
      'Huge variety of race types and community event labs'
    ],
    cons: [
      'Campaign progression can feel overwhelming and scattered',
      'Cringe-inducing radio DJ dialogue scripts'
    ],
    breakdown: {
      gameplay: 9.3,
      graphics: 9.8,
      sound: 9.7,
      story: 7.2
    },
    comments: []
  },
  {
    id: 'god-of-war-ragnarok',
    title: 'God of War Ragnarök',
    genre: 'Action',
    rating: 9.6,
    image: '/games/god_of_war.jpg',
    summary: "A mythic conclusion to the Norse saga uniting cinematic spectacle with profound character study. Visceral combat enhanced by the Draupnir Spear, Richard Schiff's magnetic Odin, and unbroken camera direction deliver an emotional blockbuster of the highest order.",
    fullReview: "Santa Monica Studio concludes the monumental Norse saga of Kratos and Atreus with jaw-dropping cinematic spectacle, mechanical refinement, and profound emotional resonance. Picking up several years after the 2018 reboot, the story explores the heavy burden of prophecy and the fragility of family as Fimbulwinter freezes Midgard and the apocalypse looms.\n\nChristopher Judge’s growling, nuanced performance as an aging Spartan learning to trust his son pairs brilliantly with Sunny Suljic’s Atreus and Richard Schiff’s captivating, Machiavellian portrayal of the Allfather Odin. Combat expands significantly beyond the Leviathan Axe and Blades of Chaos with the introduction of the Draupnir Spear, which introduces explosive remote detonations, vertical aerial launchers, and rapid elemental combos.\n\nBoss encounters reach breathtaking heights of mythological drama, presented seamlessly through the studio’s signature uninterrupted single-shot camera technique that never cuts away for a loading screen or cutscene. Packed with rich side quests throughout the Nine Realms, deep combat skill trees, and market-leading accessibility settings, Ragnarök is a triumphant blockbuster masterpiece that honors its storied legacy with heart and fury.",
    date: 'Sep 18, 2024',
    author: 'Elena Rostova',
    platform: 'PC · PS5 · PS4',
    playtime: '42 hours logged',
    pros: [
      'Visceral combat with the addition of the brilliant Draupnir Spear',
      'Profound father-son writing with Richard Schiff shining as Odin',
      'Staggering boss spectacle and one-shot continuous camera technique',
      'Rich accessibility settings setting the gold standard'
    ],
    cons: [
      'Pacing slows during some mid-game realm exploration',
      'Companion hints during puzzles trigger a bit too quickly'
    ],
    breakdown: {
      gameplay: 9.6,
      graphics: 9.8,
      sound: 9.7,
      story: 9.5
    },
    comments: []
  },
  {
    id: 'stardew-valley',
    title: 'Stardew Valley',
    genre: 'Simulation',
    rating: 9.4,
    image: '/games/stardew_valley.jpg',
    summary: "ConcernedApe's solo-developed pastoral masterpiece remains the pinnacle of cozy farming life. Transforming an overgrown family homestead hooks players with an intoxicating daily loop of seasonal agriculture, mining exploration, fishing, and genuine community friendships.",
    fullReview: "Created entirely by sole developer Eric 'ConcernedApe' Barone, Stardew Valley is a pastoral masterpiece that redefines the cozy farming and community simulation genre with staggering depth and sincerity. Inheriting your grandfather's overgrown, weed-choked plot of land in Pelican Town is just the humble beginning of an intoxicating, therapeutic daily gameplay loop.\n\nWhether clearing fields, planting seasonal parsnips, optimizing greenhouse sprinkler layouts, tending to livestock, or descending into the monster-infested depths of the Skull Cavern, the game continuously rewards curiosity and patient planning. Beyond the agricultural mechanics lies a vibrant, living town filled with complex villagers whose personal stories, struggles, and friendship events unfold through charming seasonal festivals.\n\nWith decade-long free updates culminating in the monumental 1.6 expansion—which added winter outfits, new farm layouts, fresh mastery trees, and expanded multiplayer support—Stardew Valley offers an endless sanctuary of tranquility and accomplishment. It is an extraordinary testament to indie artistry, providing hundreds of hours of therapeutic joy, cozy warmth, and heartfelt connection that remains as captivating today as when it first launched.",
    date: 'Sep 15, 2024',
    author: 'Siobhan Thorne',
    platform: 'PC · Switch · PS4 · Xbox · iOS · Android',
    playtime: '180 hours logged',
    pros: [
      'Unmatched coziness and rewarding gameplay loop',
      'Charming pixel art animation and lovely soundtrack',
      'Decade-long developer dedication with immense free updates',
      'Multiplayer co-op farming adds infinite fun with friends'
    ],
    cons: [
      'Fishing minigame initial learning curve can frustrate newcomers',
      'Day/night clock can cause mild anxiety for completionists'
    ],
    breakdown: {
      gameplay: 9.7,
      graphics: 9.0,
      sound: 9.5,
      story: 9.1
    },
    comments: []
  }
];

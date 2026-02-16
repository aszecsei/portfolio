export interface IProject {
  name: string
  summary: string
  description: string[]
  date: string
  tags?: string[]
  tasks?: string[]

  thumbnail_img_path: string
  img_path: string
  gif_path?: string

  link: string
  github?: string
  itch?: string
  youtube?: string

  url: string

  type: string
  software: string
  language: string
  role: string
}

export const Zephyr: IProject = {
  name: 'Odyssey of the Zephyr',
  summary:
    'an RPG in which your goal is to bring happiness to each car on a train',
  description: [
    '<em>Odyssey of the Zephyr</em> is an RPG in which your goal is to bring happiness to each car along a train.',
    'This game was developed during Train Jam 2018, on the 3-day train ride from Chicago, IL to San Francisco, CA.',
  ],
  type: 'Game Jam',
  software: 'Unreal Engine 4',
  language: 'Blueprints',
  role: 'Gameplay Programmer, Composer',
  thumbnail_img_path: 'odyssey.gif',
  img_path: 'odyssey.png',
  date: 'March 2018',
  link: 'https://joat.itch.io/odyssey-of-the-zephyr',
  itch: 'https://itch.io/embed/235921?bg_color=ffffff&amp;fg_color=222222&amp;border_color=bebebe',
  tags: ['Blueprints', 'Unreal Engine 4', 'Train Jam'],
  tasks: [
    'Created quest items to be completed',
    'Created custom triggers for NPC characters',
    'Implemented dynamically disappearing cut-outs of train cars',
  ],
  url: 'zephyr',
}

export const BugHunters: IProject = {
  name: 'BugHunters 2',
  summary: 'a VR experience in which you pilot a spaceship',
  description: [
    '<em>BugHunters 2</em> is the sequel to the wildly-popular (yet never-released) game <em>BugHunters</em>.',
    "This game was developed as part of the University of Iowa's course in virtual reality development.",
  ],
  type: 'University Project',
  software: 'Unity',
  language: 'C#',
  role: 'Gameplay Programmer',
  thumbnail_img_path: 'icon_bughunters.png',
  img_path: 'bughunters.png',
  date: 'February 2018',
  link: 'https://github.com/hekemp/BugHunters2',
  github: 'hekemp/BugHunters2',
  tags: ['C#', 'Unity', 'VR'],
  tasks: [
    'Implemented motion controls, movement system, and bullet pooling',
    'Worked closely with 3D assets to implement realistic physics constraints',
    'Extended several components in the SteamVR interaction system',
  ],
  url: 'bughunters2',
}

export const TonyBirb: IProject = {
  name: 'Tony Birb: Pro Sk8er 2003',
  summary:
    "an infinite runner in which you're a birb who's shaped like a friend",
  description: [
    '<em>Tony Birb Pro Sk8er 2003</em> is an infinite runner in which you play as the legendary Tony Birb, sliding down twigs.',
    "Inspired by a GIF of a bird sliding down a rail, this game was created with <a href='https://hekemp.github.io/' target='_blank' rel='noopener noreferrer'>Heather Kemp</a> for the Fall EPX Jam at the University of Iowa.",
  ],
  type: 'Game Jam',
  software: 'Unity',
  language: 'C#',
  role: 'Technical Artist, Character Artist',
  thumbnail_img_path: 'icon_tonybirb.png',
  img_path: 'tonybirb.jpg',
  gif_path: 'birb.gif',
  date: 'October 2017',
  link: '/games/tonybirb/',
  tags: ['C#', 'Unity', 'EPX Jam'],
  tasks: [
    'Created 3D model, textures, and animations',
    'Programmed particle effects to react to whether or not the player is on a twig',
  ],
  url: 'tonybirb',
}

export const InternetOfFollowers: IProject = {
  name: 'Internet of Followers',
  summary: 'a VR experience in which you fly through your Twitter network',
  description: [
    '<em>Internet of Followers</em> is an innovative VR experience which enables users to delve through the wide-reaching space of Twitter networks. Users are able to walk firsthand through their network of Twitter followers and watch clusters form from different communities of users all following each other.',
    "It was created for the <a href='https://bigdata.uiowa.edu/' target='_blank' rel='noopener noreferrer'>Midwest Big Data Hackathon</a> and took first place.",
  ],
  type: 'Hackathon',
  software: 'Unity',
  language: 'C#',
  role: 'Gameplay Programmer',
  thumbnail_img_path: 'icon_iof.jpg',
  img_path: 'iof.jpg',
  date: 'September 2017',
  link: 'https://devpost.com/software/internet-of-followers-iof',
  github: 'joshua-friede/Internet-of-Followers',
  tags: ['C#', 'Unity', 'Data Visualization', 'VR'],
  tasks: [
    'Programmed 6DOF movement system',
    'Implemented spring-based 3D node placement algorithm',
  ],
  url: 'internet-of-followers',
}

export const BeeDodger: IProject = {
  name: 'Bee Dodger',
  summary: 'a dodge-em-up in which you avoid bees',
  description: [
    '<em>Bee Dodger</em> is a dodge-em-up inspired by a GIF of Oprah releasing bees onto an unsuspecting crowd. It was written entirely in JavaScript and uses no external code, aside from HTML5/Canvas for rendering.',
  ],
  type: 'Personal',
  software: 'Aseprite',
  language: 'JavaScript',
  role: 'Gameplay Design/Coding, Composer',
  thumbnail_img_path: 'icon_beedodger.png',
  img_path: 'beedodger.png',
  gif_path: 'bees.gif',
  date: 'January 2017',
  link: '/games/beedodger/',
  github: 'aszecsei/game-jan17',
  tags: ['JavaScript', 'HTML5/Canvas'],
  tasks: [
    'Designed 2D game engine using HTML5/Canvas and pure JavaScript',
    'Implemented animation system, various enemies, and scoring mechanics',
    'Created various menus, including a pause menu',
  ],
  url: 'bee-dodger',
}

export const NeonValhalla: IProject = {
  name: 'Highway To A Neon Valhalla',
  summary: 'a racing game in which the objective is unknown to either player',
  description: [
    "<em>Highway To A Neon Valhalla</em> is a local multiplayer racing game in which players attempt to obtain different pickups, which have colors assigned at random: one increases a player's score; one, when enough have been picked up, ends the game; the third does nothing.",
    'This game was developed during Train Jam 2017, on the 3-day train ride from Chicago, IL to San Francisco, CA. It requires two controllers.',
  ],
  type: 'Game Jam',
  software: 'Unity',
  language: 'C#',
  role: 'Gameplay Programmer, 3D Artist, Composer',
  thumbnail_img_path: 'icon_neonvalhalla.png',
  img_path: 'neonvalhalla.png',
  itch: 'https://itch.io/embed/122937?bg_color=ffffff&amp;fg_color=222222&amp;border_color=bebebe',
  date: 'March 2017',
  link: 'https://aszecsei.itch.io/neon-valhalla/',
  tags: ['C#', 'Unity', 'Train Jam'],
  tasks: [
    'Created 3D models, music, and sound effects',
    'Programmed infinite road and terrain generation',
  ],
  url: 'neon-valhalla',
}

export const TrainFiller: IProject = {
  name: 'Train Filler',
  summary: 'a twin-stick shooter with a Splatoon-inspired scoring mechanic',
  description: [
    "<em>Train Filler</em> is a local competitive multiplayer game where you spray people out of a hose to try and fill a train car more than your opponent. It also features my Unity package for <a href='https://github.com/aszecsei/2D-Volumetric-Lighting' target='_blank' rel='noopener noreferrer'>2D volumetric lighting</a>.",
    'This game was developed during Train Jam 2016, on the 3-day train ride from Chicago, IL to San Francisco, CA. It requires two players each using controllers.',
  ],
  type: 'Game Jam',
  software: 'Unity',
  language: 'C#',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_trainfiller.png',
  img_path: 'trainfiller.png',
  itch: 'https://itch.io/embed/57569?bg_color=ffffff&amp;fg_color=222222&amp;border_color=bebebe',
  date: 'March 2016',
  link: 'https://aszecsei.itch.io/train-filler/',
  tags: ['C#', 'Unity', 'Train Jam'],
  tasks: [
    'Programmed ragdoll physics for 2D stick figures and hose physics for player controllers',
    'Implemented twin-stick shooting character controller',
  ],
  url: 'train-filler',
}

export const Gravity: IProject = {
  name: 'Gravity',
  summary: 'a platformer in which you change the direction of gravity',
  description: [
    '<em>Gravity</em> is a platformer written entirely in JavaScript. It features a built-in level editor, which can be used to export JSON representations of levels for ease of development.',
  ],
  type: 'Personal',
  software: 'N/A',
  language: 'JavaScript',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_gravity.png',
  img_path: 'gravity.png',
  date: 'February 2015',
  link: '/games/gravity/',
  tags: ['JavaScript', 'HTML5/Canvas'],
  tasks: [
    'Programmed game, menus, & level editor which serializes to JSON',
    'Designed 15 levels using level editor',
  ],
  url: 'gravity',
}

export const OnTheTracks: IProject = {
  name: 'On The Tracks',
  summary: 'a local multiplayer game of chicken',
  description: [
    '<em>On The Tracks</em> is a local multiplayer game of chicken: two rectangles make their way along a set of railroad tracks, towards the center of the screen. Their only obstacle is a relentless train that arrives out of nowhere, crushing those who stand in its path. Jumping allows them to hang in the air until the train passes underneath them, but stops their motion towards the center of the screen until the train has passed and they fall back down to the tracks.',
    'This game was developed during Train Jam 2015, on the 3-day train ride from Chicago, IL to San Francisco, CA. Some bugs have been fixed, and audio added since then. It requires the players to share a keyboard and use the left and right control keys.',
  ],
  type: 'Game Jam',
  software: 'Unity',
  language: 'C#',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_ott.png',
  img_path: 'onthetracks.jpg',
  itch: 'https://itch.io/embed/20009?bg_color=ffffff&amp;fg_color=222222&amp;border_color=bebebe',
  date: 'March 2015',
  link: 'https://aszecsei.itch.io/on-the-tracks',
  tags: ['C#', 'Unity', 'Train Jam'],
  tasks: [
    'Programmed game and menus',
    'Implemented blood trail effect using particles',
  ],
  url: 'on-the-tracks',
}

export const Untitled: IProject = {
  name: 'Untitled',
  summary: 'a first-person narrative vignette',
  description: [
    "<em>Untitled</em> is a first-person game created for <a href='https://gamejolt.com/tag/clonejamnuprahtor' target='_blank' rel='noopener noreferrer'>#clonejamnuprahtor</a>.",
  ],
  type: 'Game Jam',
  software: 'Unreal Engine 4',
  language: 'C++/Blueprints',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_untitled.jpg',
  img_path: 'untitled.jpg',
  date: 'April 2015',
  link: 'https://gamejolt.com/games/untitled/62765/',
  tags: ['C++', 'Unreal Engine 4'],
  tasks: [
    'Programmed game and triggers for narrative presentation',
    'Developed visual style using post-processing shaders',
  ],
  url: 'untitled',
}

export const Rover: IProject = {
  name: 'Rover',
  summary: 'a driving game with CRT-style visual effects',
  description: [
    '<em>Rover</em> is a game where the player remotely drives around an alien landscape, trying to collect 6 resources without overturning their vehicle.',
    "This game was developed for <a href='https://ludumdare.com/compo/2014/12/03/welcome-to-ludum-dare-31/' target='_blank' rel='noopener noreferrer'>Ludum Dare 31</a>, and can be downloaded <a href='https://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=15297' target='_blank' rel='noopener noreferrer'>here</a>.",
  ],
  type: 'Game Jam',
  software: 'Unreal Engine 4',
  language: 'C++/Blueprints',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_rover.png',
  img_path: 'rover.jpg',
  date: 'December 2014',
  link: 'https://ludumdare.com/compo/ludum-dare-31/?action=preview&uid=15297',
  tags: ['C++', 'Unreal Engine 4', 'Ludum Dare'],
  tasks: [
    'Implemented visual effects using post-processing shaders',
    'Programmed UI for displaying distance to the closest pick-up',
  ],
  url: 'rover',
}

export const ChessPlus: IProject = {
  name: 'Chess Plus',
  summary: 'a roguelike chess game',
  description: [
    '<em>Chess+</em> is a roguelike chess match where you control a King and Queen who can move across a procedurally-generated dungeon board according to standard rules of chess movement. Things get somewhat trickier when capturing pieces with your King changes their allegiance.',
    "This game was created for the <a href='https://7drl.org' target='_blank' rel='noopener noreferrer'>7-Day Roguelike Challenge</a>.",
  ],
  type: 'Game Jam',
  software: 'Unity',
  language: 'C#',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_chessplus.png',
  img_path: 'chessplus.png',
  itch: 'https://itch.io/embed/20499?bg_color=ffffff&amp;fg_color=222222&amp;border_color=bebebe',
  date: 'March 2015',
  link: 'https://aszecsei.itch.io/chess-plus',
  tags: ['C#', 'Unity', '7DRL'],
  tasks: [
    'Programmed chess movement, AI, and UI for displaying legal chess moves',
    'Developed algorithm to procedurally generate more difficult levels by using chess scoring rules',
  ],
  url: 'chess-plus',
}

export const DancingRobots: IProject = {
  name: 'Dancing Robots',
  summary: 'an interdisciplinary, project-based course',
  description: [
    'The Department of Computer Science at the University of Iowa designed a new interdisciplinary, project-based course in collaboration with the Department of Dance in which students designed and implemented a 45-minute dance recital performed by autonomous humanoid robots.',
    "I created <a href='https://www.youtube.com/watch?v=rTpt6K-Lmf4' target='_blank' rel='noopener noreferrer'>a dance routine</a> for this performance, and continued to work with the robots through the University to create several theatrical skits, as well as to do outreach to encourage children to continue STEM education.",
  ],
  type: 'University Project',
  software: 'Choregraphe',
  language: 'Python',
  role: 'Animator, Choreographer, Programmer',
  thumbnail_img_path: 'icon_robots.jpg',
  img_path: 'robots.jpg',
  date: 'December 2014',
  link: 'https://cs.uiowa.edu/resources/ui-cs-performing-robots',
  youtube: 'n2CMJaNdBaI',
  tags: ['Python', 'NAO Robots'],
  tasks: [
    'Developed and programmed a 5-minute dance routine for 4 Nao robots',
    'Created a Python script that was used by other students to have robots sync up by sending messages over a local network',
    "Assisted in the programming of other students' dance routines",
  ],
  url: 'dancing-robots',
}

export const Dexterity: IProject = {
  name: 'dexterity.io',
  summary: 'an agile management web application',
  description: [
    "<em>dexterity.io</em> is an agile management tool created in a software engineering course. It's designed to combine several aspects of project management, including issue tracking and scrum meeting tools.",
    'I worked on a team of 5 students to create this site; my focus was on unit testing and front-end development.',
  ],
  type: 'University Project',
  software: 'Visual Studio Code',
  language: 'Ruby',
  role: 'Front-End Developer',
  thumbnail_img_path: 'icon_dexterity.png',
  img_path: 'dexterity.png',
  date: 'October 2017',
  link: 'https://dexterity-io.herokuapp.com',
  github: 'aszecsei/dexterity.io',
  tags: ['Ruby', 'Web Dev', 'Project Management'],
  tasks: [
    'Led team of students using agile methodologies',
    'Developed issue activity log, burndown charts, and issue creation UI',
    'Customized resort gem to work with Ruby 5',
  ],
  url: 'dexterity-io',
}

export const TraumaHawk: IProject = {
  name: 'TraumaHawk',
  summary: 'a mobile app for first responders',
  description: [
    '<em>TraumaHawk</em> is an app developed in collaboration with the University of Iowa National Advanced Driving Simulator and the Iowa Department of Transportation to help reduce casualties from vehicular accidents.',
    'I developed a web service to store and display crash reports from a corresponding iOS application. Preliminary results showed that when TraumaHawk was not used to communicate, doctors had about 12 minutes of lead-time to prepare for a crash victim. But, when TraumaHawk was used, that lead time was more than doubled, providing doctors with patient details and photos an average of 26 minutes before a crash victim arrived.',
  ],
  type: 'Research Project',
  software: 'Visual Studio Code, Flutter, NodeJS',
  language: 'JavaScript, Dart',
  role: 'Gameplay Design/Coding',
  thumbnail_img_path: 'icon_traumahawk.jpg',
  img_path: 'traumahawk.jpg',
  date: 'November 2016',
  link: 'https://www.usatoday.com/story/tech/2015/02/16/app-lets-hospital-see-accident-scenes-better-prepare/23505279/',
  youtube: 'O1WCoJdTQ8I',
  tags: ['Flutter', 'Mobile Dev', 'JavaScript', 'Web Dev'],
  tasks: [
    'Adapted existing iOS app to use Flutter, using Redux for state management',
    'Developed secured API and web front-end for hospitals to use when viewing crash reports',
  ],
  url: 'traumahawk',
}

export const ElectricIrc: IProject = {
  name: 'Electric IRC',
  summary: 'a modern, user-friendly IRC client',
  description: [
    '<em>Electric IRC</em> is an IRC client built using Electron and React.',
  ],
  type: 'University Project',
  software: 'Visual Studio Code, NodeJS, Electron',
  language: 'TypeScript',
  role: 'Front-End Developer',
  thumbnail_img_path: 'icon_electric.png',
  img_path: 'electric.png',
  github: 'aszecsei/electric-irc',
  date: 'January 2018',
  link: 'https://github.com/aszecsei/electric-irc',
  tags: ['JavaScript', 'Electron', 'TypeScript', 'React'],
  tasks: [
    'Refactored application to use Redux data store, and led team research into Redux',
    'Led development of IRC calls using redux-saga',
  ],
  url: 'electric-irc',
}

export const HoloScribe: IProject = {
  name: 'HoloScribe',
  summary: 'a tool for real-time transcription and translation',
  description: [
    '<em>HoloScribe</em> is an application developed for the HoloLens that enables users to transcribe and translate text they see. Supported language targets include English, French, Spanish, and German. Users can activate the transcription and translation through the use of voice commands.',
    "This application was developed for the University of Iowa's HACKUIOWA event.",
  ],
  type: 'Hackathon',
  software: 'Unity, NodeJS',
  language: 'C#, JavaScript',
  role: 'HoloLens Programer',
  thumbnail_img_path: 'icon_holoscribe.png',
  img_path: 'HoloScribe_Demo2.png',
  github: 'aszecsei/HoloSwaggins',
  date: 'October 2018',
  link: 'https://github.com/aszecsei/HoloSwaggins',
  tags: ['JavaScript', 'Unity', 'HoloLens', 'C#', 'Google Cloud Platform'],
  tasks: [
    'Led development of HoloLens application in parallel to web API development',
    'Integrated voice recognition and camera code using HoloLens APIs',
  ],
  url: 'holoscribe',
}

export const games = [
  Zephyr,
  BugHunters,
  TonyBirb,
  BeeDodger,
  NeonValhalla,
  TrainFiller,
  Gravity,
  OnTheTracks,
  Untitled,
  Rover,
  ChessPlus,
]

export const otherProjects = [
  DancingRobots,
  Dexterity,
  TraumaHawk,
  ElectricIrc,
  InternetOfFollowers,
  HoloScribe,
]

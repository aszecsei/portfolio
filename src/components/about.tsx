import { faReact } from '@fortawesome/free-brands-svg-icons'
import {
  faDesktop,
  faGamepad,
  faRobot,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as styles from './about.css'
import { H2, Text } from './typography'

const skills = [
  {
    title: 'Games',
    icon: faGamepad,
    text: 'Unity, Unreal Engine 4, and XNA/MonoGame, across several game jams and VR projects.',
  },
  {
    title: 'Web',
    icon: faReact,
    text: 'React and Redux in TypeScript, with build tooling from gulp and webpack to Next.js.',
  },
  {
    title: 'Machine learning',
    icon: faRobot,
    text: 'A custom extreme learning machine solution, plus TensorFlow and scikit-learn.',
  },
  {
    title: 'Other software',
    icon: faDesktop,
    text: 'Docker, continuous integration and deployment, and native apps with Electron.',
  },
]

export const About = () => (
  <div className={styles.layout}>
    <div className={styles.bio}>
      <H2 className={styles.heading}>About</H2>
      <Text>
        I'm Alic Szecsei, a software engineer and game developer. I received my
        Master's degree in computer science from the University of Iowa, and am
        currently working at Amazon.
      </Text>
      <Text>
        I've been programming since I was 12, making simple rock-paper-scissors
        games in C, then writing equally-simple encryption algorithms on my
        TI-89 graphing calculator.
      </Text>
      <Text>
        I spent six years working at Microsoft on the Azure Storage team, designing
        a bespoke tag-based configuration schema to manage feature rollouts across
        hundreds of datacenters and prototyping a platform-independent driver rewrite
        from C++ to Rust.
      </Text>
      <Text>
        I'm interested in game programming and graphics programming; merging art
        and computer science in bold ways, alongside interdisciplinary teams
        passionate about what they do. I'm thrilled by the opportunity to solve
        a problem and have a working piece of software to show off at the end.
      </Text>
    </div>
    <ul className={styles.skills} aria-label="Skills">
      {skills.map((skill) => (
        <li key={skill.title} className={styles.skill}>
          <span className={styles.skillIcon} aria-hidden="true">
            <FontAwesomeIcon icon={skill.icon} />
          </span>
          <h3 className={styles.skillTitle}>{skill.title}</h3>
          <Text className={styles.skillText}>{skill.text}</Text>
        </li>
      ))}
    </ul>
  </div>
)

import { Container } from './container'
import { Emoji } from './emoji'
import * as styles from './footer.css'
import { Text } from './typography'

export const Footer = () => (
  <footer className={styles.foot}>
    <Container>
      <Text alignment="center" className={styles.line}>
        Copyright <Emoji symbol="©️" /> Alic Szecsei 2016–
        {new Date().getFullYear()}.
      </Text>
      <Text alignment="center" className={styles.line}>
        Made with <Emoji label="love" symbol="❤️" /> using React and more.
      </Text>
    </Container>
  </footer>
)

import { Container } from './container'
import { Emoji } from './emoji'
import * as styles from './footer.css'
import { Text } from './typography'

export const Footer = () => (
  <footer className={styles.foot}>
    <Container>
      <Text alignment="center">
        Copyright <Emoji symbol="©️" /> Alic Szecsei 2016–
        {new Date().getFullYear()}.
      </Text>
      <Text alignment="center">
        Made with <Emoji label="love" symbol="❤️" /> using React and more.
      </Text>
    </Container>
  </footer>
)

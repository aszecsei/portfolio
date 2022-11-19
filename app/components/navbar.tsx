import * as React from 'react'
import { animateScroll, scroller } from 'react-scroll'
import styled, { css } from 'styled-components'
import { Container } from './container'
import { vars } from './style-variables'
import { BaseHeader, generateHeaderSize } from './typography'
import { media } from './utils'
import Link from 'next/link'

const Navbar = styled.nav`
  text-transform: uppercase;
  border: none;

  background: rgba(0, 0, 0, 0.8);

  position: fixed;
  right: 0;
  left: 0;
  z-index: 1030;

  display: block;

  ${media.desktop`
    padding-top: 15px;
    padding-bottom: 15px;
    transition: padding-top .3s, padding-bottom .3s;
    background: rgba(0, 0, 0, 0.7);
  `};
`

const NavbarBrand = styled.div`
  ${BaseHeader};
  ${generateHeaderSize(4)};
  color: ${vars.white};

  align-items: center;
  display: flex;
  flex-shrink: 0;
  padding: 0.3125em;
  white-space: nowrap;
  outline: none;
  text-decoration: none;
`

interface INavbarCollapseProps {
  isActive?: boolean
}

const NavbarCollapse = styled.div<INavbarCollapseProps>`
  display: flex;
  flex-basis: auto;
  flex-grow: 1;
  align-items: center;

  ${media.until('desktop')`
    display: block;
    ${(props: INavbarCollapseProps) =>
      props.isActive
        ? css`
            display: block;
          `
        : css`
            display: none;
          `};
    clear: both;
    width: 100%;
  `}
`

const NavbarNav = styled.ul`
  letter-spacing: 1px;
  flex-direction: row;
  margin-left: auto;
  display: flex;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
  margin-top: 0;
  padding-right: 1em;
  ${media.until('desktop')`
    flex-direction: column;
  `}
`

const NavItem = styled.li`
  display: list-item;
  user-select: none;
`

const NavLink = styled.a`
  ${BaseHeader};
  ${generateHeaderSize(5)};
  ${/* sc-selector */ NavbarBrand} > & {
    ${generateHeaderSize(4)};
  }
  color: ${vars.white};
  display: block;
  padding-left: 1.25rem;
  outline: none;
  transition: all 0.3s ease-in-out;
  text-decoration: none;

  &:hover {
    color: ${vars.primary()};
    cursor: pointer;
  }

  ${media.until('desktop')`
    padding-top: .5em;
    padding-bottom: .5em;
    padding-left: 2em;
  `}
`

const NavbarContainer = styled(Container)`
  ${media.until('desktop')`
    display: block;
    align-items: stretch;
  `}
  flex-direction: row;
`

interface IHamburgerDivProps {
  dimensions: number
}

const HamburgerDiv = styled.div<IHamburgerDivProps>`
  margin-left: auto;
  cursor: pointer;
  color: white;
  height: ${(props: IHamburgerDivProps) => props.dimensions}px;
  position: relative;
  width: ${(props: IHamburgerDivProps) => props.dimensions}px;
  display: block;
  &:hover {
    background-color: rgba(black, 0.05);
  }
  ${media.desktop`
    display:none;
  `}
`

interface IHamburgerSpanProps {
  isActive?: boolean
}

const HamburgerSpan = styled.span<IHamburgerSpanProps>`
  background-color: currentColor;
  display: block;
  height: 1px;
  left: calc(50% - 8px);
  position: absolute;
  transform-origin: center;
  transition-duration: 86ms;
  transition-property: background-color, opacity, transform;
  transition-timing-function: ease-in-out;
  width: 16px;
  &:nth-child(1) {
    top: calc(50% - 6px);
    ${(props: IHamburgerSpanProps) =>
      props.isActive
        ? css`
            transform: translateY(5px) rotate(45deg);
          `
        : false};
  }
  &:nth-child(2) {
    top: calc(50% - 1px);
    ${(props: IHamburgerSpanProps) =>
      props.isActive
        ? css`
            opacity: 0;
          `
        : false};
  }
  &:nth-child(3) {
    top: calc(50% + 4px);
    ${(props: IHamburgerSpanProps) =>
      props.isActive
        ? css`
            transform: translateY(-5px) rotate(-45deg);
          `
        : false};
  }
`

interface IHamburgerProps {
  dimensions: number
  isActive?: boolean
  onClick?: () => void
}

const Hamburger = (props: IHamburgerProps) => (
  <HamburgerDiv dimensions={props.dimensions} onClick={props.onClick}>
    <HamburgerSpan isActive={props.isActive} />
    <HamburgerSpan isActive={props.isActive} />
    <HamburgerSpan isActive={props.isActive} />
  </HamburgerDiv>
)

interface INavProps {
  shouldUseScroll?: boolean
}

interface INavState {
  isActive: boolean
}

class Nav extends React.Component<INavProps, INavState> {
  constructor(props: INavProps) {
    super(props)
    this.state = {
      isActive: false,
    }
  }

  public render() {
    return (
      <Navbar>
        <NavbarContainer>
          <NavbarBrand>
            <Link href="/" passHref legacyBehavior>
              <NavLink
                onClick={
                  this.props.shouldUseScroll ? this.scrollToTop : undefined
                }
              >
                Alic Szecsei
              </NavLink>
            </Link>
            <Hamburger
              dimensions={44}
              isActive={this.state.isActive}
              onClick={this.onClickHamburger}
            />
          </NavbarBrand>

          <NavbarCollapse isActive={this.state.isActive}>
            <NavbarNav>
              <NavItem>
                <Link href="/#about" passHref legacyBehavior>
                  <NavLink
                    onClick={
                      this.props.shouldUseScroll ? this.scrollToAbout : undefined
                    }
                  >
                    About
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/#games" passHref legacyBehavior>
                  <NavLink
                    onClick={
                      this.props.shouldUseScroll ? this.scrollToGames : undefined
                    }
                  >
                    Games
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/#software" passHref legacyBehavior>
                  <NavLink
                    onClick={
                      this.props.shouldUseScroll
                        ? this.scrollToSoftware
                        : undefined
                    }
                  >
                    Software
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <Link href="/#contact" passHref legacyBehavior>
                  <NavLink
                    onClick={
                      this.props.shouldUseScroll
                        ? this.scrollToContact
                        : undefined
                    }
                  >
                    Contact
                  </NavLink>
                </Link>
              </NavItem>
              <NavItem>
                <NavLink
                  href="/static/Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="http://blog.alic-szecsei.com">Blog</NavLink>
              </NavItem>
            </NavbarNav>
          </NavbarCollapse>
        </NavbarContainer>
      </Navbar>
    )
  }

  private onClickHamburger = () => {
    this.setState({
      isActive: !this.state.isActive,
    })
  }

  private scrollToTop = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    animateScroll.scrollToTop({
      smooth: true,
    })
    return false
  }

  private scrollToAbout = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scroller.scrollTo('about', {
      smooth: true,
      isDynamic: true,
    })
  }

  private scrollToGames = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scroller.scrollTo('games', {
      smooth: true,
      isDynamic: true,
    })
  }

  private scrollToSoftware = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scroller.scrollTo('software', {
      smooth: true,
      isDynamic: true,
    })
  }

  private scrollToContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scroller.scrollTo('contact', {
      smooth: true,
      isDynamic: true,
    })
  }
}

// const Nav = () => (
//
// );

export default Nav

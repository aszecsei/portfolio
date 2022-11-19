import Link from 'next/link'
import * as React from 'react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import LazyLoad from 'react-lazyload'
import styled from 'styled-components'

import { Chip, Chips } from './chip'
import { Icon } from './icon'
import { Image } from './image'
import { H5, H6, Text } from './typography'

import { IProject } from '../models/project'
import { vars } from './style-variables'
import { media } from './utils'

const Card = styled.div`
  padding: 2em;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.18);
  border: 1px solid ${vars.border()};
  border-radius: ${vars.radius};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-wrap: wrap;
  height: 100%;
  position: relative;
  background-color: ${vars.white};
  ${media.tablet`
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0px 7px 14px 0px rgba(0,0,0,0.18);
      transition: all ${vars.speed} ease-in-out;
    }
  `}
`

const CardFooter = styled.div`
  margin-top: auto;
  margin-left: -2em;
  margin-right: -2em;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 1em;
  margin-bottom: -2em;
  padding-bottom: 1em;
  border-top: 1px solid ${vars.border()};
`

const tagColorMap = {
  // ENGINES
  Unity: vars.purple,
  'Unreal Engine 4': vars.green,

  // LANGUAGES
  Blueprints: vars.turquoise,
  'C++': vars.red,
  'C#': vars.orange,
  JavaScript: vars.lime,
  Ruby: vars.maroon,
  Flutter: vars.blue,
  Python: vars.yellow,

  // OTHER
}

const getColorForTag = (tag: string): string => {
  interface IData {
    [key: string]: string
  }
  const colorMap: IData = tagColorMap
  return colorMap[tag] ? colorMap[tag] : vars.background()
}

interface IProjectImgProps {
  src: string
  isThumbnail?: boolean
  height?: number
  alt: string
}

const ProjectImg = (props: IProjectImgProps) => (
  <LazyLoad once offset={200} height={props.height}>
    <Image
      src={`/static/img/${props.isThumbnail ? 'thumbnails' : 'projects'}/${
        props.src
      }`}
      alt={props.alt}
    />
  </LazyLoad>
)

const ProjectChecks = styled.div`
  padding: 0;
  margin-bottom: 1.5em;
`

const ProjectCheckHolder = styled.div`
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  margin-left: -1rem;
  margin-right: -1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-top: 1px solid ${vars.border()};
  &:last-child {
    border-bottom: 1px solid ${vars.border()};
  }
  &:hover,
  &:active {
    background-color: ${vars['blue-light']};
  }
`

const ProjectCheck = styled.span`
  padding-left: 0;
  padding-right: 4px;
  position: relative;
  top: 2px;
`

const ProjectCheckText = styled(Text)`
  margin-bottom: 0;
  line-height: 1.2;
`

const ProjectLink = styled.a`
  text-decoration: none;
  font-variant: small-caps;
  color: ${vars.blue};
  transition: all 0.1s ease-in-out;
  display: inline-block;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    bottom: 1px;
    left: 0;
    width: 100%;
    height: 1px;
    display: block;
    transition: all 0.1s ease-in-out;
    transform: translateY(-5px) scaleX(0);
    background-color: ${vars.blue};
    opacity: 0;
  }

  &:hover {
    color: ${vars.primary()};
    cursor: pointer;
    &:before {
      transform: translateY(0) scaleX(1);
      background-color: ${vars.primary()};
      opacity: 1;
    }
  }
`

interface IProjectProps {
  projectDetails: IProject
}

export const Project = (props: IProjectProps) => (
  <>
    <Card>
      <H5>
        <Link href={'/' + props.projectDetails.url} passHref legacyBehavior>
          <ProjectLink>{props.projectDetails.name}</ProjectLink>
        </Link>
      </H5>
      <H6>{props.projectDetails.date}</H6>
      <ProjectImg
        src={props.projectDetails.thumbnail_img_path}
        isThumbnail
        height={274}
        alt={`a preview image for ${props.projectDetails.name}`}
      />
      <Text color={vars.grey}>
        <em>{props.projectDetails.summary}</em>
      </Text>
      <ProjectChecks>
        {props.projectDetails.tasks &&
          props.projectDetails.tasks.map((val, i) => (
            <ProjectCheckHolder key={i}>
              <ProjectCheckText>
                <ProjectCheck>
                  <Icon>
                    <FaAngleDoubleRight aria-hidden="true" />
                  </Icon>
                </ProjectCheck>{' '}
                {val}
              </ProjectCheckText>
            </ProjectCheckHolder>
          ))}
      </ProjectChecks>
      <CardFooter>
        <Chips>
          {props.projectDetails.tags &&
            props.projectDetails.tags.map((val, index) => (
              <Chip key={index} color={getColorForTag(val)}>
                {val}
              </Chip>
            ))}
        </Chips>
      </CardFooter>
    </Card>
  </>
)

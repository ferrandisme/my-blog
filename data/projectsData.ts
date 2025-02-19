interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'TODO',
    description: `TODO`,
    imgSrc: '/static/images/logo.png',
    href: 'https://www.google.com',
  },
  {
    title: 'TODO',
    description: `TODO`,
    imgSrc: '/static/images/logo.png',
    href: '/blog/the-time-machine',
  },
]

export default projectsData

import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import SectionContainer from '@/components/SectionContainer'
import Image from '@/components/Image'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { filePath, path, slug, date, title, tags } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Publicado en</dt>
                  <dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
                    <time dateTime={date}>
                      {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
                    </time>
                  </dd>
                </div>
              </dl>
              <div>
                <PageTitle>{title}</PageTitle>
              </div>
            </div>
          </header>
          <div className="divide-y divide-gray-200 pb-8 dark:divide-gray-700">
            <div className="prose dark:prose-invert max-w-none pt-10 pb-8">{children}</div>
            <div className="pt-6 pb-6 text-sm text-gray-700 dark:text-gray-300">
              <Link href={editUrl(filePath)}>Ver en Github</Link>
            </div>
            {siteMetadata.comments && (
              <div className="pt-6 pb-6 text-center text-gray-700 dark:text-gray-300" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <div className="py-6">
              <h2 className="mb-4 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Autores
              </h2>
              <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12">
                {authorDetails.map((author) => (
                  <li className="flex items-center space-x-2" key={author.name}>
                    {author.avatar && (
                      <Image
                        src={author.avatar}
                        width={38}
                        height={38}
                        alt="avatar"
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <dl className="text-sm leading-5 font-medium whitespace-nowrap">
                      <dt className="sr-only">Nombre</dt>
                      <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                      <dt className="sr-only">Twitter</dt>
                      <dd>
                        {author.twitter && (
                          <Link
                            href={author.twitter}
                            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            {author.twitter
                              .replace('https://twitter.com/', '@')
                              .replace('https://x.com/', '@')}
                          </Link>
                        )}
                      </dd>
                    </dl>
                  </li>
                ))}
              </ul>
            </div>
            <footer>
              <div className="text-sm leading-5 font-medium">
                {tags && (
                  <div className="py-4">
                    <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                      Etiquetas
                    </h2>
                    <div className="flex flex-wrap">
                      {tags.map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                    </div>
                  </div>
                )}
                {(next || prev) && (
                  <div className="flex justify-between py-4">
                    {prev && prev.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Artículo Anterior
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${prev.path}`}>{prev.title}</Link>
                        </div>
                      </div>
                    )}
                    {next && next.path && (
                      <div>
                        <h2 className="text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                          Siguiente Artículo
                        </h2>
                        <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                          <Link href={`/${next.path}`}>{next.title}</Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <div className="pt-4">
                  <Link
                    href={`/${basePath}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label="Volver al blog"
                  >
                    &larr; Volver al blog
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}

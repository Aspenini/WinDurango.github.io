import Header from '../components/Header'
import Footer from '../components/Footer'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

export default function Blog({ posts }) {
  return (
    <div className="container">
      <Header />
      <main className="min-h-screen p-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-xbox mb-4">Blog</h1>
        <div className="space-y-4">
          {posts.map((post, index) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg">
              <Link href={`/blog/${post.slug}`}>
                <a className="text-2xl text-xboxGreen hover:underline">{post.title}</a>
              </Link>
              <p className="mt-2">{post.excerpt}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const blogDirectory = path.join(process.cwd(), 'public/blog');
  const files = fs.readdirSync(blogDirectory)
  const posts = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(path.join(blogDirectory, filename), 'utf-8')
    const { data: frontmatter } = matter(markdownWithMeta)
    return {
      slug: filename.replace('.md', ''),
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
    }
  })
  return {
    props: {
      posts,
    },
  }
}

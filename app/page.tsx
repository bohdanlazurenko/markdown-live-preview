import MarkdownEditor from '@/components/MarkdownEditor'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Markdown Live Preview
          </h1>
          <p className="text-gray-600">
            Write Markdown on the left and see the preview on the right
          </p>
        </div>
        <MarkdownEditor />
      </div>
    </main>
  )
}
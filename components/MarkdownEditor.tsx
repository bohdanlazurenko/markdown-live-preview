'use client'

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import { useLocalStorage } from '@/lib/useLocalStorage'

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useLocalStorage('markdown-content', `# Welcome to Markdown Live Preview!\n\n## Features\n\n- **Bold text**\n- *Italic text*\n- \`Inline code\`\n- [Links](https://example.com)\n\n### Code Blocks\n\n\`\`\`javascript\nfunction hello() {\n  console.log("Hello, World!");\n}\n\`\`\`\n\n### Lists\n\n1. First item\n2. Second item\n3. Third item\n\n- Unordered item 1\n- Unordered item 2\n\n### Tables\n\n| Feature | Status | Notes |\n|---------|--------|-------|\n| Syntax Highlighting | ✅ | Supported |\n| Auto-save | ✅ | To local storage |\n| GFM Support | ✅ | GitHub Flavored Markdown |\n\n> This is a blockquote\n> It can span multiple lines\n\n---\n\nStart typing to see the magic happen! ✨`)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleMarkdownChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
      {/* Editor Panel */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Editor</h2>
          <span className="text-sm text-gray-500">Markdown</span>
        </div>
        <div className="flex-1 relative">
          <textarea
            value={markdown}
            onChange={handleMarkdownChange}
            className="w-full h-full p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm bg-white"
            placeholder="Type your Markdown here..."
            spellCheck={false}
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {markdown.length} characters
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-700">Preview</h2>
          <span className="text-sm text-gray-500">Rendered</span>
        </div>
        <div className="flex-1 p-4 border border-gray-300 rounded-lg overflow-y-auto bg-white">
          {isClient ? (
            <div className="markdown-body">
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkBreaks]}
                components={{
                  // Custom component for code blocks to add syntax highlighting
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <pre className={className} {...props}>
                        <code className={className}>{children}</code>
                      </pre>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {markdown || 'Start typing to see the preview...'}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-gray-500">Loading preview...</div>
          )}
        </div>
      </div>
    </div>
  )
}
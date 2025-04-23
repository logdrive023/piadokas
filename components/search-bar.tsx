"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X, Tag } from "lucide-react"
import { searchPosts, getPopularTags } from "@/lib/mock-search"
import Link from "next/link"

interface SearchBarProps {
  onClose: () => void
}

export function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [popularTags, setPopularTags] = useState<string[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Focus the input when the search bar is opened
    if (inputRef.current) {
      inputRef.current.focus()
    }

    // Get popular tags
    setPopularTags(getPopularTags())
  }, [])

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true)
      // Simulate API delay
      const timer = setTimeout(() => {
        const searchResults = searchPosts(query)
        setResults(searchResults)
        setIsSearching(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setResults([])
    }
  }, [query])

  const handleTagClick = (tag: string) => {
    setQuery(tag)
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="flex items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar memes..."
            className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white focus-visible:ring-purple-500"
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-400"
              onClick={() => setQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="ml-2 text-gray-400">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Search results dropdown */}
      {(query.trim() || isSearching) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-[70vh] overflow-y-auto">
          {isSearching ? (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto"></div>
              <p className="text-sm text-gray-400 mt-2">Pesquisando...</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="p-2 border-b border-gray-700">
                <p className="text-xs text-gray-400">
                  {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado
                  {results.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="divide-y divide-gray-700">
                {results.map((result) => (
                  <Link href={`/post/${result.id}`} key={result.id}>
                    <div className="flex items-center gap-3 p-3 hover:bg-gray-700 transition-colors cursor-pointer">
                      <div className="w-12 h-12 bg-gray-700 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={result.imageUrl || "/placeholder.svg"}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-white truncate">{result.title}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-gray-400">{result.likes} curtidas</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-400">{result.comments} comentários</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : query.trim() ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-400">Nenhum resultado encontrado para "{query}"</p>
              <p className="text-xs text-gray-500 mt-1">Tente uma pesquisa diferente</p>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-2">Tags populares:</p>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="bg-gray-700 hover:bg-gray-600 text-white border-gray-600 flex items-center gap-1"
                    onClick={() => handleTagClick(tag)}
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar

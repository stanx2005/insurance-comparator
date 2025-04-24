import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl: string
}

export default function Pagination({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const maxVisiblePages = 5
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  return (
    <nav className="flex justify-center mt-8" aria-label="Pagination">
      <ul className="flex items-center space-x-2">
        {currentPage > 1 && (
          <li>
            <Link
              href={`${baseUrl}?page=${currentPage - 1}`}
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Précédent
            </Link>
          </li>
        )}

        {startPage > 1 && (
          <>
            <li>
              <Link
                href={`${baseUrl}?page=1`}
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                1
              </Link>
            </li>
            {startPage > 2 && (
              <li className="px-3 py-2 text-gray-500">...</li>
            )}
          </>
        )}

        {pages.slice(startPage - 1, endPage).map((page) => (
          <li key={page}>
            <Link
              href={`${baseUrl}?page=${page}`}
              className={`px-3 py-2 rounded-md ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </Link>
          </li>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <li className="px-3 py-2 text-gray-500">...</li>
            )}
            <li>
              <Link
                href={`${baseUrl}?page=${totalPages}`}
                className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                {totalPages}
              </Link>
            </li>
          </>
        )}

        {currentPage < totalPages && (
          <li>
            <Link
              href={`${baseUrl}?page=${currentPage + 1}`}
              className="px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Suivant
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
} 

const Pagination = ({ pagination, updateProjects }) => {

  console.log(pagination);
  const pages = pagination.map((page, index) => {

    if (index != 0 && index != pagination.length - 1) {
      return (
        <li key={ index }>
          <button
            className={ `flex items-center justify-center px-4 h-10 leading-tight ${page.active ? "text-purple-600 bg-purple-100 border border-purple-300 hover:bg-purple-200 hover:text-purple-700" : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"}` }
            onClick={() => updateProjects(page.label)}
          >
              { page.label }
          </button>
        </li>
      )
    }
  }) 
  
  return (
    <nav aria-label="Page navigation example">
      <ul class="flex items-center -space-x-px h-10 text-base">
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Previous</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
            </svg>
          </a>
        </li>
        { pages }
        <li>
          <a href="#" class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
            <span class="sr-only">Next</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination;
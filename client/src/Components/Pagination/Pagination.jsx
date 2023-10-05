import React from "react"

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }
  return (
    <>
      <nav style={{ textAlign: "center", paddingTop: "1rem" }}>
        <ul
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          {pageNumbers.map(number => (
            <>
              {currentPage === number ? (
                <li key={number}>
                  <button
                    style={{
                      backgroundColor:   "#93CCEA" ,
                      color:  "white" 
                    }}
                    onClick={() => paginate(number)}
                    href="!#"
                  >
                    {number}
                  </button>
                </li>
              ) : (
                <li key={number}>
                  <button
                   onClick={() => paginate(number)} href="!#">
                    {number}
                  </button>
                </li>
              )}
            </>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Pagination

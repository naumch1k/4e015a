import BlogPost from "./BlogPost";
import Pagination from "./Pagination";
import React, { useState, useMemo } from "react";
import blogs from "../data/blogs.json";

const PAGE_SIZES = [15, 25, 50, 100];
const BLOG_LIST_DEFAULT_SETTINGS = { currentPage: 1, pageSize: 15 };

function BlogList() {
  const [blogListSettings, setBlogListSettings] = useState(BLOG_LIST_DEFAULT_SETTINGS);
  const currentPaginationData = useMemo(() => {
    const numberOfPostRendered = (blogListSettings.currentPage - 1) * blogListSettings.pageSize;
    return blogs.posts.slice(numberOfPostRendered, numberOfPostRendered + blogListSettings.pageSize)
  }, [blogListSettings]);

  const updateRowsPerPage = numberOfRows => {
    setBlogListSettings({
      currentPage: 1,
      pageSize: numberOfRows
    });
  };
  const updatePage = pageNumber => {
    setBlogListSettings({
      currentPage: pageNumber,
      pageSize: blogListSettings.pageSize
    });
  };

  return (
    <div>
      <Pagination
        currentPage={blogListSettings.currentPage}
        totalCount={blogs.posts.length}
        pageSize={blogListSettings.pageSize}
        pageSizeOptions={PAGE_SIZES}
        onPageChange={updatePage}
        onPageSizeOptionChange={updateRowsPerPage}
      />
      <ul
        // Do not remove the aria-label below, it is used for Hatchways automation.
        aria-label="blog list"
      >
        {currentPaginationData.map((blog) => (
          <BlogPost
            key={blog.id}
            author={blog.author}
            title={blog.title}
            excerpt={blog.excerpt}
            featureImage={blog.image}
          />
        ))}
      </ul>
    </div>
  );
}

export default BlogList;

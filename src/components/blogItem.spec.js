import React from "react";
import { shallow, mount } from "enzyme";
import BlogItem from "./blogItem";

describe("BlogItem", () => {
  const title = "Test Title",
    longTitle = "Reaaaaaaaaaaaaaaaaaaaaaaaaaaaaalllllyyyyy looooooooooooooong title",
    excerpt = "Test excerpt for blog post",
    date_ = "October 5th, 2019",
    slug = "test-excerpt-for-blog-post",
    url = "https://linktosite.com",
    isBlogIndexPage = true;

  it("should render without crashing", () => {
    const blogItem = shallow(<BlogItem blogTitle={title} blogExcerpt={excerpt} blogDate={date_} blogLink={url} />);
    expect(blogItem.find(".content.column.is-one-third-desktop")).toHaveLength(1);
    expect(blogItem).toMatchSnapshot();
  });

  it("has the expected props when initially rendered", () => {
    const blogItem = mount(<BlogItem blogTitle={title} blogExcerpt={excerpt} blogDate={date_} blogLink={url} />);

    expect(blogItem.prop("blogTitle")).toBe(title);
    expect(blogItem.prop("blogExcerpt")).toBe(excerpt);
    expect(blogItem.prop("blogDate")).toBe(date_);
    expect(blogItem.prop("blogLink")).toBe(url);
    expect(blogItem.prop("blogTitle")).toBe(title);
    expect(blogItem.prop("onBlogIndex")).toBe(!isBlogIndexPage);
    expect(blogItem.find(".content.column a")).toHaveLength(2);
    // expect(blogItem.find(".content.column.is-three-fifths")).toHaveLength(0);
    expect(blogItem.find(".content.column.is-one-third-desktop")).toHaveLength(1);
    expect(blogItem.find(".content.column.is-full-tablet")).toHaveLength(0);
  });

  it.skip("has isThreeFifths class when rendered on index page", () => {
    const blogItem = mount(
      <BlogItem
        blogTitle={title}
        blogExcerpt={excerpt}
        blogDate={date_}
        blogLink={slug}
        onBlogIndex={isBlogIndexPage}
      />
    );
    expect(blogItem.prop("onBlogIndex")).toBe(isBlogIndexPage);
    expect(blogItem.find(".content.column a")).toHaveLength(2);
    expect(blogItem.find(".content.column.is-three-fifths")).toHaveLength(1);
    expect(blogItem.find(".content.column.is-onethird-desktop")).toHaveLength(0);
    expect(blogItem.find(".content.column.is-full-tablet")).toHaveLength(0);
  });

  it("has isFullTablet class when title is greater than 50 chars long", () => {
    const blogItem = mount(
      <BlogItem
        blogTitle={longTitle}
        blogExcerpt={excerpt}
        blogDate={date_}
        blogLink={slug}
        onBlogIndex={isBlogIndexPage}
      />
    );
    expect(longTitle.length).toBeGreaterThan(50);
    expect(blogItem.find(".content.column a")).toHaveLength(2);
    // expect(blogItem.find(".content.column.is-three-fifths")).toHaveLength(1);
    expect(blogItem.find(".content.column.is-one-third-desktop")).toHaveLength(0);
    expect(blogItem.find(".content.column.is-full-tablet")).toHaveLength(1);
  });

  it("has isFullTablet and isOneThirdDesktop classes when needed", () => {
    const blogItem = mount(<BlogItem blogTitle={longTitle} blogExcerpt={excerpt} blogDate={date_} blogLink={slug} />);
    expect(longTitle.length).toBeGreaterThan(50);
    expect(blogItem.find(".content.column a")).toHaveLength(2);
    // expect(blogItem.find(".content.column.is-three-fifths")).toHaveLength(0);
    expect(blogItem.find(".content.column.is-one-third-desktop")).toHaveLength(1);
    expect(blogItem.find(".content.column.is-full-tablet")).toHaveLength(1);
  });
});

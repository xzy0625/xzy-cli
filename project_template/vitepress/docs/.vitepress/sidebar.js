export const sidebar = [
  // 侧边栏，可以分组
  // 当用户在 `blogs` 目录页面下将会展示这个侧边栏
  {
    text: "blog1",
    collapsed: false, // 是否默认展开
    items: [
      {
        text: "index",
        link: "/blogs/blog1/",
      },
      {
        text: "fisrt",
        link: "/blogs/blog1/first",
      },
      {
        text: "second",
        link: "/blogs/blog1/second",
      },
    ],
  },
  {
    text: "blog2",
    collapsed: true,
    items: [
      {
        text: "index",
        link: "/blogs/blog2/",
      },
      {
        text: "first",
        link: "/blogs/blog2/first",
      },
      {
        text: "second",
        link: "/blogs/blog2/second",
      },
    ],
  },
];

export default {
  title: "{{ name }}", // 博客的标题
  description: "{{ description }}", // 博客的介绍
  base: "{{ base }}", // 根路径,如果想用github.io访问这个必填，需和github仓库名字一致 【https://vitejs.cn/vitepress/guide/deploy.html#github-pages-%E5%92%8C-travis-ci】
  lastUpdated: true, // 开启最后更新时间
  themeConfig: {
    logo: "/images/logo.png", // 页面上显示的logo
    algolia: {
      apiKey: 'your_api_key', // 这里是algolia的key和indexName，请自行前往申请
      indexName: 'index_name'
    },
    nav: [
      // 页面右上角的导航
      { text: "blog1", link: "/blogs/blog1/" },
      { text: "blog2", link: "/blogs/blog2/" },
      {
        text: "其他",
        items: [
          // 可以配置成下拉
          { text: "Changelog", link: "/others/changelog" },
          { text: "Contribution", link: "/others/contribution" },
        ],
      },
    ],
    sidebar: {
      // 侧边栏，可以分组
      // 当用户在 `blogs` 目录页面下将会展示这个侧边栏
      "/blogs/blog1/": [
        {
          text: "blog1",
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
      ],
      "/blogs/blog2/": [
        {
          text: "blog2",
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
      ],
    },
    docFooter: { prev: '上一篇', next: '下一篇' },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present {{ name }}'
    },
    lastUpdatedText: "最近更新时间",
    // 编辑连接
    editLink: {
      pattern: "{{ editPattern }}", // 这里换成自己的github连接
      text: 'Edit this page on GitHub'
    },
    socialLinks: [{ icon: "github", link: "{{ git }}" }], // 可以连接到 github
  },
};

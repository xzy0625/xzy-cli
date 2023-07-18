# vitepress-blog

## 快速开始
```bash
cd ./{projectName}
yarn
yarn dev
```

## github pages部署
### 一：新建仓库
新建github仓库，并将本项目和仓库进行关联

### 二：检查deploy.yml

1. `.github/workflows/deploy.yml `放置github action文件，当我们push项目到远程之后会自动触发acion。
2. ***需特别注意配置中我们监听的分支，如果你的主分支为main，请更改为main*

> on:
>
>   push:
>
> ​    branches:
>
> ​      \- master

### 三：开启github pages

> 注意gh-pages分支只有在构建完一次action之后才会存在

![github-pages](https://csuxzy-images-1300770696.cos.ap-guangzhou.myqcloud.com/github-pages.png)

如遇到问题

> GitHub Action: The process ‘/usr/bin/git‘ failed with exit code 128

解决方式

![question](https://csuxzy-images-1300770696.cos.ap-guangzhou.myqcloud.com/question.webp)

## 启用Algolia搜索
参考文档: 
1. https://juejin.cn/post/7161320316285747231
2. https://juejin.cn/post/7070109475419455519

## 其他配置

`docs/.vitepress/config.js`文件的内容请参照vitepress自行配置

## 参考文档
[vitepress](https://vitepress.dev/reference/default-theme-last-updated)
https://process1024.github.io/vitepress/guide/theme-search
https://juejin.cn/post/7164276166084263972
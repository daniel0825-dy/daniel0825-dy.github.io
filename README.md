# 블로그 저장소 구조

이 저장소는 Kagami 테마를 유지하면서 루트를 Jekyll 사이트 소스로 사용합니다.
기본 브랜치는 `master`이며, 이번 단계에서는 개인 설정과 배포 설정을 변경하지 않았습니다.

- `_config.yml`: 기존 샘플 설정. 개인화는 다음 단계에서 수행합니다.
- `index.md`, `about.md`: 홈과 소개 페이지입니다.
- `_posts/`: 기존 샘플 게시글 4개와 향후 게시글의 저장 위치입니다.
- `tags/`, `variables.md`: 기존 태그별 목록과 변수 확인 페이지를 보존합니다.
- `assets/images/`: 게시글 이미지 저장 위치입니다.
- `assets/styles/`, `assets/font/`: 기존 CSS와 아이콘 폰트 경로를 유지합니다.
- `assets/js/`: 향후 JavaScript 파일용 자리입니다. 기존 인라인 스크립트는 그대로입니다.
- `_layouts/`, `_includes/`, `_sass/`: Kagami 레이아웃, 공통 조각, 스타일 소스입니다.
- `.github/workflows/`, `.github/instructions/`: 향후 자동화용 자리이며 워크플로는 아직 없습니다.
- `AGENTS.md`: 게시글 작성 위치와 변경 범위 규칙입니다.
- `Gemfile`, `jekyll-theme-kagami.gemspec`: 현재 로컬 테마 및 빌드 의존성 정의입니다.
- `.gitmodules`: 필수 Sass 도구와 구문 강조 CSS의 서브모듈 정의입니다.
- `.script/`, `.travis.yml`, `.ruby-version`: 기존 도구와 환경 기록을 보존합니다.
- `LICENSE.txt`: 원본 테마 라이선스입니다.

## 로컬 검증

Ruby와 Bundler가 준비된 환경에서 저장소 루트를 기준으로 실행합니다.

```sh
git submodule update --init --recursive
bundle install
bundle exec jekyll build
bundle exec jekyll serve
```

`_sass/scut/dist/_scut.scss`는 Sass 빌드에 필요하며,
`assets/styles/highlighting/`는 코드 강조 색상에 필요합니다.
향후 자동 배포에서는 이 서브모듈들을 함께 체크아웃해야 합니다.
`.ruby-version`은 2.7.1, 기존 Travis 설정은 2.2를 지정하므로 환경 버전 정리는 다음 단계에서 검토합니다.

## 다음 단계

`title`, `author`, `email`, `description`, 소셜 계정, `lang`을 개인화합니다.
사용자 사이트에 맞춰 `url: https://daniel0825-dy.github.io`와 `baseurl: ""`를 검토합니다.
현재 `baseurl`은 원본의 `/jekyll-theme-kagami`를 그대로 유지하므로 실제 사이트 게시 전에 수정이 필요합니다.
`timezone: Asia/Seoul`, `theme` 및 배포 방식, RSS 생성 설정도 검토합니다.
`exclude`에는 `AGENTS.md`, `README.md`, gemspec 등 비공개용 작업 문서의 빌드 제외 여부를 검토합니다.
현재 설정은 원본 그대로이며, RSS 링크는 있지만 저장소 자체에는 feed.xml이나 피드 플러그인 활성화 설정이 없습니다.
외부 이미지, Google Fonts, 선택적으로 쓰이는 MathJax·Mermaid·댓글·분석 서비스는 기존 참조를 유지합니다.

아래는 원본 테마의 설명입니다. 개발용 실행 경로만 루트 기준으로 수정했습니다.

---
# Kagami

[![Build Status](https://travis-ci.org/kamikat/jekyll-theme-kagami.svg?branch=master)](https://travis-ci.org/kamikat/jekyll-theme-kagami)
[![Gem Version](https://badge.fury.io/rb/jekyll-theme-kagami.svg)](https://badge.fury.io/rb/jekyll-theme-kagami)

Simple and clean theme for Jekyll and GitHub Pages.

![Screenshot](https://s2.banana.moe/docs/kagami-preview@2x.png)

## Installation

Add this line to your Jekyll site's Gemfile:

```ruby
gem "jekyll-theme-kagami"
```

And add this line to your Jekyll site's `_config.yml`:

```yaml
theme: jekyll-theme-kagami
```

And then execute:

    $ bundle

Or install it yourself as:

    $ gem install jekyll-theme-kagami

### GitHub Pages

Jekyll build is integrated with GitHub Pages with limited function. This section is intended for those who
want to use the theme with GitHub Pages hosted sites.

1. Download latest gem file from https://rubygems.org/gems/jekyll-theme-kagami
2. Run `gem unpack [path-to-downloaded-gem-file] --target=.` on jekyll site project folder
3. Delete the line `theme: ...` in `_config.yml`

Zip archive downloaded from release page may not work because GitHub does not pack necessary files from submodules.

Instruction 1 and 2 can also work when you decide to upgrade your installation.

## Usage

### Social account links

You can customize social account links by adding following lines to `_config.yml`

```yaml
github_username: my_github_username
twitter_username: my_twitter_username
instagram_username: my_instagram_username
```

You can customize footer by overriding `_includes/footer.html`.

### Syntax highlighting

Kagami support color schemes from [jekyll-pygments-themes](https://github.com/jwarby/jekyll-pygments-themes).

Add the following lines to choose a color scheme:

```yaml
color_scheme: github
```

### Comment service (Disqus or Gitalk)

Add the following lines to your Jekyll site to enable Disqus comment service:

```yaml
disqus_shortname: my_disqus_shortname
```

You can find out more about Disqus' shortnames [here](https://help.disqus.com/customer/portal/articles/466208).

For [Gitalk](https://github.com/gitalk/gitalk#options):

```yaml
gitalk:
  id: <clientID>
  secret: <clientSecret>
  repo: <repo>
  owner: <owner> # (optional) if not set, value of `github_username` will be used
  admin: <admin> # (optional) if not set, value of `github_username` will be used
  proxy: ...     # (optional)
```

By default, comment service will only be enabled in production mode, set an environment `JEKYLL_ENV=production` for local test.

If you don't want to comments for particular posts you can disable that by adding `comments: false` to the post's YAML Front Matter.

### Google Analytics

To enable Google Anaytics, add the following lines to your Jekyll site:

```yaml
google_analytics: UA-NNNNNNNN-N
```

Google Analytics will only appear in production, i.e., `JEKYLL_ENV=production`

### Navigation Bar

Pages and posts can be registered as navigation item with following frontmatter:

```yaml
navbar_title: Awesome Title # specifies the text to display as navigation item
```

Navigation items are ordered in alphabetical order by default in Jekyll. Adjust the order manually with a `position` value:

```yaml
position: 999
```

### Tags and category

Layout file `post-list` supports filtering by tag or category. Create pages with following frontmatter will generate a filtered post list.

```yaml
title: Title of Tag Page
layout: post-list
filter:
  - by_tag: tagname
```

To filter by both category and tags:

```yaml
filter:
  - by_tag: tagname
    by_category: category
```

Results from multiple filters are combined (logical 'or') into the result.

A more flexible filter strategy is supported by supplying liquid expression to `by_expression` parameter in which post object can be referenced by the name `post`.

### MathJax

You can use MathJax with Kramdown's [built-in support](https://kramdown.gettalong.org/syntax.html#math-blocks).

To enable [MathJax](https://www.mathjax.org/), add following lines to your site
or post's front matter stuff:

```yaml
mathjax: true
```

### Mermaid

To enable [mermaid](https://mermaid-js.github.io/mermaid/), add following line to
the site configuration or post's front matter stuff:

```yaml
mermaid: true
```

Code blocks with `mermaid` language tag should be transformed into diagrams.

### Use `.side-note` and `.retina2x`

Taking advantages of [Block/span IAL](https://kramdown.gettalong.org/syntax.html#block-ials),
Kagami supports extra elements in writing.

Add `{:.side-note}` notation after a paragraph (in a new line just after paragraph WITHOUT extra line breaks)
will style the paragraph as a sidenote. Sidenote will be pull to the left of
the page and only be visible in desktop mode.

Kagami is also optimized for high-res image display:

```markdown
![image@2x](path-to-image@2x.png){:.retina2x}
```

And the retina image will be scaled to half of it's original size in pixels.

## 리서치 게시글 작성 안내

게시글은 `_posts/YYYY-MM-DD-slug.md`, 이미지는 `assets/images/`에 저장합니다.
기존 분류(독후감·칼럼·마인드맵) 중 하나와 태그(기업분석·산업분석·기술분석·아이디어)를 지정합니다.
일반 게시 작업에는 CSS나 레이아웃 수정이 필요하지 않습니다.

```yaml
layout: post
title: "칼럼 제목"
date: 2026-10-09 09:00:00 +0900
categories: [칼럼]
tags: [기술분석]
description: "목록에 표시할 짧은 요약"
```

- 글 제목은 front matter에 적고 본문은 `##`와 `###`로 계층을 나눕니다. 본문 `#`도 지원합니다.
- 표는 일반 Markdown 표로 작성합니다. 좁은 화면에서는 표 영역만 가로 스크롤됩니다.
- 이미지는 `![대체 설명]({{ '/assets/images/파일명.png' | relative_url }})`로 넣습니다.
- 캡션 문단 바로 다음 줄에 `{:.image-caption}`, 출처 문단 다음 줄에 `{:.source}`를 적습니다.
- 각주는 `본문[^ref]`와 `[^ref]: 출처 설명`으로 작성합니다.
- 수식이 필요하면 `mathjax: true`를 추가하고 `$$ ... $$`를 사용합니다.
- 도식이 필요하면 `mermaid: true`를 추가하고 `mermaid` 코드 블록을 사용합니다. 기존 라이브러리를 사용하며 별도 삽입이 필요 없습니다.
- 자동 목차는 보류입니다. 제목을 작성하는 것만으로 목차가 생성되지는 않습니다.

전체 예시는 `_posts/2026-10-09-research-style-preview.md`에 있습니다. 예시 수치는 가상 값입니다.
본문 검색 색인은 Jekyll 빌드 시 `search.json`으로 생성되며 검색을 시작할 때 한 번만 불러옵니다.
색인을 불러오지 못하면 제목·요약·분류·태그 검색을 계속 제공합니다.
분류·태그 필터는 검색창에 `#칼럼`, `#기업분석`처럼 입력합니다. `#컬럼`은 `#칼럼`과 동일하게 처리합니다.
여러 조건은 공백으로 조합합니다. 예: `#칼럼 #기술분석 수식`은 해당 분류·태그에 속하고 수식이라는 검색어가 있는 글을 찾습니다.
해시태그는 분류·태그 이름과 정확히 일치해야 하며 본문에 단어가 있는 것만으로는 매칭되지 않습니다.

## Contributing

Bug reports and pull requests are welcome on GitHub at <https://github.com/kamikat/jekyll-theme-kagami>. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site! To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`. This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents. As you make modifications to your theme and to your content, your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, and `_sass` tracked with Git will be released.

## License

The theme is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).


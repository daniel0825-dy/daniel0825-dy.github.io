# 블로그 작업 규칙

- 설명과 작업 보고는 한국어로 작성한다.
- 게시글은 루트 `_posts/YYYY-MM-DD-slug.md`에 저장한다. YAML front matter에 `layout: post`, `title`, `date`를 작성하고 필요한 경우 태그를 지정한다.
- 게시글 이미지는 `assets/images/`에 저장한다. 본문 이미지 링크는 `{{ '/assets/images/파일명.png' | relative_url }}` 형식을 사용한다.
- 명시적인 요청 없이 CSS, `_sass/`, `_layouts/`, `_includes/`, `_config.yml`, Gemfile, gemspec, 배포 설정을 수정하지 않는다.
- Kagami 디자인과 기존 `assets/styles/`, `assets/font/` 경로를 보존한다. 기존 인라인 JavaScript를 임의로 이동하지 않는다.
- 기존 샘플 게시글과 페이지를 요청 없이 삭제하거나 개인 정보로 덮어쓰지 않는다.
- 작업 시작 시 현재 브랜치, 원격 기본 브랜치 및 사용자 변경사항을 확인한다. 저장소 이름과 블로그 주소를 임의로 바꾸지 않는다.
- 서브모듈은 저장소에 기록된 커밋을 사용한다. 필요하면 `git submodule update --init --recursive`로 준비하고 임의로 최신 버전으로 갱신하지 않는다.
- 검증은 저장소 루트에서 `bundle exec jekyll build`로 수행한다. 도구 부재나 실패 원인과 미검증 사항을 정확히 보고한다.
- 사용자 요청에 따른 변경은 검증 후 기본적으로 커밋하고 원격에 Push한다. 사용자가 해당 작업에서 커밋·Push를 금지하면 그 지시를 따른다.
- Push 후 GitHub Pages 빌드·배포 결과와 확인 링크를 보고하고, 사용자에게 유지·취소·수정 여부를 확인받는다. 취소 요청 시 기록을 보존하는 revert를 우선한다.
- GitHub Pages는 현재 기본 제공 빌드·배포를 사용한다. `.github/workflows/`에는 별도 워크플로를 아직 구성하지 않았다.

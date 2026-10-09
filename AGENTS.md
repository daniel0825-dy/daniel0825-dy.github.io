# 블로그 작업 규칙

- 설명과 작업 보고는 한국어로 작성한다.
- 게시글은 루트 `_posts/YYYY-MM-DD-slug.md`에 저장한다. YAML front matter에 `layout: post`, `title`, `date`를 작성하고 필요한 경우 태그를 지정한다.
- 분류·태그 기준은 `_data/taxonomy.yml`을 따른다. 새 게시글의 `categories`에는 독후감·칼럼·마인드맵 중 하나를 지정하며, `tags`는 기업분석·산업분석·기술분석·아이디어 중 해당하는 값만 지정한다. 예: `categories: [칼럼]`, `tags: [기업분석, 아이디어]`.
- 목록의 분류·태그 탐색은 검색창의 `#칼럼`, `#기업분석` 형식으로 제공한다. 여러 해시태그와 일반 검색어는 공백으로 조합하며 모두 충족하는 글을 표시한다. `#컬럼`은 `#칼럼`의 검색 별칭이다. 버튼형 필터와 읽기 시간 표시는 사용하지 않는다.
- 기존 샘플은 분류 미지정으로 보존한다. 분류·태그를 추가하거나 이름을 바꿀 때 목록 데이터와 해당 목록 페이지도 함께 갱신한다.
- 게시글 이미지는 `assets/images/`에 저장한다. 본문 이미지 링크는 `{{ '/assets/images/파일명.png' | relative_url }}` 형식을 사용한다.
- 게시글 작성은 Markdown과 front matter만으로 진행한다. 리서치 서식은 README.md의 작성 안내와 `2026-10-09-research-style-preview.md`를 참고한다. 표는 일반 Markdown 표, 캡션은 `{:.image-caption}`, 출처는 `{:.source}`, 각주는 `[^이름]`을 사용한다. 수식·도식이 있는 글에만 `mathjax: true`·`mermaid: true`를 지정한다. 목차는 현재 보류 상태다.
- 명시적인 요청 없이 CSS, `_sass/`, `_layouts/`, `_includes/`, `_config.yml`, Gemfile, gemspec, 배포 설정을 수정하지 않는다.
- Kagami 디자인과 기존 `assets/styles/`, `assets/font/` 경로를 보존한다. 기존 인라인 JavaScript를 임의로 이동하지 않는다.
- 기존 샘플 게시글과 페이지를 요청 없이 삭제하거나 개인 정보로 덮어쓰지 않는다.
- 작업 시작 시 현재 브랜치, 원격 기본 브랜치 및 사용자 변경사항을 확인한다. 저장소 이름과 블로그 주소를 임의로 바꾸지 않는다.
- 서브모듈은 저장소에 기록된 커밋을 사용한다. 필요하면 `git submodule update --init --recursive`로 준비하고 임의로 최신 버전으로 갱신하지 않는다.
- 검증은 저장소 루트에서 `bundle exec jekyll build`로 수행한다. 도구 부재나 실패 원인과 미검증 사항을 정확히 보고한다.
- 사용자 요청에 따른 변경은 검증 후 기본적으로 커밋하고 원격에 Push한다. 사용자가 해당 작업에서 커밋·Push를 금지하면 그 지시를 따른다.
- Push 후 GitHub Pages 빌드·배포 결과와 확인 링크를 보고하고, 사용자에게 유지·취소·수정 여부를 확인받는다. 취소 요청 시 기록을 보존하는 revert를 우선한다.
- GitHub Pages는 현재 기본 제공 빌드·배포를 사용한다. `.github/workflows/`에는 별도 워크플로를 아직 구성하지 않았다.

## 콘텐츠 자동화 규칙

- 모든 블로그 콘텐츠 생성·편집·게시 작업 전에 `automation/CONTENT_POLICY.md`, `automation/PUBLISH_WORKFLOW.md`, `automation/INPUT_TEMPLATE.md`를 읽고 적용한다.
- 새 게시글은 `_posts/YYYY-MM-DD-english-slug.md`, 이미지는 `assets/images/`에 저장한다. 파일명뿐 아니라 기존 게시글 전체의 slug와 `/posts/:title/` URL 충돌도 확인하고 기존 원고를 덮어쓰지 않는다.
- 분류·태그는 `_data/taxonomy.yml`을 따른다. 현재 기본 분류가 없으므로 누락 시 제안 후 확인받고, 태그 누락은 빈 배열로 처리한다.
- 사용자의 명시적인 요청 없이 CSS, 레이아웃, 환경설정, 테마 및 배포 설정을 수정하지 않는다. 본문은 기존 표·이미지·각주·출처 스타일을 사용한다.
- 모든 게시글은 Front Matter·허용 분류·태그·날짜·이미지·링크·중복·출처·Markdown을 검사하고 Jekyll 빌드 검증을 통과해야 한다. 접근 불가·도구 부재·빌드 실패를 검증 성공으로 보고하지 않는다.
- 공개 정책 `PUBLICATION`을 반드시 확인한다. 콘텐츠 요청에서 생략하면 `REVIEW_REQUIRED`, RESEARCH의 기본값도 `REVIEW_REQUIRED`다. `MODE: PUBLISH`만으로 자동 게시를 허가하지 않는다.
- 기존 일반 작업의 기본 커밋·Push 규칙과 콘텐츠 공개 정책의 적용 범위를 구분한다. 환경·문서 작업은 기존 규칙을 따르며, 콘텐츠 게시에는 사용자가 TASK 04에서 명시한 PUBLICATION 규칙을 적용한다. `REVIEW_REQUIRED` 초안은 `published: false`로 만들고 승인 전에 커밋·Push하지 않는다. `AUTO_PUBLISH`가 명시되고 모든 검증과 승인 장애 판단을 통과한 경우에만 공개한다. 명시적인 초안 게시 승인은 그 초안에 한정한 AUTO_PUBLISH 요청으로 기록한다.
- 기존 게시글 작성 규칙과 충돌하면 기존 규칙을 우선하고 충돌 사항을 보고한다. 이러한 충돌 해석으로 승인 없는 Push를 허용하지 않는다. 이 문서 구축의 Push 허가는 향후 게시글의 자동 공개 허가가 아니다.
- 승인된 작업 범위의 파일만 커밋한다. 기존 GitHub Pages 배포를 재사용하고 Push한 SHA의 배포 성공 및 실제 게시 URL을 확인하기 전에는 게시 완료라고 보고하지 않는다.
- 결과 보고는 `automation/PUBLISH_WORKFLOW.md`의 9개 항목을 한국어로 작성한다. 새 채팅에서도 저장소 문서를 다시 확인하며 이전 채팅의 상태를 추측하지 않는다.

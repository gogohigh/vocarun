# 뉴트로 영단어 퀴즈 (Retro Vocab Quiz)

레트로 CRT 모니터 테마를 가진 게임 형식의 영단어 학습 웹 애플리케이션입니다.

## 🚀 주요 기능

- ** nostalgic한 레트로 디자인**: 오래된 CRT 모니터를 연상시키는 디자인으로 학습에 재미를 더합니다.
- **다양한 퀴즈 유형**:
    - **영단어 → 한글 뜻 (객관식)**
    - **한글 뜻 → 영단어 (객관식)**
    - **한글 뜻 → 영단어 (주관식)**
- **원어민 발음 듣기**: TTS(Text-to-Speech) 기능을 통해 영단어의 정확한 발음을 확인할 수 있습니다.
- **학습 완성도 추적**: 전체 단어 목록 중 얼마나 학습했는지 진행률을 퍼센트(%)로 보여줍니다.
- **스트레스 없는 학습**: 생명(lives)이나 점수 시스템 없이 오답에 대한 부담 없이 학습에만 집중할 수 있습니다.
- **랜덤 문제 순서**: 게임을 시작할 때마다 단어 순서가 무작위로 섞여 반복 학습의 지루함을 덜어줍니다.

## 🛠️ 기술 스택

- **React & TypeScript**: 컴포넌트 기반 UI 개발
- **Tailwind CSS (CDN)**: 빠르고 일관된 스타일링
- **Web Speech API (SpeechSynthesis)**: 텍스트 음성 변환 기능 구현

## 💻 로컬에서 실행하기

이 프로젝트는 ES 모듈을 사용하므로, 로컬 웹 서버를 통해 실행해야 합니다.

1.  **저장소 복제(Clone)**:
    ```bash
    git clone https://github.com/your-username/retro-vocab-quiz.git
    cd retro-vocab-quiz
    ```

2.  **로컬 서버 실행**:
    - **VS Code의 Live Server 확장 프로그램**을 사용하거나,
    - Python이 설치되어 있다면, 프로젝트 루트 디렉토리에서 아래 명령어를 실행합니다.
      ```bash
      # Python 3.x
      python -m http.server
      
      # Python 2.x
      python -m SimpleHTTPServer
      ```

3.  **브라우저에서 열기**:
    웹 브라우저를 열고 `http://localhost:8000` (또는 서버가 지정한 다른 주소)으로 접속합니다.

## 🚀 GitHub Pages 배포하기

이 프로젝트는 별도의 빌드 과정 없이 GitHub Pages에 바로 배포할 수 있습니다.

1.  **GitHub 저장소에 코드 푸시(Push)**:
    프로젝트 파일을 GitHub 저장소에 푸시합니다.

2.  **GitHub Pages 설정**:
    -   배포하려는 저장소의 **Settings** 탭으로 이동합니다.
    -   왼쪽 메뉴에서 **Pages**를 클릭합니다.
    -   **Build and deployment** 섹션의 **Source**에서 **Deploy from a branch**를 선택합니다.
    -   **Branch** 섹션에서 배포할 브랜치(예: `main` 또는 `master`)와 폴더(`/(root)`)를 선택한 후 **Save**를 누릅니다.

3.  **배포 확인**:
    잠시 후 배포가 완료되며, 페이지 상단에 게시된 사이트의 URL이 표시됩니다. (예: `https://<your-username>.github.io/<your-repo-name>/`)
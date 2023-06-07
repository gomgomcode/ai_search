# AI_Search

[Paul-graham-gpt](https://github.com/mckaywrigley/paul-graham-gpt)를 커스텀한 AI-powered search


## Dataset

AI-Hub 특허 데이터 활용

## How It Works

### Search

[ko-sentence-transformers](https://github.com/jhgan00/ko-sentence-transformers)를 활용하여 특허 데이터 본문을 embedding (`model:ko-sroberta-multitask`)

사용자의 검색어 쿼리를 받아 embedding을 생성하고 그 결과를 가장 유사한 본문의 내용을 찾는데 사용함.

임베딩 벡터에 대해 코사인 유사도를 측정하는 방식으로 유사도 비교

Postgres 기반 데이터베이스 [Supabase](https://supabase.com/)를 사용하며 [pgvector](https://github.com/pgvector/pgvector) extension 사용

## Running Locally

### Requirements

1. sentence_transformer_api 설치

fastapi기반 embedding 생성 api

코드 다운로드
도커빌드, 도커실행, 포트포워딩

2. Supabase 세팅, 데이터베이스 생성

schema.sql 파일 내용 복사

Supabase SQL editor 통해 생성

권장: Row Level Security 사용, service role 세팅

### Repo Setup

3. Clone repo

```bash
git clone https://github.com/gomgomcode/ai_search
```

4. Install dependencies

```bash
npm i
```

5. Set up environment variables

Create a .env.local file in the root of the repo with the following variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
```

### Dataset

6. Run embedding script

```bash
npm run embed
```

json 전처리 필요

json 파일 읽어서 embedding 생성, db에 저장

200ms delay between each request to avoid rate limiting.


### App

7. Run app

```bash
npm run dev
```

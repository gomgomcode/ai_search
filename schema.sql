--  RUN 1st
create extension vector;

-- RUN 2nd
create table patent_sample (
  id bigserial primary key,
  doc_id text,
  title text,
  reg_no text,
  content text,
  embedding vector (768)
);

-- RUN 3rd after running the scripts
create or replace function pg_search (
  query_embedding vector(768),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  doc_id text,
  title text,
  reg_no text,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    patent_sample.id,
    patent_sample.doc_id,
    patent_sample.title,
    patent_sample.reg_no,
    patent_sample.content,
    1 - (patent_sample.embedding <=> query_embedding) as similarity
  from patent_sample
  where 1 - (patent_sample.embedding <=> query_embedding) > similarity_threshold
  order by patent_sample.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on patent_sample
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);
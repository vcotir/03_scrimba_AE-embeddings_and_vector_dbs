# [Embeddings and Vector Databases](https://scrimba.com/the-ai-engineer-path-c02v/~01o)
In this project, we are using Supabase. I've created an organization, a project, then for the project's database - enable the "vector" extension on it so that it supports vector embeddings.

# Database

## Creating initial database 
Run command on PG SQL editor with vector plugin enabled - this defines the "vector" datatype. 

```
create table documents (
  id bigserial primary key,
  content text,
  embedding vector(1536)
);
```

Ref: https://supabase.com/blog/openai-embeddings-postgres-vector

## Adding similiarity search
We add a function that can 
```sql
-- Create a function to search for documents
create or replace function match_documents (
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language sql stable
as $$
  select
    documents.id,
    documents.content,
    1 - (documents.embedding <=> query_embedding) as similarity
  from documents
  where 1 - (documents.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$; 
```

Interesting - can't believe the embedding for "waffles" the following similiarity rank with our [content](/03_scrimba_AE-embeddings_and_vector_dbs/content.js). I expected less than 0.5. Perhaps a greater threshold is necessary.

```
[
  {
    id: 8,
    content: 'Time capsules (50 min): Revel in the bizarre, endearing, and profound discoveries that unveil the quirks of a century past.',
    similarity: 0.746046662330675
  },
  {
    id: 2,
    content: 'Jazz under stars (55 min): Experience a captivating night in New Orleans, where jazz melodies echo under the moonlit sky.',
    similarity: 0.738373473979656
  },
  {
    id: 4,
    content: 'Rediscovering lost melodies (48 min): Journey through time to explore the resurgence of vinyl culture and its timeless appeal.',
    similarity: 0.734788286425789
  }
]
```
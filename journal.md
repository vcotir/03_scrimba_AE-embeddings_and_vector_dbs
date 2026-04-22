# [Embeddings and Vector Databases](https://scrimba.com/the-ai-engineer-path-c02v/~01o)
In this project, we are using Supabase. I've created an organization, a project, then for the project's database - enable the "vector" extension on it so that it supports vector embeddings.

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
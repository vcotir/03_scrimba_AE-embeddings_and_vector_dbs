# [Embeddings and Vector Databases](https://scrimba.com/the-ai-engineer-path-c02v/~01o)
In this project, we are using Supabase. I've created an organization, a project, then for the project's database - enable the "vector" extension on it so that it supports vector embeddings.

# Database

## Creating initial database 
Run command on PG SQL editor with vector plugin enabled - this defines the "vector" datatype. 

See [documents.sql](documents.sql)

Ref: https://supabase.com/blog/openai-embeddings-postgres-vector

## Adding similiarity search
We add a function to our database to match against documents - see [match_documents.sql](match_documents.sql)


## Interesting
Interesting - can't believe the embedding for "waffles" the following similiarity rank with our [content](content.js). I expected less than 0.5. Perhaps a greater threshold is necessary.

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

# Conversational AI
We pass in user's query to similarity search, pass in results and query to OpenAI's completitions API -- w/ a system prompt to not make things up and w permission to say "I don't know" -- then pass response back to user.

See [index3.js](index3.js)

# Text Chunking
The chunking of text directly influences the embeddings of the text. Which impacts semantic search. 


Therefore, the decision on HOW to chunk is important. LangChain has text splitter tools that we can leverage to do chunking. See https://docs.langchain.com/oss/javascript/integrations/splitters

In general, a recursive text splitting strategy is suggested due to its simplicity and effectiveness. Keep in mind that chunking strategies aren't one size fits all.

# Questions
1. LangChain Recursive Text splitter affords a `.createDocuments()` method. Why would I prefer this over my split output being pure strings?
> It has more metadata - consistent w/ LangChain best practices. Works directly w/ other LangChain classes - 
> Also, easier to add vector stores, memory, agents later

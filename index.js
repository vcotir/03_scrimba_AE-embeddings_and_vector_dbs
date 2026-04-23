import { openai, supabase } from "./config.js";
import podcasts from "./content.js";

/* STEP 1 - Inserts data into Supabase */
 //async function main(input) {
//   const data = await Promise.all(
//     input.map(async (textChunk) => {
//       const embeddingResponse = await openai.embeddings.create({
//         model: "text-embedding-ada-002",
//         input: textChunk,
//       });
//       return {
//         content: textChunk,
//         embedding: embeddingResponse.data[0].embedding,
//       };
//     }),
//   );

  // Insert content and embedding into Supabase
    //   await supabase.from("documents").insert(data);
    
    //   console.log("Embedding and storing complete!");
// } 
// main(podcasts); 

/* STEP 2: Get query embedding */

const query =
  "waffles";

const embeddingResponse = await openai.embeddings.create({
  model: "text-embedding-ada-002",
  input: query,
});

const embedding = embeddingResponse.data[0].embedding

const { data } = await supabase.rpc('match_documents', {
    query_embedding: embedding,
  match_threshold: 0.50,
  match_count: 3,
})

console.log('data', data)



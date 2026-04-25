import { openai, supabase } from "./config.js";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs/promises"


// Text Splitter
// https://docs.langchain.com/oss/javascript/integrations/splitters

/*
  Challenge: Text Splitters, Embeddings, and Vector Databases!
    1. Use LangChain to split the content in movies.txt into smaller chunks.
    2. Use OpenAI's Embedding model to create an embedding for each chunk.
    3. Insert all text chunks and their corresponding embedding
       into a Supabase database table.
 */

/* Split movies.txt into text chunks.
Return LangChain's "output" – the array of Document objects. */

async function splitDocument(document) {
    try {
        const splitter = new RecursiveCharacterTextSplitter({
          chunkSize: 100,
          chunkOverlap: 0,
        });
        return splitter.splitText(document);
    } catch (err) { 
        console.error('trouble splitting document:', err)
        throw new Error(`Failed to split document: ${err.message}`)
    }
}

/* Create an embedding from each text chunk.
Store all embeddings and corresponding text in Supabase. */
async function createAndStoreEmbeddings() {
  // for remote resources
  // const response = await fetch("movies.txt");
    // const text = await response.text()
    try {
        // Read a local file
        const text = await fs.readFile("movies.txt", "utf-8");
        const chunkData = (await splitDocument(text));

        // Get embeddings
        const chunkEmbeddings = await Promise.all(
            chunkData.map(async (chunk, i) => {
                try {
                    const embedding = await openai.embeddings.create({
                        model: "text-embedding-ada-002",
                        input: chunk,
                    });
        
                    return {
                        content: chunkData[i],
                        embedding: embedding.data[0].embedding,
                    };
                } catch (err) { 
                    console.error(`Trouble creating embedding.`)
                    throw err
                }
            })
        )
    
        // Store in supabase
        const { error } = await supabase.from('movies').insert(chunkEmbeddings)
        if (error) {
          console.log("SUPABASE insert failed: ", err);
          throw new Error(`SUPABASE insert failed: ${err.message}`);
        } else {
          console.log("SUCCESS!");
        }
        
        // For deleting null entries!
        // const nullEntries = await supabase.from('documents').delete().is('content', null)
        // console.log(nullEntries)
    } catch (err) { 
        console.error(`Create and store embeddings failed: ${err.message}`)
        throw err
    }     
}

createAndStoreEmbeddings().catch(err => { 
    console.error("Unhanbled error in script", err)
    process.exit(1)
})

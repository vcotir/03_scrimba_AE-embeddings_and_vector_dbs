import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

/** Ensure the OpenAI API key is available and correctly configured */
if (!process.env.OPENAI_API_KEY) {
  throw new Error("OpenAI API key is missing or invalid.");
}

/** OpenAI config */
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const content = [
  "Beyond Mars: speculating life on distant planets.",
  "Jazz under stars: a night in New Orleans' music scene.",
  "Mysteries of the deep: exploring uncharted ocean caves.",
  "Rediscovering lost melodies: the rebirth of vinyl culture.",
  "Tales from the tech frontier: decoding AI ethics.",
];

/*
  Challenge: Pair text with its embedding
    - For each text input, create an object with 
      a 'content' and 'embedding' property
    - The value of 'content' should be the text
    - The value of 'embedding' should be the vector embedding for that text
*/

async function main() {
  const oiembedding = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: content,
  });
    console.log(oiembedding.data);

    for (let o in oiembedding.data) { 

    }
    const result = content.map((v, i) => { 
        const oiembedding = oiembedding.data[i].embedding
        return { content: v, embedding: oiembedding };
    })
    
    console.log(result)
}
main();

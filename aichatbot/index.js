const form = document.querySelector("form");
const input = document.querySelector("input");
const reply = document.querySelector(".reply");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  main(input.value);
  input.value = "";
});

async function main(input) {
  try {
    reply.innerHTML = "Thinking...";
      const response = await fetch("/request", {
          method: "POST",
          body: JSON.stringify({ input }),
          headers: {
              "Content-Type": "application/json",
          },
      });

      if (!response.ok) { 
        throw new Error(`Response status: ${response.status}`)
      }

      const text = await response.text()
      
      console.log('text', text)
    /*
        Send to backend
    */
  } catch (error) {
    console.error("Error in main function.", error.message);
    reply.innerHTML = "Sorry, something went wrong. Please try again.";
  }
}


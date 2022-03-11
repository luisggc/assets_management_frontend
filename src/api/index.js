const query = async (requestBodyInitial, method = "POST") => {
  let requestBody = Object.keys(requestBodyInitial).includes("query")
    ? requestBodyInitial
    : { query: requestBodyInitial };
  /* console.log(requestBody) */
  const req = await fetch("http://localhost:4000/graphql", {
    method,
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (req.status !== 200 && req.status !== 201) {
    throw new Error("Failed");
  }

  const data = await req.json();
  return data.data;
};

export { query };

const API_URL = process.env.WORDPRESS_API_URL ?? "";

const fetchAPI = async (
  req: { query: { slug: string } },
  res: { json: (arg0: any) => void }
) => {
  const {
    query: { slug },
  } = req;
  const QUERY_SINGLE_PAGE = `#graphql
    query SinglePage($id: ID!) {
      page(id: $id, idType: URI) {
        title
        content
      }
    }
  `;

  const data = await fetch(new URL(API_URL), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: QUERY_SINGLE_PAGE,
      variables: {
        id: slug,
      },
    }),
  });

  const json = await data.json();

  res.json(json.data);
};

export default fetchAPI;

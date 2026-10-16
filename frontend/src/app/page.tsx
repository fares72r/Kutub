type Book = {
  id: number;
  title: string;
  author: string;
};

export default async function Home() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/books?populate=*`);
  const json = await res.json();
  const books: Book[] = json.data;

  return (
    <main>
      <h1>Kutub</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            {book.title} - {book.author}
          </li>
        ))}
      </ul>
    </main>
  );
}

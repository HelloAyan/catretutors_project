// app/books/page.js
import Image from 'next/image';

async function fetchBooks() {
  const res = await fetch('http://192.168.0.157:8000/books/?page=1&page_size=10', {
    cache: 'no-store' // This ensures fresh data on every request
  });
  if (!res.ok) {
    throw new Error('Failed to fetch books');
  }
  return res.json();
}

export default async function BooksPage() {
  const data = await fetchBooks();
  const { books, total_books: totalBooks, total_pages: totalPages } = data;

  return (

    <div class="flex h-screen">
      <div class="w-1/5 bg-blue-500 p-4">
        <h1 class="text-white text-xl">Left Section</h1>
        <p class="text-white">This is the left section.</p>
      </div>

      <div class="w-4/5 bg-white p-4">
        <div>
          <h1>Book List</h1>
          <p>Total Books: {totalBooks}</p>
          <p>Total Pages: {totalPages}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {books.map((book, index) => (
              <div key={index} style={{ width: '40%', margin: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
                <Image src={''} alt={book.name} width={150} height={225} style={{ objectFit: 'cover' }} />
                <h2>{book.name}</h2>
                <p>Author: {book.author}</p>
                <p>Price: ${book.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}

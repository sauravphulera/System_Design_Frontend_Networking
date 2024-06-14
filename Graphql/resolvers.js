const data = {
	authors: [
		{
			id: "1", name: "Saurav Phulera", bookIds: ["101", "102"]
		},
		{
			id: "2", name: "Piyush Bhatt", bookIds: ["103"]
		}
	],
	books: [
		{
			id: "101", title: "Some title of 101", publishedYear: 2024, authorId: "1"
		},
		{
			id: "102", title: "Some title of 102", publishedYear: 2022, authorId: "1"
		},
		{
			id: "103", title: "Some title of 103", publishedYear: 1998, authorId: "2"
		},
	]
}

const resolvers = {
	Book: {
		author: (parent, args, context, info) => {
			console.log(parent);

			return data.authors.find(author => author.id === parent.authorId)
		}
	},
	Author: {
		books: (parent, args, context, info) => {
			return data.books.filter(book => parent.bookIds.includes(book.id))
		}
	},
	Query: {
		authors: (parent, args, context, info) => {
			return data.authors
		},

		books: (parent, args, context, infos) => {
			return data.books
		}
	},

	Mutation: {
		addBook: (parent, args, context, infos) => {

			const newBook = { ...args, id: data.books.length + 1 }
			data.books.push(newBook)
			return newBook
		}
	}
}

export default resolvers;
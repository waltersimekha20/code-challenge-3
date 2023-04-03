document.addEventListener("DOMContentLoaded", () => {

	const moviePlace = () => {
	
	fetch("http://localhost:3000/films")
	.then(res => res.json())
	.then(data => {
		// console.log(data)
		const firstMovie = data[0]
		// console.log(firstMovie)
	
		const movieImg = document.getElementById("poster")
		const movieName = document.getElementById("filmTitle")
		const movieDes = document.getElementById("movieDescription")
		const runTm = document.getElementById("runtime")
		const showTm = document.getElementById("showtime")
		const availableTckt =document.getElementById(`ticketsAvailable${data.id}`)
	
		movieImg.src = firstMovie.poster
		movieName.innerText = firstMovie.title
		movieDes.innerText = firstMovie.description
		runTm.innerText =`Runtime: ${firstMovie.runtime} minutes`
		showTm.innerText =`Showtime: ${firstMovie.showtime}`
		availableTckt.innerText =`${firstMovie.capacity - firstMovie.tickets_sold}` 
	
		const ticketBuy = document.getElementById(`buyTicket${data.id}`)
		let tickets = Number(firstMovie.capacity - firstMovie.tickets_sold)
	
		ticketBuy.addEventListener('click',()=> {
	
			tickets--
	
			if(tickets <= 0){
				const frstMovie = document.getElementById("1")
				frstMovie.innerHTML=`${firstMovie.title}  <span class="badge bg-danger">SOLD OUT</span>`
	
				availableTckt.innerHTML = `Ticketd available:  <span class="badge bg-danger">SOLD OUT</span>`
			}else{
				availableTckt.innerText = `Tickets available: (${tickets})`
			}
	
			// fetch function to persist Tickets sold in the server
			fetch(`http://localhost:3000/films/${data.id}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			})
			.then(res => res.json())
			.then(film => console.log(film))
		})
	
	})
	}
	
	const movieItem = () => {
	
		fetch("http://localhost:3000/films")
		.then(res => res.json())
		.then(data => {
			// console.log(data.length)
			const filmData = data
	
			for(let i = 0; i < filmData.length; i++){
				let movie = filmData[i]
				// console.log(movie)
				const movieItem = document.createElement("li")
				const list = document.getElementById("showingMovie")
	
				movieItem.classList.add("border")
	
				movieItem.setAttribute('id',`${movie.id}`)
	
				movieItem.innerText = movie.title
				// console.log(movie.title)
	
				list.appendChild(movieItem)
	
				
	
				movieItem.addEventListener('click',()=>{
					const filmImage = document.getElementById("poster")
					const filmTitle = document.getElementById("filmTitle")
					const filmDescr = document.getElementById("movieDescription")
					const runTime = document.getElementById("runtime")
					const showTime = document.getElementById("showtime")
					const availTickets =document.getElementById("ticketsAvailable")
	
	
					filmImage.src = movie.poster
					filmTitle.innerText = movie.title
					filmDescr.innerText = movie.description
					runTime.innerHTML =`Runtime:<span>${movie.runtime}</span>`
					showTime.innerText =`Showtime: ${movie.showtime}`
					availTickets.innerText =`Tickets available: (${movie.capacity - movie.tickets_sold})`
	
					const ticketsBuy = document.getElementById("buyTicket")
					let ticket = Number(movie.capacity - movie.tickets_sold)
	
					ticketsBuy.addEventListener('click',()=>{
	
						
						ticket --
						if(ticket <= 0){
							movieItem.innerHTML =`${movie.title} <span class="badge bg-danger">SOLD OUT</span>`
	
							availTickets.innerHTML = `Tickets available: <span class="badge bg-danger">SOLD OUT</span>`
	
						}else{
	
							availTickets.innerText = `Tickets available: (${ticket})`
						}
						
	
	
					})
	
	
	
				})
	
				const deleteBtn = document.createElement("button")
				deleteBtn.classList.add("btn", "btn-danger")
				deleteBtn.setAttribute('id',`${movie.id}-delete`)
				deleteBtn.innerText = "Delete"
				movieItem.appendChild(deleteBtn)
	
				deleteBtn.addEventListener('click',()=>{
					movieItem.remove();
	
	
					fetch(`http://localhost:3000/films/${movie.id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json'
						}
					})
					.then(res => res.json())
					.then(movie => console.log(movie))
				})
			}
			 
		})
	  
	
	
	
	
	}
	
	
	
	moviePlace()
	movieItem()
	})
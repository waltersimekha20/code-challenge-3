fetch('http://localhost:3000/films')
.then(resp => resp.json())
.then(data => {
const films = data.slice(0, 15);

films.forEach(films => {
    const filmsDiv = document.createElement('div');
    filmsDiv.classList.add('films');

    const posterImage = document.createElement('img');
posterImage.src = films.poster;
posterImage.alt = films.title;
filmsDiv.appendChild(posterImage);

const posterTitle = document.createElement('h2');
posterTitle.src = films.poster;
posterTitle.alt = films.title;
filmsDiv.appendChild(posterTitle);

const runtime = document.createElement('p');
runtime.textContent = `Runtime ${films.runtime} minutes`;
filmsDiv.appendChild(runtime);

const showtime = document.createElement('p')
showtime.textContent = `Showtime ${films.showtime}`;
filmsDiv.appendChild(showtime);

const description = document.createElement('p');
description.textContent = films.description;
filmsDiv.appendChild(description);

const capacity = document.createElement('p');
                    capacity.textContent = `Capacity: ${films.capacity}`;
                    filmsDiv.appendChild(capacity);

                    const decreaseButton = document.createElement('button');
                    decreaseButton.textContent = 'Buy Ticket';
                    decreaseButton.addEventListener('click', () => {
                        if (films.tickets_sold < films.capacity) {
                            films.tickets_sold++;
                            ticketsSoldParagraph.textContent = `Tickets sold: ${films.tickets_sold}`;
                            availableTicketsParagraph.textContent = `Available tickets: ${films.capacity - films.tickets_sold}`;
                        }
                    });

                    filmsDiv.appendChild(decreaseButton);

                    const ticketsSoldParagraph = document.createElement('p');
                    ticketsSoldParagraph.textContent = `Tickets sold: ${films.tickets_sold}`;
                    filmsDiv.appendChild(ticketsSoldParagraph);

                    const availableTicketsParagraph = document.createElement('p');
                    availableTicketsParagraph.textContent = `Available tickets: ${films.capacity - films.tickets_sold}`;
                    filmsDiv.appendChild(availableTicketsParagraph);

                    document.getElementById('description').appendChild(filmsDiv);
                });
            })
            .catch(error => console.error('Error fetching films:', error));


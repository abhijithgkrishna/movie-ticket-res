res = fetch('http://localhost:3000/api/movies')
.then(response => response.json())
document.addEventListener('DOMContentLoaded', loadMovies);
console.log(res)

document.addEventListener('click', function(event) {
    const popup = document.getElementById('booking-view-popup');
    

    // Check if the popup is open and if the click target is outside the popup
    if (popup.style.display === 'flex' && !popup.contains(event.target)) {
        console.log('Clicked outside the popup');
        popup.style.display = 'none';
    }
});




function loadMovies() {
    fetch('http://localhost:3000/api/movies')
        .then(response => response.json())
        .then(movies => {
            const moviesContainer = document.querySelector('.row');
            moviesContainer.innerHTML = ''; // Clear existing content

            movies.forEach(movie => {
                const movieCard = `
                    <div class="col s12 m6 l4 movie-card">
                        <div class="card">
                            <div class="card-content">
                                <span class="card-title">${movie.title}</span>
                                <p>Theatre: ${movie.name}</p>
                                <p>Duration: ${movie.duration_minutes}mins</p>
                                <p>Rating: ${'★'.repeat(movie.rating)}</p>
                                <p>Seats Available: ${movie.available}</p>
                                <p>Show Id : ${movie.id}</p>
                            </div>
                            
                        </div>
                    </div>`;
                moviesContainer.innerHTML += movieCard;
            });
        })
        .catch(error => console.error('Error fetching movies:', error));
}

function viewBookings() {
    fetch('http://localhost:3000/api/bookings') // Adjust URL as needed
        .then(response => response.json())
        .then(bookings => {
            const bookingsDataContainer = document.getElementById('booking-data');
            let tableHTML = '<table><tr><th>Booking ID</th><th>Show ID</th><th>Customer Name</th></tr>';

            bookings.forEach(booking => {
                tableHTML += `
                    <tr>
                        <td>${booking.id}</td>
                        <td>${booking.show_id}</td>
                        <td>${booking.customer_name}</td>
                    </tr>`;
            });

            tableHTML += '</table>';
            bookingsDataContainer.innerHTML = tableHTML;

            document.getElementById('booking-view-popup').style.display = 'block';
        })
        .catch(error => console.error('Error fetching bookings:', error));
}



function addMovie() {
    document.getElementById("add-movie-popup").style.display = 'flex';
}   

function bookTicket(movieId) {

    document.getElementById("booking-popup").style.display = "flex";
  }
  function cancelTicket(movieId) {

    document.getElementById("cancel-ticket-popup").style.display = "flex";
  }


  function closePopup() {
    document.getElementById("booking-popup").style.display = "none";
    document.getElementById("cancel-ticket-popup").style.display = "none";
  }

  function closebooking() {
    document.getElementById("booking-view-popup").style.display = "none";
  }

  function submitBooking() {
    const name = document.getElementById('name').value
    const id = document.getElementById('id').value
    const formData = {
        name: name,
        id: id,
        // include other form data if necessary
    };
    fetch('http://localhost:3000/submit_booking', {  // Replace with your server's URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    closePopup();
  }

  function submitCancellation() {
    const id = document.getElementById('ticketId').value
    const formData = {
        id: id,
        // include other form data if necessary
    };
    fetch('http://localhost:3000/submit_cancellation', {  // Replace with your server's URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    closeCancelPopup();
  }

  function submitMovie() {
    const title = document.getElementById('movieTitle').value
    const duration_minutes = document.getElementById('movieDuration').value
    const rating = document.getElementById('movieRating').value
    
    const formData = {
        title: title,
        duration_minutes: duration_minutes,
        rating: rating,
        // include other form data if necessary
    };
    fetch('http://localhost:3000/submit_movie', {  // Replace with your server's URL
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    
    closeMoviePopup();
  }

  function closeCancelPopup() {
    document.getElementById("cancel-ticket-popup").style.display = "none";
  }
  function closeMoviePopup() {
    document.getElementById("add-movie-popup").style.display = 'none';
}


  function onNavClick(event) {
    if (event.target.href.includes("#cancel-ticket")) {
      document.getElementById("cancel-ticket-popup").style.display = "flex";
    }
    // Add more navigation handling if needed
  }
// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Select modal and message area
const errorModal = document.getElementById('modal');
const errorMessage = document.getElementById('modal-message');

// Hide modal on load
errorModal.classList.add('hidden');

// Select all hearts
const hearts = document.querySelectorAll('.like-glyph');

// Add click listener to each heart
hearts.forEach(heart => {
  heart.addEventListener('click', () => {
    // Simulate server call
    mimicServerCall()
      .then(() => {
        // Only update UI if server call succeeds
        if (heart.innerText === EMPTY_HEART) {
          heart.innerText = FULL_HEART;
          heart.classList.add('activated-heart');
        } else {
          heart.innerText = EMPTY_HEART;
          heart.classList.remove('activated-heart');
        }
      })
      .catch(error => {
        // Show error modal
        errorMessage.textContent = error;
        errorModal.classList.remove('hidden');

        // Hide modal after 3 seconds
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

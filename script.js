const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
const form = document.getElementById("form");
const result = document.getElementById("result");

form.addEventListener("submit", function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value;
    
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait...";

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-green-500");
       

      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove("text-gray-500");
        result.classList.add("text-red-500");
        
      }
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
});



hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});





// Sample projects
const projects = [
  {
    title: 'Portfolio Website',
    description: 'A personal portfolio built using HTML, CSS, and JavaScript.'
  },
  {
    title: 'E-commerce UI',
    description: 'A sample front-end for an online store using React and Tailwind CSS.'
  },
  {
    title: 'Blog Platform',
    description: 'A full-featured blog platform with Markdown support and user auth.'
  },
  {
    title: 'Photo Gallery',
    description: 'A responsive gallery layout using CSS Grid and lightbox features.'
  },
  {
    title: 'Weather App',
    description: 'A weather app fetching real-time data using a weather API.'
  },
  {
    title: 'Task Manager',
    description: 'A simple task manager built with JavaScript and localStorage.'
  }
];

const projectsContainer = document.getElementById('projects');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeModal = document.getElementById('closeModal');

// Populate project cards
projects.forEach((proj, index) => {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.innerHTML = `
    <h3 class="project-title">${proj.title}</h3>
    <p class="project-desc">${proj.description.slice(0, 60)}...</p>
  `;
  card.addEventListener('click', () => {
    modalTitle.textContent = proj.title;
    modalDesc.textContent = proj.description;
    modal.style.display = 'flex';
  });
  projectsContainer.appendChild(card);
});

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});



// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

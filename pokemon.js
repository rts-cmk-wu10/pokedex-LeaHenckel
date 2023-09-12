const URL = new URLSearchParams(window.location.search)
const SPINNER = document.querySelector(".loading")   // VIS SPINNER


fetch(`https://pokeapi.co/api/v2/pokemon/${URL.get("name")}`)
	.then(function(response) {
		if (response.status === 200) {
			return response.json()
		} else {
			document.body.innerText += "Ups, noget gik galt. Prøv igen senere."
		}
	})
	.then(function(data) {
		SPINNER.style.display = "none" // SKJUL SPINNER
		const DIV = document.querySelector(".pokemon")
		DIV.innerHTML = `
		<h1>${data.name}</h1>
		<span class="imagePlaceholder">
		<svg height="200" width="300">
		<path d="M10 195 L50 100 L100 150 L150 50 L200 150 L250 100 L290 195 Z" />
		<rect x="5" y="5" rx="20" ry="20" width="290" height="190" fill="none" stroke="black" stroke-width="10"/>
	  	</svg>
		</span>
		<p class="heightAndWeight">Height: ${data.height}</p>
		<p class="heightAndWeight">Weight: ${data.weight}</p>
		<p class="Abilities">Abilities</p>
		<ul>${data.abilities.map(
			elem => `<li>${elem.ability.name}</li>`
		).join("")}</ul>`

		const IMG = new Image()
		IMG.src = data.sprites.other["official-artwork"].front_default
		IMG.className = "pokemon-image"

		IMG.onload = function () {
			DIV.querySelector(".imagePlaceholder svg").style.display = "none"
			DIV.querySelector(".imagePlaceholder").append(IMG)
		}
	})	/* <img src="${data.sprites.other["official-artwork"].front_default}" class="pokemon-image"> */
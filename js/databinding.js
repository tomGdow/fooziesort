
(function() {
		databind = document.getElementById('databind'),
		input = document.getElementById('input');
	function updateTest() {
		databind.innerHTML = input.value;
		}

	input.addEventListener('input', updateTest, false);
	input.addEventListener('change', updateTest, false);
}());

console.log(databind);
console.log(input);


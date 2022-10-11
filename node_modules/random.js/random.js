/*!
* @fn randomInt(options)
* @brief generate random integers
* @param options.min the minimum value (default: 0)
* @param options.max the maximum value (default: 4294967295)
* @return an integer between the min/max bounds
*/
randomInt = function(options)
{
	if (options === undefined || options === null)
		options = {}
	if (options.min === undefined || options === null)
		options.min = 0
	if (options.max === undefined || options === null)
		options.max = 4294967295
	if (options.min > options.max) {
		var tmp = options.min
		options.min = options.max
		options.max = tmp
	}

	return Math.floor((Math.random() * (options.max - options.min)) + options.min)
}

/*!
* @fn randomFloat(options)
* @brief generate random floats
* @param options.min the minimum value (default: 0.0)
* @param options.max the maximum value (default: 1.0)
* @return a float between the min/max bounds
*/
randomFloat = function(options)
{
	if (options === undefined || options === null)
		options = {}
	if (options.min === undefined || options === null)
		options.min = 0.0
	if (options.max === undefined || options === null)
		options.max = 1.0

	return (Math.random() * (options.max - options.min)) + options.min
}

/*!
 * @fn randomString(options)
 * @brief generate random strings
 * @param options.length the length of the string to generate (default: 20)
 * @param options.set one of alpha|numeric|alphanum|hex|custom (default: alphanum)
 * @param options.custom if set is custom, provides a set of characters used for the string generation (string or array)
 * @returns a string containing random characters from the selected set of the given length
 * @discussion when generating a string of hexadecimal set, the alpha-characters are uppercase, use .toLowerCase() on the result to switch to lowercase
 */
randomString = function(options)
{
	if (options === undefined || options === null)
		options = {}
	if (options.length === undefined || options.length === null)
		options.length = 20
	if (options.set === undefined || options.set === null)
		options.set = "alphanum"

	var charset
	switch (options.set)
	{
		case "alpha":
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
			break

		case "alphanum":
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
			break

		case "num":
			charset = "0123456789"
			break

		case "hex":
			charset = "0123456789ABCDEF"
			break

		case "custom":
			if (options.custom === undefined || options.custom === null) {
				console.error("can't generate a random string with custom set of characters if options.custom is null or undefined")
				return ""
			}
			charset = options.custom
			break
	}

	var result = ""
	for (var i = 0; i < options.length; i++) {
		var int = randomInt({min: 0, max: charset.length})
		result += charset[int]
	}
	return result
}

module.exports.randomInt = randomInt
module.exports.randomFloat = randomFloat
module.exports.randomString = randomString

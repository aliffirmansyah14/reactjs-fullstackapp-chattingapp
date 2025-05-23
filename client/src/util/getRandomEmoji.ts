const emojis = ["⛔", "✅", "💤", "💪"];

const getRandomEmoji = (): string => {
	return emojis[Math.floor(Math.random() * emojis.length)];
};
export default getRandomEmoji;

function getRandomEmojis() {
    // Array of emojis
    const emojis = ['😀', '😂', '😎', '😊', '🤣', '😍', '🥳', '😇', '🤩', '😜', '😋', '🤗', '😄', '😁', '😆', '😌', '😊', '😋', '😎', '😍', '😘', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤩', '🤔', '😏', '😺', '😸', '😻', '😽', '🙀', '😿', '😹', '😾', '😼'];



    // Generate a random index
    const randomIndex = Math.floor(Math.random() * emojis.length);

    // Return the randomly selected emoji
    return emojis[randomIndex];
}

// Example usage
//   const fiftyRandomEmojis = getRandomEmojis();
//   console.log(fiftyRandomEmojis);


export default getRandomEmojis;
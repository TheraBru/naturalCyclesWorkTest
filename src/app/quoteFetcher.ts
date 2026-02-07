const quoteFetcher = async () => {
    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();
    return data.quote;    
}

export default quoteFetcher;
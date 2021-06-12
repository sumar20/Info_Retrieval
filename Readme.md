## CS172 - Information Retrieval Project

### Demo Link: https://cutt.ly/ZnAjqbR

### Phase1: Web Crawler

My crawler reads a seed file of .edu URLs and then crawls those pages. 
The crawler is provided with a list of seed urls which are tracked by an array. The crawler will check if a particular url has been scrapped. If it has been scraped then it ignores it, to prevent duplicates, otherwise we send a request to scrape the website. The crawler is single-threaded. I also used the Beautiful soup library to parse the contents of the page and to find other links inside the page.

To run the crawler: we run:

`python3 ./crawler.sh <seed File> <num page> <output File>`

For the purposes of this project, you need to run:

`python3 ./crawler.sh seedFile.txt <num pages> data.json` 

### Phase2: Elastic Search:

I used the cloud service for ElasticSearch. Elastic search was used to build an index over the crawled data for the purpose of retrieval. I used `curl` for making requests to the elastic search. Specifically, I used the: `curl -X PUT -u <password> "https://<servername>/<index-name>/_doc/1" -H 'Content-Type: application/json' -d'{"html": "<td><tr>test<td </tr>"}'` command to put my crawled file in the elastic search.

### Phase3: Web Based Interface:

For the web based interface, I made a basic website using HTML, CSS and JS. The interface includes a search button and a textbox for writing the query. When the user searches a query, a list of results is displayed with the index name, id, url, and score (in descending order).

### Instructions for running:

* In the `phase3` folder, run `npm install` to download the modules
* Then run: `npm run start`
* Navigate to `http://localhost:3000/` on google chrome


### Screenshots:

[![covid.png](https://i.postimg.cc/QCtVP03C/covid.png)](https://postimg.cc/5YhxQ5jW)

[![faculty.png](https://i.postimg.cc/4ySnTVf5/faculty.png)](https://postimg.cc/jnyRHWJw)

[![stem.png](https://i.postimg.cc/s24Xgtf1/stem.png)](https://postimg.cc/CZdYvrqV)

[![vaccine.png](https://i.postimg.cc/yxkYnxmS/vaccine.png)](https://postimg.cc/64xXp919)

### Contributions: 
I worked individually on the project.

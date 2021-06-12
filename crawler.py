import requests
import json
from bs4 import BeautifulSoup
import sys

arr = []
def crawler(seedFile, numPages, outputDir):
    output = []
    targetLinks = []

    # Read seedFile
    f= open(seedFile, "r")
    orig_url = f.readlines()
    f.close()
    for nl in orig_url:
        targetLinks.append(nl.strip())
    print(targetLinks)

    while(numPages > 0):
        numPages = numPages - 1

        # Dequeue
        targetUrl = targetLinks.pop(0)
        if(targetUrl not in output):
            if(targetUrl.endswith('/') == False):
                targetUrl = targetUrl + '/'
        try:
            # hitting server
            webPage = requests.get(targetUrl, timeout=10000)
        except:
            continue
        htmlContent = webPage.text
        soupObject = BeautifulSoup(htmlContent, "html.parser")
        try:
            bodyContent = soupObject.body.text
        except:
            continue
        bodyString = (str(bodyContent)).replace('\n', '').replace(
            '(', "").replace(')', "").replace("`", "").replace("'", "")

        dict = {
            "url": targetUrl,
            "html": bodyString
        }

        json.dumps(dict)
        arr.append(json.dumps(dict))
        scraped_data = open(outputDir, 'w')

        hops = soupObject.find_all("a", {'href': True})

        for url in hops:
            specific = url.get('href').strip()
            if(specific.endswith('/') == False):
                specific = specific + '/'
            if("https" in specific):
                if(specific not in targetLinks):
                    if(specific not in output):
                            targetLinks.append(specific)
        output.append(targetUrl)

    scraped_data = open(outputDir, 'w')

    fmat = str(arr).replace(
        "'", "").replace("\\\\", "\\")
    scraped_data.write(fmat)
    scraped_data.close()
    print("Finished Crawling...")

def main():
    args = sys.argv[1:]
    crawler(args[0], int(args[1]), args[2])

if __name__ == "__main__":
    main()

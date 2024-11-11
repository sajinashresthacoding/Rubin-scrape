# Rubin Museum Insights: Web Scraping and Analysis
An in-depth analysis of the Rubin Museum of Art's online database, utilizing web scraping, functional programming, and recursion in Python to explore themes related to sovereign nations and the repatriation of Tibetan cultural artifacts.

## Context:
This project is a look into the online database at the Rubin Museum of Art, a museum that holds an extremely large collection of Himalayan art. It’s an exploratory look to see where, in Tibet, the majority of the cultural objects are coming from, what medium they reside in, and the year it was created. I created this project to supplement my reporting on repatriation and Tibetan sacred objects. 

## Project Breakdown:
1. **Data Collection**
  * **Challenge:** Data on each cultural object is embedded within individual links on a dynamic, scroll-based webpage.
  * **Solution:** Used Python to download and analyze the HTML structure, then identified relevant tags through exploration in Jupyter notebooks. Using functional programming techniques, built a custom scraper that extracts URLs and necessary metadata from the webpage, stored in specific divs and IDs.
2. **Data Cleaning and Storage**
  * Consolidated extracted data into a structured CSV file.
  * For enhanced organization and sorting, further cleaned and analyzed the dataset using Excel.
3. **Data Analysis**
  * Conducted exploratory analysis in Python, focusing on key attributes such as object origin, material, and historical context.
  * Queried data specifically for Tibetan artifacts to examine patterns of "donations" and mediums the cultural objects came in.

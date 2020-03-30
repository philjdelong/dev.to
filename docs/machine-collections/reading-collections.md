---
title: Reading Collections
---

# Machine Collections: Reading Collections

_Scehduled Task: Update Reading Collections_

- I don’t have time and energy to read these articles every day, but I’d like to
  catch up with the best recent content.
- Thankfully, we have machines for that. As a reader I login to the app and
  create a new “collection” with a name like “Best of JS”. Within the collection
  I can target some specific tags (maybe using my followed tags as suggestions).
  Then, each week, the app generates a collection based on posts published that
  week in those tags, prioritizing them by the number of reads. That collection
  is browseable at a unique URL.
- Our latest feature implimentation allows users to create a collection of
  articles based on selected tags (4 maximum). The articles for each collection
  update each week based on the top numbers of article views for that group of
  tags.

### User Instructions ('How To')

**Create a Collection**

- visit: "https://dev.to/"
- click: "Reading List"
- scroll: "Reading Collections"
- click: "+" symbol
- enter: "Name_of_Your_Collection"
- select: (up to) 4 different tags
- click: "Create Collection"

**View a List of Collections**

- visit: "https://dev.to/"
- click: "Reading List"

**View a Single Collection**

- visit: "https://dev.to/"
- click: "Reading List"
- scroll: "Reading Collections"
- click: "Name_of_Your_Collection"

### Schema Updates

**reading_collections**

- "name"
- "user"

**reading_collection_articles**

- "article"
- "reading" collection

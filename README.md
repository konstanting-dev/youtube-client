# YouTube client

Web app to view information about youtube clips by user request.
YouTube REST API is accessed via cross-domain XHR requests.

### Use case:

1. Search box is viewed by the user when he starts the app.
2. The user inputs a request in the search box.
3. The app processes the request to YouTube REST API and displays loaded clips in form of horisontal list.
4. The horisontal list can be scrolled with a swipe (on a desktop via mouse swipe). Swipe should be animated, e.g. user can click and pull the list sidewise. Paging event should be triggered when mouseUp is released. If a user makes X quick swipes the app should list X pages. The number of clips on a page depends on the page size (from 1 to 4 clips per page).
5. The additional navigation buttons (paging control) are set on the bottom of the page.
6. As listing the pages, the app should load new data by chunks ( 15 clips per chunk). It has data loading which means preloading data chunks in advance to emulate infinite scrolling experience.

### UI Examples:

#### Default view:

![](https://i.imgur.com/mf15laT.png)

#### Resize

![](https://i.imgur.com/qy6qsKQ.png)

#### Resize

![](https://i.imgur.com/aCXwnS0.png)

#### Mobile version

![](https://i.imgur.com/2TZPDBw.png)

### Right now the data for the posts is coming from a json file. What changes would you have to make to the application if it came from an API? In what type of hook should you use to fetch the data and why? What other considerations would you have to make?

If data comes from an API, I will employ useState and useEffect hooks (state and lifecycle method in functional components). I would initialize data with `null` and update it if the API request returns data. Considering that useEffect hook by default runs whenever a component is updated, I would pass it an empty array as a second argument to stop this default behavior. I would probably want to cache response data to reduce the number of calls to an API.

Since it takes some time to fetch data from an API, especially with mobile devices, I would work on some loading state to make it clear to the user that awaiting the result. I would conditionally render a loader while waiting on an API response.

Once I get an API response, I will check if there is actual data to display. Suppose there is no data, I would render no result screen.
That may happen that API returns an error. If so, I want to let the user know that. 

For the cases when awaiting an API response, got no data, or API returned an error, I will probably want to hide pagination. So conditional for that also.

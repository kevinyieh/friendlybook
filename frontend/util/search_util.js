export const fetchSearch = query => {
    return $.ajax({
        method: "GET",
        url: "/api/searches",
        data: {
            search:{
                query
            }
        }
    })
}